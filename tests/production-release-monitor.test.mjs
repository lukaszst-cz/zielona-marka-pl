import test from "node:test";
import assert from "node:assert/strict";
import {
  missingPageMarkers, missingUiStyles, monitorRelease, releasePages,
} from "../scripts/monitor-public-release.mjs";

test("checks exact public UI release markers instead of just HTTP 200", () => {
  assert.deepEqual(missingPageMarkers("<main>Opieka Mini</main>", ["care-plans", "Opieka Mini"]), ["care-plans"]);
  assert.deepEqual(missingPageMarkers('<main class="care-plans">Opieka Mini</main>', ["care-plans", "Opieka Mini"]), []);
});

test("requires current shared UI rules in public CSS", () => {
  assert.equal(missingUiStyles("--zm-ui-card .care-plans .zm-dtp-prices .local-related nav a").length, 0);
  assert.ok(missingUiStyles("body { background: green }").includes("--zm-ui-card"));
});

test("fully simulated latest release passes without touching production", async () => {
  const htmlByRoute = new Map(releasePages.map(({ path, markers }) => [path,
    '<html><head><link rel="stylesheet" href="/_next/static/a234.css"></head><body>' + markers.join(" ") + "</body></html>",
  ]));
  const css = "--zm-ui-card:rgba(5,30,19,.32);.care-plans{}.zm-dtp-prices{}.local-related nav a{}";
  const request = async (url) => {
    const path = new URL(url).pathname;
    if (path.endsWith(".css")) return new Response(css, { status: 200, headers: { "content-type": "text/css" } });
    return new Response(htmlByRoute.get(path) ?? "", { status: htmlByRoute.has(path) ? 200 : 404, headers: { "content-type": "text/html" } });
  };
  const report = await monitorRelease({ request });
  assert.equal(report.isCurrent, true);
  assert.deepEqual(report.failures, []);
  assert.equal(report.pages.length, releasePages.length);
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
