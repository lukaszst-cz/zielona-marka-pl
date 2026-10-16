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
  assert.ok(page.includes("<ConceptRequestForm />"), "Keep live CRM form");
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
  assert.ok(form.includes('action="/api/inquiries"'));
  assert.ok(form.includes('name="consent"'));
  assert.ok(form.includes("nie oznacza zgody na inne wiadomości marketingowe"));
});

test("native concept submission retains the selected goal when JavaScript is unavailable", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  const endpoint = await read("app/api/inquiries/route.ts");
  assert.match(form, /name="purpose"/);
  assert.match(endpoint, /\["Cel", plain\(payload\.goal\) \|\| plain\(payload\.purpose\)\]/);
  assert.match(endpoint, /payload\.goal, payload\.purpose, payload\.sales/);
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

test("free-concept matches the public forest identity while demo imagery stays inside previews", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const botanical = await read("app/bezplatna-koncepcja-strony/concept-botanical-preview.css");
  const theme = await read("app/bezplatna-koncepcja-strony/concept-unified-ui.css");
  assert.ok(page.includes('import "./concept-botanical-preview.css"'));
  assert.ok(!page.includes('import "./production-contrast.css"'), "Keep a single final route stylesheet");
  assert.ok(theme.includes('url("/brand-review-v3/forest-continuous.webp")'), "Use the existing public forest image");
  assert.ok(theme.includes("--zc-fern:#b0f36c"), "Use the site's fern accent color");
  assert.ok(theme.includes(".zm-concept-benefit-grid article"), "Cards need branded styling");
  assert.ok(theme.includes(".zm-concept-gallery .zv5-preview-bottom h3"), "Demo headings need legible contrast");
  assert.ok(botanical.includes(".zv5-site-visual"));
  assert.ok(botanical.includes('url("/concept-natura.jpg")'));
  assert.ok(!botanical.includes(".page-hero"));
  assert.ok(page.includes("<ConceptRequestForm />"), "Inquiry form must remain present");
});

test("concept forest styling is scoped and keeps form contrast independent of global overrides", async () => {
  const globalForest = await read("app/fern-public.css");
  const concept = await read("app/bezplatna-koncepcja-strony/concept-unified-ui.css");
  const scoped = ".zm-public:where(:not(.zm-concept))";
  assert.ok(globalForest.includes(scoped + " :is(p,li,dd)"), "Site-wide typography must remain scoped");
  assert.ok(globalForest.includes(scoped + " :is(h1,h2,h3,h4)"), "Site-wide headings must remain scoped");
  assert.ok(globalForest.includes(scoped + " :is(input,textarea,select)"), "Form styling must stay route-local");
  assert.ok(globalForest.includes(scoped + " :is(.button,button[type=submit])"), "Button styling must stay route-local");
  assert.ok(concept.includes("var(--zm-ds-paper)"), "Keep shared design tokens available");
  assert.ok(concept.includes("var(--zm-ds-forest-deep)"), "Keep shared forest tokens available");
  assert.ok(concept.includes("--zc-forest-panel:rgba(8,40,27,.88)"));
  assert.ok(concept.includes(".zm-concept-form :is(input:not([type=\\"radio\\"]):not([type=\\"checkbox\\"]),textarea,select)") || concept.includes(".zm-concept-form :is(input:not([type=\\"radio\\"]):not([type=\\"checkbox\\"]),textarea,select)"), "Ensure form readability");
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
