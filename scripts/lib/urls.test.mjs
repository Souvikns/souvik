import { test } from "node:test";
import assert from "node:assert/strict";
import { toAbsoluteUrl, canonicalUrl } from "./urls.mjs";

test("toAbsoluteUrl leaves absolute https URLs unchanged", () => {
  assert.equal(
    toAbsoluteUrl("https://example.com/a.png"),
    "https://example.com/a.png",
  );
});

test("toAbsoluteUrl prepends base to root-relative paths", () => {
  assert.equal(
    toAbsoluteUrl("/blog/my-post/cover.png"),
    "https://souvik.de/blog/my-post/cover.png",
  );
});

test("toAbsoluteUrl resolves relative paths against the slug", () => {
  assert.equal(
    toAbsoluteUrl("./cover.png", "https://souvik.de", "my-post"),
    "https://souvik.de/blog/my-post/cover.png",
  );
});

test("toAbsoluteUrl passes falsy input through", () => {
  assert.equal(toAbsoluteUrl(""), "");
  assert.equal(toAbsoluteUrl(undefined), undefined);
});

test("canonicalUrl builds the post URL", () => {
  assert.equal(canonicalUrl("my-post"), "https://souvik.de/blog/my-post");
});
