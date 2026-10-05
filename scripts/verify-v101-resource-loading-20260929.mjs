import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.argv[2] || "http://127.0.0.1:4191";
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => {
  localStorage.setItem("zm_analytics_consent", "denied");
  localStorage.setItem("zm-stream-muted", "true");
});
const resources = [];
page.on("response", response => {
  const name = new URL(response.url()).pathname;
  if (/user-stream-tree|stream-water-bottom|forest-continuous|concept-natura|\.mp4$/.test(name)) resources.push(name);
});

await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1200);
const early = [...resources];
await page.waitForTimeout(3000);
const afterHeroFilm = [...resources];
await page.locator(".zmh-assembly").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const afterProcessApproach = [...resources];
await page.goto(`${base}/kontakt`, { waitUntil: "domcontentloaded" });
const targets = await page.locator(".contact-form .form-consent").first().evaluate(label => {
  const input = label.querySelector("input");
  const link = label.querySelector("a");
  const box = element => {
    const rect = element?.getBoundingClientRect();
    return rect ? { width: Math.round(rect.width), height: Math.round(rect.height) } : null;
  };
  return { label: box(label), input: box(input), link: box(link) };
});
const smallInputs = await page.locator("input").evaluateAll(inputs => inputs.flatMap(input => {
  const rect = input.getBoundingClientRect();
  const style = getComputedStyle(input);
  if (!rect.width || !rect.height || style.display === "none" || style.visibility === "hidden" || (rect.width >= 36 && rect.height >= 36)) return [];
  return [{ type: input.type, name: input.name, className: input.className, width: Math.round(rect.width), height: Math.round(rect.height), labels: [...input.labels ?? []].map(label => ({ className: label.className, width: Math.round(label.getBoundingClientRect().width), height: Math.round(label.getBoundingClientRect().height) })) }];
}));
const result = {
  early,
  afterHeroFilm,
  afterProcessApproach,
  assertions: {
    treeDeferredInitially: !early.some(item => item.includes("user-stream-tree")),
    streamDeferredInitially: !early.some(item => item.includes("stream-water-bottom")),
    mobileFilmUsed: afterHeroFilm.some(item => item.includes("fern-moss-stream-mobile")),
    treeLoadedWithFilm: afterHeroFilm.some(item => item.includes("user-stream-tree")),
    streamLoadedNearProcess: afterProcessApproach.some(item => item.includes("stream-water-bottom")),
    consentLabelAtLeast44: targets.label?.height >= 44,
  },
  targets,
  smallInputs,
};
console.log(JSON.stringify(result, null, 2));
await browser.close();
if (Object.values(result.assertions).some(value => !value)) process.exitCode = 1;
