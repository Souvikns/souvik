import { parseArgs } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPosts, writeDevtoId } from "./lib/posts.mjs";
import { mdxToMarkdown } from "./lib/transform.mjs";
import {
  listMyArticles,
  createArticle,
  updateArticle,
  toDevtoTags,
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
    // `published` defaults to true in the content schema, so only an explicit
    // `published: false` keeps a post off dev.to.
    (p) => p.data.devto === true && p.data.published !== false,
  );

  if (posts.length === 0) {
    console.log("No published posts opted in to dev.to (devto: true).");
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
      tags: toDevtoTags(post.data.tags),
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

    // The canonical_url lookup is authoritative; devtoId is only a cache.
    const indexedId = index.get(url)?.id;
    const cachedId = Number(post.data.devtoId);
    const targetId =
      indexedId ?? (Number.isInteger(cachedId) && cachedId > 0 ? cachedId : undefined);

    if (values["dry-run"]) {
      console.log(
        `[dry-run] ${targetId ? "UPDATE" : "CREATE"} ${post.slug} -> ${url}`,
      );
      console.log(JSON.stringify(article, null, 2));
      continue;
    }

    try {
      let result;
      if (targetId) {
        try {
          result = await updateArticle(apiKey, targetId, article);
          updated += 1;
          console.log(`updated ${post.slug} (id ${result.id})`);
        } catch (err) {
          // A stale cached id (deleted article) falls through to create.
          if (err.status !== 404 || indexedId) throw err;
          console.warn(
            `devtoId ${targetId} for ${post.slug} not found on dev.to; creating a new article.`,
          );
        }
      }
      if (!result) {
        result = await createArticle(apiKey, article);
        created += 1;
        console.log(`created ${post.slug} (id ${result.id})`);
      }
      if (values.write && String(result.id) !== String(post.data.devtoId)) {
        await writeDevtoId(post.filePath, result.id);
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
