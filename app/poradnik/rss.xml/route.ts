import { blogArticles } from "../blog-data";

function xml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character] ?? character);
}

export function GET() {
  const base = "https://zielona-marka.pl";
  const items = blogArticles.map(article => `<item>
<title>${xml(article.title)}</title>
<link>${base}${article.href}</link>
<guid isPermaLink="true">${base}${article.href}</guid>
<description>${xml(article.summary)}</description>
<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
</item>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Blog Zielonej Marki — praktyczne poradniki dla firm</title>
<link>${base}/poradnik</link>
<description>Strony WWW, SEO, DTP, organizacja pracy i obsługa zapytań klientów.</description>
<language>pl-PL</language>
<lastBuildDate>${new Date(blogArticles[0].publishedAt).toUTCString()}</lastBuildDate>
${items}
</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
