export function orderPostsByPart<
  T extends { data: { seriesPart?: number; publishedAt: string } },
>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const pa = a.data.seriesPart ?? Number.MAX_SAFE_INTEGER;
    const pb = b.data.seriesPart ?? Number.MAX_SAFE_INTEGER;
    if (pa !== pb) return pa - pb;
    return (
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
    );
  });
}

export function getAdjacentParts<T extends { id: string }>(
  ordered: T[],
  currentId: string,
): { previous: T | null; next: T | null } {
  const index = ordered.findIndex((p) => p.id === currentId);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
