import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const url = "https://zielona-marka.pl/?audit=20260929";
const output = "outputs/production-audit-20260929";
const profiles = [
  { name: "mobile-fast-4g", width: 390, height: 844, latency: 100, download: 500_000, upload: 250_000, cpu: 4 },
  { name: "desktop", width: 1440, height: 1000, latency: 0, download: -1, upload: -1, cpu: 1 },
];
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const result = [];
try {
  for (const profile of profiles) {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, reducedMotion: "no-preference" });
      const page = await context.newPage();
      await page.addInitScript(() => {
        localStorage.setItem("zm_analytics_consent", "denied");
        localStorage.setItem("zm-stream-muted", "true");
        window.__auditPerf = { lcp: 0, cls: 0, longTasks: [] };
        new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__auditPerf.lcp = entry.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__auditPerf.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
        try { new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__auditPerf.longTasks.push(entry.duration); }).observe({ type: "longtask", buffered: true }); } catch {}
      });
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      if (profile.latency) await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: profile.latency, downloadThroughput: profile.download, uploadThroughput: profile.upload });
      if (profile.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });
      let encodedBytes = 0;
      cdp.on("Network.loadingFinished", (event) => { encodedBytes += event.encodedDataLength || 0; });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(url, { waitUntil: "load", timeout: 60_000 });
      await page.waitForTimeout(5_000);
      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        const paints = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime]));
        const resources = performance.getEntriesByType("resource").map((entry) => ({
          name: entry.name,
          initiatorType: entry.initiatorType,
          transferSize: entry.transferSize || 0,
          decodedBodySize: entry.decodedBodySize || 0,
          duration: entry.duration,
        }));
        const large = resources.filter((entry) => entry.transferSize > 0).sort((a, b) => b.transferSize - a.transferSize).slice(0, 8);
        return {
          ttfb: nav.responseStart,
          domContentLoaded: nav.domContentLoadedEventEnd,
          load: nav.loadEventEnd,
          fcp: paints["first-contentful-paint"] || 0,
          lcp: window.__auditPerf.lcp,
          cls: window.__auditPerf.cls,
          tbt: window.__auditPerf.longTasks.reduce((sum, duration) => sum + Math.max(0, duration - 50), 0),
          longTasks: window.__auditPerf.longTasks.length,
          resourceCount: resources.length,
          transferSize: resources.reduce((sum, entry) => sum + entry.transferSize, 0),
          decodedBodySize: resources.reduce((sum, entry) => sum + entry.decodedBodySize, 0),
          largestResources: large,
          documentHeight: document.documentElement.scrollHeight,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        };
      });
      result.push({ profile: profile.name, run, status: response?.status() || 0, encodedBytes, errors, ...metrics });
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const summary = profiles.map((profile) => {
  const rows = result.filter((row) => row.profile === profile.name);
  return {
    profile: profile.name,
    runs: rows.length,
    status: rows.every((row) => row.status === 200),
    javascriptErrors: rows.flatMap((row) => row.errors),
    ttfbMs: Math.round(median(rows.map((row) => row.ttfb))),
    fcpMs: Math.round(median(rows.map((row) => row.fcp))),
    lcpMs: Math.round(median(rows.map((row) => row.lcp))),
    cls: Number(median(rows.map((row) => row.cls)).toFixed(4)),
    tbtMs: Math.round(median(rows.map((row) => row.tbt))),
    transferredBytes: Math.round(median(rows.map((row) => row.encodedBytes))),
    requestCount: Math.round(median(rows.map((row) => row.resourceCount))),
    horizontalOverflow: rows.some((row) => row.horizontalOverflow),
    largestResources: rows[1]?.largestResources || rows[0]?.largestResources || [],
  };
});

await writeFile(`${output}/performance.json`, JSON.stringify({ measuredAt: new Date().toISOString(), methodology: "Playwright Chromium laboratory measurement, three cold runs per profile; mobile uses 100 ms latency, 4 Mbps download and 4x CPU throttling; not an official Lighthouse or CrUX result.", summary, runs: result }, null, 2));
console.log(JSON.stringify(summary, null, 2));
