import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
const { chromium } = await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || "playwright");
const base = process.env.BROWSER_QA_URL || "http://127.0.0.1:8788";
const manifest = JSON.parse(await readFile(new URL("../public/concept-samples-v2/manifest.json", import.meta.url), "utf8"));
// A media or background request may stay open after the UI is usable.
// Check the document status and exact UI readiness instead of network silence.
async function openPage(page, path, readySelector) {
  const started = Date.now();
  const response = await page.goto(base + path, {waitUntil:"domcontentloaded", timeout:30000});
  assert.equal(response?.status(), 200, path + ": document must return HTTP 200");
  await page.locator(readySelector).first().waitFor({state:"visible",timeout:15000});
  await page.waitForFunction(() => document.fonts.status === "loaded", null, {timeout:15000});
  console.log(`READY ${path}: ${Date.now()-started} ms`);
}
await mkdir("browser-qa-artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 720 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    // This test never sends inquiries or changes production data.
    await page.route("**/api/**", route => route.abort());
    await openPage(page, "/bezplatna-koncepcja-strony?fbclid=gallery-qa", ".zm-concept-form");
    assert.equal(await page.locator(".zmp-teaser-card").count(), 3, "Old concept page should show a short selection instead of a second full gallery");
    if (!process.env.BROWSER_QA_HOME_ONLY) {
      const slugByFile = {
        existing: "pion", garden: "forma", "okruch-before-after": "okruch",
        styk: "styk", glina: "glina", trop: "trop",
        logo: "szlak", florist: "lodyga", palona: "palona",
        promo: "peleton", music: "poglos", dalej: "dalej",
        sales: "dobry-koszyk", furniture: "modul", "garden-catalogue": "zielony-sezon",
      };
      assert.equal(Object.values(slugByFile).length, 15);
      for (const entry of Object.values(manifest).flat()) {
        assert.ok(slugByFile[entry.file], "The original concept must have a portfolio slug: " + entry.file);
      }
      await openPage(page, "/portfolio", ".zmp-projects");
      assert.ok(await page.locator(".zmp-project-card").count() >= 40, "Unified gallery must list projects from every category");
      assert.equal(await page.locator(".zmp-project-card").filter({hasText:"ZM Studio"}).count(),0,"ZM Studio must not be publicly listed");
      assert.equal(await page.locator(".zmp-project-card img").count(),await page.locator(".zmp-project-card").count(),"Each project must show an image");
      await page.getByRole("button", { name: "Następny projekt" }).click();
      await page.locator(".zmp-industry-list button").filter({hasText:"Handel i hurtownie"}).click();
      const tradeCount = await page.locator(".zmp-project-card").count();
      assert.ok(tradeCount > 0 && tradeCount < 45,"Industry filter should narrow visible projects");
      const tradeButton = page.locator(".zmp-industry-list button").filter({hasText:"Handel i hurtownie"});
      assert.equal(await tradeButton.getAttribute("aria-pressed"),"true","Industry filter should have a visible active state");
      const visualState = await tradeButton.evaluate(element => {
        const s = getComputedStyle(element);
        return { background: s.backgroundColor, color:s.color, display:s.display };
      });
      assert.ok(visualState.background!=="rgba(0, 0, 0, 0)" && visualState.display!=="none", "Active industry filter must be visible");
      await page.locator(".zmp-industry-list button").filter({hasText:"Wszystkie"}).click();
      await page.screenshot({path:`browser-qa-artifacts/portfolio-${viewport.width}.png`,fullPage:false});
      await openPage(page, "/portfolio/druk?projekty=okruch,szlak", ".zmp-print-case");
      assert.equal(await page.locator(".zmp-print-case").count(), 2, "PDF route must print a chosen portfolio set");
      assert.ok(await page.getByRole("button", { name: "Drukuj / zapisz PDF" }).count());
      for (const [slug, image] of [
        ["okruch", "okruch-before-after"], ["szlak", "logo"], ["peleton", "promo"],
      ]) {
        await openPage(page, "/portfolio/" + slug, ".zmp-detail-hero");
        const img = page.locator(".zmp-detail-visual img");
        await img.evaluate(element => element.decode());
        assert.ok((await img.getAttribute("src")).includes(image + "-1280.webp"));
      }
      await openPage(page, "/portfolio", ".zmp-projects");
      const overflowPortfolio = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
      assert.equal(overflowPortfolio, false, "Unified portfolio must fit mobile viewport");
      await openPage(page, "/bezplatna-koncepcja-strony?fbclid=gallery-qa", ".zm-concept-form");
    }
    const conceptField = await page.locator('.zm-concept-form input[name="email"]').evaluate(el => {const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,radius:s.borderRadius,fontSize:s.fontSize};});
    assert.equal(conceptField.background, "rgb(8, 40, 27)", "Concept fields must use the shared dark surface");
    assert.equal(conceptField.fontSize, "16px");
    await openPage(page, "/", "#krotki-brief input[name=email]");
    const homeField = await page.locator('#krotki-brief input[name="email"]').evaluate(el => {const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,radius:s.borderRadius,fontSize:s.fontSize};});
    assert.deepEqual(conceptField, homeField, "Home and concept form fields must share computed styling");
    assert.equal(await page.locator('.zmh-piece-photo').count(), 0, "Old stock photo must not reappear in the home story");
    await page.locator('.zmh-piece-concept').evaluate(img => img.decode());
    assert.equal(await page.locator('.zmh-contact-concepts .zm-generated-sample').count(), 1);
    assert.equal(await page.locator('.zm-approved-concept-scene .zm-generated-sample').count(), 1);
    assert.ok(await page.locator('.inspiration-services').count());
    await page.locator('.zmh-contact-concepts .zm-sample-open').click();
    const homeModal = page.getByRole('dialog', {name: 'Pełny podgląd koncepcji'});
    await homeModal.waitFor({state:'visible'});
    const homeBounds = await homeModal.boundingBox();
    assert.ok(homeBounds.width >= viewport.width - 2 && homeBounds.height >= viewport.height - 2, "Home preview must also fill the screen");
    await page.keyboard.press('Escape');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    assert.equal(overflow, false, "Home must fit the viewport: " + JSON.stringify(await page.locator("body *").evaluateAll(els => els.filter(el => el.getBoundingClientRect().right > innerWidth + 2).map(el => ({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})).slice(0,15))));
    await page.screenshot({path: `browser-qa-artifacts/approved-home-${viewport.width}.png`, fullPage:true});
    const cookieChoice=page.getByRole("button",{name:"Tylko niezbędne",exact:true});
    if(await cookieChoice.isVisible()) await cookieChoice.click();
    await page.getByRole("button", {name:"Wypróbuj asystenta",exact:true}).click();
    const assistant=page.locator(".demo-assistant-panel");
    await assistant.waitFor({state:"visible"});
    const choice=assistant.getByRole("button",{name:"Nowa strona",exact:true});
    assert.ok(parseFloat(await choice.evaluate(el=>getComputedStyle(el).fontSize))>=14);
    await choice.click();
    await assistant.getByRole("button",{name:"Warsztat / detailing",exact:true}).click();
    const assistantField=await assistant.locator('input[name="email"]').evaluate(el=>{const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,radius:s.borderRadius,fontSize:s.fontSize};});
    assert.deepEqual(assistantField,homeField,"Assistant fields must match the main contact form");
    assert.equal(await assistant.evaluate(el=>el.scrollWidth>el.clientWidth+1),false);
    const assistantBounds=await assistant.boundingBox();
    assert.ok(assistantBounds.x>=0 && assistantBounds.x+assistantBounds.width<=viewport.width+1 && assistantBounds.y>=0 && assistantBounds.y+assistantBounds.height<=viewport.height);
    await assistant.locator('input[name="email"]').scrollIntoViewIfNeeded();
    await page.screenshot({path:`browser-qa-artifacts/assistant-form-${viewport.width}.png`});
    await page.keyboard.press("Escape");
    await assistant.waitFor({state:"hidden"});
    await openPage(page, "/raport-qa", ".zm-quality-mark--current");
    const badge = page.locator('.zm-quality-mark--current');
    assert.ok((await badge.innerText()).includes('STANDARD 3.1'));
    const qaBounds = await badge.boundingBox();
    assert.ok(qaBounds.width <= viewport.width, "QA mark must fit mobile");
    assert.equal(await badge.evaluate(el => getComputedStyle(el).borderTopLeftRadius), "16px");
    await badge.screenshot({path:`browser-qa-artifacts/qa-mark-${viewport.width}.png`});
    assert.deepEqual(errors, [], "Browser errors");
    console.log(`PASS: visual portfolio, filters, PDF and preserved home preview at ${viewport.width}px`);
    await page.close();
  }
} finally { await browser.close(); }
