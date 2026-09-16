// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { remarkCodeMeta } from './src/lib/remark-code-meta.ts';
import { CONFIG } from './src/data/config.ts';

// Map each blog URL to its last-modified date so the sitemap can emit <lastmod>.
// Read straight from frontmatter - astro:content is not available inside the config.
const BLOG_DIR = './src/content/blog';
const blogLastmod = Object.fromEntries(
  fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
    .flatMap((file) => {
      const { data } = matter.read(path.join(BLOG_DIR, file));
      if (data.published === false) return [];
      const date = data.updatedAt ?? data.publishedAt;
      if (!date) return [];
      const slug = file.replace(/\.mdx$/, '');
      return [[`${CONFIG.site.url}/blog/${slug}`, new Date(date)]];
    }),
);

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
};

// https://astro.build/config
export default defineConfig({
  site: CONFIG.site.url,
  output: 'server',

  // Canonical URLs, sitemap entries and RSS links all render without a trailing
  // slash. 'ignore' would let the same page be reachable both ways.
  trailingSlash: 'never',

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkCodeMeta],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      syntaxHighlight: false,
    }),
    sitemap({
      // rss.xml is a feed, not a page - it does not belong in the sitemap.
      filter: (page) => !page.endsWith('/rss.xml'),
      serialize: (item) => {
        const lastmod = blogLastmod[item.url];
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm, remarkCodeMeta],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
