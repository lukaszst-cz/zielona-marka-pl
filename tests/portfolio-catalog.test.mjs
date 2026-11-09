import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const here = import.meta.url;
const read = path => readFile(new URL(path, here), "utf8");

test("portfolio has unique and categorized slugs", async () => {
  const source = await read("../app/portfolio/catalog.ts");
  const slugs = [...source.matchAll(/"slug": "([^"]+)"/g)].map(match => match[1]);
  assert.ok(slugs.length >= 40, "Catalog should contain all migrated groups");
  assert.equal(new Set(slugs).size, slugs.length, "Every project slug must be unique");
  for (const category of ["www", "gazetki", "logo", "przed-po", "aplikacje", "excel"]) {
    assert.match(source, new RegExp('"category": "' + category + '"'));
  }
  assert.doesNotMatch(source, /PIANKAELECTRO|PIANKA ELECTRO|VIMAMED|BUDO-MARKET|REAL-JK/i, "Historic real-business names must not be published in the portfolio");
});

test("portfolio includes all 15 approved graphic concepts and the four embedded brochures", async () => {
  const source = await read("../app/portfolio/catalog.ts");
  const required = [
    "pion", "forma", "okruch", "styk", "glina", "trop", "szlak", "lodyga", "palona",
    "peleton", "poglos", "dalej", "dobry-koszyk", "modul", "zielony-sezon",
    "gazetka-navoro", "gazetka-nexio", "gazetka-budrivo", "gazetka-materivo",
  ];
  for (const slug of required) assert.ok(source.includes('"slug": "' + slug + '"'), "Missing portfolio project: " + slug);
});

test("all portfolio thumbnails refer to existing local assets", async () => {
  const source = await read("../app/portfolio/catalog.ts");
  const paths = [...source.matchAll(/"image": "([^"]+)"/g)].map(match => match[1]);
  const listed = [...source.matchAll(/"slug": "([^"]+)"/g)].map(m => m[1]);
  assert.equal(paths.length, listed.length, "Every published project must have its own visual");
  assert.ok(paths.length >= 40);
  assert.ok(!listed.includes("zm-studio"), "ZM Studio must stay off the public portfolio");
  const approvedExternalHosts = new Set([
    "budrivo.vercel.app", "navoro-hurt-koncepcja.vercel.app", "nexio-elektro.vercel.app", "materivo3.netlify.app",
    "solidom.vercel.app", "blackharbor.vercel.app", "eltravia-premium.vercel.app", "images.unsplash.com"
  ]);
  for (const path of paths) {
    if (path.startsWith("https://")) {
      const url = new URL(path);
      assert.ok(approvedExternalHosts.has(url.hostname), "Unexpected remote image host: " + url.hostname);
    } else {
      assert.ok(path.startsWith("/"), "Local image must be a root-relative URL: " + path);
      await access(new URL("../public" + path, here));
    }
  }
});


test("portfolio does not use static fern decorations and respects reduced motion", async () => {
  const css = await read("../app/portfolio/portfolio.css");
  assert.doesNotMatch(css, /fern-frond\\.svg|paprocie statyczne/i, "Static fern artwork must not appear in portfolio");
  assert.match(css, /@keyframes zmp-ambient-drift-left/);
  assert.match(css, /@keyframes zmp-ambient-drift-right/);
  assert.match(css, /prefers-reduced-motion:\\s*reduce/);
});

test("portfolio export, route metadata and navigation remain wired together", async () => {
  const [page, print, sitemap, nav] = await Promise.all([
    read("../app/portfolio/page.tsx"),
    read("../app/portfolio/druk/page.tsx"),
    read("../app/sitemap.ts"),
    read("../app/SiteChrome.tsx"),
  ]);
  assert.match(page, /PortfolioExplorer/);
  assert.match(print, /PrintControls/);
  assert.match(print, /robots: \{ index: false/);
  assert.match(sitemap, /portfolioItems\.map/);
  assert.match(nav, /href="\/portfolio"/);
});
