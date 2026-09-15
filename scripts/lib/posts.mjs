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
  const closing = raw.startsWith("---") ? raw.indexOf("\n---", 3) : -1;
  if (closing === -1) {
    throw new Error(`${filePath}: no frontmatter block to write devtoId into`);
  }
  // Only touch the frontmatter so a `devtoId:` line in the body is left alone.
  let frontmatter = raw.slice(0, closing);
  if (/\ndevtoId:/.test(frontmatter)) {
    frontmatter = frontmatter.replace(/(\ndevtoId:\s*)[^\n]*/, `$1"${idStr}"`);
  } else {
    frontmatter += `\ndevtoId: "${idStr}"`;
  }
  await writeFile(filePath, frontmatter + raw.slice(closing), "utf8");
}
