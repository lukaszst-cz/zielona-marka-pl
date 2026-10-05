import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("outputs/mini-audit-example-20260928");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = [];

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem("zm_analytics_consent", "denied"));
  const response = await page.goto("http://127.0.0.1:4180/demo/mini-audyt-zielona-marka", {
    waitUntil: "networkidle",
  });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
    h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
    findings: document.querySelectorAll(".mini-audit-findings article").length,
  }));
  await page.screenshot({ path: path.join(output, `${viewport.name}.png`), fullPage: true });
  results.push({ viewport: viewport.name, status: response?.status(), errors, ...metrics });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ok: results.every((item) => item.status === 200 && item.errors.length === 0 && item.documentWidth === item.viewportWidth && item.brokenImages === 0 && item.findings === 3), output, results }, null, 2));
