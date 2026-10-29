import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";
const read = (file) => readFile(path.join(process.cwd(), file), "utf8");

test("form receives gallery selection and keeps privacy safeguards", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.ok(form.includes('new URLSearchParams(window.location.search).get("typ")'));
  assert.ok(form.includes('window.addEventListener("zm-concept-mode"'));
  for (const mode of ["existing", "new", "logo", "promo", "sales"]) {
    assert.match(form, new RegExp("^\\s*" + mode + ': "', "m"));
  }
  assert.ok(form.includes('action={submission.action}'));
  const hook = await read("app/useInquirySubmission.tsx");
  assert.ok(hook.includes('action: "/api/inquiries"'));
  assert.doesNotMatch(hook, /mailto:|startContactEmail/);
  assert.ok(hook.includes('event.preventDefault()')); 
  assert.ok(form.includes('name="consent"'));
  assert.ok(form.includes("nie oznacza zgody na inne wiadomości marketingowe"));
});

test("native concept submission retains the selected goal when JavaScript is unavailable", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.match(form, /name="purpose"/);
  assert.match(form, /name="wybranyRodzajKoncepcji"/);
  assert.doesNotMatch(form, /fetch\(|\/api\/inquiries|preventDefault/);
});


test("approved page uses shared image gallery in the hero and preserves the inquiry flow", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const hero = await read("app/bezplatna-koncepcja-strony/ConceptHeroArtwork.tsx");
  const home = await read("app/OrganicHome.tsx");
  const portal = await read("app/LivingPortal.tsx");
  const scene = await read("app/ForestConceptScene.tsx");
  for (const component of ["<ConceptHeroArtwork />", "<ConceptShowcase />", "<ConceptRequestForm />"]) assert.ok(page.includes(component));
  assert.ok(page.includes("Twoja firma."));
  assert.ok(hero.includes("ProjectPreview"));
  assert.doesNotMatch(hero, /zv5-phone|concept-natura/);
  assert.ok(home.includes("<ProjectPreview />"));
  assert.ok(portal.includes('/concept-samples-v2/styk-640.webp'));
  assert.ok(portal.includes('<ProjectPreview kind="logo" />'));
  assert.ok(scene.includes('<ProjectPreview kind="new" />'));
});

test("concept page loads one consolidated theme and the accessible lightbox layer", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const theme = await read("app/bezplatna-koncepcja-strony/concept-page.css");
  assert.ok(page.includes('import "./concept-page.css"'));
  assert.ok(page.includes('import "./concept-image-preview.css"'));
  for (const old of ["koncepcja.css", "concept-v5-hero.css", "concept-unified-ui.css", "concept-brand.css"]) assert.ok(!page.includes('import "./'+old+'"'));
  assert.ok(theme.includes("@media(max-width:690px)"));
  assert.ok(theme.includes("prefers-reduced-motion:reduce"));
  assert.ok(theme.includes("scroll-snap-type:x mandatory"));
});

test("short concept form shares the public field design and keeps consent", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  const tokens = await read("app/site-design-system.css");
  assert.match(form, /name="email" required type="email"/);
  assert.match(form, /textarea name="details" required/);
  assert.doesNotMatch(form, /name="company"|name="website"/);
  assert.ok(tokens.includes(".zm-concept-form"));
  assert.ok(tokens.includes(".contact-form"));
  assert.ok(tokens.includes("var(--zm-form-field)!important"));
  assert.ok(tokens.includes("font:400 16px/1.5 Arial,Helvetica,sans-serif!important"));
});

test("gallery and form remain synchronized with keyboard navigation", async () => {
  const gallery = await read("app/bezplatna-koncepcja-strony/ConceptShowcase.tsx");
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.ok(gallery.includes('role="tablist"'));
  assert.ok(gallery.includes('role="tabpanel"'));
  assert.ok(gallery.includes("onKeyDown={onTabsKeyDown}"));
  assert.ok(gallery.includes('event.key === "ArrowRight"'));
  assert.ok(gallery.includes('CustomEvent("zm-concept-mode"'));
  assert.ok(form.includes('window.dispatchEvent(new CustomEvent("zm-concept-mode"'));
});
