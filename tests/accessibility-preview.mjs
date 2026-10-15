import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const base = (process.env.BROWSER_QA_URL || "http://127.0.0.1:8788").replace(/\/$/, "");
const playwrightPath = process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright";
const axePath = process.env.BROWSER_QA_AXE_SOURCE || "/tmp/zm-review-browser/node_modules/axe-core/axe.min.js";
const { chromium } = await import(playwrightPath);
const axeScript = readFileSync(axePath, "utf8");
const routes = ["/", "/oferta", "/dtp", "/projektuj-strone", "/poradnik/ile-kosztuje-projekt-gazetki", "/kontakt"];
const sizes = [{ name: "mobile", width: 390, height: 844 }, { name: "desktop", width: 1440, height: 900 }];
const report = { url: base, time: new Date().toISOString(), audits: [], counts: { critical: 0, serious: 0, moderate: 0, minor: 0 } };
mkdirSync("browser-qa-artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const size of sizes) {
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height }, reducedMotion: "reduce", locale: "pl-PL",
    });
    await context.addInitScript(() => {
      try { localStorage.setItem("zm_analytics_consent", "denied"); } catch { /* Storage may be unavailable in restricted browsers. */ }
    });
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
      assert.ok(response?.ok(), size.name + " " + route + " HTTP " + response?.status());
      await page.addScriptTag({ content: axeScript });
      const data = await page.evaluate(async () =>
        window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } })
      );
      const violations = data.violations.map(item => ({
        rule: item.id, impact: item.impact, help: item.help, helpUrl: item.helpUrl,
        affected: item.nodes.length,
        elements: item.nodes.slice(0, 6).map(node => ({
          selector: node.target.join(" "),
          summary: node.failureSummary?.slice(0, 340),
        })),
      }));
      for (const item of violations) report.counts[item.impact] = (report.counts[item.impact] || 0) + item.affected;
      report.audits.push({ viewport: size.name, route, testsPassed: data.passes.length, violations });
      console.log("WCAG " + size.name + " " + route + ": " + violations.length + " rules, " + violations.reduce((n,v)=>n+v.affected,0) + " elements");
    }
    await context.close();
  }
} finally {
  await browser.close();
  writeFileSync("browser-qa-artifacts/accessibility-report.json", JSON.stringify(report, null, 2));
}
console.log("WCAG report: " + JSON.stringify(report.counts) + " across " + report.audits.length + " pages. Review JSON for details.");
