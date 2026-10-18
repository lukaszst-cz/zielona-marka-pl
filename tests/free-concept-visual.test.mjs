import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");

test("approved V4 page is integrated into the real shared layout", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const art = await read("app/bezplatna-koncepcja-strony/ConceptHeroArtwork.tsx");
  const gallery = await read("app/bezplatna-koncepcja-strony/ConceptShowcase.tsx");
  assert.ok(page.includes('className="page-hero shell zm-concept-hero"'));
  assert.ok(page.includes("Zanim zamówisz,"));
  assert.ok(page.includes("<ConceptHeroArtwork />"));
  assert.ok(page.includes("<ConceptShowcase />"));
  assert.ok(page.includes("<ConceptRequestForm />"), "Keep live contact form");
  assert.ok(art.includes("forma"));
  assert.ok(art.includes("zv5-phone"));
  assert.ok(gallery.includes('role="tablist"'));
  assert.ok(gallery.includes('role="tabpanel"'));
  for (const mode of ["existing", "new", "logo", "promo", "sales"]) {
    assert.ok(gallery.includes('case "' + mode + '"'), "Missing example for " + mode);
  }
  assert.ok(gallery.includes('CustomEvent("zm-concept-mode"'));
  assert.ok(gallery.includes('href="#zgloszenie"'));
});

test("V4 visuals respect shared content width and responsive breakpoints", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const hero = await read("app/bezplatna-koncepcja-strony/concept-v5-hero.css");
  const showcase = await read("app/bezplatna-koncepcja-strony/concept-v5-showcase.css");
  assert.ok(page.includes('import "./concept-v5-hero.css"'));
  assert.ok(page.includes('import "./concept-v5-showcase.css"'));
  assert.ok(hero.includes("width:min(1180px,calc(100% - 48px))"));
  assert.ok(hero.includes(".zv5-desktop") && hero.includes(".zv5-phone"));
  assert.ok(hero.includes("@media(max-width:640px)"));
  assert.ok(showcase.includes(".zv5-preview-stage"));
  assert.ok(showcase.includes("@media(max-width:640px)"));
});

test("form receives gallery selection and keeps privacy safeguards", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.ok(form.includes('new URLSearchParams(window.location.search).get("typ")'));
  assert.ok(form.includes('window.addEventListener("zm-concept-mode"'));
  for (const mode of ["existing", "new", "logo", "promo", "sales"]) {
    assert.match(form, new RegExp("^\\s*" + mode + ': "', "m"));
  }
  assert.ok(form.includes('action="https://formsubmit.co/kontakt@zielona-marka.pl"'));
  assert.ok(form.includes('name="consent"'));
  assert.ok(form.includes("nie oznacza zgody na inne wiadomości marketingowe"));
});

test("native concept submission retains the selected goal when JavaScript is unavailable", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.match(form, /name="purpose"/);
  assert.match(form, /name="wybranyRodzajKoncepcji"/);
  assert.doesNotMatch(form, /fetch\(|\/api\/inquiries|preventDefault/);
});

test("one consolidated UI controls the free concept while sharing site tokens", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const styles = await read("app/bezplatna-koncepcja-strony/concept-unified-ui.css");
  const tokens = await read("app/site-design-system.css");
  const layout = await read("app/layout.tsx");
  assert.ok(page.includes('import "./concept-unified-ui.css"'));
  assert.ok(layout.includes('import "./site-design-system.css"'));
  assert.ok(!page.includes('import "./shared-hero.css"'), "Superseded hero CSS must not load");
  assert.ok(!page.includes('import "./concept-gallery.css"'), "Superseded gallery CSS must not load");
  assert.ok(!page.includes('import "./production-contrast.css"'), "Forest overlay must not load");
  assert.ok(styles.includes("var(--zm-ds-paper)"));
  assert.ok(styles.includes("var(--zm-ds-forest-deep)"));
  assert.ok(styles.includes(".zm-concept-form"));
  assert.ok(styles.includes(".zv5-gallery-layout"));
  assert.ok(styles.includes("@media(max-width:690px)"));
  assert.ok(tokens.includes("--zm-ds-content:1180px"));
  assert.ok(!styles.includes(String.fromCharCode(0x2014)));
});

test("free concept inherits the same dark forest identity as public subpages", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const forest = await read("app/fern-public.css");
  const theme = await read("app/bezplatna-koncepcja-strony/concept-brand.css");
  const botanical = await read("app/bezplatna-koncepcja-strony/concept-botanical-preview.css");
  assert.ok(page.includes('import "./concept-brand.css"'), "Forest brand stylesheet must be imported");
  assert.ok(page.indexOf('import "./concept-brand.css"') > page.indexOf('import "./concept-unified-ui.css"'), "Shared brand styling must load last");
  assert.ok(!page.includes('import "./production-contrast.css"'), "Do not restore conflicting old overlays");
  assert.ok(theme.includes('url("/brand-review-v3/forest-continuous.webp")'), "Forest background must match sibling pages");
  assert.ok(forest.includes("url('/brand-review-v3/forest-continuous.webp')"), "Global forest image must exist");
  assert.ok(theme.includes("--concept-leaf:#b0f36c"), "Use the shared fern accent");
  assert.ok(theme.includes("font-family:Arial,Helvetica,sans-serif"), "Use shared typography");
  assert.ok(theme.includes(".zm-concept-benefit-grid article"), "Benefits must use shared cards");
  assert.ok(theme.includes(".zm-concept-form"), "Form surface must match public pages");
  assert.ok(theme.includes(".zv5-preview-panel"), "Preview frame must match public cards");
  assert.ok(botanical.includes('url("/concept-natura.jpg")'), "Sample image remains scoped to fictional preview");
  assert.ok(!theme.includes("\u2014"), "Avoid em dashes in theme source");
});

test("forest page preserves readable copy, mockups and responsive layouts", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const base = await read("app/bezplatna-koncepcja-strony/concept-unified-ui.css");
  const theme = await read("app/bezplatna-koncepcja-strony/concept-brand.css");
  assert.ok(page.includes("<ConceptRequestForm />"), "Do not remove functional lead form");
  assert.ok(page.includes("<ConceptShowcase />"), "Do not remove examples");
  assert.ok(base.includes("scroll-snap-type:x mandatory"), "Keep mobile scrollable concept options");
  assert.ok(theme.includes("color:var(--concept-muted)"), "Provide light copy on dark background");
  assert.ok(theme.includes("background:#031a11"), "Input fields must remain dark");
  assert.ok(theme.includes(".zv5-preview-bottom h3"), "Dark preview footer needs light headings");
  assert.ok(theme.includes("@media(max-width:690px)"), "Mobile design must be maintained");
  assert.ok(theme.includes("prefers-reduced-motion:reduce"), "Respect reduced motion");
});

test("gallery and inquiry form share the chosen material without a second click", async () => {
  const gallery = await read("app/bezplatna-koncepcja-strony/ConceptShowcase.tsx");
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  const css = await read("app/bezplatna-koncepcja-strony/concept-unified-ui.css");
  assert.ok(gallery.includes("onClick={()=>selectMode(item.mode)}"));
  assert.ok(gallery.includes("onKeyDown={onTabsKeyDown}"));
  assert.ok(gallery.includes('event.key === "ArrowRight"'));
  assert.ok(gallery.includes("new CustomEvent"));
  assert.ok(form.includes('className="zm-concept-picked"'));
  assert.ok(form.includes('className="zm-concept-change"'));
  assert.ok(form.includes('name="mode"'));
  assert.ok(form.includes('window.dispatchEvent(new CustomEvent("zm-concept-mode"'));
  assert.ok(css.includes("scroll-snap-type:x mandatory"), "Mobile preview choices must be compact");
  assert.ok(css.includes("flex:0 0 min(235px,76vw)"), "Mobile tab widths must prevent long vertical stacks");
  assert.ok(css.includes(".zm-concept-form-grid"));
});

test("forest identity is explicit and not replaced by the legacy light skin", async () => {
  const theme = await read("app/bezplatna-koncepcja-strony/concept-brand.css");
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const cssFiles = [
    'import "./koncepcja.css"',
    'import "./concept-v5-hero.css"',
    'import "./concept-v5-showcase.css"',
    'import "./concept-unified-ui.css"',
    'import "./concept-brand.css"',
  ];
  let previous = -1;
  for (const file of cssFiles) {
    const index = page.indexOf(file);
    assert.ok(index > previous, "Styles must load in predictable order: " + file);
    previous = index;
  }
  assert.ok(theme.includes("background:linear-gradient(90deg"), "Forest photo overlay should remain the site background");
  assert.ok(theme.includes("color:var(--concept-ink)"), "Use high-contrast light type");
  assert.ok(theme.includes(".zv5-gallery-intro h2 em"), "Highlight gallery headings consistently");
  assert.ok(theme.includes(".zm-concept-faq summary"), "FAQ should match shared typography");
  assert.ok(theme.includes(".zv5-preview-cta"), "Gallery CTA must match other buttons");
});
