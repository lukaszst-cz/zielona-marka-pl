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
  assert.doesNotMatch(css, /fern-frond\.svg|paprocie statyczne/i, "Static fern artwork must not appear in portfolio");
  assert.match(css, /@keyframes zmp-ambient-drift-left/);
  assert.match(css, /@keyframes zmp-ambient-drift-right/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
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


test("portfolio workflow pairings link to real projects and downloadable workbooks", async () => {
  const [pairings, catalog, details, flowPage] = await Promise.all([
    read("../app/portfolio/WorkflowConnections.tsx"),
    read("../app/portfolio/catalog.ts"),
    read("../app/portfolio/[slug]/page.tsx"),
    read("../app/projekty-flow/page.tsx"),
  ]);
  const projectSlugs = new Set([...catalog.matchAll(/"slug": "([^"]+)"/g)].map(match => match[1]));
  const groups = [...pairings.matchAll(/id: "([^"]+)"[\s\S]*?projectSlugs: \[([^\]]*)\][\s\S]*?featuredProjects: \[([^\]]*)\][\s\S]*?workbookSlug: (null|"[^"]+")/g)];
  assert.equal(groups.length, 10, "Ten groups of complementary portfolio examples are required");
  for (const group of groups) {
    const [, name, projects, featured, workbook] = group;
    for (const slug of [...projects.matchAll(/"([^"]+)"/g), ...featured.matchAll(/"([^"]+)"/g)].map(x => x[1])) {
      assert.ok(projectSlugs.has(slug), name + " links to a missing portfolio entry: " + slug);
    }
    if (workbook === "null") continue;
    const slug = workbook.slice(1, -1);
    assert.ok(projectSlugs.has(slug), name + " workbook is missing: " + slug);
    const block = catalog.slice(catalog.indexOf('"slug": "' + slug + '"'));
    const following = block.indexOf('\n  {\n', 2);
    const entry = following < 0 ? block : block.slice(0, following);
    const match = entry.match(/"downloadUrl": "(\/pliki\/[^"]+\.xlsx)"/);
    assert.ok(match, slug + " must have a downloadable XLSX");
    await access(new URL("../public" + match[1], here));
  }
  assert.match(details, /<WorkflowConnections item=\{item\}/);
  assert.match(pairings, /nie wymieniają automatycznie danych/);
  assert.match(flowPage, /project\.workbookSlug/);
  assert.match(flowPage, /everydayWorkbooks\.map/);
  for (const slug of ["excel-dashboard", "excel-wycena", "excel-crm"]) {
    assert.ok(flowPage.includes('slug: "' + slug + '"'));
  }
});

test("all Excel portfolio tiles have distinct accessible 3D illustrations", async () => {
  const catalog = await read("../app/portfolio/catalog.ts");
  const source = await read("../app/portfolio/PortfolioExplorer.tsx");
  const records = catalog.split(/\n  \{\n/).filter(part => /"category": "excel"/.test(part));
  assert.equal(records.length, 12);
  const imagePaths = new Set();
  for (const record of records) {
    const slug = record.match(/"slug": "([^"]+)"/)?.[1];
    const cardImage = record.match(/"cardImage": "([^"]+)"/)?.[1];
    assert.equal(cardImage, "/portfolio/kadry/" + slug + "-3d.svg");
    assert.match(record, /"cardAlt": "Przestrzenna ilustracja/);
    assert.ok(!imagePaths.has(cardImage), "Repeated Excel tile: " + cardImage);
    imagePaths.add(cardImage);
    const svg = await readFile(new URL("../public" + cardImage, here), "utf8");
    assert.match(svg, /<svg\b/);
    assert.doesNotMatch(svg, /<script|<foreignObject|https?:\/\//i, "Tile must be a safe, self-contained SVG");
    assert.match(record, /"image": "\/portfolio\/kadry\/[^"]+-ekran\.webp"/, "Keep an authentic workbook preview on the details page");
  }
  assert.match(source, /item\.cardAlt \?\? item\.alt/);
});
