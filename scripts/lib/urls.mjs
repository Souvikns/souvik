// Keep SITE_URL in sync with `site.url` in src/data/config.ts.
export const SITE_URL = "https://souvik.de";

export function toAbsoluteUrl(url, baseUrl = SITE_URL, slug = "") {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  const clean = url.replace(/^\.\//, "");
  return `${baseUrl}/blog/${slug}/${clean}`;
}

export function canonicalUrl(slug, baseUrl = SITE_URL) {
  return `${baseUrl}/blog/${slug}`;
}
