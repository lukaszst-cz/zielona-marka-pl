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
  const paths = [...source.matchAll(/"image": "(\/[a-zA-Z0-9_.\/-]+)"/g)].map(match => match[1]);
  assert.ok(paths.length >= 15);
  for (const path of paths) await access(new URL("../public" + path, here));
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
