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
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(
      `dev.to ${options.method ?? "GET"} ${path} failed: ${res.status} ${text}`,
    );
    err.status = res.status;
    throw err;
  }
  return json;
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
