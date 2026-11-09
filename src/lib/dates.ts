const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "July 2025" -> "Jul 2025"; leaves anything it can't parse untouched. */
export function shortMonthYear(value: string): string {
  const d = new Date(`1 ${value}`);
  if (Number.isNaN(d.getTime())) return value;
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "July 2025", undefined -> "2025 – now" */
export function yearRange(start: string, end?: string, presentLabel = "now"): string {
  const year = (v: string) => v.match(/\d{4}/)?.[0] ?? v;
  return `${year(start)} – ${end ? year(end) : presentLabel}`;
}

/** "2026-10-03" -> "Oct 03" */
export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${d}`;
}

/** "2026-10-03" -> "Oct 3, 2026" */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}
