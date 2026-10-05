import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const output = 'public/mini-audit-zm';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

for (const viewport of [
  { name: 'desktop', width: 1440, height: 980 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  await page.goto('https://zielona-marka.pl/', { waitUntil: 'networkidle', timeout: 60000 });
  const necessary = page.getByRole('button', { name: 'Tylko niezbędne' });
  if (await necessary.isVisible().catch(() => false)) await necessary.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${output}/live-${viewport.name}.png` });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ok: true, output }));
