import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadSeries, resolveSeriesTitle } from "./series.mjs";

test("loadSeries reads series title and slug", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "series-"));
  await writeFile(
    path.join(dir, "my-series.mdx"),
    '---\ntitle: "My Series"\ndescription: "A description"\n---\n',
  );
  const series = await loadSeries(dir);
  assert.equal(series.length, 1);
  assert.equal(series[0].slug, "my-series");
  assert.equal(series[0].data.title, "My Series");
  assert.equal(series[0].data.description, "A description");
  await rm(dir, { recursive: true, force: true });
});

test("resolveSeriesTitle returns title for a known slug", () => {
  const seriesList = [{ slug: "my-series", filePath: "x", data: { title: "My Series" } }];
  assert.equal(resolveSeriesTitle(seriesList, "my-series"), "My Series");
});

test("resolveSeriesTitle returns null for an unknown slug", () => {
  const seriesList = [{ slug: "my-series", filePath: "x", data: { title: "My Series" } }];
  assert.equal(resolveSeriesTitle(seriesList, "nope"), null);
});
