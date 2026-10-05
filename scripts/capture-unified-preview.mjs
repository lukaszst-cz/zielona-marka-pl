import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:4187";
const output = "outputs/unified-preview";
const views = [
  { name: "home-mobile", path: "/", width: 390, height: 844 },
  { name: "home-desktop", path: "/", width: 1440, height: 1000 },
  { name: "tools-mobile", path: "/praktyczne-narzedzia", width: 390, height: 844 },
  { name: "tools-desktop", path: "/praktyczne-narzedzia", width: 1440, height: 1000 },
  { name: "transport-mobile", path: "/realizacje/transportflow", width: 390, height: 844 },
  { name: "local-desktop", path: "/strony-internetowe/zabki", width: 1440, height: 1000 },
];

mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const results = [];
try {
  for (const view of views) {
    const page = await browser.newPage({ viewport: { width: view.width, height: view.height }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`${base}${view.path}`, { waitUntil: "networkidle", timeout: 30000 });
    const metrics = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || "",
      overflow: document.documentElement.scrollWidth > innerWidth + 2,
      brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).length,
    }));
    const path = `${output}/${view.name}.png`;
    await page.screenshot({ path, fullPage: true });
    results.push({ ...view, status: response?.status() || 0, path, ...metrics, errors });
    await page.close();
  }
} finally {
  await browser.close();
}

writeFileSync(`${output}/report.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
