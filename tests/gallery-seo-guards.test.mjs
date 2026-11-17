import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { fetchSeoPage } from "../scripts/seo-fetch.mjs";
import { isRobotsPathBlocked, hasCriticalRobotsIssue } from "../scripts/seo-robots.mjs";
import { referencedAssets, isUnusableAssetResponse } from "../scripts/public-asset-utils.mjs";

test("SEO monitoring recovers from one network failure and records the retry", async () => {
  let attempts = 0;
  const retries = [];
  const result = await fetchSeoPage("https://example.test/", {
    request: async () => {
      if (++attempts === 1) throw new Error("Connection interrupted");
      return new Response("<h1>Page</h1>");
    },
    retryDelayMs: 0,
    onRetry: error => retries.push(error.message),
  });
  assert.equal(attempts, 2);
  assert.deepEqual(retries, ["Connection interrupted"]);
  assert.equal(result.body, "<h1>Page</h1>");
});

test("persistent network failures and HTTP errors remain visible", async () => {
  let attempts = 0;
  await assert.rejects(() => fetchSeoPage("https://example.test/", {
    request: async () => { attempts++; throw new Error("Unavailable"); },
    retryDelayMs: 0,
  }), /Unavailable/);
  assert.equal(attempts, 2);
  const missing = await fetchSeoPage("https://example.test/missing", {
    request: async () => new Response("Missing", { status: 404 }),
    retryDelayMs: 0,
  });
  assert.equal(missing.response.status, 404);
});

test("public UI previews never bind the production database", async () => {
  const config = JSON.parse(await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
  assert.ok(Object.hasOwn(config, "previews"), "Wrangler requires explicit preview settings");
  for (const database of config.d1_databases) {
    assert.ok(!JSON.stringify(config.previews).includes(database.database_id));
  }
});

test("AI crawler blocks do not falsely mark public pages blocked for Googlebot", () => {
  const robots = `User-agent: *\nAllow: /\nUser-agent: GPTBot\nDisallow: /\nUser-agent: Google-Extended\nDisallow: /\nUser-agent: *\nAllow: /\nDisallow: /api/\n`;
  assert.equal(isRobotsPathBlocked(robots), false);
  assert.equal(isRobotsPathBlocked(robots, "/oferta"), false);
  assert.equal(isRobotsPathBlocked(robots, "/api/studio/session"), true);
  assert.equal(isRobotsPathBlocked(robots, "/", "GPTBot"), true);
});

test("crawler-specific groups, merged groups and specific Allow rules take precedence", () => {
  const robots = `User-agent: *\nDisallow: /\nUser-agent: Googlebot\nDisallow: /private/\nAllow: /private/public\nUser-agent: googlebot\nDisallow: /other/\n`;
  assert.equal(isRobotsPathBlocked(robots, "/oferta"), false);
  assert.equal(isRobotsPathBlocked(robots, "/private/test"), true);
  assert.equal(isRobotsPathBlocked(robots, "/private/public"), false);
  assert.equal(isRobotsPathBlocked(robots, "/other/test"), true);
  assert.equal(isRobotsPathBlocked("User-agent: *\nDisallow: /\nAllow: /", "/"), false);
  assert.equal(isRobotsPathBlocked("User-agent: *\nDisallow: /*.pdf$", "/a.pdf"), true);
  assert.equal(isRobotsPathBlocked("User-agent: *\nDisallow: /*.pdf$", "/a.pdf/next"), false);
  assert.equal(isRobotsPathBlocked("User-agent: *\nDisallow:", "/"), false);
});

test("asset monitor includes gallery pictures and rejects disguised HTML responses", () => {
  const html = '<img src="/concept-samples-v2/furniture-1280.webp?tracking=private"><img src="https://other.example/a.png"><link rel="stylesheet" href="/_next/static/a.css">';
  assert.deepEqual(referencedAssets(html, "https://zielona-marka.pl"), ["/_next/static/a.css", "/concept-samples-v2/furniture-1280.webp"]);
  assert.equal(isUnusableAssetResponse("/concept-samples-v2/furniture-1280.webp", 200, "text/html"), true);
  assert.equal(isUnusableAssetResponse("/concept-samples-v2/furniture-1280.webp", 200, "image/webp"), false);
  assert.equal(isUnusableAssetResponse("/concept-samples-v2/furniture-1280.webp", 404, "image/webp"), true);
});

test("Marki and Ząbki have distinct local SEO content and links to modernization", async () => {
  const [marki, cities, cityPage, modernization, sitemap] = await Promise.all([
    readFile(new URL("../app/strony-internetowe-marki/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/strony-internetowe/[miasto]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LocalCityPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/modernizacja-strony/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  ]);

  assert.match(marki, /Strony internetowe w Markach/);
  assert.match(marki, /href="\/modernizacja-strony"/);
  assert.match(marki, /href="\/strony-internetowe\/zabki"/);
  assert.match(cities, /Strony internetowe Ząbki \| Projekt i modernizacja/);
  assert.match(cityPage, /Strony internetowe dla firm z Ząbek/);
  assert.match(cityPage, /href="\/strony-internetowe-marki"/);
  assert.match(cityPage, /href="\/modernizacja-strony"/);
  assert.match(modernization, /SEO PODCZAS PRZEBUDOWY/);
  assert.match(modernization, /href="\/strony-internetowe-marki"/);
  assert.match(modernization, /href="\/strony-internetowe\/zabki"/);
  assert.match(sitemap, /strony-internetowe-marki/);
  assert.match(sitemap, /"zabki"/);
});

test("Local pages use different service priorities instead of interchangeable copy", async () => {
  const cities = await readFile(new URL("../app/strony-internetowe/[miasto]/page.tsx", import.meta.url), "utf8");
  const cityComponent = await readFile(new URL("../app/LocalCityPage.tsx", import.meta.url), "utf8");
  const hub = await readFile(new URL("../app/strony-internetowe/page.tsx", import.meta.url), "utf8");

  const focus = {
    zielonka: "Modernizacja strony firmowej w Zielonce",
    kobylka: "Nowa strona dla firmy z Kobyłki",
    wolomin: "Odświeżenie strony firmy z Wołomina",
    radzymin: "Strona firmowa zbudowana pod usługi i dojazd",
    targowek: "Modernizacja strony na Targówku i Bródnie",
    bialoleka: "Nowa strona dla firmy z Białołęki",
    warszawa: "Nowa strona dla warszawskiej firmy usługowej",
  };
  for (const [city, heading] of Object.entries(focus)) {
    const cityEntry = cities.split("\n").find(line => line.startsWith(`  ${city}: { name:`));
    assert.ok(cityEntry, `Missing local page configuration for ${city}`);
    assert.ok(cityEntry.includes(`title: "${heading}"`), `Missing unique service emphasis for ${city}`);
  }
  assert.match(cityComponent, /city\.focus\.href/);
  const areas = hub.split("const areas = [")[1].split("] as const;")[0];
  assert.ok(areas.indexOf('["Marki"') < areas.indexOf('["Warszawa"'));
  assert.ok(areas.indexOf('["Ząbki"') < areas.indexOf('["Warszawa"'));
});

test("robots.txt does not need to advertise a sitemap when the endpoint is checked separately", () => {
  const withoutSitemap = [
    "User-agent: *",
    "Content-Signal: search=yes,ai-train=no,use=reference",
    "Allow: /",
    "User-agent: Google-Extended",
    "Disallow: /",
    "User-agent: GPTBot",
    "Disallow: /",
    "User-agent: *",
    "Allow: /",
  ].join("\n");
  assert.equal(hasCriticalRobotsIssue(200, withoutSitemap), false);
  assert.equal(hasCriticalRobotsIssue(404, withoutSitemap), true);
  assert.equal(hasCriticalRobotsIssue(200, "User-agent: *\nDisallow: /"), true);
});
