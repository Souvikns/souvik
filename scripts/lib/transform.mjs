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
        const isFlow = node.type === "mdxJsxFlowElement";
        const name = node.name;
        if (name === "MediaContainer") {
          const src = getAttribute(node, "src") ?? "";
          const alt = getAttribute(node, "alt") ?? "";
          const image = {
            type: "image",
            url: toAbsoluteUrl(src, baseUrl, slug),
            alt,
            title: null,
          };
          return isFlow ? { type: "paragraph", children: [image] } : image;
        }
        const children = node.children ?? [];
        if (name === "mark") {
          return isFlow ? { type: "paragraph", children } : children;
        }
        console.warn(`sync-devto: dropping unknown MDX component <${name}>`);
        return isFlow ? { type: "paragraph", children } : children;
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
