import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const audioRequests = [];
page.on('request', request => { if (request.url().includes('freesound_community-water-08-69295.mp3')) audioRequests.push(request.url()); });
await page.addInitScript(() => {
  localStorage.removeItem('zm-stream-muted');
  localStorage.setItem('zm_analytics_consent', 'denied');
  const NativeAudio = window.Audio;
  window.Audio = function AudioCapture(src) {
    const sound = new NativeAudio(src);
    window.__streamSound = sound;
    return sound;
  };
});

try {
  await page.goto('http://127.0.0.1:4180/', { waitUntil: 'domcontentloaded' });
  const sound = page.getByRole('button', { name: /dźwięk strumyka/i });
  await sound.waitFor({ state: 'visible' });
  if (await page.locator('.zmh-sound-control').count() !== 1) throw new Error('Expected one sound control');
  if (await page.locator('.zmh-volume-control').count() !== 0) throw new Error('Separate volume control still exists');
  if (await page.locator('.zmh-sound-control svg').count() !== 1) throw new Error('Expected one speaker icon');
  await page.waitForFunction(() => window.__streamSound);

  await page.waitForTimeout(500);
  if (await sound.getAttribute('aria-pressed') === 'true') {
    await sound.click();
    await page.waitForFunction(() => document.querySelector('.zmh-sound-control')?.getAttribute('aria-pressed') === 'false');
  }
  await sound.click();
  await page.waitForFunction(() => document.querySelector('.zmh-sound-control')?.getAttribute('aria-pressed') === 'true' && !window.__streamSound.paused);
  const soundSettings = await page.evaluate(() => ({ volume: window.__streamSound.volume, rate: window.__streamSound.playbackRate }));
  if (soundSettings.volume !== .15 || soundSettings.rate !== 1) throw new Error(`Unexpected sound settings: ${JSON.stringify(soundSettings)}`);
  if (audioRequests.length !== 1) throw new Error(`Expected one audio request, got ${audioRequests.length}`);

  await sound.click();
  await page.waitForFunction(() => document.querySelector('.zmh-sound-control')?.getAttribute('aria-pressed') === 'false' && window.__streamSound.paused);
  await sound.click();
  await page.waitForFunction(() => document.querySelector('.zmh-sound-control')?.getAttribute('aria-pressed') === 'true' && !window.__streamSound.paused);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.addInitScript(() => {
    localStorage.setItem('zm-stream-muted', 'true');
    localStorage.setItem('zm_analytics_consent', 'denied');
  });
  await mobile.goto('http://127.0.0.1:4180/', { waitUntil: 'domcontentloaded' });
  const mobileSound = mobile.getByRole('button', { name: 'Włącz dźwięk strumyka' });
  await mobileSound.waitFor({ state: 'visible' });
  const mobileLayout = await mobileSound.evaluate(element => {
    const label = element.querySelector('.zmh-control-label');
    return { overflow: document.documentElement.scrollWidth > innerWidth + 2, label: label?.textContent?.trim(), whiteSpace: getComputedStyle(label).whiteSpace };
  });
  if (mobileLayout.overflow || mobileLayout.whiteSpace !== 'nowrap') throw new Error(`Invalid mobile sound layout: ${JSON.stringify(mobileLayout)}`);
  console.log(JSON.stringify({ ok: true, audioRequests: audioRequests.length, soundSettings, mobileLayout }));
} finally {
  await browser.close();
}
