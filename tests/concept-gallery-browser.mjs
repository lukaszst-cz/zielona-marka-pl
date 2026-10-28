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
    for (const [kind, options] of Object.entries(manifest)) {
      await page.locator(`#zv5-tab-${modes[kind]}`).click();
      for (const option of options) {
        await page.locator(".zm-sample-options").getByRole("button", { name: option.title.split(" / ")[0], exact: true }).click();
        const open = page.getByRole("link", { name: `Powiększ: ${option.title}`, exact: true });
        await assert.doesNotReject(() => open.locator("img").evaluate(img => img.decode()));
        await open.click();
        const modal = page.getByRole("dialog", { name: "Pełny podgląd koncepcji" });
        await modal.waitFor({ state: "visible" });
        await modal.locator("img").evaluate(img => img.decode());
        const bounds = await modal.boundingBox();
        assert.ok(bounds.width >= viewport.width - 2 && bounds.height >= viewport.height - 2);
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
    assert.deepEqual(errors, [], "Browser errors");
    console.log(`PASS: 15 original concepts, full-screen preview, zoom, arrows, Escape, focus at ${viewport.width}px`);
    await page.close();
  }
} finally { await browser.close(); }
