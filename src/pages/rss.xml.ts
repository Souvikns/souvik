import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { DATA } from "@/data/resume";
import { CONFIG } from "@/data/config";

export const prerender = true;

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
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: new Date(post.data.publishedAt),
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      author: DATA.contact.email,
    })),
    customData: "<language>en-us</language>",
  });
}
