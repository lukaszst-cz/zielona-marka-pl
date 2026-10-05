import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:4180";
const output = base.startsWith("https:") ? "outputs/strict-seo-visual-production-20260929" : "outputs/strict-seo-visual-20260928";
await mkdir(output, { recursive: true });
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const publicRoutes = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname))];
const extraRoutes = [
  "/demo/natura-strona", "/demo/bistro-strona", "/demo/dom-strona", "/demo/transport",
  "/koncepcja-zielonej-marki", "/status", "/demo/natura", "/demo/bistro", "/demo/dom",
  "/demo/mini-audyt-zielona-marka", "/demo/mapa-szans-zielona-marka",
];
const routes = [...new Set([...publicRoutes, ...extraRoutes])];
const captureRoutes = new Set(["/", "/oferta", "/realizacje", "/demo/natura", "/demo/transport"]);
const viewports = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = { routes: routes.length, publicRoutes: publicRoutes.length, views: [], seo: [], issues: [], advisories: [] };

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    await page.addInitScript(() => {
      localStorage.setItem("zm_analytics_consent", "denied");
      localStorage.setItem("zm-stream-muted", "true");
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    for (const route of routes) {
      errors.length = 0;
      try {
        const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
        const data = await page.evaluate(() => {
          const visible = (element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
          };
          const smallControls = [...document.querySelectorAll("button,input:not([type=hidden]),textarea,select,summary")]
            .filter(visible)
            .filter((element) => element.getAttribute("aria-hidden") !== "true")
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              const label = element instanceof HTMLInputElement ? element.labels?.[0] : null;
              if (label && visible(label)) {
                const labelRect = label.getBoundingClientRect();
                if (labelRect.width >= 36 && labelRect.height >= 36) return false;
              }
              return rect.width < 36 || rect.height < 36;
            })
            .map((element) => ({ tag: element.tagName, text: element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 60), box: { width: Math.round(element.getBoundingClientRect().width), height: Math.round(element.getBoundingClientRect().height) } }));
          const clippedText = [...document.querySelectorAll("h1,h2,h3,p,button,a,label")]
            .filter(visible)
            .filter((element) => {
              const style = getComputedStyle(element);
              return (element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2) && ["hidden", "clip"].includes(style.overflow);
            })
            .map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 80) }));
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || "",
            canonical: document.querySelector('link[rel="canonical"]')?.href || "",
            robots: document.querySelector('meta[name="robots"]')?.content || "",
            language: document.documentElement.lang,
            viewportMeta: document.querySelector('meta[name="viewport"]')?.content || "",
            ogTitle: document.querySelector('meta[property="og:title"]')?.content || "",
            ogDescription: document.querySelector('meta[property="og:description"]')?.content || "",
            ogImage: document.querySelector('meta[property="og:image"]')?.content || "",
            h1: [...document.querySelectorAll("h1")].filter(visible).length,
            overflow: document.documentElement.scrollWidth > innerWidth + 2,
            documentWidth: document.documentElement.scrollWidth,
            brokenImages: [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.currentSrc || image.src),
            missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).map((image) => image.currentSrc || image.src),
            unnamedInputs: [...document.querySelectorAll("input,textarea,select")].filter((field) => field.getAttribute("aria-hidden") !== "true" && !field.getAttribute("aria-label") && !field.labels?.length).map((field) => field.outerHTML.slice(0, 100)),
            invalidJsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].filter((node) => { try { JSON.parse(node.textContent || ""); return false; } catch { return true; } }).length,
            smallControls,
            clippedText,
          };
        });
        const row = { route, viewport: viewport.name, width: viewport.width, status: response?.status() || 0, errors: [...errors], ...data };
        report.views.push(row);
        if (captureRoutes.has(route)) await page.screenshot({ path: `${output}/${viewport.name}-${route === "/" ? "home" : route.replaceAll(/[/?=&]+/g, "-").replace(/^-|-$/g, "")}.png`, fullPage: false });
        const visualProblems = row.status !== 200 || row.errors.length || row.h1 !== 1 || row.overflow || row.brokenImages.length || row.missingAlt.length || row.unnamedInputs.length || row.invalidJsonLd || row.clippedText.length;
        if (visualProblems) report.issues.push({ type: "render", ...row });
        if (viewport.width <= 768 && row.smallControls.length) report.advisories.push({ type: "small-controls", route, viewport: viewport.name, controls: row.smallControls });

        if (viewport.name === "desktop" && publicRoutes.includes(route)) {
          const seoRow = { route, title: row.title, description: row.description, canonical: row.canonical, robots: row.robots, language: row.language, viewportMeta: row.viewportMeta, ogTitle: row.ogTitle, ogDescription: row.ogDescription, ogImage: row.ogImage };
          report.seo.push(seoRow);
          const canonicalTarget = `https://zielona-marka.pl${route === "/" ? "" : route}`;
          if (!row.title || !row.description || row.canonical.replace(/\/$/, "") !== canonicalTarget || row.robots.includes("noindex") || !row.language || !row.viewportMeta || !row.ogTitle || !row.ogDescription || !row.ogImage) report.issues.push({ type: "seo", ...seoRow, canonicalTarget });
          if (row.title.length > 65 || row.description.length < 70 || row.description.length > 170) report.advisories.push({ type: "snippet-length", route, titleLength: row.title.length, descriptionLength: row.description.length });
        }
      } catch (error) {
        report.issues.push({ type: "navigation", route, viewport: viewport.name, error: String(error) });
      }
    }
    await page.close();
  }

  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const row of report.seo) {
      if (seen.has(row[key])) report.issues.push({ type: `duplicate-${key}`, routes: [seen.get(row[key]), row.route] });
      else seen.set(row[key], row.route);
    }
  }

  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ routes: report.routes, publicRoutes: report.publicRoutes, views: report.views.length, issues: report.issues, advisoryCount: report.advisories.length }, null, 2));
} finally {
  await browser.close();
}
