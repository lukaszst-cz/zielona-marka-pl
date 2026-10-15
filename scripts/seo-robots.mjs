/**
 * Detect noindex directives in crawler headers and HTML metadata.
 * Handles either attribute order and both generic and Googlebot-specific tags.
 */
export function hasNoindex(html, xRobotsTag = "") {
  if (/\bnoindex\b/i.test(xRobotsTag)) return true;
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return metaTags.some(tag => {
    const name = tag.match(/\bname\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== "robots" && name !== "googlebot") return false;
    const directives = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    return /\bnoindex\b/i.test(directives);
  });
}
