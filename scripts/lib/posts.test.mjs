import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadPosts, writeDevtoId } from "./posts.mjs";

async function makeTempDir() {
  return mkdtemp(path.join(tmpdir(), "posts-"));
}

test("loadPosts reads frontmatter and body", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(
    file,
    '---\ntitle: "Hello"\npublished: true\ndevto: true\n---\n# Body\n',
  );
  const posts = await loadPosts(dir);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, "my-post");
  assert.equal(posts[0].data.title, "Hello");
  assert.match(posts[0].content, /# Body/);
  await rm(dir, { recursive: true, force: true });
});

test("writeDevtoId adds devtoId when missing", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(file, '---\ntitle: "Hello"\npublished: true\n---\n# Body\n');
  await writeDevtoId(file, 123);
  const raw = await readFile(file, "utf8");
  assert.match(raw, /devtoId: "123"/);
  await rm(dir, { recursive: true, force: true });
});

test("writeDevtoId replaces an existing devtoId", async () => {
  const dir = await makeTempDir();
  const file = path.join(dir, "my-post.mdx");
  await writeFile(
    file,
    '---\ntitle: "Hello"\ndevtoId: "99"\n---\n# Body\n',
  );
  await writeDevtoId(file, 456);
  const raw = await readFile(file, "utf8");
  assert.match(raw, /devtoId: "456"/);
  assert.doesNotMatch(raw, /"99"/);
  await rm(dir, { recursive: true, force: true });
});
