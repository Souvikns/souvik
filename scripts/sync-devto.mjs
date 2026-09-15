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
