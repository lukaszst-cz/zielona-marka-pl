import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = "https://zielona-marka.pl";
const output = "outputs/production-audit-20260929";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const checks = [];
try {
  for (const config of [{ name: "phone", width: 390, menu: ".zm-mobile-menu" }, { name: "desktop", width: 1440, menu: ".zm-offer-menu" }]) {
    const context = await browser.newContext({ viewport: { width: config.width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      localStorage.setItem("zm_analytics_consent", "denied");
      localStorage.setItem("zm-stream-muted", "true");
    });
    await page.goto(base, { waitUntil: "networkidle" });
    const summary = page.locator(`${config.menu}>summary`);
    await summary.focus();
    const focusStyle = await summary.evaluate((element) => {
      const style = getComputedStyle(element);
      return { outline: style.outline, boxShadow: style.boxShadow };
    });
    await page.keyboard.press("Enter");
    const open = await page.locator(config.menu).evaluate((element) => element.open);
    await page.keyboard.press("Tab");
    const tabInside = await page.evaluate((selector) => Boolean(document.activeElement?.closest(`${selector}>div`)), config.menu);
    checks.push({ name: `${config.name}-keyboard-menu`, ok: open && tabInside, focusStyle });

    const assistant = page.getByRole("button", { name: "Wypróbuj asystenta", exact: true });
    if (await assistant.count()) {
      await assistant.click();
      const closeFocused = await page.getByRole("button", { name: "Zamknij asystenta", exact: true }).evaluate((element) => element === document.activeElement);
      await page.keyboard.press("Escape");
      const triggerRestored = await assistant.evaluate((element) => element === document.activeElement);
      checks.push({ name: `${config.name}-assistant-focus`, ok: closeFocused && triggerRestored });
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem("zm_analytics_consent", "denied"));
  await page.goto(`${base}/kontakt`, { waitUntil: "networkidle" });
  const form = await page.locator("form").first().evaluate((form) => ({
    controls: [...form.querySelectorAll("input:not([type=hidden]):not([aria-hidden=true]),textarea,select")].map((field) => ({ name: field.name, labels: field.labels?.length || 0, ariaLabel: field.getAttribute("aria-label") || "", required: field.required })),
    action: form.getAttribute("action"),
    method: form.getAttribute("method"),
  }));
  checks.push({ name: "contact-form-labels", ok: form.controls.every((field) => field.labels > 0 || field.ariaLabel), form });
  await context.close();
} finally {
  await browser.close();
}

await writeFile(`${output}/interactions.json`, JSON.stringify(checks, null, 2));
console.log(JSON.stringify(checks, null, 2));
if (checks.some((check) => !check.ok)) process.exitCode = 1;
