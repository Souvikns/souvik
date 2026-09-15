# Blog Source of Truth + dev.to Syndication — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make local MDX the source of truth for blog posts, add a true draft workflow, and auto-syndicate opted-in published posts to dev.to on merge to `main`.

**Architecture:** A standalone Node script (`scripts/sync-devto.mjs`) reads MDX posts from `src/content/blog/`, converts MDX to markdown, rewrites local image paths to absolute URLs, and pushes them to the dev.to REST API (create or update, keyed by `canonical_url`). A GitHub Actions workflow runs it on push to `main`. The existing Astro site gets a frontmatter schema extension and a fix so drafts no longer render public pages.

**Tech Stack:** Node 22 (built-in `node:test`, `fetch`), gray-matter, unified + remark (parse/stringify/mdx/gfm), Astro 6, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-15-blog-source-of-truth-devto-design.md`

## Global Constraints

- Site URL is `https://souvik.de` (must match `site.url` in `src/data/config.ts`).
- dev.to API base is `https://dev.to/api`; auth via `api-key` HTTP header (`DEVTO_API_KEY` env var).
- dev.to tags max **4**; cover image must be a public **absolute** URL.
- Only posts with `devto: true` AND `published: true` are synced. Existing posts (all `published: false`, no `devto`) are never touched.
- Images live under `public/blog/<slug>/…`, referenced as `/blog/<slug>/…` paths.
- No new runtime dependencies on the Astro server bundle — all new deps are `devDependencies`.
- No auto-unpublish, no two-way sync, no image optimization.

---

### Task 1: URL helper module

**Files:**
- Create: `scripts/lib/urls.mjs`
- Test: `scripts/lib/urls.test.mjs`

**Interfaces:**
- Produces: `SITE_URL` (string), `toAbsoluteUrl(url, baseUrl = SITE_URL, slug = "")` → string|undefined, `canonicalUrl(slug, baseUrl = SITE_URL)` → string.

- [ ] **Step 1: Write the failing test**

Create `scripts/lib/urls.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { toAbsoluteUrl, canonicalUrl } from "./urls.mjs";

test("toAbsoluteUrl leaves absolute https URLs unchanged", () => {
  assert.equal(
    toAbsoluteUrl("https://example.com/a.png"),
    "https://example.com/a.png",
  );
});

test("toAbsoluteUrl prepends base to root-relative paths", () => {
  assert.equal(
    toAbsoluteUrl("/blog/my-post/cover.png"),
    "https://souvik.de/blog/my-post/cover.png",
  );
});

test("toAbsoluteUrl resolves relative paths against the slug", () => {
  assert.equal(
    toAbsoluteUrl("./cover.png", "https://souvik.de", "my-post"),
    "https://souvik.de/blog/my-post/cover.png",
  );
});

test("toAbsoluteUrl passes falsy input through", () => {
  assert.equal(toAbsoluteUrl(""), "");
  assert.equal(toAbsoluteUrl(undefined), undefined);
});

test("canonicalUrl builds the post URL", () => {
  assert.equal(canonicalUrl("my-post"), "https://souvik.de/blog/my-post");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/lib/urls.test.mjs`
Expected: FAIL — `Cannot find module './urls.mjs'`

- [ ] **Step 3: Write the implementation**

Create `scripts/lib/urls.mjs`:

```js
// Keep SITE_URL in sync with `site.url` in src/data/config.ts.
export const SITE_URL = "https://souvik.de";

export function toAbsoluteUrl(url, baseUrl = SITE_URL, slug = "") {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  const clean = url.replace(/^\.\//, "");
  return `${baseUrl}/blog/${slug}/${clean}`;
}

export function canonicalUrl(slug, baseUrl = SITE_URL) {
  return `${baseUrl}/blog/${slug}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/lib/urls.test.mjs`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/urls.mjs scripts/lib/urls.test.mjs
git commit -m "feat: add URL helper module for dev.to sync"
```

---

### Task 2: MDX → markdown transform

**Files:**
- Create: `scripts/lib/transform.mjs`
- Test: `scripts/lib/transform.test.mjs`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Consumes: `toAbsoluteUrl` from `scripts/lib/urls.mjs`.
- Produces: `mdxToMarkdown(body, { baseUrl, slug })` → Promise<string>.

- [ ] **Step 1: Install dependencies**

Run: `npm install --save-dev unified remark-parse remark-stringify remark-mdx`

- [ ] **Step 2: Add the `test` script**

In `package.json`, add to `scripts` (after `"preview": "astro preview",`):

```json
"test": "node --test scripts/lib/",
```

- [ ] **Step 3: Write the failing test**

Create `scripts/lib/transform.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mdxToMarkdown } from "./transform.mjs";

const ctx = { baseUrl: "https://souvik.de", slug: "my-post" };

test("converts MediaContainer to a markdown image", async () => {
  const out = await mdxToMarkdown(
    '<MediaContainer src="/blog/my-post/d.png" alt="A diagram" />\n',
    ctx,
  );
  assert.match(out, /!\[A diagram\]\(https:\/\/souvik\.de\/blog\/my-post\/d\.png\)/);
});

test("unwraps mark tags", async () => {
  const out = await mdxToMarkdown("Some <mark>highlighted</mark> text.", ctx);
  assert.match(out, /Some highlighted text\./);
  assert.doesNotMatch(out, /<mark>/);
});

test("keeps fenced code blocks", async () => {
  const md = "```ts\nconst a = 1;\n```";
  const out = await mdxToMarkdown(md, ctx);
  assert.match(out, /```ts\nconst a = 1;\n```/);
});

test("keeps GFM strikethrough", async () => {
  const out = await mdxToMarkdown("~~strike~~", ctx);
  assert.match(out, /~~strike~~/);
});

test("drops unknown MDX components but keeps their children", async () => {
  const out = await mdxToMarkdown("<Widget>hi</Widget>", ctx);
  assert.match(out, /hi/);
  assert.doesNotMatch(out, /Widget/);
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `node --test scripts/lib/transform.test.mjs`
Expected: FAIL — `Cannot find module './transform.mjs'`

- [ ] **Step 5: Write the implementation**

Create `scripts/lib/transform.mjs`:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import { toAbsoluteUrl } from "./urls.mjs";

function getAttribute(node, name) {
  const attr = (node.attributes ?? []).find(
    (a) => a.type === "mdxJsxAttribute" && a.name === name,
  );
  if (!attr) return undefined;
  return typeof attr.value === "string" ? attr.value : undefined;
}

function remarkMdxToMarkdown({ baseUrl, slug }) {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== "object") return node;

      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        const name = node.name;
        if (name === "MediaContainer") {
          const src = getAttribute(node, "src") ?? "";
          const alt = getAttribute(node, "alt") ?? "";
          return {
            type: "image",
            url: toAbsoluteUrl(src, baseUrl, slug),
            alt,
            title: null,
          };
        }
        if (name === "mark") {
          return node.children ?? [];
        }
        console.warn(`sync-devto: dropping unknown MDX component <${name}>`);
        return node.children ?? [];
      }

      if (node.type === "html") {
        node.value = node.value.replace(/<\/?mark\s*>/g, "");
        return node;
      }

      if (Array.isArray(node.children)) {
        node.children = node.children.flatMap((child) => {
          const result = walk(child);
          return Array.isArray(result) ? result : [result];
        });
      }
      return node;
    };

    tree.children = tree.children.flatMap((child) => {
      const result = walk(child);
      return Array.isArray(result) ? result : [result];
    });
  };
}

export async function mdxToMarkdown(body, { baseUrl, slug } = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkMdxToMarkdown, { baseUrl, slug })
    .use(remarkStringify)
    .process(body);
  return String(file);
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `node --test scripts/lib/transform.test.mjs`
Expected: PASS (5 tests)

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/transform.mjs scripts/lib/transform.test.mjs package.json package-lock.json
git commit -m "feat: add MDX to markdown transform for dev.to sync"
```

---

### Task 3: Post loading + frontmatter write-back

**Files:**
- Create: `scripts/lib/posts.mjs`
- Test: `scripts/lib/posts.test.mjs`

**Interfaces:**
- Consumes: `gray-matter` (installed in this task).
- Produces: `loadPosts(dir)` → Promise<`Array<{ slug, filePath, data, content }>`>, `writeDevtoId(filePath, id)` → Promise<void>.

- [ ] **Step 1: Install dependency**

Run: `npm install --save-dev gray-matter`

- [ ] **Step 2: Write the failing test**

Create `scripts/lib/posts.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadPosts, writeDevtoId } from "./posts.mjs";

async function makeTempDir() {
  return mkdtemp(path.join(tmpdir(), "posts-"));
}

test("loadPosts reads frontmatter and body", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(
    file,
    '---\ntitle: "Hello"\npublished: true\ndevto: true\n---\n# Body\n',
  );
  const posts = await loadPosts(dir);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, "my-post");
  assert.equal(posts[0].data.title, "Hello");
  assert.match(posts[0].content, /# Body/);
  await rm(dir, { recursive: true, force: true });
});

test("writeDevtoId adds devtoId when missing", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(file, '---\ntitle: "Hello"\npublished: true\n---\n# Body\n');
  await writeDevtoId(file, 123);
  const raw = await readFile(file, "utf8");
  assert.match(raw, /devtoId: "123"/);
  await rm(dir, { recursive: true, force: true });
});

test("writeDevtoId replaces an existing devtoId", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(
    file,
    '---\ntitle: "Hello"\ndevtoId: "99"\n---\n# Body\n',
  );
  await writeDevtoId(file, 456);
  const raw = await readFile(file, "utf8");
  assert.match(raw, /devtoId: "456"/);
  assert.doesNotMatch(raw, /"99"/);
  await rm(dir, { recursive: true, force: true });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test scripts/lib/posts.test.mjs`
Expected: FAIL — `Cannot find module './posts.mjs'`

- [ ] **Step 4: Write the implementation**

Create `scripts/lib/posts.mjs`:

```js
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export async function loadPosts(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);
  const posts = [];
  for (const name of files) {
    const filePath = path.join(dir, name);
    const raw = await readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const slug = name.replace(/\.mdx$/, "");
    posts.push({ slug, filePath, data, content });
  }
  return posts;
}

export async function writeDevtoId(filePath, id) {
  const raw = await readFile(filePath, "utf8");
  const idStr = String(id);
  let updated;
  if (raw.includes("\ndevtoId:")) {
    updated = raw.replace(/(\ndevtoId:\s*)[^\n]*/, `$1"${idStr}"`);
  } else {
    const closing = raw.indexOf("\n---", 4);
    updated = raw.slice(0, closing) + `\ndevtoId: "${idStr}"` + raw.slice(closing);
  }
  await writeFile(filePath, updated, "utf8");
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test scripts/lib/posts.test.mjs`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/posts.mjs scripts/lib/posts.test.mjs package.json package-lock.json
git commit -m "feat: add post loading and devtoId write-back"
```

---

### Task 4: dev.to API client

**Files:**
- Create: `scripts/lib/devto-client.mjs`
- Test: `scripts/lib/devto-client.test.mjs`

**Interfaces:**
- Produces: `listMyArticles(apiKey)` → Promise<Map<canonical_url, article>>, `createArticle(apiKey, article)` → Promise<{ id, url }>, `updateArticle(apiKey, id, article)` → Promise<{ id, url }>.

- [ ] **Step 1: Write the failing test**

Create `scripts/lib/devto-client.test.mjs`:

```js
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  listMyArticles,
  createArticle,
  updateArticle,
} from "./devto-client.mjs";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("createArticle POSTs with api-key header and article payload", async () => {
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ id: 42, url: "https://dev.to/x/42" }), {
      status: 201,
    });
  };
  const result = await createArticle("secret", {
    title: "Hi",
    body_markdown: "# hi",
  });
  assert.equal(result.id, 42);
  assert.equal(captured.url, "https://dev.to/api/articles");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers["api-key"], "secret");
  assert.deepEqual(JSON.parse(captured.options.body).article.title, "Hi");
});

test("updateArticle PUTs to the article id", async () => {
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ id: 7 }), { status: 200 });
  };
  const result = await updateArticle("secret", 7, { title: "Updated" });
  assert.equal(result.id, 7);
  assert.equal(captured.url, "https://dev.to/api/articles/7");
  assert.equal(captured.options.method, "PUT");
});

test("listMyArticles indexes articles by canonical_url", async () => {
  const articles = [
    { id: 1, canonical_url: "https://souvik.de/blog/a" },
    { id: 2, canonical_url: "https://souvik.de/blog/b" },
  ];
  globalThis.fetch = async () =>
    new Response(JSON.stringify(articles), { status: 200 });
  const index = await listMyArticles("secret");
  assert.equal(index.size, 2);
  assert.equal(index.get("https://souvik.de/blog/b").id, 2);
});

test("createArticle throws on non-2xx", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  await assert.rejects(
    () => createArticle("bad", { title: "x" }),
    /failed: 401/,
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/lib/devto-client.test.mjs`
Expected: FAIL — `Cannot find module './devto-client.mjs'`

- [ ] **Step 3: Write the implementation**

Create `scripts/lib/devto-client.mjs`:

```js
const API_BASE = "https://dev.to/api";

async function request(apiKey, path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(
      `dev.to ${options.method ?? "GET"} ${path} failed: ${res.status} ${text}`,
    );
    err.status = res.status;
    throw err;
  }
  return json;
}

export async function listMyArticles(apiKey) {
  const articles = [];
  let page = 1;
  for (;;) {
    const batch = await request(
      apiKey,
      `/articles/me?per_page=1000&page=${page}`,
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    articles.push(...batch);
    if (batch.length < 1000) break;
    page += 1;
  }
  const byCanonical = new Map();
  for (const a of articles) {
    if (a.canonical_url) byCanonical.set(a.canonical_url, a);
  }
  return byCanonical;
}

export function createArticle(apiKey, article) {
  return request(apiKey, "/articles", {
    method: "POST",
    body: JSON.stringify({ article }),
  });
}

export function updateArticle(apiKey, id, article) {
  return request(apiKey, `/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify({ article }),
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/lib/devto-client.test.mjs`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/devto-client.mjs scripts/lib/devto-client.test.mjs
git commit -m "feat: add dev.to API client"
```

---

### Task 5: Sync entry script

**Files:**
- Create: `scripts/sync-devto.mjs`
- Modify: `package.json` (add `sync:devto` script)

**Interfaces:**
- Consumes: `loadPosts`, `writeDevtoId` (posts.mjs), `mdxToMarkdown` (transform.mjs), `listMyArticles`, `createArticle`, `updateArticle` (devto-client.mjs), `SITE_URL`, `toAbsoluteUrl`, `canonicalUrl` (urls.mjs).
- Produces: a CLI with flags `--dry-run`, `--write`, `--require-key`, `--dir`, `--site`.

- [ ] **Step 1: Add the `sync:devto` script**

In `package.json`, add to `scripts`:

```json
"sync:devto": "node scripts/sync-devto.mjs",
```

- [ ] **Step 2: Write the entry script**

Create `scripts/sync-devto.mjs`:

```js
import { parseArgs } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPosts, writeDevtoId } from "./lib/posts.mjs";
import { mdxToMarkdown } from "./lib/transform.mjs";
import {
  listMyArticles,
  createArticle,
  updateArticle,
} from "./lib/devto-client.mjs";
import { SITE_URL, toAbsoluteUrl, canonicalUrl } from "./lib/urls.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, "../src/content/blog");

const { values } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    "write": { type: "boolean", default: false },
    "require-key": { type: "boolean", default: false },
    "dir": { type: "string", default: BLOG_DIR },
    "site": { type: "string", default: SITE_URL },
  },
});

const apiKey = process.env.DEVTO_API_KEY;

async function main() {
  const posts = (await loadPosts(values.dir)).filter(
    (p) => p.data.devto === true && p.data.published === true,
  );

  if (posts.length === 0) {
    console.log("No posts opted in to dev.to (devto: true + published: true).");
    return;
  }

  if (!apiKey) {
    if (values["dry-run"]) {
      console.log("DEVTO_API_KEY not set; running dry-run only.");
    } else if (values["require-key"]) {
      console.error("DEVTO_API_KEY is required but not set.");
      process.exitCode = 1;
      return;
    } else {
      console.log(
        "DEVTO_API_KEY not set; nothing to publish. Use --require-key to fail instead.",
      );
      return;
    }
  }

  const index = apiKey ? await listMyArticles(apiKey) : new Map();

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const post of posts) {
    const url = canonicalUrl(post.slug, values.site);
    const bodyMarkdown = await mdxToMarkdown(post.content, {
      baseUrl: values.site,
      slug: post.slug,
    });
    const article = {
      title: post.data.title,
      published: true,
      body_markdown: bodyMarkdown,
      tags: (post.data.tags ?? []).slice(0, 4),
      canonical_url: url,
      description: post.data.summary,
    };
    if (post.data.image) {
      article.cover_image = toAbsoluteUrl(
        post.data.image,
        values.site,
        post.slug,
      );
    }

    const existing = post.data.devtoId
      ? { id: Number(post.data.devtoId) }
      : index.get(url);

    if (values["dry-run"]) {
      console.log(
        `[dry-run] ${existing ? "UPDATE" : "CREATE"} ${post.slug} -> ${url}`,
      );
      console.log(JSON.stringify(article, null, 2));
      continue;
    }

    try {
      const result = existing
        ? await updateArticle(apiKey, existing.id, article)
        : await createArticle(apiKey, article);
      console.log(
        `${existing ? "updated" : "created"} ${post.slug} (id ${result.id})`,
      );
      if (existing) updated += 1;
      else {
        created += 1;
        if (values.write) await writeDevtoId(post.filePath, result.id);
      }
    } catch (err) {
      failed += 1;
      console.error(`FAILED ${post.slug}: ${err.message}`);
    }
  }

  console.log(
    `\nSummary: ${created} created, ${updated} updated, ${failed} failed.`,
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS (all tests across `scripts/lib/`)

- [ ] **Step 4: Verify dry-run against a sample post**

Run:
```bash
mkdir -p /tmp/opencode/dryrun
cat > /tmp/opencode/dryrun/sample.mdx <<'EOF'
---
title: "Sample Post"
publishedAt: "2026-09-15"
summary: "A sample summary"
published: true
devto: true
tags: ["javascript", "astro"]
image: "/blog/sample/cover.png"
---
# Hello

<MediaContainer src="/blog/sample/d.png" alt="diagram" />
EOF
node scripts/sync-devto.mjs --dry-run --dir /tmp/opencode/dryrun
```
Expected: prints `[dry-run] CREATE sample -> https://souvik.de/blog/sample` followed by JSON with `body_markdown` containing `![diagram](https://souvik.de/blog/sample/d.png)` and `cover_image: "https://souvik.de/blog/sample/cover.png"`. No API key required.

- [ ] **Step 5: Verify existing posts are skipped**

Run: `node scripts/sync-devto.mjs --dry-run`
Expected: prints `No posts opted in to dev.to (devto: true + published: true).` (all 7 existing posts lack `devto: true`).

- [ ] **Step 6: Commit**

```bash
git add scripts/sync-devto.mjs package.json package-lock.json
git commit -m "feat: add dev.to sync entry script"
```

---

### Task 6: Astro frontmatter schema + draft-leak fix

**Files:**
- Modify: `src/content.config.ts:5-16`
- Modify: `src/pages/blog/[slug].astro:18`

**Interfaces:**
- Consumes: existing `blog` content collection.
- Produces: frontmatter fields `tags: string[]`, `devto: boolean`, `devtoId?: string`; `getStaticPaths` that only renders published posts.

- [ ] **Step 1: Extend the content schema**

In `src/content.config.ts`, replace the `blog` schema with:

```ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
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
  }),
});
```

- [ ] **Step 2: Fix the draft leak**

In `src/pages/blog/[slug].astro`, change line 18 from:

```js
  return sortedPosts.map((post) => {
```

to:

```js
  return publishedPosts.map((post) => {
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no warnings about unrecognized frontmatter fields.

- [ ] **Step 4: Verify a draft no longer renders**

Run `npm run dev`, then check that `/blog/building-restful-apis` (a `published: false` post) returns a 404, while `/blog` (the index) still loads. Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/pages/blog/[slug].astro
git commit -m "feat: add dev.to frontmatter fields and hide drafts from routes"
```

---

### Task 7: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/devto-sync.yml`

- [ ] **Step 1: Write the workflow**

Create `.github/workflows/devto-sync.yml`:

```yaml
name: Sync to dev.to

on:
  push:
    branches: [main]
    paths:
      - "src/content/blog/**"
      - "public/blog/**"
      - "scripts/sync-devto.mjs"
      - "scripts/lib/**"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Sync posts to dev.to
        env:
          DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
        run: node scripts/sync-devto.mjs --write --require-key

      - name: Commit devtoId write-back
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/content/blog
          if git diff --cached --quiet; then
            echo "No changes to commit"
          else
            git commit -m "chore: persist dev.to article ids [skip ci]"
            git push
          fi
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/devto-sync.yml
git commit -m "ci: sync blog posts to dev.to on merge to main"
```

---

## Self-review notes

- Spec section 5.1 (schema) → Task 6 Step 1.
- Spec 5.2 (draft fix) → Task 6 Step 2.
- Spec 5.3 (sync algorithm + idempotency via canonical_url) → Task 5.
- Spec 5.4 (MDX→markdown) → Task 2.
- Spec 5.5 (image URL rewriting) → Task 1 + Task 2.
- Spec 5.6 (GitHub Actions) → Task 7.
- Spec 5.7 (error handling) → Task 4 (throw on non-2xx) + Task 5 (continue-on-error, exit 1).
- Spec section 6 (testing) → per-task `node:test` suites + Task 5 manual dry-run + Task 6 build/404 verification.

One known content consideration (not code): dev.to uses the frontmatter `title` as the article title, so a post whose body also begins with an `# H1` will show a duplicate heading on dev.to. Leave H1s out of bodies for posts you syndicate.
