import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string(),
      publishedAt: z.string(),
      updatedAt: z.string().optional(),
      author: z.string().optional(),
      summary: z.string(),
      image: z.string().optional(),
      published: z.boolean().default(true),
      tags: z.string().array().default([]),
      devto: z.boolean().default(false),
      devtoId: z.string().optional(),
      series: z.string().optional(),
      seriesPart: z.number().int().positive().optional(),
    })
    .superRefine((val, ctx) => {
      if ((val.series === undefined) !== (val.seriesPart === undefined)) {
        ctx.addIssue({
          code: "custom",
          message: "`series` and `seriesPart` must be set together.",
        });
      }
    }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, series };
