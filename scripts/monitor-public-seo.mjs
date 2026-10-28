import { writeFile, mkdir } from "node:fs/promises";
import { hasNoindex, isRobotsPathBlocked } from "./seo-robots.mjs";

const base = "https://zielona-marka.pl";
const routes = [
  "/", "/oferta", "/dtp", "/opieka-nad-strona", "/projektuj-strone",
  "/bezplatna-koncepcja-strony", "/modernizacja-strony",
  "/strony-internetowe", "/strony-internetowe-marki",
  ...["zabki", "zielonka", "kobylka", "wolomin", "radzymin", "targowek", "bialoleka", "warszawa"].map(city => `/strony-internetowe/${city}`),
  "/usprawnienia-firmy", "/kontakt", "/jak-pracuje",
  "/poradnik", "/poradnik/ile-kosztuje-strona-dla-malej-firmy",
  "/poradnik/jak-przygotowac-pdf-do-druku",
  "/raport-qa", "/standardy-jakosci", "/standard-jakosci", "/standard-dtp",
];
const expectedLinks = {
  "/": ["/jak-pracuje"],
  "/jak-pracuje": ["/kontakt", "/raport-qa", "/standard-jakosci"],
};

const failures = [];
const report = { checkedAt: new Date().toISOString(), base, routes: [], sitemap: {}, robots: {} };
async function request(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(base + path, { signal: controller.signal, headers: { "User-Agent": "ZielonaMarka-TechnicalSeoQA/1.0" }, redirect: "follow" });
    return { response, body: await response.text() };
  } finally { clearTimeout(timeout); }
}
function fail(message) { failures.push(message); console.error("FAIL: " + message); }
function canonical(html) {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
    ?? html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
}
let robotsText = "";
try {
  const { response, body } = await request("/robots.txt");
  robotsText = body;
  report.robots = { status: response.status, sitemapDeclared: /sitemap:\s*https:\/\/zielona-marka\.pl\/sitemap\.xml/i.test(body), disallowRoot: isRobotsPathBlocked(body) };
  if (!response.ok || !report.robots.sitemapDeclared || report.robots.disallowRoot) fail("robots.txt missing, incorrect sitemap declaration, or root crawling blocked");
} catch (error) { fail("robots.txt request failed: " + error.message); }
let sitemapUrls = [];
try {
  const { response, body } = await request("/sitemap.xml");
  sitemapUrls = [...body.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map(m => m[1].replace(/&amp;/g, "&"));
  report.sitemap = { status: response.status, count: sitemapUrls.length, foreignHosts: sitemapUrls.filter(u => { try { return new URL(u).origin !== base; } catch { return true; } }) };
  if (!response.ok || !sitemapUrls.length || report.sitemap.foreignHosts.length) fail("sitemap is unavailable, empty or contains foreign/invalid URL origins");
} catch (error) { fail("sitemap.xml request failed: " + error.message); }
for (const route of routes) {
  if (isRobotsPathBlocked(robotsText, route)) fail(route + " blocked for Googlebot by robots.txt");
  try {
    const { response, body } = await request(route);
    const expected = base + (route === "/" ? "/" : route);
    const actual = canonical(body);
    const noindex = hasNoindex(body, response.headers.get("x-robots-tag") ?? "");
    const foundInSitemap = sitemapUrls.some(url => url.replace(/\/$/, "") === expected.replace(/\/$/, ""));
    const item = { path: route, status: response.status, finalUrl: response.url, canonical: actual, noindex, foundInSitemap };
    report.routes.push(item);
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) fail(route + " is not an HTTP 2xx HTML response");
    if (noindex) fail(route + " is marked noindex");
    if (!actual || new URL(actual, base).href.replace(/\/$/, "") !== expected.replace(/\/$/, "")) fail(route + " canonical missing or not self-referencing: " + actual);
    if (!foundInSitemap) fail(route + " absent from sitemap");
    for (const link of expectedLinks[route] ?? []) {
      const present = body.includes('href="' + link + '"') || body.includes("href='" + link + "'");
      if (!present) fail(route + " missing important navigation link to " + link);
    }
  } catch (error) { fail(route + " inspection failed: " + error.message); }
}
// Check every URL declared for indexing, not only the fixed priority sample.
// Bound parallelism keeps the production crawl gentle and CI predictable.
const monitored = new Set(report.routes.map(entry => entry.path.replace(/[/]$/, "") || "/"));
const additional = [...new Set(sitemapUrls)].filter(url => {
  try {
    const parsed = new URL(url);
    return parsed.origin === base && !monitored.has(parsed.pathname.replace(/[/]$/, "") || "/");
  } catch { return false; }
});
report.additionalSitemapPages = [];
if (sitemapUrls.length !== new Set(sitemapUrls).size) fail("Duplicate URLs found in sitemap");
if (additional.length > 150) fail("Sitemap additional URL count exceeds safe crawl limit (150)");
else {
  const queue = [...additional];
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const url = queue.shift();
      if (!url) return;
      try {
        const { response, body } = await request(new URL(url).pathname);
        if (isRobotsPathBlocked(robotsText, new URL(url).pathname)) fail(url + " blocked for Googlebot by robots.txt");
        const actual = canonical(body);
        const noindex = hasNoindex(body, response.headers.get("x-robots-tag") ?? "");
        report.additionalSitemapPages.push({ url, status: response.status, canonical: actual, noindex });
        if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) fail(url + " listed in sitemap but does not return HTML 2xx");
        if (noindex) fail(url + " listed in sitemap but marked noindex");
        if (!actual || new URL(actual, base).href.replace(/[/]$/, "") !== url.replace(/[/]$/, "")) fail(url + " sitemap canonical mismatch: " + actual);
      } catch (error) { fail(url + " sitemap page inspection failed: " + error.message); }
    }
  }));
}
report.failures = failures;
await mkdir("seo-monitor-artifacts", { recursive: true });
await writeFile("seo-monitor-artifacts/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ routesChecked: report.routes.length, sitemapURLs: sitemapUrls.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
