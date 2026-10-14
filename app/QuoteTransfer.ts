const KEY = "zm_quote_transfer";
const LIFETIME_MS = 15 * 60 * 1000;

export function saveQuoteTransfer(packageName: string, summary: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({
      packageName: packageName.slice(0, 180),
      summary: summary.slice(0, 7800),
      createdAt: Date.now(),
    }));
  } catch {
    // The form remains usable when browser storage is disabled.
  }
}

export function takeQuoteTransfer(packageName: string): string {
  if (typeof window === "undefined" || !packageName) return "";
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return "";
    window.sessionStorage.removeItem(KEY);
    const stored: unknown = JSON.parse(raw);
    if (typeof stored !== "object" || stored === null) return "";
    const quote = stored as { packageName?: unknown; summary?: unknown; createdAt?: unknown };
    if (quote.packageName !== packageName
      || typeof quote.summary !== "string"
      || typeof quote.createdAt !== "number"
      || Date.now() - quote.createdAt > LIFETIME_MS
      || quote.createdAt > Date.now()) return "";
    return quote.summary.slice(0, 7800);
  } catch {
    return "";
  }
}
