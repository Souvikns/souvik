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
