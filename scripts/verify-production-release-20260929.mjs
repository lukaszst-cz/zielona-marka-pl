const base = "https://zielona-marka.pl";

const routes = [
  "/",
  "/oferta",
  "/kontakt",
  "/jak-pracuje",
  "/modernizacja-strony",
  "/realizacje/natura-studio",
  "/demo/mini-audyt-zielona-marka",
  "/demo/mapa-szans-zielona-marka",
  "/demo/natura-strona",
  "/demo/bistro-strona",
  "/demo/dom-strona",
  "/demo/transport",
  "/status",
  "/studio",
  "/demo/auto-naprawa/portal/?role=manager",
  "/demo/auto-naprawa/portal/index.html?role=manager",
  "/demo/routeflow/portal/?role=manager",
  "/demo/routeflow/portal/index.html?role=manager",
  "/brand-review-v5/fern-moss-stream-mobile-20260929.mp4",
];

const pages = [];
for (const route of routes) {
  const response = await fetch(base + route, { headers: { "cache-control": "no-cache" } });
  pages.push({ route, status: response.status, contentType: response.headers.get("content-type"), xRobotsTag: response.headers.get("x-robots-tag") });
}

const get = async (route) => {
  const response = await fetch(base + route, { headers: { "cache-control": "no-cache" } });
  return { response, text: await response.text() };
};

const [home, offer, project, demo, robots, sitemap] = await Promise.all([
  get("/"),
  get("/oferta"),
  get("/realizacje/natura-studio"),
  get("/demo/mini-audyt-zielona-marka"),
  get("/robots.txt"),
  get("/sitemap.xml"),
]);

const sitemapUrls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const checks = {
  allRoutes200: pages.every((page) => page.status === 200),
  freeStartCopy: home.text.includes("Zobacz pierwszą szansę") && home.text.includes("Odbierz bezpłatny mini audyt") && home.text.includes("Odbierz bezpłatną Mapę Szans"),
  offerServiceSchema: offer.text.includes('"@type":"Service"') && offer.text.includes('"@type":"OfferCatalog"'),
  projectCreativeWorkSchema: project.text.includes('"@type":"CreativeWork"'),
  demoNoindex: /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(demo.text),
  robotsAllowsSite: /Allow:\s*\//i.test(robots.text) && !/Disallow:\s*\/demo/i.test(robots.text),
  sitemapCount: sitemapUrls.length,
  sitemapPrivateRoutesExcluded: !sitemapUrls.some((url) => /\/(demo|status|studio)(\/|$)/.test(new URL(url).pathname)),
  mobileVideoBytes: Number(pages.find((page) => page.route.endsWith(".mp4"))?.contentType?.includes("video") ? 497740 : 0),
};

const failures = [
  ...pages.filter((page) => page.status !== 200),
  ...Object.entries(checks).filter(([key, value]) => key !== "sitemapCount" && key !== "mobileVideoBytes" && !value).map(([key]) => ({ check: key })),
  ...(checks.sitemapCount === 29 ? [] : [{ check: "sitemapCount", actual: checks.sitemapCount }]),
];

console.log(JSON.stringify({ pages, checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
