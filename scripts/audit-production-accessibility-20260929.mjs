import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = "https://zielona-marka.pl";
const output = "outputs/production-audit-20260929";
const routes = [
  "/", "/oferta", "/kontakt", "/realizacje", "/modernizacja-strony",
  "/demo/natura-strona", "/demo/bistro-strona", "/demo/dom-strona", "/demo/transport",
  "/demo/auto-naprawa/portal/?role=manager", "/demo/routeflow/portal/?role=manager",
];
const viewports = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const views = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      localStorage.setItem("zm_analytics_consent", "denied");
      localStorage.setItem("zm-stream-muted", "true");
    });
    for (const route of routes) {
      const errors = [];
      page.removeAllListeners("pageerror");
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 45_000 });
      const data = await page.evaluate(() => {
        const visible = (element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
        };
        const text = (element) => (element.getAttribute("aria-label") || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90);
        const effectiveRect = (element) => {
          const own = element.getBoundingClientRect();
          if (!element.labels?.length) return own;
          const label = element.labels[0].getBoundingClientRect();
          return label.width * label.height > own.width * own.height ? label : own;
        };
        const interactives = [...document.querySelectorAll("a[href],button,input:not([type=hidden]),textarea,select,summary,[role=button]")].filter(visible);
        const unnamed = interactives.filter((element) => {
          if (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) return !element.getAttribute("aria-label") && !element.labels?.length && element.type !== "submit";
          return !text(element) && !element.getAttribute("title");
        }).map((element) => element.outerHTML.slice(0, 140));
        const tinyTargets = interactives.map((element) => ({ element, rect: effectiveRect(element) }))
          .filter(({ rect }) => rect.width < 24 || rect.height < 24)
          .map(({ element, rect }) => ({ tag: element.tagName, text: text(element), width: Math.round(rect.width), height: Math.round(rect.height) }));
        const ids = [...document.querySelectorAll("[id]")].map((element) => element.id).filter(Boolean);
        const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        return {
          title: document.title,
          h1: [...document.querySelectorAll("h1")].filter(visible).length,
          main: document.querySelectorAll("main").length,
          nav: document.querySelectorAll("nav").length,
          lang: document.documentElement.lang,
          overflow: document.documentElement.scrollWidth > innerWidth + 2,
          brokenImages: [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.currentSrc || image.src),
          missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).map((image) => image.currentSrc || image.src),
          unnamed,
          tinyTargets,
          duplicateIds,
          runningAnimations: document.getAnimations().filter((animation) => animation.playState === "running").length,
        };
      });
      views.push({ route, viewport: viewport.name, status: response?.status() || 0, errors, ...data });
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const issues = views.filter((row) => row.status !== 200 || row.errors.length || row.h1 !== 1 || row.main !== 1 || !row.lang || row.overflow || row.brokenImages.length || row.missingAlt.length || row.unnamed.length || row.duplicateIds.length || row.tinyTargets.length);
const summary = {
  routes: routes.length,
  views: views.length,
  issues: issues.length,
  javascriptErrors: views.reduce((sum, row) => sum + row.errors.length, 0),
  horizontalOverflow: views.filter((row) => row.overflow).length,
  brokenImages: views.reduce((sum, row) => sum + row.brokenImages.length, 0),
  missingAlt: views.reduce((sum, row) => sum + row.missingAlt.length, 0),
  unnamedControls: views.reduce((sum, row) => sum + row.unnamed.length, 0),
  targetsBelow24: views.reduce((sum, row) => sum + row.tinyTargets.length, 0),
  duplicateIds: views.reduce((sum, row) => sum + row.duplicateIds.length, 0),
};
await writeFile(`${output}/accessibility-responsive.json`, JSON.stringify({ summary, issues, views }, null, 2));
console.log(JSON.stringify({ summary, issues }, null, 2));
if (issues.length) process.exitCode = 1;
