const API_BASE = "https://dev.to/api";

async function request(apiKey, path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  const label = `dev.to ${options.method ?? "GET"} ${path}`;
  if (!res.ok) {
    const err = new Error(`${label} failed: ${res.status} ${text}`);
    err.status = res.status;
    throw err;
  }
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${label} returned non-JSON body: ${text.slice(0, 200)}`);
  }
}

// dev.to only accepts lowercase alphanumeric tags, at most 4 per article.
export function toDevtoTags(tags = []) {
  const cleaned = tags
    .map((tag) => String(tag).toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
  return [...new Set(cleaned)].slice(0, 4);
}

export async function listMyArticles(apiKey) {
  const articles = [];
  let page = 1;
  for (;;) {
    const batch = await request(
      apiKey,
      `/articles/me?per_page=1000&page=${page}`,
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    articles.push(...batch);
    if (batch.length < 1000) break;
    page += 1;
  }
  const byCanonical = new Map();
  for (const a of articles) {
    if (a.canonical_url) byCanonical.set(a.canonical_url, a);
  }
  return byCanonical;
}

export function createArticle(apiKey, article) {
  return request(apiKey, "/articles", {
    method: "POST",
    body: JSON.stringify({ article }),
  });
}

export function updateArticle(apiKey, id, article) {
  return request(apiKey, `/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify({ article }),
  });
}
