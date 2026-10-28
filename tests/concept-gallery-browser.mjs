import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
const { chromium } = await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright");
const base = process.env.BROWSER_QA_URL || "http://127.0.0.1:8788";
const manifest = JSON.parse(await readFile(new URL("../public/concept-samples-v2/manifest.json", import.meta.url), "utf8"));
const modes = { website: "existing", new: "new", logo: "logo", promo: "promo", sales: "sales" };
await mkdir("browser-qa-artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 720 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    // This test never sends inquiries or changes production data.
    await page.route("**/api/**", route => route.abort());
    await page.goto(base + "/bezplatna-koncepcja-strony?fbclid=gallery-qa", { waitUntil: "networkidle" });
    if (!process.env.BROWSER_QA_HOME_ONLY) for (const [kind, options] of Object.entries(manifest)) {
      await page.locator(`#zv5-tab-${modes[kind]}`).click();
      for (const option of options) {
        await page.locator("#zv5-preview-panel .zm-sample-options").getByRole("button", { name: option.title.split(" / ")[0], exact: true }).click();
        const open = page.locator("#zv5-preview-panel").getByRole("link", { name: `Powiększ: ${option.title}`, exact: true });
        await assert.doesNotReject(() => open.locator("img").evaluate(img => img.decode()));
        await open.click();
        const modal = page.getByRole("dialog", { name: "Pełny podgląd koncepcji" });
        await modal.waitFor({ state: "visible" });
        await modal.locator("img").evaluate(img => img.decode());
        const bounds = await modal.boundingBox();
        assert.ok(bounds.width >= viewport.width - 2 && bounds.height >= viewport.height - 2);
        const imageBounds = await modal.locator("img").boundingBox();
        assert.ok(imageBounds.height <= viewport.height && imageBounds.width <= viewport.width, "Fitted image must stay inside the screen");
        const controls = await modal.locator(".zm-concept-lightbox-controls").boundingBox();
        assert.ok(controls.height <= 80, "Global footer styles must not enlarge lightbox controls");
        assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
        await modal.getByRole("button", { name: "Powiększ szczegóły" }).click();
        await modal.getByRole("button", { name: "Dopasuj do ekranu" }).click();
        if (option.file === "logo") await page.screenshot({ path: `browser-qa-artifacts/gallery-szlak-${viewport.width}.png` });
        await page.keyboard.press("ArrowRight");
        const expected = options[(options.indexOf(option) + 1) % options.length];
        assert.ok((await modal.locator("img").getAttribute("src")).includes(expected.file + "-1280.webp"));
        await page.keyboard.press("Escape");
        await modal.waitFor({ state: "hidden" });
        await page.waitForFunction(() => document.body.style.overflow !== "hidden");
        assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
        assert.equal(await page.evaluate(() => document.activeElement?.className), "zm-sample-open");
      }
    }
    const conceptField = await page.locator('.zm-concept-form input[name="email"]').evaluate(el => {const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,radius:s.borderRadius,fontSize:s.fontSize};});
    assert.equal(conceptField.background, "rgb(8, 40, 27)", "Concept fields must use the shared dark surface");
    assert.equal(conceptField.fontSize, "16px");
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const homeField = await page.locator('#krotki-brief input[name="email"]').evaluate(el => {const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,radius:s.borderRadius,fontSize:s.fontSize};});
    assert.deepEqual(conceptField, homeField, "Home and concept form fields must share computed styling");
    assert.equal(await page.locator('.zmh-piece-photo').count(), 0, "Old stock photo must not reappear in the home story");
    await page.locator('.zmh-piece-concept').evaluate(img => img.decode());
    assert.equal(await page.locator('.zmh-contact-concepts .zm-generated-sample').count(), 1);
    assert.equal(await page.locator('.zm-approved-concept-scene .zm-generated-sample').count(), 1);
    assert.ok(await page.locator('.inspiration-services').count());
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    assert.equal(overflow, false, "Home must fit the viewport: " + JSON.stringify(await page.locator("body *").evaluateAll(els => els.filter(el => el.getBoundingClientRect().right > innerWidth + 2).map(el => ({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})).slice(0,15))));
    await page.screenshot({path: `browser-qa-artifacts/approved-home-${viewport.width}.png`, fullPage:true});
    assert.deepEqual(errors, [], "Browser errors");
    console.log(`PASS: 15 original concepts, full-screen preview, zoom, arrows, Escape, focus at ${viewport.width}px`);
    await page.close();
  }
} finally { await browser.close(); }
