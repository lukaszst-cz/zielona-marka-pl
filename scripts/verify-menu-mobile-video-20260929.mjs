import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:4180";
const output = "outputs/verification-20260929";
const viewports = [390, 768, 850, 851, 1024, 1440];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = [];

try {
  for (const width of viewports) {
    const context = await browser.newContext({ viewport: { width, height: width <= 850 ? 900 : 1000 } });
    const page = await context.newPage();
    await page.addInitScript(() => {
      localStorage.setItem("zm_analytics_consent", "denied");
      localStorage.setItem("zm-stream-muted", "true");
    });
    const filmRequests = [];
    page.on("response", async (response) => {
      if (!response.url().endsWith(".mp4")) return;
      const headers = await response.allHeaders();
      filmRequests.push({ url: response.url(), status: response.status(), contentLength: Number(headers["content-length"] || 0) });
    });
    const response = await page.goto(base, { waitUntil: "networkidle" });
    const selector = width <= 850 ? ".zm-mobile-menu" : ".zm-offer-menu";
    await page.locator(`${selector}>summary`).click();
    const menu = await page.locator(`${selector}>div a`).evaluateAll((links) => links.map((link) => {
      const rect = link.getBoundingClientRect();
      const point = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return {
        href: link.getAttribute("href"),
        visible: rect.width > 0 && rect.height > 0,
        clickable: point === link || Boolean(point && link.contains(point)),
      };
    }));
    await page.locator(`${selector}>summary`).click();
    await page.waitForTimeout(3600);
    const video = await page.locator(".zmh-living-forest video").evaluate((element) => ({
      currentSrc: element.currentSrc,
      readyState: element.readyState,
      paused: element.paused,
    }));
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: false });
      await page.locator(".zmh-free-start").screenshot({ path: `${output}/free-start-${width}.png` });
    }
    report.push({ width, status: response?.status(), menuLinks: menu.length, blockedLinks: menu.filter((item) => !item.visible || !item.clickable), video, filmRequests });
    await context.close();
  }
  const failures = report.filter((row) => row.status !== 200 || row.blockedLinks.length || !row.video.currentSrc || (row.width <= 700 ? !row.video.currentSrc.includes("mobile-20260929") : row.video.currentSrc.includes("mobile-20260929")));
  await writeFile(`${output}/report.json`, JSON.stringify({ report, failures }, null, 2));
  console.log(JSON.stringify({ report, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
