import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const base = 'http://127.0.0.1:4180';
const output = 'outputs/approval-20260928';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const report = { views: [], issues: [] };

try {
  for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem('zm_analytics_consent', 'denied');
      localStorage.setItem('zm-stream-muted', 'true');
    });
    const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${output}/${viewport.name}-01-opening.png`, fullPage: false });

    await page.locator('.zmh-scene-transition').scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollBy(0, -Math.round(innerHeight * .28)));
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${output}/${viewport.name}-02-green-transition.png`, fullPage: false });

    await page.locator('.zmh-assembly').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${output}/${viewport.name}-03-second-screen.png`, fullPage: false });

    await page.locator('.zmh-quick-brief').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${output}/${viewport.name}-04-brief.png`, fullPage: false });

    const data = await page.evaluate(() => {
      const box = selector => {
        const rect = document.querySelector(selector)?.getBoundingClientRect();
        return rect ? { top: rect.top + scrollY, bottom: rect.bottom + scrollY, height: rect.height } : null;
      };
      const transition = document.querySelector('.zmh-scene-transition');
      const assembly = document.querySelector('.zmh-assembly');
      return {
        opening: box('.zmh-opening'),
        transition: box('.zmh-scene-transition'),
        assembly: box('.zmh-assembly'),
        transitionBackground: transition ? getComputedStyle(transition).backgroundImage : '',
        assemblyMarginTop: assembly ? getComputedStyle(assembly).marginTop : '',
        overflow: document.documentElement.scrollWidth > innerWidth + 2,
        brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.currentSrc || image.src),
        h1: document.querySelectorAll('h1').length,
        priceProof: document.querySelector('.zmh-offer-proof')?.textContent?.trim(),
        briefPosition: box('.zmh-quick-brief'),
        messageMaxLength: document.querySelector('#krotki-brief textarea[name="message"]')?.maxLength,
      };
    });
    const row = { viewport, status: response?.status() ?? 0, errors, ...data };
    report.views.push(row);
    if (row.status !== 200 || row.errors.length || row.overflow || row.brokenImages.length || row.h1 !== 1 || row.transitionBackground.includes('url(') || row.assemblyMarginTop !== '0px' || row.messageMaxLength !== 8000) report.issues.push(row);
    if (!row.opening || !row.transition || !row.assembly || Math.abs(row.opening.bottom - row.transition.top) > 1 || Math.abs(row.transition.bottom - row.assembly.top) > 1) report.issues.push({ type: 'scene-order', viewport, opening: row.opening, transition: row.transition, assembly: row.assembly });
    await page.close();
  }
  writeFileSync(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
