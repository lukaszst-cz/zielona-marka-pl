import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const production = "https://zielona-marka.pl";
const local = process.argv[2] || "http://127.0.0.1:4187";
const intentionallyChanged = new Set([
  "/",
  "/realizacje",
  "/realizacje/transportflow",
  "/strony-internetowe/zabki",
  "/strony-internetowe/zielonka",
  "/strony-internetowe/kobylka",
  "/strony-internetowe/wolomin",
  "/strony-internetowe/radzymin",
  "/strony-internetowe/targowek",
  "/strony-internetowe/bialoleka",
  "/strony-internetowe/warszawa",
]);

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = { compared: [], differences: [], intentionallyChanged: [...intentionallyChanged] };
try {
  const sitemap = await (await fetch(`${production}/sitemap.xml`)).text();
  const routes = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname))];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const read = async url => {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    return page.evaluate(status => {
      const clean = value => (value || "").replace(/\s+/g, " ").trim();
      return {
        status,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || "",
        canonicalPath: new URL(document.querySelector('link[rel="canonical"]')?.href || location.href).pathname,
        h1: clean(document.querySelector("h1")?.textContent),
        mainText: clean(document.querySelector("main")?.innerText),
      };
    }, response?.status() || 0);
  };
  for (const route of routes) {
    if (intentionallyChanged.has(route)) continue;
    const prod = await read(`${production}${route}`);
    const preview = await read(`${local}${route}`);
    const fields = ["status", "title", "description", "canonicalPath", "h1", "mainText"];
    const changed = fields.filter(field => prod[field] !== preview[field]);
    const row = { route, changed };
    report.compared.push(row);
    if (changed.length) report.differences.push({ route, changed, production: prod, local: preview });
  }
  await page.close();
} finally {
  await browser.close();
}

mkdirSync("outputs", { recursive: true });
writeFileSync("outputs/production-local-comparison.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ compared: report.compared.length, differences: report.differences.map(item => ({ route: item.route, changed: item.changed })) }, null, 2));
