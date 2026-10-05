import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const tools = [
  ["https://lead-offer-zm.pages.dev/", "public/tool-lead-offer-copilot.jpg"],
  ["https://document-checker-zm.pages.dev/", "public/tool-document-checker.jpg"],
  ["https://lukaszst-cz.github.io/printflow-360/", "public/tool-printflow-360.jpg"],
  ["https://lukaszst-cz.github.io/transportflow-360/", "public/tool-transportflow-360.jpg"],
];

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
try {
  for (const [url, path] of tools) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 760 }, reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.screenshot({ path, type: "jpeg", quality: 84, clip: { x: 0, y: 0, width: 1200, height: 720 } });
    console.log(`${url} -> ${path}`);
    await page.close();
  }
} finally {
  await browser.close();
}
