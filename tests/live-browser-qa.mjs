import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
// The QA runtime is installed separately from the production app dependencies.
const { chromium } = await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright");

/* Production smoke checks — never POST or submit a real inquiry. */
const base = (process.env.BROWSER_QA_URL || "https://zielona-marka.pl").replace(/\/$/, "");
const dir = "browser-qa-artifacts";
mkdirSync(dir, { recursive: true });
const result = { base, checkedAt: new Date().toISOString(), checks: [], screenshots: [], warnings: [], privacyProtections: { blockedCloudflareAnalytics: 0 } };
const routes = [
  ["/", "home"], ["/oferta", "offer"], ["/dtp", "dtp"],
  ["/opieka-nad-strona", "care"], ["/poradnik", "blog"],
  ["/poradnik/ile-kosztuje-projekt-gazetki", "article-dtp"],
  ["/poradnik/ile-kosztuje-strona-dla-malej-firmy", "article-www"],
  ["/modernizacja-strony", "modernization"],
  ["/usprawnienia-firmy", "improvements"],
  ["/projektuj-strone", "studio"],
  ["/standardy-jakosci", "quality-hub"],
  ["/standard-jakosci", "quality-process"],
  ["/standard-dtp", "quality-prepress"],
];
async function check(name, fn) {
  try {
    const info = await fn();
    result.checks.push({ name, status: "pass", ...(info && { info }) });
    process.stdout.write("PASS " + name + "\n");
  } catch (error) {
    result.checks.push({ name, status: "fail", error: String(error?.message || error).slice(0, 650) });
    process.stderr.write("FAIL " + name + ": " + error + "\n");
  }
}
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const size of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
    ...(process.env.BROWSER_QA_FULL === "1" ? [
      { name: "tablet", width: 768, height: 1024 },
      { name: "laptop", width: 1024, height: 900 },
      { name: "compact", width: 320, height: 720 },
    ] : []),
  ]) {
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height }, deviceScaleFactor: 1,
      reducedMotion: "reduce", locale: "pl-PL",
    });
    await context.addInitScript(() => {
      try { localStorage.setItem("zm_analytics_consent", "denied"); } catch { /* Storage may be blocked by privacy controls. */ }
    });
    const page = await context.newPage();
    const analyticsRequestsWithoutConsent = [];
    const failedJsChunks = [];
    page.on("response", response => {
      const url = new URL(response.url());
      if (url.pathname.startsWith("/_next/static/chunks/") && response.status() >= 400) {
        failedJsChunks.push({ path: url.pathname, status: response.status() });
      }
    });
    page.on("request", request => {
      const address = new URL(request.url());
      if ((address.hostname === "www.googletagmanager.com" && address.pathname.startsWith("/gtag/js"))
        || ["www.google-analytics.com", "region1.google-analytics.com"].includes(address.hostname)) {
        analyticsRequestsWithoutConsent.push(address.origin + address.pathname);
      }
    });
    page.on("pageerror", error => {
      if (result.warnings.length < 50) result.warnings.push({ viewport: size.name, javascript: String(error.message).slice(0, 320) });
    });
    page.on("console", msg => {
      if (msg.type() !== "error") return;
      const message = msg.text();
      if (message.includes("Refused to load the script") && message.includes("static.cloudflareinsights.com/beacon.min.js") && message.includes("Content Security Policy")) {
        result.privacyProtections.blockedCloudflareAnalytics += 1;
        return;
      }
      if (result.warnings.length < 50) result.warnings.push({ viewport: size.name, consoleError: message.slice(0, 320) });
    });
    for (const [route, key] of routes) {
      await check(size.name + " " + route + " renders and captures", async () => {
        const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.ok(response?.ok(), "HTTP " + response?.status());
        await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
        await page.evaluate(async () => { await document.fonts.ready; });
        const metrics = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: window.innerWidth,
          title: document.title,
          text: document.body.innerText.length,
        }));
        if (metrics.text <= 200) {
          // DOMContentLoaded can precede client-side content rendering; wait briefly,
          // but keep the failure if the page remains empty.
          await page.waitForFunction(() => document.body.innerText.length > 200, null, { timeout: 10000 });
          metrics.text = await page.evaluate(() => document.body.innerText.length);
        }
        assert.ok(metrics.text > 200, "Empty public page after content readiness wait");
        const overlappingActions = await page.evaluate(() => {
          const visible = (node) => {
            const rect = node.getBoundingClientRect();
            const css = getComputedStyle(node);
            return rect.width > 1 && rect.height > 1 && css.visibility !== "hidden" && css.display !== "none";
          };
          const collides = (left, right) => {
            const a = left.getBoundingClientRect(), b = right.getBoundingClientRect();
            return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 4 &&
              Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 4;
          };
          const errors = [];
          const groups = document.querySelectorAll(
            ".zmh-actions, .hero-actions, .zm-mega-quick-actions, .zmh-social-panel-links, .zm-footer-social-links"
          );
          for (const group of groups) {
            if (!visible(group)) continue;
            const items = [...group.querySelectorAll(":scope > a, :scope > button")].filter(visible);
            for (let i = 0; i < items.length; i++) {
              for (let j = i + 1; j < items.length; j++) {
                if (collides(items[i], items[j])) {
                  errors.push(group.className + ": " + items[i].innerText.slice(0, 45) +
                    " / " + items[j].innerText.slice(0, 45));
                }
              }
            }
          }
          const header = document.querySelector(".zm-header");
          const brand = header?.querySelector(".zm-brand");
          const menuToggle = header?.querySelector(".zm-mobile-menu > summary");
          if (brand && menuToggle && visible(brand) && visible(menuToggle) && collides(brand, menuToggle)) {
            errors.push("Brand collides with mobile menu toggle");
          }
          return errors;
        });
        assert.deepEqual(overlappingActions, [], route + " overlapping CTA controls");
        const contactDockState = await page.evaluate(() => {
          const dock = document.querySelector(".zm-contact-dock");
          if (!dock) return { exists: false };
          const assistant = dock.querySelector(".demo-assistant");
          const whatsapp = dock.querySelector(".whatsapp-float");
          const style = (el) => el ? getComputedStyle(el).position : "missing";
          return { exists: true, assistant: style(assistant), whatsapp: style(whatsapp) };
        });
        assert.equal(contactDockState.exists, true, route + " contact dock missing");
        assert.notEqual(contactDockState.assistant, "fixed", route + " assistant obstructs reading");
        assert.notEqual(contactDockState.whatsapp, "fixed", route + " WhatsApp obstructs reading");
        const oversizedCtas = await page.evaluate(() => [...document.querySelectorAll(".hero-actions > a")]
          .filter(link => {
            const rect = link.getBoundingClientRect();
            const css = getComputedStyle(link);
            return rect.height > 105 && css.display !== "none" && css.visibility !== "hidden";
          })
          .map(link => ({ label: link.textContent?.trim().slice(0, 55), height: Math.round(link.getBoundingClientRect().height) })));
        assert.deepEqual(oversizedCtas, [], route + " CTA grows beyond expected mobile height");

        if (metrics.width > metrics.viewport + 8) {
          const overflowPx = metrics.width - metrics.viewport;
          result.warnings.push({ viewport: size.name, route, overflowPx });
          if (process.env.BROWSER_QA_FULL === "1") {
            assert.fail(route + " exceeds " + metrics.viewport + "px viewport by " + overflowPx + "px");
          }
        }
        const path = dir + "/" + size.name + "-" + key + ".png";
        await page.evaluate(() => {
          for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = "eager";
        });
        await page.waitForTimeout(250);
        await page.screenshot({ path, fullPage: true, animations: "disabled", timeout: 45000 });
        result.screenshots.push(path);
        return metrics;
      });
    }
    if (["desktop", "mobile", "compact"].includes(size.name)) {
      await check(size.name + ": Blog shares public layout with Offer", async () => {
        const blogResponse = await page.goto(base + "/poradnik", { waitUntil: "networkidle", timeout: 45000 });
        assert.ok(blogResponse?.ok(), "Blog did not load");
        const blog = await page.evaluate(() => {
          const main = document.querySelector("main.zm-blog-page");
          const hero = main?.querySelector(":scope > .page-hero.shell");
          const cards = [...(main?.querySelectorAll(".zm-blog-results > a") ?? [])];
          const grid = main?.querySelector(".zm-blog-results");
          const first = cards[0];
          const byline = main?.querySelector(".zm-blog-byline");
          return {
            hasHero: !!hero,
            heroWidth: hero?.getBoundingClientRect().width ?? 0,
            backgroundImage: main ? getComputedStyle(main).backgroundImage : "",
            overlayContent: main ? getComputedStyle(main, "::before").content : "",
            headerCount: document.querySelectorAll(".zm-header").length,
            footerCount: document.querySelectorAll(".zm-footer").length,
            cards: cards.length,
            columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0,
            cardBackgroundImage: first ? getComputedStyle(first).backgroundImage : "",
            cardMinHeight: first ? parseFloat(getComputedStyle(first).minHeight) : -1,
            author: byline?.textContent?.includes("Łukasz Staniewicz") ?? false,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
          };
        });
        assert.equal(blog.hasHero, true, "Blog missing shared hero");
        assert.ok(blog.backgroundImage.includes("forest-continuous.webp"), "Blog lost the shared forest backdrop");
        assert.ok(["none", "normal"].includes(blog.overlayContent), "Blog still has a separate full-page dark overlay");
        assert.equal(blog.headerCount, 1, "Blog missing shared header");
        assert.equal(blog.footerCount, 1, "Blog missing shared footer");
        assert.equal(blog.author, true, "Blog author byline missing");
        assert.ok(blog.cards >= 6, "Blog cards disappeared");
        assert.equal(blog.columns, size.name === "desktop" ? 2 : 1, "Blog card columns");
        assert.equal(blog.cardBackgroundImage, "none", "Blog still uses an isolated photographic card theme");
        assert.ok(blog.cardMinHeight <= 350, "Blog cards still force the oversized former layout");
        assert.ok(blog.documentWidth <= blog.viewportWidth + 8, "Blog overflows the viewport");

        const offerResponse = await page.goto(base + "/oferta", { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.ok(offerResponse?.ok(), "Offer did not load");
        const offerWidth = await page.locator("main.zm-public > .page-hero.shell").evaluate(el => el.getBoundingClientRect().width);
        assert.ok(Math.abs(offerWidth - blog.heroWidth) < 3,
          "Blog and Offer hero container widths differ: " + blog.heroWidth + " vs " + offerWidth);
        const articleResponse = await page.goto(base + "/poradnik/ile-kosztuje-strona-dla-malej-firmy", { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.ok(articleResponse?.ok(), "Guide article did not load");
        const articlePage = await page.evaluate(() => {
          const main = document.querySelector("main.zm-public.guide-page");
          const wrapper = main?.querySelector(":scope > article");
          const style = wrapper ? getComputedStyle(wrapper) : null;
          return {
            backgroundImage: main ? getComputedStyle(main).backgroundImage : "",
            paddingLeft: style ? parseFloat(style.paddingLeft) : -1,
            wrapperBackgroundColor: style?.backgroundColor ?? "",
          };
        });
        assert.ok(articlePage.backgroundImage.includes("forest-continuous.webp"), "Guide article lost the shared forest backdrop");
        assert.equal(articlePage.paddingLeft, 0, "Semantic article wrapper still has card padding");
        assert.equal(articlePage.wrapperBackgroundColor, "rgba(0, 0, 0, 0)", "Semantic article wrapper still has a solid card background");
        return { blogCards: blog.cards, columns: blog.columns, sharedHeroWidth: Math.round(blog.heroWidth), guideLayout: "forest" };
      });
    }
    if (["desktop", "mobile"].includes(size.name)) {
      await check(size.name + ": all eight blog articles share readable public layouts", async () => {
        const articleSlugs = [
          "co-powinna-miec-strona-firmy-uslugowej",
          "dlaczego-strona-firmy-nie-przynosi-zapytan",
          "ile-kosztuje-projekt-gazetki",
          "ile-kosztuje-strona-dla-malej-firmy",
          "jak-przygotowac-pdf-do-druku",
          "jak-uporzadkowac-zapytania-klientow",
          "strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
          "strona-internetowa-dla-warsztatu-co-powinna-zawierac",
        ];
        const pages = [];
        for (const [index, slug] of articleSlugs.entries()) {
          const response = await page.goto(base + "/poradnik/" + slug, { waitUntil: "domcontentloaded", timeout: 45000 });
          assert.ok(response?.ok(), slug + ": article HTTP error");
          const appearance = await page.evaluate(() => {
            const main = document.querySelector("main.zm-public.guide-page:not(.zm-blog-page)");
            const hero = main?.querySelector(":scope > article > .page-hero.shell");
            const title = hero?.querySelector("h1");
            const sections = main ? [...main.querySelectorAll("section, aside, .zm-guide-highlights > div")] : [];
            const tooLight = [];
            for (const section of sections) {
              const styles = getComputedStyle(section);
              const match = styles.backgroundColor.match(/rgba?\(([^)]+)\)/);
              if (!match) continue;
              const channels = match[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
              const alpha = channels.length > 3 ? channels[3] : 1;
              const luminance = (channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722) / 255;
              if (alpha >= .8 && luminance >= .6) {
                tooLight.push({ tag: section.tagName, className: section.className, background: styles.backgroundColor });
              }
            }
            return {
              heroWidth: hero?.getBoundingClientRect().width || 0,
              hasTitle: !!title?.textContent?.trim(),
              backgroundImage: main ? getComputedStyle(main).backgroundImage : "",
              horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
              lightSections: tooLight.slice(0, 8),
            };
          });
          assert.equal(appearance.hasTitle, true, slug + ": missing article header");
          assert.ok(appearance.backgroundImage.includes("forest-continuous.webp"), slug + ": lost the shared forest backdrop");
          assert.deepEqual(appearance.lightSections, [], slug + ": light sections behind white text");
          assert.ok(appearance.horizontalOverflow <= 8, slug + ": horizontal overflow");
          assert.ok(appearance.heroWidth > 260, slug + ": unexpected article column width");
          pages.push(slug);
          if ([2, 3, 4].includes(index)) {
            const filename = dir + "/" + size.name + "-guide-" + slug + ".png";
            await page.screenshot({ path: filename, fullPage: true, animations: "disabled", timeout: 45000 });
            result.screenshots.push(filename);
          }
        }
        return { articles: pages.length, verified: pages };
      });
    }
    if (["desktop", "mobile"].includes(size.name)) {
      await check(size.name + ": ZM Studio layout previews", async () {
        await page.goto(base + "/projektuj-strone", { waitUntil: "networkidle", timeout: 45000 });
        const preview = page.locator(".zm-creator-preview-frame");
        const layoutVariants = [
          ["classic", "Klasyczny firmowy"],
          ["editorial", "Editorial premium"],
          ["minimal", "Minimal & elegancja"],
          ["showcase", "Galeria i realizacje"],
          ["contact", "Lokalny kontakt"],
          ["atelier", "Atelier asymetryczne"],
          ["catalog", "Katalog ofertowy"],
        ];
        for (const [id, title] of layoutVariants) {
          const choice = page.locator(".zm-creator-layout-grid button").filter({ hasText: title });
          await choice.click();
          assert.equal(await choice.getAttribute("aria-pressed"), "true", "Layout not selected: " + title);
          assert.equal(await preview.locator(".zm-demo-layout-" + id).count(), 1, "Layout class missing: " + title);
          const destination = dir + "/" + size.name + "-layout-" + id + ".png";
          await preview.screenshot({ path: destination, animations: "disabled", timeout: 45000 });
          result.screenshots.push(destination);
        }
        return { layouts: layoutVariants.length, screenshots: layoutVariants.length };
      });
    }
    if (size.name === "desktop") {
      await check("Desktop: Oferta opens and closes with Escape", async () => {
        await page.goto(base + "/", { waitUntil: "domcontentloaded" });
        const menu = page.locator(".zm-offer-menu");
        await menu.locator("summary").click();
        assert.equal(await menu.evaluate(el => el.open), true);
        assert.equal(await menu.getByRole("link", { name: /Zaprojektuj własną stronę/ }).isVisible(), true);
        await page.keyboard.press("Escape");
        assert.equal(await menu.evaluate(el => el.open), false);
      });
      await check("Desktop: ZM Studio changes real page layout and Mini scope", async () => {
        await page.goto(base + "/projektuj-strone", { waitUntil: "domcontentloaded" });
        const btn = page.locator(".zm-creator-layout-grid button").filter({ hasText: "Editorial premium" });
        await btn.click();
        assert.equal(await btn.getAttribute("aria-pressed"), "true");
        assert.ok(await page.locator(".zm-demo-layout-editorial").count());
        await page.getByLabel("Zakres wykonania").selectOption("mini");
        assert.ok(await page.getByText(/ZM Mini: 3 sekcje na materiałach klienta/).isVisible());
        await page.getByLabel("Kolorystyka — niezależna od układu").selectOption("stone");
        assert.equal(await page.locator(".zm-demo-layout-editorial").count(), 1);
      });
      await check("Desktop: DTP wizard changes steps and quote is displayed", async () => {
        await page.goto(base + "/dtp", { waitUntil: "networkidle", timeout: 45000 });
        await page.locator('.zm-dtp-builder[data-ready="true"]').waitFor({ state: "visible", timeout: 15000 });
        const steps = page.locator(".zm-dtp-stepper button");
        assert.equal(await steps.count(), 4);
        const waitForWizardStep = async (expected) => {
          try {
            await page.waitForFunction((value) =>
              [...document.querySelectorAll(".zm-dtp-wizard-grid .zm-total-fields .section-no")]
                .some(el => el.textContent?.replace(/\s+/g, " ").includes(value)),
              expected, { timeout: 6500 });
          } catch {
            const debug = await page.evaluate(() => {
              const buttons = [...document.querySelectorAll(".zm-dtp-stepper button")];
              return {
                displayedStep: [...document.querySelectorAll(".zm-dtp-wizard-grid .zm-total-fields .section-no")].map(el => el.textContent?.trim()),
                fieldCount: document.querySelectorAll(".zm-total-fields").length,
                buttons: buttons.map(el => ({
                  text: el.textContent?.trim(),
                  active: el.getAttribute("aria-current"),
                  className: el.className,
                  reactHandlers: Object.keys(el).filter(k => k.startsWith("__reactProps$")).length,
                })),
              };
            });
            result.warnings.push({ route: "/dtp", issue: "Wizard step transition", expected, debug });
            await page.screenshot({ path: dir + "/dtp-step-transition-debug.png", fullPage: false });
            throw new Error("DTP step did not reach " + expected + "; DOM diagnostic: " + JSON.stringify(debug));
          }
        };
        await steps.nth(1).click();
        await waitForWizardStep("KROK 2 Z 4");
        await steps.nth(3).click();
        await waitForWizardStep("KROK 4 Z 4");
        assert.ok((await page.locator(".zm-dtp-summary").innerText()).includes("zł"));
      });
      await check("Desktop: previously owned domain updates first-year price", async () => {
        await page.goto(base + "/oferta", { waitUntil: "domcontentloaded" });
        await page.locator("#zm-cost-domain").selectOption("own");
        const input = page.locator("#zm-domain-own-first");
        await input.waitFor({ state: "visible" });
        const total = page.locator(".zm-total-results .zm-cost-total strong");
        await input.fill("0");
        const first = await total.innerText();
        await input.fill("90");
        const next = await total.innerText();
        const price = text => Number(text.replace(/[^\d]/g, ""));
        assert.equal(price(next) - price(first), 90);
      });
      await check("Desktop: Blog search filters articles without page reload", async () => {
        await page.goto(base + "/poradnik", { waitUntil: "networkidle", timeout: 45000 });
        const cards = page.locator(".zm-blog-results > a");
        const before = await cards.count();
        assert.ok(before >= 4);
        await page.locator("#zm-blog-search").fill("gazetka");
        await page.waitForFunction(initial => {
          const count = document.querySelectorAll(".zm-blog-results > a").length;
          return count > 0 && count < initial;
        }, before, { timeout: 8000 });
        const after = await cards.count();
        assert.ok(after > 0 && after < before, "Search did not narrow entries: " + before + " to " + after);
        await page.locator("#zm-blog-search").fill("koszt strony");
        await page.waitForFunction(() =>
          [...document.querySelectorAll(".zm-blog-results > a")].some(card =>
            card.textContent?.toLocaleLowerCase("pl-PL").includes("strona")), null, { timeout: 8000 });
        assert.ok((await cards.count()) > 0, "Multiword query returned no articles");
      });
      await check("Desktop: web quote transfers privately into contact message; no submission", async () => {
        await page.goto(base + "/oferta", { waitUntil: "domcontentloaded" });
        await page.locator(".zm-total-results a").filter({ hasText: "Wyślij konfigurację" }).first().click();
        await page.waitForURL(/\/kontakt\?pakiet=/);
        const message = page.locator("textarea[name=message]");
        await message.waitFor({ state: "visible" });
        await page.waitForFunction(() => document.querySelector("textarea[name=message]")?.value.includes("Łączny szacunek roku 1"));
        assert.ok((await message.inputValue()).includes("Łączny szacunek roku 1"));
      });
      await check("Desktop: article FAQ accordion opens readable answer", async () => {
        await page.goto(base + "/poradnik/ile-kosztuje-projekt-gazetki", { waitUntil: "domcontentloaded" });
        const item = page.locator(".faq-list details").nth(1);
        await item.locator("summary").click();
        assert.equal(await item.evaluate(el => el.open), true);
        assert.ok((await item.locator("p").innerText()).length > 20);
        const px = await item.locator("p").evaluate(el => parseFloat(getComputedStyle(el).fontSize));
        assert.ok(px >= 16, "FAQ body text less than 16px: " + px);
      });
    } else {
      await check("Mobile: menu is reachable and has the Studio shortcut", async () => {
        await page.goto(base + "/", { waitUntil: "domcontentloaded" });
        const menu = page.locator(".zm-mobile-menu");
        await menu.locator("summary").click();
        assert.equal(await menu.evaluate(el => el.open), true);
        assert.ok(await menu.getByRole("link", { name: /ZM Studio/ }).count());
        await page.keyboard.press("Escape");
        assert.equal(await menu.evaluate(el => el.open), false);
      });
    }
    await check(size.name + ": quality standards pages, links and layout", async () => {
      const response = await page.goto(base + "/standardy-jakosci", { waitUntil: "domcontentloaded", timeout: 45000 });
      assert.ok(response?.ok(), "The quality standards hub is not reachable");
      await page.locator("main.zm-public.qa-page").waitFor({ state: "visible", timeout: 12000 });
      assert.ok(await page.getByRole("heading", { name: /Jakość, którą można/i }).count());
      const pdfLinks = page.locator('a[href^="/downloads/"][href$=".pdf"]');
      assert.ok(await pdfLinks.count() >= 2, "Both public PDF downloads must be listed");
      const nav = page.locator(".qa-local-nav");
      assert.ok(await nav.getByRole("link", { name: /Standard WWW/i }).count());
      assert.ok(await nav.getByRole("link", { name: /Standard DTP/i }).count());
      const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
      assert.ok(noOverflow, "Quality hub has horizontal overflow at " + size.width + "px");
      if (size.name === "desktop") {
        assert.ok(await page.locator(".zm-nav-desktop").getByRole("link", { name: "Jakość i ISO" }).count());
      } else {
        const mobile = page.locator(".zm-mobile-menu");
        await mobile.locator("summary").click();
        assert.ok(await mobile.getByRole("link", { name: "Jakość i normy" }).count());
        await page.keyboard.press("Escape");
      }
    });
    await check(size.name + ": contact brief submits to mock endpoint only", async () => {
      const intercepted = [];
      const pattern = "**/api/inquiries";
      await page.route(pattern, async route => {
        const request = route.request();
        intercepted.push({ url: request.url(), method: request.method(), body: request.postDataJSON() });
        const isJson = (request.headers()["content-type"] || "").includes("application/json");
        // Before hydration the native form posts encoded fields. Production
        // responds with a 303 redirect; the mock must preserve this fallback.
        if (isJson) {
          await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ok: true }) });
        } else {
          await route.fulfill({ status: 303, headers: { location: base + "/kontakt?wyslano=1" }, body: "" });
        }
      });
      try {
        const contactResponse = await page.goto(base + "/kontakt", { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.ok(contactResponse?.ok(), "Contact page did not load");
        const form = page.locator('form[data-analytics-form="brief"]');
        try {
          await form.waitFor({ state: "visible", timeout: 12000 });
        } catch {
          // Retry a transient stale response once; persistent failures remain test failures.
          const reload = await page.reload({ waitUntil: "domcontentloaded", timeout: 45000 });
          assert.ok(reload?.ok(), "Contact page reload did not succeed");
          await form.waitFor({ state: "visible", timeout: 12000 });
        }
        await form.locator('input[name="name"]').fill("Przykładowa osoba QA");
        await form.locator('input[name="email"]').fill("not-an-email");
        await form.locator('textarea[name="message"]').fill("Proszę o informację o stworzeniu strony firmowej.");
        await form.locator('select[name="projectType"]').selectOption({ label: "Strona WWW szyta na miarę" });
        await form.locator('input[name="consent"]').check();
        await form.locator('button[type="submit"]').click();
        assert.equal(intercepted.length, 0, "Invalid email must not reach the mock endpoint");
        assert.equal(await form.locator('input[name="email"]').evaluate(el => el.validity.typeMismatch), true);
        await form.locator('input[name="email"]').fill("test@example.com");
        await form.locator('button[type="submit"]').click();
        await page.getByText(/Dziękuję, wiadomość (została wysłana|dotarła)\./).waitFor({ state: "visible", timeout: 15000 });
        assert.equal(intercepted.length, 1, "Expected one intercepted POST; no real request should be sent");
        assert.equal(intercepted[0].method, "POST");
        assert.equal(intercepted[0].body.email, "test@example.com");
        assert.equal(intercepted[0].body.consent, "yes");
      } finally {
        await page.unroute(pattern);
      }
    });
    await check(size.name + ": JS asset failures recover after a fresh navigation", async () => {
      if (!failedJsChunks.length) return { missingChunks: 0 };
      const firstCount = failedJsChunks.length;
      const response = await page.goto(base + "/dtp", { waitUntil: "networkidle", timeout: 45000 });
      assert.ok(response?.ok(), "Cannot reload after a chunk error");
      await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
      await page.waitForTimeout(500);
      assert.equal(failedJsChunks.length, firstCount, "Missing JS chunk persists after a full reload: " + JSON.stringify(failedJsChunks.slice(-4)));
      return { missingChunksOnOldNavigation: firstCount, recovered: true };
    });
    await check(size.name + ": no analytics requests without consent", async () => {
      assert.equal(await page.evaluate(() => localStorage.getItem("zm_analytics_consent")), "denied");
      assert.deepEqual(analyticsRequestsWithoutConsent, [], "Google analytics loaded before consent");
    });
    await context.close();
  }
} finally {
  await browser.close();
  writeFileSync(dir + "/report.json", JSON.stringify(result, null, 2));
}
const failed = result.checks.filter(item => item.status === "fail");
process.stdout.write("Browser QA: " + (result.checks.length - failed.length) + "/" + result.checks.length + " checks passed; " + result.warnings.length + " unexpected warnings; " + result.privacyProtections.blockedCloudflareAnalytics + " privacy beacons blocked by CSP.\n");
if (failed.length) process.exitCode = 1;
