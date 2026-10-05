import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const checks = [];

for (const item of [
  { path: '/realizacje/natura-studio', selector: '.concept-browser' },
  { path: '/demo/routeflow/index.html', selector: '.service-grid article' },
  { path: '/demo/natura', selector: '.transport-kpis article' },
]) {
  await page.goto(`http://127.0.0.1:4180${item.path}`, { waitUntil: 'networkidle' });
  const target = page.locator(item.selector).first();
  const before = await target.evaluate(element => getComputedStyle(element).transform);
  await target.hover();
  await page.waitForTimeout(280);
  const after = await target.evaluate(element => getComputedStyle(element).transform);
  checks.push({ ...item, before, after, moved: before !== after && after !== 'none' });
}

await browser.close();
if (checks.some(check => !check.moved)) throw new Error(JSON.stringify(checks));
console.log(JSON.stringify({ ok: true, checks }, null, 2));
