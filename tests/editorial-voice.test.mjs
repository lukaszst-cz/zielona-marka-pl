import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

const pages = [
  "app/OrganicHome.tsx",
  "app/HomeOffersCarousel.tsx",
  "app/bezplatna-koncepcja-strony/page.tsx",
  "app/bezplatna-koncepcja-strony/ConceptShowcase.tsx",
  "app/oferta/page.tsx",
  "app/jak-pracuje/page.tsx",
  "app/kontakt/page.tsx",
  "app/dtp/page.tsx",
  "app/modernizacja-strony/page.tsx",
  "app/opieka-nad-strona/page.tsx",
  "app/strony-internetowe/page.tsx",
  "app/strony-internetowe-marki/page.tsx",
  "app/maly-crm-dla-firm/page.tsx",
  "app/usprawnienia-firmy/page.tsx",
  "app/asystent-zapytan/page.tsx",
  "app/realizacje/page.tsx",
  "app/praktyczne-narzedzia/page.tsx",
  "app/projekty-flow/page.tsx",
  "app/poradnik/page.tsx",
  "app/standard-jakosci/page.tsx",
  "app/standardy-jakosci/page.tsx",
  "app/standard-dtp/page.tsx",
  "app/LocalCityPage.tsx",
  "app/strony-internetowe/[miasto]/page.tsx",
  "app/RelatedServices.tsx",
  "app/przyklady-zaplecza/page.tsx",
  "app/raport-qa/page.tsx",
  "app/projektuj-strone/page.tsx",
  "app/spokojny-pc-plus/page.tsx",
  "app/realizacje/transportflow/page.tsx",
];

test("editorial pages use em dash for spaced punctuation", async () => {
  for (const path of pages) {
    const source = await read(path);
    assert.ok(!source.includes(" – "), path + ": use an em dash (—) for sentence breaks");
  }
});

test("main marketing pages use an actual em dash in natural copy", async () => {
  for (const path of ["app/OrganicHome.tsx", "app/HomeOffersCarousel.tsx",
    "app/bezplatna-koncepcja-strony/page.tsx", "app/oferta/page.tsx",
    "app/kontakt/page.tsx", "app/modernizacja-strony/page.tsx"]) {
    assert.match(await read(path), / — /, path + " should contain a proper em dash");
  }
});

test("the free visual concept remains one illustrative idea, not a paid or completed delivery", async () => {
  const page = await read("app/bezplatna-koncepcja-strony/page.tsx");
  const gallery = await read("app/bezplatna-koncepcja-strony/ConceptShowcase.tsx");
  assert.match(page, /jedną poglądową koncepcję wizualną/);
  assert.match(page, /Nie jest gotowym plikiem do druku/);
  assert.match(page, /<ConceptRequestForm \/>/);
  assert.match(gallery, /nie realizacje dla klientów/);
  assert.match(gallery, /role="tablist"/);
});

test("public price and scope remain visible after copy polishing", async () => {
  const offer = await read("app/oferta/page.tsx");
  const home = await read("app/OrganicHome.tsx");
  assert.match(offer, /899 zł/);
  assert.match(offer, /netto/);
  assert.match(home, /<HomeContactForm \/>/);
  assert.match(home, /<ForestHero \/>/);
});