import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const stage = process.argv[2] || 'after';
const base = process.argv[3] || 'http://127.0.0.1:4180';
const routes = [
  { name: 'natura', path: '/demo/natura' },
  { name: 'bistro', path: '/demo/bistro' },
  { name: 'dom', path: '/demo/dom' },
  { name: 'auto', path: '/demo/auto-naprawa/portal/?role=manager' },
  { name: 'transport-react', path: '/demo/transport' },
  { name: 'transport-routeflow', path: '/demo/routeflow/portal/?role=manager' },
];
const output = `outputs/backoffice-review-20260928/${stage}`;
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const report = [];

try {
  for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => localStorage.setItem('zm_analytics_consent', 'denied'));
      const response = await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(350);
      await page.screenshot({ path: `${output}/${viewport.name}-${route.name}.png`, fullPage: true });
      const data = await page.evaluate(() => {
        const visible = element => {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return box.width > 0 && box.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
        };
        const targets = [...document.querySelectorAll('.transport-kpis article,.transport-card,.process-blueprint,.industry-row,.kpis article,.card,.lower-grid>article,.table-wrap')].filter(visible);
        return {
          title: document.title,
          h1: document.querySelector('h1')?.textContent?.trim(),
          overflow: document.documentElement.scrollWidth > innerWidth + 2,
          documentWidth: document.documentElement.scrollWidth,
          targetCount: targets.length,
          paleTargets: targets.filter(element => {
            const color = getComputedStyle(element).backgroundColor;
            return color === 'rgb(255, 255, 255)' || color === 'rgba(255, 255, 255, 0.48)' || color === 'rgb(248, 246, 239)';
          }).length,
          tinyText: [...document.querySelectorAll('main small,main span,main button,main th,main td')].filter(visible).filter(element => Number.parseFloat(getComputedStyle(element).fontSize) < 10).length,
          brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.currentSrc || image.src),
        };
      });
      report.push({ ...viewport, ...route, status: response?.status() ?? 0, errors, ...data });
      await page.close();
    }
  }
  writeFileSync(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ stage, pages: report.length, issues: report.filter(row => row.status !== 200 || row.errors.length || row.overflow || row.brokenImages.length), metrics: report.map(({ name, width, targetCount, paleTargets, tinyText }) => ({ name, width, targetCount, paleTargets, tinyText })) }, null, 2));
} finally {
  await browser.close();
}
