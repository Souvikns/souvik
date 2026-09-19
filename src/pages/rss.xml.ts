import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { DATA } from "@/data/resume";
import { CONFIG } from "@/data/config";

export const prerender = true;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => data.published);
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime(),
  );

  return rss({
    title: `${DATA.name} - Blog`,
    description: DATA.description,
    site: CONFIG.site.url,
    trailingSlash: false,
    items: sorted.map((post) => {
      const url = `${CONFIG.site.url}/blog/${post.id}`;
      const hostname = new URL(CONFIG.site.url).hostname;
      return {
        title: post.data.title,
        description: post.data.summary,
        pubDate: new Date(post.data.publishedAt),
        link: `/blog/${post.id}`,
        content: `<p>${escapeHtml(post.data.summary)}</p><p><a href="${url}">Read the full article on ${hostname} →</a></p>`,
        categories: post.data.tags,
        author: DATA.contact.email,
      };
    }),
    customData: "<language>en-us</language>",
  });
}
