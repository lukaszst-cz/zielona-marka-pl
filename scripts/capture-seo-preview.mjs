import { mkdirSync } from "node:fs";
import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.argv[2] || "http://127.0.0.1:4192";
const output = "outputs/seo-content-2026-09-30";
const pages = [
  ["poradniki", "/poradnik"],
  ["poradnik-zapytania", "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan"],
  ["poradnik-koszt", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"],
];

mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

try {
  for (const [width, suffix] of [[1440, "desktop"], [390, "mobile"]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const [name, route] of pages) {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${output}/${name}-${suffix}.png`, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`Zapisano ${pages.length * 2} podglądów w ${output}`);
