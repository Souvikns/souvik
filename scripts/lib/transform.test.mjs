import { test } from "node:test";
import assert from "node:assert/strict";
import { mdxToMarkdown } from "./transform.mjs";

const ctx = { baseUrl: "https://souvik.de", slug: "my-post" };

test("converts MediaContainer to a markdown image", async () => {
  const out = await mdxToMarkdown(
    '<MediaContainer src="/blog/my-post/d.png" alt="A diagram" />\n',
    ctx,
  );
  assert.match(out, /!\[A diagram\]\(https:\/\/souvik\.de\/blog\/my-post\/d\.png\)/);
});

test("unwraps mark tags", async () => {
  const out = await mdxToMarkdown("Some <mark>highlighted</mark> text.", ctx);
  assert.match(out, /Some highlighted text\./);
  assert.doesNotMatch(out, /<mark>/);
});

test("keeps fenced code blocks", async () => {
  const md = "```ts\nconst a = 1;\n```";
  const out = await mdxToMarkdown(md, ctx);
  assert.match(out, /```ts\nconst a = 1;\n```/);
});

test("keeps GFM strikethrough", async () => {
  const out = await mdxToMarkdown("~~strike~~", ctx);
  assert.match(out, /~~strike~~/);
});

test("drops unknown MDX components but keeps their children", async () => {
  const out = await mdxToMarkdown("<Widget>hi</Widget>", ctx);
  assert.match(out, /hi/);
  assert.doesNotMatch(out, /Widget/);
});

test("converts components nested inside dropped components", async () => {
  const out = await mdxToMarkdown(
    '<Callout>\n  <MediaContainer src="./a.png" alt="x" />\n</Callout>\n',
    ctx,
  );
  assert.match(out, /!\[x\]\(https:\/\/souvik\.de\/blog\/my-post\/a\.png\)/);
  assert.doesNotMatch(out, /MediaContainer|Callout/);
});

test("unwraps mark nested inside an unknown inline component", async () => {
  const out = await mdxToMarkdown("Text <Foo>a <mark>b</mark></Foo>", ctx);
  assert.match(out, /Text a b/);
  assert.doesNotMatch(out, /<mark>|Foo/);
});

test("keeps block structure of dropped block components", async () => {
  const out = await mdxToMarkdown(
    "<Widget>\n* a\n* b\n\n```js\nx\n```\n</Widget>\n",
    ctx,
  );
  assert.match(out, /\* a\n\* b\n\n```js\nx\n```/);
});

test("strips MDX imports, exports and expressions", async () => {
  const out = await mdxToMarkdown(
    "import X from './x'\n\nexport const y = 1\n\n{/* note */}\n\nText {1+1}\n",
    ctx,
  );
  assert.doesNotMatch(out, /import|export|note|\{|\}/);
  assert.match(out, /Text/);
});
