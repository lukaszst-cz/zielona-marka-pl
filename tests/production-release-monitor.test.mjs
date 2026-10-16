import test from "node:test";
import assert from "node:assert/strict";
import {
  missingPageMarkers, missingUiStyles, monitorRelease, probeScriptAsset, releasePages,
} from "../scripts/monitor-public-release.mjs";
import { cloudflareBuildState, waitForCloudflareBuild } from "../scripts/wait-for-cloudflare-build.mjs";

test("checks exact public UI release markers instead of just HTTP 200", () => {
  assert.deepEqual(missingPageMarkers("<main>Opieka Mini</main>", ["care-plans", "Opieka Mini"]), ["care-plans"]);
  assert.deepEqual(missingPageMarkers('<main class="care-plans">Opieka Mini</main>', ["care-plans", "Opieka Mini"]), []);
});

test("requires current shared UI rules in public CSS", () => {
  assert.equal(missingUiStyles("--zm-ui-card .care-plans .zm-dtp-prices .local-related nav a .zm-home-slide[hidden] .zm-home-carousel-controls .zm-offer-browser .zmh-contact-preview-message .zmh-assembly-board--premium .zmh-preview-site-copy fern-frond.svg .zv5-desktop .zv5-preview-stage .zm-public.zm-concept .page-hero.zm-concept-hero .zmh-cinema .zmh-website .zmh-cinema .zmh-flow-item").length, 0);
  assert.ok(missingUiStyles("body { background: green }").includes("--zm-ui-card"));
});

test("fully simulated latest release passes without touching production", async () => {
  const htmlByRoute = new Map(releasePages.map(({ path, markers }) => [path,
    '<html><head><link rel="stylesheet" href="/_next/static/a234.css"><script src="/_next/static/chunks/ready.js"></script></head><body>' + markers.join(" ") + "</body></html>",
  ]));
  const css = "--zm-ui-card:rgba(5,30,19,.32);.care-plans{}.zm-dtp-prices{}.local-related nav a{}.zm-home-slide[hidden]{display:none}.zm-home-carousel-controls{}.zm-offer-browser{}.zmh-contact-preview-message{}.zmh-assembly-board--premium{}.zmh-preview-site-copy{}.fern-frond.svg{}.zv5-desktop{}.zv5-preview-stage{}.zm-public.zm-concept .page-hero.zm-concept-hero{}.zmh-cinema .zmh-website{}.zmh-cinema .zmh-flow-item{}";
  const request = async (url) => {
    const path = new URL(url).pathname;
    if (path === "/api/inquiries") return new Response("Uzupełnij firmę, rodzaj projektu i opis (10–4000 znaków).", { status: 400 });
    if (path.endsWith(".css")) return new Response(css, { status: 200, headers: { "content-type": "text/css" } });
    if (path.endsWith(".js")) return new Response("export {}", { status: 200, headers: { "content-type": "application/javascript" } });
    return new Response(htmlByRoute.get(path) ?? "", { status: htmlByRoute.has(path) ? 200 : 404, headers: { "content-type": "text/html" } });
  };
  const report = await monitorRelease({ request });
  assert.equal(report.isCurrent, true);
  assert.deepEqual(report.conceptFormProbe, { status: 400, currentHandler: true });
  assert.deepEqual(report.failures, []);
  assert.equal(report.pages.length, releasePages.length);
  assert.deepEqual(report.missingScripts, []);
  assert.equal(report.scriptAssets.length, 1);
});

test("the release monitor detects the new free-concept UI on production", () => {
  const concept = releasePages.find(({ path }) => path === "/bezplatna-koncepcja-strony");
  assert.ok(concept);
  assert.ok(concept.markers.includes("zv5-hero-art"));
  assert.ok(concept.markers.includes("zv5-tabs"));
  assert.ok(concept.markers.includes("Zanim zamówisz,"));
  assert.ok(missingUiStyles("body{}").includes(".zv5-desktop"));
  assert.ok(missingUiStyles("body{}").includes(".zm-public.zm-concept .page-hero.zm-concept-hero"));
  assert.deepEqual(missingPageMarkers(concept.markers.filter(marker => marker !== "zv5-hero-art").join(" "), concept.markers), ["zv5-hero-art"]);
});

test("homepage marker regression triggers an alert even if the server is up", async () => {
  const home = releasePages.find(({ path }) => path === "/");
  assert.ok(home, "Homepage must be monitored");
  assert.ok(home.markers.includes("zm-home-carousel"));
  assert.ok(home.markers.includes("Pokaż slajd 3: Bezpłatna koncepcja"));
  const html = home.markers.filter(marker => marker !== "Pokaż slajd 3: Bezpłatna koncepcja").join(" ");
  assert.deepEqual(missingPageMarkers(html, home.markers), ["Pokaż slajd 3: Bezpłatna koncepcja"]);
});

test("outdated production correctly fails even with all HTTP 200 responses", async () => {
  const request = async (url) => {
    const path = new URL(url).pathname;
    const text = path.endsWith(".css") ? "body { color: #fff }" : '<link rel="stylesheet" href="/_next/static/a234.css"><main>Opieka Mini</main>';
    return new Response(text, { status: 200 });
  };
  const report = await monitorRelease({ request });
  assert.equal(report.isCurrent, false);
  assert.ok(report.failures.some((f) => f.includes("care-plan-benefit")));
  assert.ok(report.failures.some((f) => f.includes("Production CSS is missing")));
});

test("stale hashed JS chunks are detected even when HTML is HTTP 200", async () => {
  const missing = await probeScriptAsset("/_next/static/chunks/old-hash.js", {
    origin: "https://zielona-marka.pl", retryDelayMs: 0,
    request: async () => new Response("Not Found", { status: 404, headers: { "content-type": "text/html" } }),
  });
  assert.equal(missing.ok, false);
  assert.equal(missing.status, 404);
  assert.equal(missing.attempts, 2);
  const spaFallback = await probeScriptAsset("/_next/static/chunks/fallback.js", {
    origin: "https://zielona-marka.pl", retryDelayMs: 0,
    request: async () => new Response("<html>Not JS</html>", { status: 200, headers: { "content-type": "text/html" } }),
  });
  assert.equal(spaFallback.ok, false, "HTML fallback cannot count as an available JavaScript bundle");
  const valid = await probeScriptAsset("/_next/static/chunks/current.js", {
    origin: "https://zielona-marka.pl", retryDelayMs: 0,
    request: async () => new Response("export const ready=true", {
      status: 200, headers: { "content-type": "application/javascript" },
    }),
  });
  assert.equal(valid.ok, true);
});


test("Cloudflare build barrier waits for matching production check and ignores unrelated checks", () => {
  assert.deepEqual(cloudflareBuildState([]),
    { kind: "waiting", detail: "Cloudflare build check not registered yet" });
  assert.equal(cloudflareBuildState([{ name: "test", status: "completed", conclusion: "success" }]).kind, "waiting");
  assert.equal(cloudflareBuildState([{ name: "Workers Builds: zielona-marka", status: "queued" }]).kind, "waiting");
  assert.equal(cloudflareBuildState([{ name: "Workers Builds: zielona-marka", status: "completed", conclusion: "success" }]).kind, "ready");
  assert.equal(cloudflareBuildState([{ name: "Workers Builds: zielona-marka", status: "completed", conclusion: "failure" }]).kind, "failed");
  assert.equal(cloudflareBuildState([
    { name: "Workers Builds: zielona-marka", status: "completed", conclusion: "failure", started_at: "2026-10-16T01:00:00Z" },
    { name: "Workers Builds: zielona-marka", status: "completed", conclusion: "success", started_at: "2026-10-16T02:00:00Z" },
  ]).kind, "ready", "The latest production build must decide status");
});

test("Cloudflare build barrier waits, fails on build error and refuses a timeout", async () => {
  let calls = 0;
  let sleeps = 0;
  const success = await waitForCloudflareBuild({
    lookup: async () => (++calls === 1 ? [] : [{ name: "Workers Builds: zielona-marka", status: "completed", conclusion: "success" }]),
    sleep: async () => { sleeps += 1; },
    attempts: 3,
    intervalMs: 0,
  });
  assert.equal(success.kind, "ready");
  assert.equal(success.attempt, 2);
  assert.equal(sleeps, 1);
  await assert.rejects(waitForCloudflareBuild({
    lookup: async () => [{ name: "Workers Builds: zielona-marka", status: "completed", conclusion: "failure" }],
    attempts: 1,
  }), /Cloudflare build completed with failure/);
  await assert.rejects(waitForCloudflareBuild({
    lookup: async () => [], sleep: async () => {}, attempts: 2, intervalMs: 0,
  }), /Timed out waiting for Cloudflare production build/);
});
