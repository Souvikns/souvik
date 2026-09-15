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
