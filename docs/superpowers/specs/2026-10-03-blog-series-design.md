# Blog Series Support

**Date:** 2026-10-03
**Status:** Draft — awaiting review
**Scope:** Add first-class "series" support to the blog: a dedicated series collection, per-series and aggregate pages, in-post series navigation, and syndication of series metadata to dev.to (native `series`) and the RSS feed (as a category).

---

## 1. Goals

1. A post can belong to a named, ordered **series** of posts.
2. Series are **first-class**: each series has its own file with a title and description, plus a dedicated page and an aggregate index.
3. In-post navigation reflects series membership (a series box with prev/next within the series), replacing the date-based prev/next for those posts.
4. Series metadata syndicates to both platforms already in use:
   - **dev.to** native `series` field (grouped automatically by shared name).
   - **RSS** (`rss.xml`, consumed by usecommune) as a `category`.

## 2. Non-goals

- No two-way sync of series from dev.to back into the repo.
- No change to the existing draft/publish or canonical-URL workflow.
- No series-specific ordering control on dev.to (dev.to orders by publish date automatically).
- No changes to the navbar; series pages are reached from the blog index and post pages.

---

## 3. Current state (as of this spec)

- **Content:** MDX in `src/content/blog/`, validated by a Zod schema in `src/content.config.ts:5-19`. No `series` support today.
- **Post rendering:** `src/pages/blog/[slug].astro` (prerendered) renders posts with date-based prev/next navigation.
- **Blog index:** `src/pages/blog/index.astro` + `src/components/BlogList.tsx` (React island, `client:load`).
- **dev.to sync:** `scripts/sync-devto.mjs` + `scripts/lib/*` (gray-matter frontmatter, MDX→markdown transform, dev.to client). Article payload today: `title`, `published`, `body_markdown`, `tags`, `canonical_url`, `description`, optional `cover_image`.
- **RSS:** `src/pages/rss.xml.ts` using `@astrojs/rss` (RSS 2.0, no native series element). `categories` currently = `post.data.tags`.
- dev.to's article API accepts a free-form `series` string; posts sharing the same name are grouped automatically (no pre-creation API).

---

## 4. Design decisions (confirmed with user)

| Decision | Choice |
| --- | --- |
| Series scope | Full first-class series: own collection/file (title + description), dedicated pages + in-post nav |
| Part ordering | Post `seriesPart` number drives order |
| dev.to mapping | Sync to dev.to native `series` field (by series title) |
| RSS mapping | Series surfaced as a `category` |
| Pages | Both `/series` (aggregate) and `/series/[slug]` (per-series) |
| In-post nav | Series nav **replaces** the date-based prev/next for posts in a series |
| Data model | Series as a content collection (`src/content/series/*.mdx`) — Approach A |

---

## 5. Architecture

```
src/content/series/*.mdx  ──(Astro content collection "series")──▶  /series + /series/[slug]
          ▲
          │ series: "<slug>" + seriesPart: n (on blog posts)
          │
src/content/blog/*.mdx ──▶ site (post pages: series box, series prev/next)
          │
          ├──▶ scripts/sync-devto.mjs ──▶ dev.to article `series: <title>`
          └──▶ src/pages/rss.xml.ts ──▶ rss.xml `category: series: <title>`
```

### 5.1 Schema (`src/content.config.ts`)

Add a `series` collection:

```ts
const series = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});
export const collections = { blog, series };
```

Add to the `blog` schema:

```ts
series: z.string().optional(),          // slug of the series file
seriesPart: z.number().int().positive().optional(), // position in the series
```

With a `superRefine` so `series` and `seriesPart` travel together (reject one without the other).

**Reference integrity:** Astro content schemas cannot validate against another collection, so `series` slugs are not schema-checked. Rendering skips the series box (and logs a dev warning) when a post's `series` has no matching series file. Because `superRefine` requires `series` and `seriesPart` to travel together, every post that references a series carries an explicit part number.

### 5.2 Series pages

**`src/pages/series/index.astro`** (prerendered): lists all series (title, description, part count) linking to `/series/[slug]`, sorted by most-recent published part.

**`src/pages/series/[slug].astro`** (prerendered via `getStaticPaths` over the series collection): title + description, then ordered parts (by `seriesPart`) linking to `/blog/<postId>`. Only `published` posts listed. A series with no published parts still renders (with an empty-state message).

### 5.3 Post page (`src/pages/blog/[slug].astro`)

When a post has `series` with a valid series file, render a **series box** after the article body: series title (linked to `/series/[slug]`), a compact ordered list of parts with the current part highlighted, and prev/next scoped to the series. The date-based prev/next is omitted for posts in a series; it remains unchanged for standalone posts.

### 5.4 Blog list (`src/components/BlogList.tsx`)

Pass a `series?: string` per post and render a small "Series" badge next to titles that belong to one (linking to `/series/[slug]`). This is optional; can be dropped.

### 5.5 dev.to sync (`scripts/sync-devto.mjs`)

- Load `src/content/series/*.mdx` (gray-matter, mirroring `loadPosts`) to build a `slug → title` map.
- Add `series: <title>` to the article payload when `post.data.series` is set. Use the series **title** (dev.to's display name), not the slug.
- If the slug has no matching series file, omit `series` and warn.
- All other behavior (canonical_url lookup, idempotent update/create, `--write` write-back) is unchanged.

### 5.6 RSS (`src/pages/rss.xml.ts`)

Append the series title as an additional `category` entry, e.g. `series: <title>`, alongside the existing tags.

### 5.7 Error handling

- `superRefine` rejects `series`/`seriesPart` mismatches at build time.
- Missing series reference → render-time skip + dev warning (never a build failure).
- Duplicate `seriesPart` within a series → dev warning; both still list, order tie-broken by publish date.

---

## 6. Testing & verification

- Extend `scripts/lib/*.test.mjs` for series-map resolution and the `series` field in the article payload.
- `astro build` passes; `/series` and `/series/[slug]` render; drafts still 404.
- Manual: `sync-devto.mjs --dry-run` shows `series` populated; `rss.xml` contains the `series:` category.

---

## 7. Out of scope (explicit)

- Two-way series sync from dev.to.
- dev.to series ordering control (automatic by publish date).
- Navbar changes / series in the floating dock.
- Cross-collection referential integrity in the content schema.

---

## 8. Open questions

None blocking. Minor: exact RSS category prefix (`series: <title>` vs. bare title). Default: `series: <title>`.
