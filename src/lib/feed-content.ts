import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import { mdxToMarkdown } from "../../scripts/lib/transform.mjs";

// Feed readers show post HTML out of context, so every link and image must be
// absolute. Anchors (#...) and URLs with a scheme (https:, mailto:) are kept.
function resolveUrl(url: string, siteUrl: string, slug: string): string {
  if (!url || url.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${siteUrl}${url}`;
  return `${siteUrl}/blog/${slug}/${url.replace(/^\.\//, "")}`;
}

function rehypeAbsoluteUrls({ siteUrl, slug }: { siteUrl: string; slug: string }) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      for (const attr of ["href", "src"] as const) {
        const value = node.properties?.[attr];
        if (typeof value === "string") {
          node.properties[attr] = resolveUrl(value, siteUrl, slug);
        }
      }
    });
  };
}

// Renders a post's MDX body as plain HTML for the RSS feed. It reuses the
// dev.to converter, which turns site components like <MediaContainer> into
// standard Markdown and drops imports and expressions a feed can't run.
export async function renderFeedHtml(
  body: string,
  { siteUrl, slug }: { siteUrl: string; slug: string },
): Promise<string> {
  const markdown = await mdxToMarkdown(body, { baseUrl: siteUrl, slug });
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeAbsoluteUrls, { siteUrl, slug })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
