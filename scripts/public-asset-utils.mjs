/**
 * Detect first-party versioned assets actually referenced by public HTML.
 * Return path-only URLs so query strings and any user details never reach logs.
 */
export function referencedAssets(html, origin) {
  const found = new Set();
  const tags = html.match(/<(?:script|link|img|source)\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attribute = /\b(?:src|href)\s*=\s*(["'])(.*?)\1/gi;
    let match;
    while ((match = attribute.exec(tag))) {
      let url;
      try { url = new URL(match[2].replace(/&amp;/g, "&"), origin); }
      catch { continue; }
      if (url.origin !== origin) continue;
      if (!/^\/(?:_next\/static\/|assets\/|static\/)/.test(url.pathname) && !/\.(?:svg|webp|png|jpe?g|ico|avif)$/i.test(url.pathname)) continue;
      if (!/\.(?:js|css|mjs|woff2?|svg|webp|png|jpe?g)$/.test(url.pathname)) continue;
      found.add(url.pathname);
    }
  }
  return [...found].sort();
}

export function isUnusableAssetResponse(path, status, contentType) {
  if (!(status >= 200 && status < 300)) return true;
  if (/\.(?:m?js|css)$/.test(path) && /\btext\/html\b/i.test(contentType ?? "")) return true;
  if (/\.(?:svg|webp|png|jpe?g|ico|avif)$/i.test(path) && !/^image\//i.test(contentType ?? "")) return true;
  return false;
}
