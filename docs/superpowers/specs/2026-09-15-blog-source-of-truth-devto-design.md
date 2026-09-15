# Blog Source of Truth + dev.to Syndication

**Date:** 2026-09-15
**Status:** Draft — awaiting review
**Scope:** Make the local Astro blog the single source of truth for posts, add a real draft workflow, and syndicate published posts to dev.to automatically on merge to `main`.

---

## 1. Goals

1. The local MDX files in `src/content/blog/` are the **source of truth** for every post.
2. A working **draft workflow**: a draft is truly private, not just unlisted.
3. Posts can be **opted in** to dev.to syndication; existing posts are never touched.
4. **Images live in this repo** (no remote Unsplash dependencies).
5. Published, opted-in posts are pushed to dev.to automatically on merge to `main`, with `canonical_url` pointing back to this site so SEO credit stays here.

## 2. Non-goals

- No two-way sync (dev.to edits are never pulled back into the repo).
- No image optimization pipeline (no `astro:assets` / `sharp`) — images are static files under `public/`.
- No RSS feed, no other platforms (Medium/Hashnode), no scheduling.
- Auto-**unpublishing** on dev.to is out of scope: flipping a post back to draft locally does not remove it from dev.to (manual).

---

## 3. Current state (as of this spec)

- **Framework:** Astro 6 (`output: 'server'`, Vercel adapter), MDX via `@astrojs/mdx`, React islands for interactive UI.
- **Content:** MDX files in `src/content/blog/`, loaded via glob loader, validated by a Zod schema in `src/content.config.ts:5-16`.
- **Drafts are broken-ish:** frontmatter `published` exists and hides posts from the index (`src/pages/blog/index.astro:9`), but `getStaticPaths()` in `src/pages/blog/[slug].astro:10-29` renders a public page for **every** post regardless of `published`. A draft is therefore unlisted but publicly reachable by URL.
- **Images:** frontmatter `image` is a remote Unsplash URL used only for OG/JSON-LD. Inline images use a `<MediaContainer>` MDX component with remote URLs (`src/components/mdx/media-container.tsx`). No local image pipeline.
- **Existing content:** 7 example posts, all `published: false`, all using remote Unsplash images.
- **Site URL:** `https://souvik.de` (`src/data/config.ts:6`), also referenced as `DATA.url` in `src/data/resume.ts`.

---

## 4. Design decisions (confirmed with user)

| Decision | Choice |
| --- | --- |
| Cross-post trigger | GitHub Actions on merge to `main` |
| Draft model | Single collection + `published` flag (fix the route leak) |
| dev.to publish state | Auto-publish when `published: true` (mirror site state) |
| Opt-in for dev.to | New `devto: true` frontmatter flag (default `false`) |
| Images | Stored locally under `public/blog/`; absolute URLs generated for dev.to |
| Sync tooling | In-repo Node script + GitHub Actions (no third-party CLI) |

---

## 5. Architecture

```
src/content/blog/*.mdx  ──(Astro content collection)──▶  site (souvik.de)
         │
         │  devto: true && published: true
         ▼
scripts/sync-devto.mjs  ──(dev.to REST API)──▶  dev.to articles
         │
         ▼
.github/workflows/devto-sync.yml (on push to main)
```

### 5.1 Frontmatter schema changes (`src/content.config.ts`)

Add to the existing `blog` schema:

```ts
tags: z.string().array().default([]),   // used for dev.to tags (max 4)
devto: z.boolean().default(false),      // opt-in to dev.to syndication
devtoId: z.string().optional(),         // dev.to article id, cached after first sync
```

Existing fields (`title`, `publishedAt`, `updatedAt`, `author`, `summary`, `image`, `published`) are unchanged.

### 5.2 Fix the draft leak (`src/pages/blog/[slug].astro`)

`getStaticPaths()` must generate routes **only** for `published` posts, so a draft is unreachable (404). Currently it maps all posts. Change:

- `getStaticPaths` → return paths for `published` posts only.
- Prev/next navigation already computes against `publishedPosts`; that logic stays.

The index (`src/pages/blog/index.astro`) already filters by `data.published` — no change needed there.

### 5.3 Sync script (`scripts/sync-devto.mjs`)

A standalone Node script (ESM) using only `fetch`. No permanent runtime deps on the server bundle — dev-only dependencies are added under `devDependencies`.

**Dependencies to add (devDependencies):**
- `gray-matter` — parse frontmatter.
- `unified`, `remark-parse`, `remark-stringify`, `remark-mdx`, `remark-gfm`, `unist-util-visit` — MDX → markdown transform.

**Algorithm:**

1. Read all `src/content/blog/*.mdx`.
2. Parse frontmatter with `gray-matter`; skip any post where `devto !== true || published !== true`.
3. Convert MDX body → markdown (Section 5.4).
4. Fetch my existing dev.to articles: `GET https://dev.to/api/articles/me?per_page=1000` (paginate if needed), index by `canonical_url`.
5. For each post:
   - `canonical_url = https://souvik.de/blog/<slug>`
   - `cover_image = absolute(image)` if `image` present, else omit
   - `tags = tags.slice(0, 4)`
   - `description = summary`
   - If `canonical_url` exists in the index (or `devtoId` is set and valid) → `PUT /api/articles/{id}` (update).
   - Else → `POST /api/articles` (create). Store the returned `id` in the post's frontmatter `devtoId` (write-back).
6. Print a summary (created / updated / skipped / errors). Exit non-zero if any API call failed.

**Idempotency:** correctness relies on the `canonical_url` lookup, not on `devtoId` being persisted. `devtoId` is only a cache; if it is stale or absent, the lookup still finds the article and updates instead of duplicating.

**Auth:** `DEVTO_API_KEY` env var (HTTP header `api-key`). If unset, the script prints a clear message and exits `0` (safe for local runs) unless `--require-key` is passed.

**Flags:** `--dry-run` prints payloads without network calls; `--write` persists `devtoId` back into the post's frontmatter (off by default for local runs; CI passes `--write` and commits the result — see 5.6).

### 5.4 MDX → markdown transform

dev.to accepts only plain markdown. The transform must handle the custom MDX elements currently in use:

| Source | Output |
| --- | --- |
| `<MediaContainer src="X" alt="Y" />` | `![Y](X)` |
| `<mark>text</mark>` | `text` |
| fenced code blocks / GFM / `~~strike~~` | unchanged |
| any other unknown MDX/JSX node | stripped, children preserved (warn) |

Implementation: a remark plugin over `remark-mdx` that visits `mdxJsxFlowElement` / `mdxJsxTextElement` nodes, converts the known components, and drops unknown JSX with a console warning. Image `src` values are rewritten to absolute URLs (Section 5.5) during the same pass.

### 5.5 Image handling & URL rewriting

- **Convention:** blog images live under `public/blog/<slug>/…` (e.g. `public/blog/my-post/cover.png`, `public/blog/my-post/diagram.png`).
- **In the repo / on the site:** reference them by absolute path (`/blog/my-post/cover.png`) so they render locally and in production.
- **For dev.to:** dev.to fetches images from public URLs, so the script rewrites any leading `/` or `./` path to `https://souvik.de/...`. Already-absolute `https://` URLs are left as-is.
- **Cover image:** frontmatter `image` follows the same convention (local path), and `cover_image` sent to dev.to is the rewritten absolute URL. If `image` is absent, no cover is sent.
- **Migration of existing posts:** the 7 example posts (all `published: false`) are not synced and are left untouched. New posts use the local-image convention. (Optionally, example posts can be migrated later; out of scope.)

### 5.6 GitHub Actions (`.github/workflows/devto-sync.yml`)

```yaml
on:
  push:
    branches: [main]
    paths:
      - "src/content/blog/**"
      - "public/blog/**"
      - "scripts/sync-devto.mjs"
```

- Checkout → `npm ci` → `node scripts/sync-devto.mjs --write` (write-back so `devtoId` lands in the repo on subsequent commits).
- `env: DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}`.
- A separate job commits any `devtoId` write-back back to the repo (via a git auto-commit step using the workflow token) so the cache stays fresh. If this proves flaky, fall back to `--dry-run` + `canonical_url` lookup only (still correct, just does a lookup every run).

### 5.7 Error handling

- Non-2xx from dev.to → log status + body, continue with remaining posts, exit `1` at the end so the Action reports failure.
- Missing/invalid `DEVTO_API_KEY` when required → exit `1` with a clear message.
- Malformed frontmatter → skip that file with a warning (don't abort the whole run).

---

## 6. Testing & verification

- `--dry-run` against a copy of a sample post to inspect the generated payload and MDX→markdown output.
- Unit-test the MDX→markdown transform (table of cases from 5.4) and the URL-rewriting function.
- Manual end-to-end: create a post with `devto: true`, run the script locally with a real key, confirm a dev.to article appears with correct `canonical_url`, title, tags, and images; run again to confirm it **updates** rather than duplicates.
- `astro build` must pass and drafts must 404.

---

## 7. Out of scope (explicit)

- Two-way sync / pulling dev.to edits back.
- Auto-unpublish on dev.to.
- Image optimization (`astro:assets` / `sharp`).
- Other platforms (Hashnode, Medium), RSS, scheduled posts.
- Migrating the 7 existing example posts off Unsplash.

---

## 8. Open questions

None blocking. Minor: whether the CI write-back commit is worth it vs. relying purely on `canonical_url` lookup (Section 5.6 fallback). Default: implement write-back, keep lookup as the correctness source.
