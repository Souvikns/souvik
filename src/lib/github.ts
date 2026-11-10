export interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionCalendar {
  total: number | null;
  /** Columns of seven days (Sunday first), oldest week first. */
  weeks: ContributionDay[][];
}

/**
 * Fetch a user's public contribution calendar from GitHub at build time.
 * Uses the same HTML fragment github.com renders on profile pages, so no
 * token is needed. Returns null when GitHub can't be reached, so callers
 * can hide the card instead of failing the build.
 */
export async function getContributionCalendar(
  username: string,
): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      { headers: { Accept: "text/html" }, signal: AbortSignal.timeout(10_000) },
    );
    if (!res.ok) return null;
    const html = await res.text();

    const days: ContributionDay[] = [];
    const cell = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="([0-4])"/g;
    for (const match of html.matchAll(cell)) {
      days.push({ date: match[1], level: Number(match[2]) as ContributionDay["level"] });
    }
    if (days.length === 0) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    const weeks: ContributionDay[][] = [];
    for (const day of days) {
      const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      if (weeks.length === 0 || weekday === 0) weeks.push([]);
      weeks[weeks.length - 1].push(day);
    }

    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : null;

    return { total, weeks };
  } catch {
    return null;
  }
}
