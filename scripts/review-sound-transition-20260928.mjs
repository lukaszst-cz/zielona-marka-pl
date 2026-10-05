import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:4180";
const output = "outputs/sound-transition-20260928";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = [];

try {
  for (const viewport of [
    { name: "phone", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.removeItem("zm-stream-muted");
      localStorage.setItem("zm_analytics_consent", "denied");
      const NativeAudio = window.Audio;
      window.Audio = function AudioCapture(src) {
        const sound = new NativeAudio(src);
        window.__streamSound = sound;
        window.__soundCreatedAt = performance.now();
        return sound;
      };
    });
    const response = await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const initial = await page.evaluate(() => {
      const button = document.querySelector(".zmh-sound-control");
      const label = button?.querySelector(".zmh-control-label");
      const icon = button?.querySelector(".zmh-control-icon");
      const buttonBox = button?.getBoundingClientRect();
      const labelBox = label?.getBoundingClientRect();
      const iconBox = icon?.getBoundingClientRect();
      return {
        soundCreated: Boolean(window.__streamSound),
        soundPaused: window.__streamSound?.paused ?? true,
        soundCreatedAt: window.__soundCreatedAt ?? null,
        videoStarted: Boolean(document.querySelector(".zmh-living-forest video")?.getAttribute("src")),
        soundButtons: document.querySelectorAll(".zmh-sound-control").length,
        volumeButtons: document.querySelectorAll(".zmh-volume-control").length,
        speakerIcons: document.querySelectorAll(".zmh-sound-control svg").length,
        label: label?.textContent?.trim(),
        labelOneLine: Boolean(labelBox && buttonBox && labelBox.height < buttonBox.height && getComputedStyle(label).whiteSpace === "nowrap"),
        iconCentred: Boolean(iconBox && Math.abs(iconBox.width - iconBox.height) < 1 && getComputedStyle(icon).display === "grid"),
        overflow: document.documentElement.scrollWidth > innerWidth + 2,
      };
    });
    await page.screenshot({ path: `${output}/${viewport.name}-opening.png`, fullPage: false });

    const soundButton = page.locator(".zmh-sound-control");
    if (await soundButton.getAttribute("aria-pressed") === "true") await soundButton.click();
    await soundButton.click();
    await page.waitForFunction(() => document.querySelector(".zmh-sound-control")?.getAttribute("aria-pressed") === "true" && window.__streamSound && !window.__streamSound.paused);
    const afterClick = await page.evaluate(() => ({ soundOn: document.querySelector(".zmh-sound-control")?.getAttribute("aria-pressed") === "true", paused: window.__streamSound?.paused }));

    await page.locator(".zmh-scene-transition").scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollBy(0, -Math.round(innerHeight * .3)));
    await page.waitForTimeout(200);
    const transition = await page.locator(".zmh-scene-transition").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { height: rect.height, background: style.backgroundImage };
    });
    await page.screenshot({ path: `${output}/${viewport.name}-transition.png`, fullPage: false });
    report.push({ viewport, status: response?.status(), errors, initial, afterClick, transition });
    await page.close();
  }
  const issues = report.filter((row) => row.status !== 200 || row.errors.length || row.initial.soundButtons !== 1 || row.initial.volumeButtons !== 0 || row.initial.speakerIcons !== 1 || !row.initial.labelOneLine || !row.initial.iconCentred || row.initial.overflow || !row.afterClick.soundOn || row.afterClick.paused || row.transition.height > 50);
  await writeFile(`${output}/report.json`, JSON.stringify({ report, issues }, null, 2));
  console.log(JSON.stringify({ views: report.length, issues, report }, null, 2));
} finally {
  await browser.close();
}
