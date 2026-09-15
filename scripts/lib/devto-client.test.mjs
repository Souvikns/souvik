import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  listMyArticles,
  createArticle,
  updateArticle,
  toDevtoTags,
} from "./devto-client.mjs";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("createArticle POSTs with api-key header and article payload", async () => {
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ id: 42, url: "https://dev.to/x/42" }), {
      status: 201,
    });
  };
  const result = await createArticle("secret", {
    title: "Hi",
    body_markdown: "# hi",
  });
  assert.equal(result.id, 42);
  assert.equal(captured.url, "https://dev.to/api/articles");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers["api-key"], "secret");
  assert.deepEqual(JSON.parse(captured.options.body).article.title, "Hi");
});

test("updateArticle PUTs to the article id", async () => {
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ id: 7 }), { status: 200 });
  };
  const result = await updateArticle("secret", 7, { title: "Updated" });
  assert.equal(result.id, 7);
  assert.equal(captured.url, "https://dev.to/api/articles/7");
  assert.equal(captured.options.method, "PUT");
});

test("listMyArticles indexes articles by canonical_url", async () => {
  const articles = [
    { id: 1, canonical_url: "https://souvik.de/blog/a" },
    { id: 2, canonical_url: "https://souvik.de/blog/b" },
  ];
  globalThis.fetch = async () =>
    new Response(JSON.stringify(articles), { status: 200 });
  const index = await listMyArticles("secret");
  assert.equal(index.size, 2);
  assert.equal(index.get("https://souvik.de/blog/b").id, 2);
});

test("createArticle throws on non-2xx", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  await assert.rejects(
    () => createArticle("bad", { title: "x" }),
    /failed: 401/,
  );
});

test("request reports status for non-JSON error bodies", async () => {
  globalThis.fetch = async () =>
    new Response("<html>Bad Gateway</html>", { status: 502 });
  await assert.rejects(() => listMyArticles("secret"), (err) => {
    assert.equal(err.status, 502);
    assert.match(err.message, /failed: 502 <html>Bad Gateway/);
    return true;
  });
});

test("toDevtoTags strips non-alphanumerics, dedupes and caps at 4", () => {
  assert.deepEqual(
    toDevtoTags(["Web-Dev", "node.js", "webdev", "--", "a", "b", "c"]),
    ["webdev", "nodejs", "a", "b"],
  );
  assert.deepEqual(toDevtoTags(undefined), []);
});
