# Blog Series Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add first-class "series" support to the blog — a `series` content collection, `/series` + `/series/[slug]` pages, in-post series navigation, and series metadata syndicated to dev.to (native `series`) and RSS (as a category).

**Architecture:** Series live in their own Astro content collection (`src/content/series/*.mdx`) with `title` + optional `description`. Blog posts opt in via `series` (slug) + `seriesPart` (number) frontmatter, validated to travel together. A shared helper (`src/lib/series.ts`) orders parts and computes prev/next; pages render from it. The dev.to sync script resolves the series slug to its title and adds it to the article payload; RSS appends the title as a `series: <title>` category.

**Tech Stack:** Astro 6 (content collections, prerendered `.astro` pages), TypeScript, Zod (astro/zod), React 19 islands, `gray-matter` + `node:test` for the sync scripts, `@astrojs/rss`.

**Spec:** `docs/superpowers/specs/2026-10-03-blog-series-design.md`

## Global Constraints

- Node >= 22.12.0; package manager `npm` (never `yarn`/`pnpm`).
- All portfolio/blog content lives in `src/content/` / `src/data/` — no hardcoded content in components.
- Tailwind v4 only (no `@tailwind` directives); use theme utilities (`bg-background`, `text-muted-foreground`, `border-border`, etc.) — never raw hex/OKLCH in `className`.
- No comments in code unless genuinely clarifying; follow existing file style.
- Verify with `npm run lint` (runs `astro check`), `npm test` (runs `node --test "scripts/lib/*.test.mjs"`), and `npm run build`.
- Series order is driven by the post's `seriesPart` number (ascending); ties broken by `publishedAt` descending.
- dev.to receives the series **title** (not slug); RSS category format is `series: <title>`.

---

### Task 1: Schema + templates

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/series/_template.mdx`
- Modify: `src/content/blog/_template.mdx`

**Interfaces:**
- Produces: `collections.blog` gains `series?: string` and `seriesPart?: number`; `collections.series` exists with `{ title: string; description?: string }`. Both become available via `getCollection("blog")` / `getCollection("series")` and `CollectionEntry<"blog" | "series">`.

- [ ] **Step 1: Add the `series` collection and blog fields**

Replace the entire contents of `src/content.config.ts` with:

```ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string(),
      publishedAt: z.string(),
      updatedAt: z.string().optional(),
      author: z.string().optional(),
      summary: z.string(),
      image: z.string().optional(),
      published: z.boolean().default(true),
      tags: z.string().array().default([]),
      devto: z.boolean().default(false),
      devtoId: z.string().optional(),
      series: z.string().optional(),
      seriesPart: z.number().int().positive().optional(),
    })
    .superRefine((val, ctx) => {
      if ((val.series === undefined) !== (val.seriesPart === undefined)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "`series` and `seriesPart` must be set together.",
        });
      }
    }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, series };
```

- [ ] **Step 2: Create the series template**

Create `src/content/series/_template.mdx`:

```mdx
---
title: "My Series Title"
description: "A one-line description shown on the series index and page."
---

Series files only need frontmatter. The posts themselves link into this series
with `series: <slug>` and `seriesPart: <n>`, where `<slug>` is this file's name
(e.g. `my-series-title`).
```

- [ ] **Step 3: Document the new fields in the blog template**

In `src/content/blog/_template.mdx`, add these two lines to the "Optional" frontmatter block (after the `devtoId` line, line 14):

```
series: ""                           # slug of the series file (omit if standalone)
seriesPart: 1                        # position within the series (set together with `series`)
```

- [ ] **Step 4: Type-check**

Run: `npm run lint`
Expected: exits 0, no TS/Zod errors.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/series/_template.mdx src/content/blog/_template.mdx
git commit -m "feat: add series content collection and blog frontmatter fields"
```

---

### Task 2: Shared series helpers

**Files:**
- Create: `src/lib/series.ts`

**Interfaces:**
- Produces:
  - `orderPostsByPart<T extends { data: { seriesPart?: number; publishedAt: string } }>(posts: T[]): T[]`
  - `getAdjacentParts<T extends { id: string }>(ordered: T[], currentId: string): { previous: T | null; next: T | null }`
- Consumes: nothing (pure functions). Used by Task 3, Task 4, and Task 5.

- [ ] **Step 1: Write the helpers**

Create `src/lib/series.ts`:

```ts
export function orderPostsByPart<
  T extends { data: { seriesPart?: number; publishedAt: string } },
>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const pa = a.data.seriesPart ?? Number.MAX_SAFE_INTEGER;
    const pb = b.data.seriesPart ?? Number.MAX_SAFE_INTEGER;
    if (pa !== pb) return pa - pb;
    return (
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
    );
  });
}

export function getAdjacentParts<T extends { id: string }>(
  ordered: T[],
  currentId: string,
): { previous: T | null; next: T | null } {
  const index = ordered.findIndex((p) => p.id === currentId);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
```

- [ ] **Step 2: Type-check**

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/lib/series.ts
git commit -m "feat: add series ordering and adjacency helpers"
```

---

### Task 3: Series pages (`/series` and `/series/[slug]`)

**Files:**
- Create: `src/pages/series/index.astro`
- Create: `src/pages/series/[slug].astro`

**Interfaces:**
- Consumes: `orderPostsByPart` (Task 2); `getCollection("blog")` / `getCollection("series")` (Task 1); `formatDate` from `@/lib/utils`.
- Produces: routes `/series` and `/series/<seriesId>` (prerendered).

- [ ] **Step 1: Write the aggregate series index**

Create `src/pages/series/index.astro`:

```astro
---
export const prerender = true;
import Layout from "@/layouts/Layout.astro";
import { getCollection } from "astro:content";
import { orderPostsByPart } from "@/lib/series";

const isDev = import.meta.env.DEV;
const seriesEntries = await getCollection("series");
const posts = await getCollection("blog", ({ data }) => isDev || data.published);

const seriesList = seriesEntries
  .map((series) => {
    const parts = orderPostsByPart(
      posts.filter(
        (p) =>
          p.data.series === series.id && p.data.seriesPart !== undefined,
      ),
    );
    return {
      slug: series.id,
      title: series.data.title,
      description: series.data.description,
      partCount: parts.length,
      latestPublishedAt: parts[0]?.data.publishedAt ?? null,
    };
  })
  .sort((a, b) => {
    if (a.latestPublishedAt && b.latestPublishedAt) {
      return (
        new Date(b.latestPublishedAt).getTime() -
        new Date(a.latestPublishedAt).getTime()
      );
    }
    if (a.latestPublishedAt) return -1;
    if (b.latestPublishedAt) return 1;
    return a.title.localeCompare(b.title);
  });
---

<Layout
  title="Series"
  description="Series of related blog posts, in order."
>
  <section id="series">
    <h1 class="text-2xl font-semibold tracking-tight mb-4">
      Series
      <span class="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
        {seriesList.length} series
      </span>
    </h1>
    <p class="text-sm text-muted-foreground mb-8">
      Multi-part posts grouped and ordered.
    </p>

    {seriesList.length > 0 ? (
      <div class="flex flex-col gap-4">
        {seriesList.map((series) => (
          <a
            href={`/series/${series.slug}`}
            class="block p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            <div class="flex items-baseline gap-2">
              <h2 class="text-lg font-medium tracking-tight">{series.title}</h2>
              <span class="text-xs text-muted-foreground">
                {series.partCount} part{series.partCount === 1 ? "" : "s"}
              </span>
            </div>
            {series.description && (
              <p class="text-sm text-muted-foreground mt-1">
                {series.description}
              </p>
            )}
          </a>
        ))}
      </div>
    ) : (
      <div class="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
        <p class="text-muted-foreground text-center">
          No series yet. Check back soon!
        </p>
      </div>
    )}
  </section>
</Layout>
```

- [ ] **Step 2: Write the per-series page**

Create `src/pages/series/[slug].astro`:

```astro
---
export const prerender = true;
import Layout from "@/layouts/Layout.astro";
import { getCollection } from "astro:content";
import { formatDate } from "@/lib/utils";
import { orderPostsByPart } from "@/lib/series";

const isDev = import.meta.env.DEV;

export async function getStaticPaths() {
  const seriesEntries = await getCollection("series");
  const posts = await getCollection("blog", ({ data }) => isDev || data.published);
  return seriesEntries.map((series) => {
    const parts = orderPostsByPart(
      posts.filter(
        (p) =>
          p.data.series === series.id && p.data.seriesPart !== undefined,
      ),
    );
    return { params: { slug: series.id }, props: { series, parts } };
  });
}

const { series, parts } = Astro.props;
const { title, description } = series.data;
---

<Layout title={title} description={description ?? `${title} series`}>
  <section id="series">
    <a
      href="/series"
      class="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6"
    >
      &larr; All series
    </a>
    <div class="flex flex-col gap-4 mb-8">
      <h1 class="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
        {title}
      </h1>
      {description && (
        <p class="text-sm text-muted-foreground">{description}</p>
      )}
    </div>

    {parts.length > 0 ? (
      <ol class="flex flex-col gap-3">
        {parts.map((part, i) => (
          <li>
            <a
              href={`/blog/${part.id}`}
              class="flex items-start gap-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span class="text-xs font-mono tabular-nums font-medium mt-[5px]">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <div class="flex flex-col gap-y-2 flex-1">
                <p class="tracking-tight text-lg font-medium">
                  <span class="group-hover:text-foreground transition-colors">
                    {part.data.title}
                  </span>
                </p>
                <p class="text-xs text-muted-foreground">
                  {formatDate(part.data.publishedAt)}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    ) : (
      <div class="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
        <p class="text-muted-foreground text-center">
          No published posts in this series yet.
        </p>
      </div>
    )}
  </section>
</Layout>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds; `/series/index.html` and `/series/<slug>/index.html` pages are emitted (or an empty build if no series files exist yet — the collection still compiles).

- [ ] **Step 4: Commit**

```bash
git add src/pages/series/index.astro src/pages/series/[slug].astro
git commit -m "feat: add series index and per-series pages"
```

---

### Task 4: In-post series navigation

**Files:**
- Create: `src/components/SeriesNav.astro`
- Modify: `src/pages/blog/[slug].astro`

**Interfaces:**
- Consumes: `orderPostsByPart`, `getAdjacentParts` (Task 2); `getCollection("series")` (Task 1).
- Produces: `SeriesNav.astro` component with props `{ seriesTitle: string; seriesSlug: string; parts: CollectionEntry<"blog">[]; currentId: string; previous: CollectionEntry<"blog"> | null; next: CollectionEntry<"blog"> | null }`.

- [ ] **Step 1: Write the `SeriesNav` component**

Create `src/components/SeriesNav.astro`:

```astro
---
import type { CollectionEntry } from "astro:content";

interface Props {
  seriesTitle: string;
  seriesSlug: string;
  parts: CollectionEntry<"blog">[];
  currentId: string;
  previous: CollectionEntry<"blog"> | null;
  next: CollectionEntry<"blog"> | null;
}

const { seriesTitle, seriesSlug, parts, currentId, previous, next } =
  Astro.props;
---

<div class="mt-12 pt-8 border-t border-border max-w-2xl">
  <div class="flex items-baseline gap-2 mb-4">
    <span class="text-xs uppercase tracking-wider text-muted-foreground">Series</span>
    <a
      href={`/series/${seriesSlug}`}
      class="text-sm font-medium hover:text-foreground transition-colors"
    >
      {seriesTitle}
    </a>
  </div>
  <ol class="flex flex-col gap-1 mb-6">
    {parts.map((part, i) => (
      <li>
        {part.id === currentId ? (
          <span class="flex items-center gap-2 text-sm text-foreground">
            <span class="text-xs font-mono tabular-nums text-muted-foreground">
              {i + 1}.
            </span>
            {part.data.title}
            <span class="text-xs text-muted-foreground">(this post)</span>
          </span>
        ) : (
          <a
            href={`/blog/${part.id}`}
            class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span class="text-xs font-mono tabular-nums">{i + 1}.</span>
            {part.data.title}
          </a>
        )}
      </li>
    ))}
  </ol>
  <div class="flex flex-col sm:flex-row justify-between gap-4">
    {previous ? (
      <a
        href={`/blog/${previous.id}`}
        class="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
      >
        <span class="flex items-center gap-1 text-xs text-muted-foreground">
          &larr; Previous
        </span>
        <span class="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
          {previous.data.title}
        </span>
      </a>
    ) : (
      <div class="hidden sm:block flex-1" />
    )}
    {next ? (
      <a
        href={`/blog/${next.id}`}
        class="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
      >
        <span class="flex items-center justify-end gap-1 text-xs text-muted-foreground">
          Next &rarr;
        </span>
        <span class="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
          {next.data.title}
        </span>
      </a>
    ) : (
      <div class="hidden sm:block flex-1" />
    )}
  </div>
</div>
```

- [ ] **Step 2: Wire series context into `getStaticPaths`**

In `src/pages/blog/[slug].astro`, add imports near the top (after line 8):

```astro
import { orderPostsByPart, getAdjacentParts } from "@/lib/series";
import SeriesNav from "@/components/SeriesNav.astro";
```

Replace the existing `getStaticPaths` (lines 10-32) with:

```astro
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const seriesEntries = await getCollection("series");
  const seriesBySlug = new Map(seriesEntries.map((s) => [s.id, s]));
  const sortedPosts = [...posts].sort((a, b) => {
    if (new Date(a.data.publishedAt) > new Date(b.data.publishedAt)) return -1;
    return 1;
  });
  const isDev = import.meta.env.DEV;
  const publishedPosts = sortedPosts.filter(
    (post) => isDev || post.data.published,
  );

  return publishedPosts.map((post) => {
    const index = publishedPosts.findIndex((p) => p.id === post.id);

    let postSeries = null;
    let seriesParts = [];
    let seriesPrev = null;
    let seriesNext = null;
    if (post.data.series) {
      const seriesEntry = seriesBySlug.get(post.data.series);
      if (seriesEntry) {
        postSeries = seriesEntry;
        seriesParts = orderPostsByPart(
          publishedPosts.filter(
            (p) =>
              p.data.series === post.data.series &&
              p.data.seriesPart !== undefined,
          ),
        );
        const { previous, next } = getAdjacentParts(seriesParts, post.id);
        seriesPrev = previous;
        seriesNext = next;
      } else {
        console.warn(
          `[series] blog post "${post.id}" references unknown series "${post.data.series}"`,
        );
      }
    }

    return {
      params: { slug: post.id },
      props: {
        post,
        previousPost: index > 0 ? publishedPosts[index - 1] : null,
        nextPost:
          index >= 0 && index < publishedPosts.length - 1
            ? publishedPosts[index + 1]
            : null,
        postSeries,
        seriesParts,
        seriesPrev,
        seriesNext,
      },
    };
  });
}
```

- [ ] **Step 3: Destructure the new props**

Replace line 34 in `src/pages/blog/[slug].astro`:

```astro
const { post, previousPost, nextPost } = Astro.props;
```

with:

```astro
const {
  post,
  previousPost,
  nextPost,
  postSeries,
  seriesParts,
  seriesPrev,
  seriesNext,
} = Astro.props;
```

- [ ] **Step 4: Render series nav instead of date nav**

Replace the existing `<nav>` block (lines 124-164) with:

```astro
{
  postSeries ? (
    <SeriesNav
      seriesTitle={postSeries.data.title}
      seriesSlug={postSeries.id}
      parts={seriesParts}
      currentId={post.id}
      previous={seriesPrev}
      next={seriesNext}
    />
  ) : (
    <nav class="mt-12 pt-8 max-w-2xl">
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        {
          previousPost ? (
            <a
              href={`/blog/${previousPost.id}`}
              class="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span class="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {previousPost.data.title}
              </span>
            </a>
          ) : (
            <div class="hidden sm:block flex-1" />
          )
        }

        {
          nextPost ? (
            <a
              href={`/blog/${nextPost.id}`}
              class="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span class="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span class="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {nextPost.data.title}
              </span>
            </a>
          ) : (
            <div class="hidden sm:block flex-1" />
          )
        }
      </div>
    </nav>
  )
}
```

- [ ] **Step 5: Build + type-check**

Run: `npm run lint && npm run build`
Expected: both exit 0. Note: with no series files in the repo, every post still renders the date-based nav (unchanged); this is expected until content is added.

- [ ] **Step 6: Commit**

```bash
git add src/components/SeriesNav.astro src/pages/blog/[slug].astro
git commit -m "feat: render in-post series navigation"
```

---

### Task 5: Series badge on the blog list

**Files:**
- Modify: `src/components/BlogList.tsx`
- Modify: `src/pages/blog/index.astro`

**Interfaces:**
- Consumes: `Post` interface (extended with `series?: string`).
- Produces: a "Series" badge linking to `/series/<slug>` next to posts that belong to a series.

- [ ] **Step 1: Add `series` to the `Post` interface**

In `src/components/BlogList.tsx`, change the `Post` interface (lines 6-11):

```tsx
interface Post {
  id: string;
  title: string;
  publishedAt: string;
  published: boolean;
  series?: string;
}
```

- [ ] **Step 2: Render the badge**

In `src/components/BlogList.tsx`, inside the title `<span>` (after the `{post.title}` text and before the `Draft` badge, around lines 60-65), add:

```tsx
{post.series && (
  <a
    href={`/series/${post.series}`}
    onClick={(e) => e.stopPropagation()}
    class="ml-2 text-xs font-normal align-middle border border-border rounded-md px-1.5 py-0.5 bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
  >
    Series
  </a>
)}
```

- [ ] **Step 3: Pass `series` from the blog index**

In `src/pages/blog/index.astro`, extend the `posts` map (lines 27-32) to include `series`:

```astro
const posts = paginatedPosts.map((post) => ({
  id: post.id,
  title: post.data.title,
  publishedAt: post.data.publishedAt,
  published: post.data.published,
  series: post.data.series,
}));
```

- [ ] **Step 4: Build + type-check**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/BlogList.tsx src/pages/blog/index.astro
git commit -m "feat: show series badge on blog list"
```

---

### Task 6: dev.to sync — series field

**Files:**
- Create: `scripts/lib/series.mjs`
- Create: `scripts/lib/series.test.mjs`
- Modify: `scripts/sync-devto.mjs`

**Interfaces:**
- Consumes: `post.data.series` (string slug) loaded by `loadPosts` in `scripts/lib/posts.mjs`.
- Produces:
  - `loadSeries(dir): Promise<{ slug: string; filePath: string; data: any }[]>`
  - `resolveSeriesTitle(seriesList, slug): string | null`

- [ ] **Step 1: Write the failing tests**

Create `scripts/lib/series.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadSeries, resolveSeriesTitle } from "./series.mjs";

test("loadSeries reads series title and slug", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "series-"));
  await writeFile(
    path.join(dir, "my-series.mdx"),
    '---\ntitle: "My Series"\ndescription: "A description"\n---\n',
  );
  const series = await loadSeries(dir);
  assert.equal(series.length, 1);
  assert.equal(series[0].slug, "my-series");
  assert.equal(series[0].data.title, "My Series");
  assert.equal(series[0].data.description, "A description");
  await rm(dir, { recursive: true, force: true });
});

test("resolveSeriesTitle returns title for a known slug", () => {
  const seriesList = [{ slug: "my-series", filePath: "x", data: { title: "My Series" } }];
  assert.equal(resolveSeriesTitle(seriesList, "my-series"), "My Series");
});

test("resolveSeriesTitle returns null for an unknown slug", () => {
  const seriesList = [{ slug: "my-series", filePath: "x", data: { title: "My Series" } }];
  assert.equal(resolveSeriesTitle(seriesList, "nope"), null);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './series.mjs'`.

- [ ] **Step 3: Implement the module**

Create `scripts/lib/series.mjs`:

```js
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export async function loadSeries(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);
  const series = [];
  for (const name of files) {
    const filePath = path.join(dir, name);
    const raw = await readFile(filePath, "utf8");
    const { data } = matter(raw);
    const slug = name.replace(/\.mdx$/, "");
    series.push({ slug, filePath, data });
  }
  return series;
}

export function resolveSeriesTitle(seriesList, slug) {
  const found = seriesList.find((s) => s.slug === slug);
  return found?.data.title ?? null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all three tests).

- [ ] **Step 5: Wire into the sync script**

In `scripts/sync-devto.mjs`:
- Add imports after line 11:

```js
import { loadSeries, resolveSeriesTitle } from "./lib/series.mjs";
```

- After the `BLOG_DIR` const (line 15), add:

```js
const SERIES_DIR = path.resolve(__dirname, "../src/content/series");
```

- In `main()`, after `const posts = ...` (line 34) add:

```js
const seriesList = await loadSeries(SERIES_DIR);
```

- Inside the `for (const post of posts)` loop, after `const bodyMarkdown = ...` (line 64) and before the `article` object (line 68), compute the series title:

```js
const seriesTitle = post.data.series
  ? resolveSeriesTitle(seriesList, post.data.series)
  : null;
if (post.data.series && !seriesTitle) {
  console.warn(
    `sync-devto: post ${post.slug} references unknown series "${post.data.series}"`,
  );
}
```

- Add `series` to the article payload. Change the `article` object literal (lines 68-75) to include `...(seriesTitle ? { series: seriesTitle } : {})`:

```js
const article = {
  title: post.data.title,
  published: true,
  body_markdown: bodyMarkdown,
  tags: toDevtoTags(post.data.tags),
  canonical_url: url,
  description: post.data.summary,
  ...(seriesTitle ? { series: seriesTitle } : {}),
};
```

- [ ] **Step 6: Run tests + dry-run sanity check**

Run: `npm test`
Expected: PASS.

Run: `node scripts/sync-devto.mjs --dry-run`
Expected: dry-run output; if a post has `series`, its JSON payload includes `"series": "<title>"`.

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/series.mjs scripts/lib/series.test.mjs scripts/sync-devto.mjs
git commit -m "feat: syndicate series to dev.to"
```

---

### Task 7: RSS series category

**Files:**
- Modify: `src/pages/rss.xml.ts`

**Interfaces:**
- Consumes: `getCollection("series")` (Task 1); `post.data.series` / `post.data.tags`.
- Produces: `categories` on each RSS item includes `series: <title>` when the post belongs to a series.

- [ ] **Step 1: Build the slug→title map and update categories**

In `src/pages/rss.xml.ts`, after the `sorted` const (line 15), add:

```ts
const seriesEntries = await getCollection("series");
const seriesTitleBySlug = new Map(
  seriesEntries.map((s) => [s.id, s.data.title]),
);
```

Then in the items map, compute the series category. Replace the `return { ... }` block (lines 30-38) with:

```ts
const seriesTitle = post.data.series
  ? seriesTitleBySlug.get(post.data.series)
  : undefined;
return {
  title: post.data.title,
  description: post.data.summary,
  pubDate: new Date(post.data.publishedAt),
  link: `/blog/${post.id}`,
  content: `${html}<p><a href="${url}">Read the full article on ${hostname} →</a></p>`,
  categories: [
    ...post.data.tags,
    ...(seriesTitle ? [`series: ${seriesTitle}`] : []),
  ],
  author: DATA.contact.email,
};
```

- [ ] **Step 2: Build + type-check**

Run: `npm run lint && npm run build`
Expected: both exit 0. Inspect `dist/rss.xml` (or `node_modules` build output) for a `series:` category when a post has a series.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat: include series as an RSS category"
```

---

### Task 8: End-to-end verification

**Files:**
- (temporary, reverted before final commit) `src/content/series/_scratch-series.mdx` + frontmatter edits on two draft posts.

- [ ] **Step 1: Full static checks**

Run: `npm run lint && npm test && npm run build`
Expected: all exit 0.

- [ ] **Step 2: Manual smoke test with a scratch series**

1. Create `src/content/series/demo-series.mdx`:
   ```mdx
   ---
   title: "Demo Series"
   description: "Temporary verification series."
   ---
   ```
2. Pick two existing `published: true` posts and temporarily add `series: "demo-series"` and `seriesPart: 1` / `seriesPart: 2` to their frontmatter.
3. Run `npm run dev` and verify:
   - `/series` lists "Demo Series" with part count 2.
   - `/series/demo-series` lists both parts in order.
   - Each post shows the series box (current highlighted, prev/next within series) and no date-based prev/next.
   - `http://localhost:4321/rss.xml` shows `series: Demo Series` as a category.
   - `node scripts/sync-devto.mjs --dry-run` shows `"series": "Demo Series"` in the payload.
4. Revert the temporary changes (`git checkout -- src/content/series/demo-series.mdx src/content/blog/*.mdx`), removing the scratch file and frontmatter edits.

- [ ] **Step 3: Commit any remaining cleanups (if any)**

If no cleanup is needed, skip. Otherwise:

```bash
git add -A
git commit -m "chore: verification cleanups"
```

---

## Self-Review

- **Spec coverage:** 5.1 schema (Task 1), 5.2 pages (Task 3), 5.3 post nav (Task 4), 5.4 blog list badge (Task 5), 5.5 dev.to (Task 6), 5.6 RSS (Task 7), 5.7 error handling (superRefine in Task 1; unknown-series warnings in Task 4/6), 6 testing (Tasks 6 + 8). Covered.
- **Placeholder scan:** no TBD/TODO; every code step has full code.
- **Type consistency:** `orderPostsByPart` / `getAdjacentParts` signatures match their use in Tasks 3-4; `loadSeries` / `resolveSeriesTitle` match Task 6 usage; `SeriesNav` props match Task 4 usage; `Post.series` matches Task 5 usage.
