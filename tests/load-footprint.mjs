import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";

const { chromium } = await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright");
const base = (process.env.BROWSER_QA_URL || "https://zielona-marka.pl").replace(/\/$/, "");
const routes = ["/", "/oferta", "/dtp", "/poradnik/ile-kosztuje-projekt-gazetki", "/projektuj-strone"];
const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "desktop", width: 1440, height: 900 }];
const report = { base, recordedAt: new Date().toISOString(), methodology: "Chromium cold browser context per page, reduced motion and analytics disabled; unthrottled lab snapshot, not CrUX or PSI", pages: [] };

mkdirSync("browser-qa-artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const context = await browser.newContext({ viewport, reducedMotion: "reduce", locale: "pl-PL" });
      await context.addInitScript(() => {
        try { localStorage.setItem("zm_analytics_consent", "denied"); } catch { /* Storage unavailable */ }
        performance.setResourceTimingBufferSize(1000);
        window.__qaVitals = { lcpMs: null, cls: 0 };
        if ("PerformanceObserver" in window) {
          try {
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) window.__qaVitals.lcpMs = Math.round(entry.startTime);
            }).observe({ type: "largest-contentful-paint", buffered: true });
          } catch { /* Unsupported browser entry type */ }
          try {
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) window.__qaVitals.cls += entry.value;
              }
            }).observe({ type: "layout-shift", buffered: true });
          } catch { /* Unsupported browser entry type */ }
        }
      });
      const page = await context.newPage();
      const transfers = [];
      page.on("response", response => {
        const url = new URL(response.url());
        if (url.origin !== new URL(base).origin) return;
        const headers = response.headers();
        const bytes = Number(headers["content-length"] ?? 0);
        transfers.push({ path: url.pathname, type: response.request().resourceType(), status: response.status(),
          mime: (headers["content-type"] || "").split(";")[0], headerBytes: Number.isFinite(bytes) ? bytes : 0 });
      });
      try {
        const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
        assert.ok(response?.ok(), route + ": HTTP " + response?.status());
        await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
        await page.waitForTimeout(1200);
        const timings = await page.evaluate(() => {
          const navigation = performance.getEntriesByType("navigation")[0];
          const resources = performance.getEntriesByType("resource")
            .filter(x => x.name.startsWith(location.origin))
            .map(x => ({
              url: new URL(x.name).pathname,
              type: x.initiatorType,
              encodedBytes: x.encodedBodySize,
              transferredBytes: x.transferSize,
              durationMs: Math.round(x.duration),
            }));
          return {
            navigation: navigation ? {
              ttfbMs: Math.round(navigation.responseStart),
              domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
              durationMs: Math.round(navigation.duration),
              transferredBytes: navigation.transferSize,
            } : null,
            lcpMs: window.__qaVitals?.lcpMs ?? null,
            cls: Number((window.__qaVitals?.cls ?? 0).toFixed(4)),
            resources,
            title: document.title,
          };
        });
        const largest = [...timings.resources].sort((a, b) => b.transferredBytes - a.transferredBytes).slice(0, 12);
        const transferred = timings.resources.reduce((sum, item) => sum + item.transferredBytes, 0);
        const byType = Object.groupBy(timings.resources, item => item.type);
        const types = Object.fromEntries(Object.entries(byType).map(([name, items]) =>
          [name, { count: items.length, transferredBytes: items.reduce((sum, item) => sum + item.transferredBytes, 0) }]));
        report.pages.push({
          viewport: viewport.name, route, title: timings.title, navigation: timings.navigation,
          lcpMs: timings.lcpMs, cls: timings.cls, resources: timings.resources.length,
          transferredBytes: transferred, byType: types, largest, responseHeaders: transfers,
        });
        console.log("LOAD " + viewport.name + " " + route + ": " + Math.round(transferred / 1024) +
          " KiB same-origin resources; LCP " + (timings.lcpMs ?? "n/a") + " ms; CLS " + timings.cls);
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  writeFileSync("browser-qa-artifacts/load-footprint.json", JSON.stringify(report, null, 2));
}
console.log("LOAD report: " + report.pages.length + " cold-page snapshots; not throttled or representative of real-user Core Web Vitals.");
