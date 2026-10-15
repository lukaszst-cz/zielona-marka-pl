import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";

const { chromium } = await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright");
const base = (process.env.BROWSER_QA_URL || "http://127.0.0.1:8788").replace(/\\/$/, "");
const paths = [
  "/", "/oferta", "/dtp", "/opieka-nad-strona", "/poradnik",
  "/poradnik/ile-kosztuje-projekt-gazetki",
  "/poradnik/ile-kosztuje-strona-dla-malej-firmy",
  "/modernizacja-strony", "/usprawnienia-firmy", "/projektuj-strone",
];
const report = { base, checkedAt: new Date().toISOString(), pages: [], targets: [], failures: [] };
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
mkdirSync("browser-qa-artifacts", { recursive: true });

try {
  const context = await browser.newContext({ viewport: { width: 1365, height: 850 }, locale: "pl-PL" });
  await context.addInitScript(() => {
    try { localStorage.setItem("zm_analytics_consent", "denied"); } catch {}
  });
  const page = await context.newPage();
  const pathsToCheck = new Map();
  const fragmentsToCheck = new Map();
  const origin = new URL(base).origin;
  for (const path of paths) {
    const response = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 45000 });
    assert.ok(response?.ok(), "Cannot inspect " + path + ": " + response?.status());
    const anchors = await page.locator("a[href]").evaluateAll(links =>
      links.map(a => ({ href: a.getAttribute("href"), label: (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 80) }))
    );
    report.pages.push({ path, anchors: anchors.length });
    for (const { href, label } of anchors) {
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) continue;
      let target;
      try { target = new URL(href, base + path); } catch { continue; }
      if (target.origin !== origin || !["http:", "https:"].includes(target.protocol)) continue;
      if (target.pathname.startsWith("/api/") || target.pathname.startsWith("/_next/")) continue;
      const targetPath = target.pathname + target.search;
      if (!pathsToCheck.has(targetPath)) pathsToCheck.set(targetPath, { from: path, label });
      if (target.hash) {
        const anchorId = decodeURIComponent(target.hash.slice(1));
        if (anchorId) {
          const key = target.pathname + "#" + anchorId;
          if (!fragmentsToCheck.has(key)) fragmentsToCheck.set(key, { path: target.pathname, id: anchorId, from: path, label });
        }
      }
    }
  }
  // A bounded parallel crawl of only GET links visible on the ten public pages.
  const links = [...pathsToCheck.entries()];
  let index = 0;
  async function worker() {
    while (index < links.length) {
      const [path, contextInfo] = links[index++];
      try {
        const res = await context.request.get(base + path, { timeout: 14000, maxRedirects: 5 });
        const status = res.status();
        report.targets.push({ path, status });
        if (status >= 400) {
          report.failures.push({ type: "link", path, status, ...contextInfo });
        }
        await res.dispose();
      } catch (error) {
        report.failures.push({ type: "link", path, error: String(error).slice(0, 200), ...contextInfo });
      }
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  // Inspect fragment links on the fully rendered page rather than assuming server HTML contains the target.
  const pageIds = new Map();
  for (const { path, id, from, label } of fragmentsToCheck.values()) {
    if (!pageIds.has(path)) {
      await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(400);
      pageIds.set(path, await page.locator("[id]").evaluateAll(items => items.map(item => item.id)));
    }
    if (!pageIds.get(path).includes(id) && id !== "top") {
      report.failures.push({ type: "fragment", path: path + "#" + id, from, label });
    }
  }
  console.log("Navigation QA:", report.pages.length, "public pages,", report.targets.length, "distinct internal URLs,", fragmentsToCheck.size, "fragment targets;", report.failures.length, "problems");
  assert.deepEqual(report.failures, [], "Public link or anchor problems: " + JSON.stringify(report.failures.slice(0, 18)));
} finally {
  await browser.close();
  writeFileSync("browser-qa-artifacts/navigation-report.json", JSON.stringify(report, null, 2));
}
