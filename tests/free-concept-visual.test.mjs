import assert from "node:assert/strict";
import test from "node:test";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");

test("all five free concepts have preview and preselected brief links", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const gallery = await read("app/bezplatna-koncepcja-strony/ConceptPreviews.tsx");
  const modes = ["existing", "new", "logo", "promo", "sales"];
  for (const mode of modes) {
    assert.ok(page.includes(`<ConceptTilePreview kind="${mode}" />`), `Missing preview: ${mode}`);
    assert.ok(page.includes(`?typ=${mode}#zgloszenie`), `Missing dedicated brief link: ${mode}`);
    assert.ok(gallery.includes(`kind === "${mode}"`) || mode === "sales", `Missing preview design: ${mode}`);
  }
  assert.equal((page.match(/<ConceptTilePreview kind=/g) || []).length, 5);
  assert.ok(page.includes("<ConceptHeroPreview />"));
  assert.ok(page.includes("Lub uruchom ZM Studio"));
  assert.ok(gallery.includes('aria-hidden="true"'), "Fictional visual previews should not clutter accessible reading order");
});

test("visuals remain local, responsive and respect reduced motion", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const css = await read("app/bezplatna-koncepcja-strony/concept-gallery.css");
  assert.ok(page.includes('import "./concept-gallery.css"'));
  assert.ok(css.includes("/concept-natura.jpg"), "Use the site's existing sample photography");
  assert.ok(css.includes("@media(max-width:640px)"));
  assert.ok(css.includes("prefers-reduced-motion:reduce"));
  assert.ok((await stat(path.join(root, "public/concept-natura.jpg"))).size > 10000);
});

test("form supports all concept modes and does not promise unsolicited marketing", async () => {
  const form = await read("app/bezplatna-koncepcja-strony/ConceptRequestForm.tsx");
  assert.ok(form.includes('new URLSearchParams(window.location.search).get("typ")'));
  for (const mode of ["existing", "new", "logo", "promo", "sales"]) {
    assert.match(form, new RegExp(`^\\s*${mode}: "`, "m"));
  }
  assert.ok(form.includes('action="/api/inquiries"'));
  assert.ok(form.includes('name="consent"'));
  assert.ok(form.includes("nie oznacza zgody na inne wiadomości marketingowe"));
});

test("the first screen uses the standard light shell rather than a separate full-width landing", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const styles = await read("app/bezplatna-koncepcja-strony/shared-hero.css");
  assert.ok(page.includes('className="page-hero shell zm-concept-hero"'));
  assert.ok(page.includes('import "./shared-hero.css"'));
  assert.ok(styles.includes("width:min(1180px,calc(100% - 48px))"), "Hero must stay within the site's shared 1180px grid");
  assert.ok(styles.includes("background:transparent"), "Remove full-bleed dark section background");
  assert.ok(styles.includes("::before,.zm-public.zm-concept .page-hero.zm-concept-hero::after{display:none"), "Old full-bleed pseudo backgrounds must be disabled");
  assert.ok(styles.includes(".zm-concept-hero-grid{grid-template-columns:1fr"), "Switch to stacked layout on tablets");
  assert.ok(styles.includes("@media(max-width:640px)"), "Provide small-screen adjustments");
  assert.ok(page.includes("<ConceptRequestForm />"), "Preserve the working CRM form");
});
