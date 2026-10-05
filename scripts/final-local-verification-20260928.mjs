import { chromium } from "file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:4180";
const output = "outputs/final-verification-20260928";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = { metadata: [], links: [], interactions: [], issues: [] };

try {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const routes = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname))];
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("zm_analytics_consent", "denied");
    window.__finalCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__finalCls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  const internalLinks = new Map();

  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
    const data = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || "",
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      links: [...document.querySelectorAll("a[href]")].map((link) => link.getAttribute("href")),
    }));
    report.metadata.push({ route, title: data.title, description: data.description, canonical: data.canonical });
    for (const href of data.links) {
      try {
        const url = new URL(href, base + route);
        if (url.origin === base || url.origin === "https://zielona-marka.pl") internalLinks.set(url.pathname + url.search + url.hash, route);
      } catch {
        report.issues.push({ type: "invalid-link", route, href });
      }
    }
  }

  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const row of report.metadata) {
      if (!row[key]) report.issues.push({ type: `missing-${key}`, route: row.route });
      else if (seen.has(row[key])) report.issues.push({ type: `duplicate-${key}`, routes: [seen.get(row[key]), row.route] });
      else seen.set(row[key], row.route);
    }
  }

  for (const [link, from] of internalLinks) {
    const url = new URL(link, base);
    const response = await fetch(base + url.pathname + url.search);
    const body = await response.text();
    const anchor = !url.hash || body.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`);
    const row = { link, from, status: response.status, anchor };
    report.links.push(row);
    if (!response.ok || !anchor) report.issues.push({ type: "link", ...row });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".zm-mobile-menu summary").click();
  report.interactions.push({ name: "mobile-menu", ok: await page.locator('.zm-mobile-menu a[href="/kontakt"]').isVisible() });
  await page.locator(".zm-mobile-menu summary").click();

  await page.locator('#krotki-brief [name="name"]').fill("Lokalny test offline");
  await page.locator('#krotki-brief [name="email"]').fill("offline@example.invalid");
  await page.locator('#krotki-brief [name="message"]').fill("Lokalny test obsługi błędu sieci.");
  await page.locator("#krotki-brief .zmh-privacy-check input").check();
  await page.route("**/api/inquiries", (route) => route.abort("internetdisconnected"));
  await page.locator('#krotki-brief button[type="submit"]').click();
  await page.locator('#krotki-brief [role="alert"]').waitFor();
  report.interactions.push({
    name: "offline-form-recovery",
    ok: (await page.locator('#krotki-brief [role="alert"]').innerText()).includes("nie została wysłana") && await page.locator('#krotki-brief button[type="submit"]').isEnabled(),
  });
  await page.unroute("**/api/inquiries");

  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole("button", { name: "Wypróbuj asystenta", exact: true }).click();
  report.interactions.push({ name: "assistant-focus", ok: await page.getByRole("button", { name: "Zamknij asystenta", exact: true }).evaluate((element) => element === document.activeElement) });
  await page.keyboard.press("Escape");
  report.interactions.push({ name: "assistant-escape", ok: await page.getByRole("button", { name: "Wypróbuj asystenta", exact: true }).evaluate((element) => element === document.activeElement) });

  await page.goto(base + "/kontakt", { waitUntil: "networkidle" });
  const ownerPhoto = page.getByRole("img", { name: "Łukasz, osoba kontaktowa w Zielonej Marce" });
  report.interactions.push({ name: "contact-photo", ok: await ownerPhoto.isVisible() && await ownerPhoto.evaluate((image) => image.naturalWidth > 0) });
  await page.locator(".contact-form").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.documentElement.classList.contains("contact-form-visible"));
  report.interactions.push({ name: "floating-buttons-clear-form", ok: !await page.locator(".whatsapp-float").isVisible() && !await page.locator(".demo-assistant-trigger").isVisible() });
  report.interactions.push({ name: "contact-layout-shift", ok: await page.evaluate(() => window.__finalCls < 0.1), value: await page.evaluate(() => window.__finalCls) });

  report.issues.push(...report.interactions.filter((item) => !item.ok));
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ pages: report.metadata.length, links: report.links.length, interactions: report.interactions, issues: report.issues }, null, 2));
} finally {
  await browser.close();
}
