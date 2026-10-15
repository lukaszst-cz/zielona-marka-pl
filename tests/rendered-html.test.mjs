import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const forbiddenBrand = new RegExp(["c" + "hat", "g" + "pt"].join(""), "i");

const testBaseUrl = process.env.TEST_BASE_URL;
if (!testBaseUrl) throw new Error("TEST_BASE_URL is required. Run tests through scripts/run-built-worker-tests.mjs.");

async function render(path = "/") {
  return fetch(new URL(path, testBaseUrl), { headers: { accept: "text/html" }, signal: AbortSignal.timeout(12_000) });
}

function headMarkup(html) {
  const match = html.match(/<head(?:\s[^>]*)?>[\s\S]*?<\/head>/i);
  assert.ok(match, "document head not found");
  return match[0];
}

test("strona główna prowadzi przez pięć etapów od strony do relacji", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Masz dobrą firmę/i);
  assert.match(html, /Pokażmy ją z dobrej strony/i);
  assert.match(html, /01 \/ TWOJA STRONA/i);
  assert.match(html, /02 \/ FORMULARZE/i);
  assert.match(html, /03 \/ SKLEP I PŁATNOŚCI/i);
  assert.match(html, /04 \/ CRM I OBSŁUGA ZLECEŃ/i);
  assert.match(html, /05 \/ KONTAKT PO USŁUDZE/i);
  assert.match(html, /Bezpłatny mini audyt/i);
  assert.match(html, /Przeczytaj poradnik/i);
  assert.match(html, /Bezpłatna Mapa Szans/i);
  assert.match(html, /demo\/mini-audyt-zielona-marka/i);
  assert.match(html, /demo\/mapa-szans-zielona-marka/i);
  assert.match(html, /Wyślij wiadomość/i);
  assert.match(html, /Zróbmy miejsce/i);
  assert.match(html, /href="\/realizacje\/natura-studio"/i);
  assert.match(html, /href="\/realizacje\/bistro-forma"/i);
  assert.match(html, /href="\/realizacje\/dom-dobry"/i);
  assert.doesNotMatch(html, forbiddenBrand);
});

test("nowe zakładki są renderowane", async () => {
  for (const path of ["/dtp", "/opieka-nad-strona", "/oferta", "/modernizacja-strony", "/realizacje", "/realizacje/transportflow", "/praktyczne-narzedzia", "/usprawnienia-firmy", "/jak-pracuje", "/raport-qa", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/asystent-zapytan", "/maly-crm-dla-firm", "/strony-internetowe-marki", "/poradnik", "/poradnik/jak-przygotowac-pdf-do-druku", "/poradnik/jak-uporzadkowac-zapytania-klientow", "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, forbiddenBrand, path);
    if (path === "/oferta") assert.match(html, /Przelewy24/i);
    if (path === "/realizacje") { assert.match(html, /href="\/realizacje\/natura-studio"/i); assert.match(html, /href="\/realizacje\/bistro-forma"/i); assert.match(html, /href="\/realizacje\/dom-dobry"/i); }
    if (path === "/maly-crm-dla-firm") assert.match(html, /PWA/i);
    if (path === "/raport-qa") assert.match(html, /kontroli jakości/i);
    if (path.includes("/poradnik/")) assert.match(html, /"@type":"Article"/);
    if (path === "/poradnik") { assert.match(html, /"@type":"CollectionPage"/); assert.match(html, /BLOG \/ ARTYKUŁY I WIEDZA/); assert.match(html, /Szukaj na blogu/); assert.match(html, /DTP i druk/); }
    if (path === "/praktyczne-narzedzia") { assert.match(html, /Lead &amp; Offer Copilot/); assert.match(html, /"@type":"ItemList"/); }
    if (path === "/realizacje/transportflow") { assert.match(html, /TransportFlow 360/); assert.match(html, /"@type":"SoftwareApplication"/); }
    if (path.includes("dlaczego-strona")) assert.match(html, /7 najczęstszych przyczyn/i);
    if (path.includes("ile-kosztuje")) { assert.match(html, /1 449 zł netto/i); assert.match(html, /6 900 zł netto/i); }
  }
});

test("lokalne podstrony mają unikalną treść i działający kontakt", async () => {
  for (const city of ["zabki", "zielonka", "kobylka", "wolomin", "radzymin", "targowek", "bialoleka", "warszawa"]) {
    const response = await render(`/strony-internetowe/${city}`);
    assert.equal(response.status, 200, city);
    const html = await response.text();
    assert.match(html, /lokalny klient/i, city);
    assert.match(html, /kontakt@zielona-marka\.pl/i, city);
    assert.match(html, /FAQPage/i, city);
    assert.match(html, /KONKRETNY SCENARIUSZ/i, city);
    assert.match(html, /OBSZAR DZIAŁANIA/i, city);
    const head = headMarkup(html);
    assert.ok(head.includes(`rel="canonical" href="https://zielona-marka.pl/strony-internetowe/${city}"`), city);
    assert.doesNotMatch(html, forbiddenBrand, city);
    assert.doesNotMatch(html, /Małachowskiego\s*1/i, city);
  }
});

test("kluczowe statyczne podstrony mają własne metadata w head", async () => {
  const expected = [
    ["/oferta", "Strony internetowe – cennik i koszt utrzymania", "Wizytówka od 899 zł netto", "https://zielona-marka.pl/oferta"],
    ["/poradnik", "Blog – strony WWW, SEO, DTP i porady dla firm", "Blog Zielona Marka", "https://zielona-marka.pl/poradnik"],
    ["/dtp", "DTP, wizytówki, ulotki i przygotowanie do druku", "Projektowanie wizytówek", "https://zielona-marka.pl/dtp"],
    ["/opieka-nad-strona", "Opieka nad stroną, hosting i koszty utrzymania", "Ile kosztuje utrzymanie strony WWW?", "https://zielona-marka.pl/opieka-nad-strona"],
    ["/modernizacja-strony", "Modernizacja strony internetowej", "Ocena starej strony i plan modernizacji", "https://zielona-marka.pl/modernizacja-strony"],
    ["/kontakt", "Kontakt i wycena", "Skontaktuj się z zespołem marki Zielona Marka", "https://zielona-marka.pl/kontakt"],
    ["/maly-crm-dla-firm", "Mały CRM dla firmy", "Od dobrego zapytania do następnego kroku", "https://zielona-marka.pl/maly-crm-dla-firm"],
  ];
  for (const [path, titlePart, descriptionPart, canonical] of expected) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const head = headMarkup(await response.text());
    assert.ok(head.includes(`<title>${titlePart} | Zielona Marka</title>`) || head.includes(`<title>${titlePart}</title>`), `${path}: title`);
    assert.ok(head.includes(descriptionPart), `${path}: description`);
    assert.ok(head.includes(`rel="canonical" href="${canonical}"`), `${path}: canonical`);
  }
});

test("key service pages and new guides share their own Open Graph metadata", async () => {
  const pages = [
    ["/oferta", "Strony internetowe – cennik"],
    ["/dtp", "DTP, wizytówki"],
    ["/projektuj-strone", "Kreator całej strony"],
    ["/kontakt", "Kontakt i wycena"],
    ["/opieka-nad-strona", "Opieka nad stroną"],
    ["/modernizacja-strony", "Modernizacja strony"],
    ["/poradnik/jak-przygotowac-pdf-do-druku", "Jak przygotować PDF"],
    ["/poradnik/jak-uporzadkowac-zapytania-klientow", "Jak uporządkować zapytania"],
    ["/poradnik/ile-kosztuje-projekt-gazetki", "Ile kosztuje projekt gazetki"],
    ["/strony-internetowe", "Strony internetowe Warszawa"],
    ["/strony-internetowe-marki", "Strony internetowe Marki"],
    ["/asystent-zapytan", "Asystent zapytań"],
    ["/maly-crm-dla-firm", "Mały CRM"],
    ["/usprawnienia-firmy", "Automatyzacje i CRM"],
    ["/standard-jakosci", "Standard jakości projektów WWW"],
    ["/standard-dtp", "Standard kontroli jakości DTP"],
  ];
  for (const [path, titlePart] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const head = headMarkup(await response.text());
    const ogTitle = head.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ?? "";
    const ogUrl = head.match(/<meta property="og:url" content="([^"]+)"/)?.[1] ?? "";
    const twitterTitle = head.match(/<meta name="twitter:title" content="([^"]+)"/)?.[1] ?? "";
    assert.ok(ogTitle.includes(titlePart), `${path}: Open Graph title ${ogTitle}`);
    assert.equal(ogUrl, "https://zielona-marka.pl" + path, `${path}: Open Graph URL`);
    assert.ok(twitterTitle.includes(titlePart), `${path}: Twitter title`);
    assert.match(head, /<meta property="og:description" content="/, path);
  }
});

test("dynamiczna strona projektu ma canonical w head", async () => {
  const response = await render("/realizacje/natura-studio");
  assert.equal(response.status, 200);
  const head = headMarkup(await response.text());
  assert.ok(head.includes('rel="canonical" href="https://zielona-marka.pl/realizacje/natura-studio"'));
});

test("zaakceptowane zdjęcia właściciela pozostają na stronach procesu i kontaktu", async () => {
  const expected = [
    ["/jak-pracuje", "lukasz-zielona-marka-jak-pracuje-20260908.webp"],
    ["/kontakt", "lukasz-kontakt-naturalny-20260919.webp"],
  ];
  for (const [path, file] of expected) {
    assert.equal(existsSync(new URL(`../dist/client/${file}`, import.meta.url)), true, file);
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(file.replaceAll(".", "\\.")), `${path}: ${file}`);
  }
});


test("ZM Studio is part of the real website and previews a complete customer page", async () => {
  const response = await render("/projektuj-strone");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const className of [
    "zm-header", "zm-footer", "zm-creator-config", "zm-creator-quote",
    "zm-creator-preview-wrap", "zm-demo-nav", "zm-demo-hero",
    "zm-demo-services", "zm-demo-about", "zm-demo-steps", "zm-demo-faq",
    "zm-demo-contact", "zm-demo-footer",
  ]) assert.match(html, new RegExp(className), className);
  assert.match(html, /Cała przykładowa strona/);
  assert.match(html, /Pierwszy rok łącznie/);
  assert.match(html, /Łącznie przez 3 lata/);
  assert.match(html, /<dd>od\s*<!-- -->1669 zł<\/dd>/);
  assert.match(html, /Wyślij projekt i wycenę/);
  assert.doesNotMatch(html, /class="zm-web-preview"/);
});

test("Global navigation uses categorized menu and branded social icons", async () => {
  for (const path of ["/", "/poradnik", "/projektuj-strone"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    for (const heading of ["Strony internetowe", "Materiały i identyfikacja", "Systemy dla firm", "Strony dla branż"]) {
      assert.match(html, new RegExp(heading), path + " menu: " + heading);
    }
    assert.match(html, /class="zm-mega-groups"/);
    assert.match(html, /class="zm-mobile-menu-group"/);
    assert.match(html, /\/podpis-email\/icon-facebook\.png/);
    assert.match(html, /\/podpis-email\/icon-instagram\.png/);
    assert.match(html, /\/podpis-email\/icon-www\.png/);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i);
    assert.ok(footer, path + ": missing footer");
    assert.ok((footer[0].match(/href="\/dtp"/g) || []).length <= 1, path + ": repeated DTP link");
  }
});

test("Premium clarity and ZM Mini pricing are consistent in public website", async () => {
  const routes = ["/", "/oferta", "/projektuj-strone", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"];
  for (const path of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /899 zł|899 PLN/, path + ": starter price");
    assert.doesNotMatch(html, /wizytówk[^<]{0,70}990 zł/, path + ": outdated Mini price");
  }
  const offer = await (await render("/oferta")).text();
  assert.match(offer, /jednostronicowy układ z 3 sekcjami/);
  const studio = await (await render("/projektuj-strone")).text();
  assert.match(studio, /899 zł/);
  const home = await (await render("/")).text();
  assert.match(home, /zmh-social-panel/);
  assert.match(home, /\/icon-github-zielona-marka\.svg/);
  assert.match(home, /Zaprojektuj przykładową stronę/);
  const article = await (await render("/poradnik/jak-przygotowac-pdf-do-druku")).text();
  assert.match(article, /Łukasz Staniewicz/);
});

test("ZM Studio offers five distinct full-site templates and six independent palettes", async () => {
  const html = await (await render("/projektuj-strone")).text();
  for (const name of ["Klasyczny firmowy", "Editorial premium", "Minimal &amp; elegancja", "Galeria i realizacje", "Lokalny kontakt"]) {
    assert.match(html, new RegExp(name), "Missing distinct template: " + name);
  }
  for (const color of ["Botaniczny", "Nowoczesny", "Elegancki premium", "Jasny atelier", "Ciepły terrakota", "Kreatywny śliwkowy"]) {
    assert.match(html, new RegExp(color), "Missing palette: " + color);
  }
  assert.match(html, /aria-label="Wybierz układ i wygląd strony"/);
  assert.match(html, /zm-demo-layout-classic/);
  assert.match(html, /zm-demo-footer/);
  const styles = await readFile(new URL("../app/full-site-builder.css", import.meta.url), "utf8");
  for (const layout of ["editorial", "minimal", "showcase", "contact"]) {
    assert.match(styles, new RegExp("zm-demo-layout-" + layout), "Missing responsive layout CSS: " + layout);
  }
});

test("Website quote tools render accurate default prices, with alternate conditions implemented", async () => {
  const [offer, studio] = await Promise.all([
    render("/oferta").then(r=>r.text()), render("/projektuj-strone").then(r=>r.text())
  ]);
  assert.match(offer, /Odnowienie domeny, zł netto\/rok/);
  assert.match(offer, /Rejestracja \(rok 1\), zł netto/);
  assert.match(studio, /Formularz kontaktowy jest uwzględniony w podstawowym zakresie pakietu/);
  assert.match(studio, /w cenie wybranego pakietu/);
  assert.match(studio, /Pierwszy rok łącznie/);
  // React server output includes only the currently selected branch.
  // Check code paths for conditional options separately; pure pricing tests
  // cover calculations for each branch.
  const offerSource = await readFile(new URL("../app/TotalCostCalculator.tsx", import.meta.url), "utf8");
  const studioSource = await readFile(new URL("../app/WebsiteConfigurator.jsx", import.meta.url), "utf8");
  assert.match(offerSource, /Posiadana domena — odnowienie w pierwszym roku/);
  assert.match(studioSource, /Domena posiadana — koszt odnowienia w pierwszym roku/);
  assert.match(studioSource, /ZM Mini: 3 sekcje na materiałach klienta, bez formularza/);
  assert.match(studioSource, /wycena indywidualna/);
  assert.match(studioSource, /saveQuoteTransfer/);
});

test("Company services and readable footer are consistent across current pages", async () => {
  for (const route of ["/", "/oferta", "/dtp", "/poradnik", "/projektuj-strone"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const page = await response.text();
    const start = page.lastIndexOf("<footer");
    const end = page.indexOf("</footer>", start);
    assert.ok(start >= 0 && end > start, route + ": footer missing");
    const footer = page.slice(start, end + 9);
    assert.match(footer, /Strony i sklepy WWW, systemy CRM i DTP dla firm/, route);
    assert.ok(footer.includes("icon-github-zielona-marka.svg"), route + ": GitHub icon missing");
  }
  const style = await readFile(new URL("../app/premium-polish.css", import.meta.url), "utf8");
  for (const name of ["zmh-sample-form", "zmh-site-interior", "zmh-cinema-status", "zmh-project small"]) {
    assert.ok(style.includes(name), name + ": missing readability rule");
  }
});

test("Customer-first navigation features Studio and keeps older service routes discoverable", async () => {
  for (const route of ["/", "/oferta", "/poradnik", "/projektuj-strone"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /class="zm-nav-studio"/);
    assert.match(html, /Zaprojektuj własną stronę/);
    assert.match(html, /Porównaj pakiety i ceny/);
    assert.match(html, /Narzędzia bezpłatne/);
    assert.ok(html.includes('href="/dtp"'), "dtp link missing");
    assert.ok(html.includes('href="/projektuj-strone"'), "projektuj-strone link missing");
  }
});

test("DTP and website care list included services separately from exclusions", async () => {
  const [dtp, care, offer, blog] = await Promise.all([
    render("/dtp").then(x=>x.text()),
    render("/opieka-nad-strona").then(x=>x.text()),
    render("/oferta").then(x=>x.text()),
    render("/poradnik/ile-kosztuje-strona-dla-malej-firmy").then(x=>x.text()),
  ]);
  assert.match(dtp, /Orientacyjna cena projektu/);
  assert.match(dtp, /Druk i dostawa nie są wliczone w cenę projektu/);
  assert.match(care, /Zakres opieki/);
  assert.match(care, /Ważne:/);
  assert.match(offer, /W cenie pakietu/);
  assert.match(blog, /Co obejmuje orientacyjna cena/);
  const styles = await readFile(new URL("../app/premium-clarity.css", import.meta.url), "utf8");
  for (const cls of [".zm-dtp-prices", ".cost-packages", ".faq-list", ".guide-faq", ".zm-creator-config", ".zm-mega-group"]) {
    assert.ok(styles.includes(cls), cls + ": no shared readability style");
  }
});

test("All public author presentations use the complete name", async () => {
  for (const route of ["/", "/en", "/poradnik/ile-kosztuje-projekt-gazetki", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /Łukasz Staniewicz/, route + ": incomplete public name");
  }
});

test("Brand services appear in two deliberately separated lines on all public pages", async () => {
  for (const route of ["/", "/oferta", "/dtp", "/poradnik", "/projektuj-strone"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<small><span>STRONY I SKLEPY WWW · SYSTEMY CRM · DTP<\/span><span>DLA FIRM<\/span><\/small>/, route);
    assert.match(html, /Strony i sklepy WWW, systemy CRM i DTP dla firm\./, route);
  }
  const styles = await readFile(new URL("../app/premium-polish.css", import.meta.url), "utf8");
  assert.match(styles, /brand-wordmark small span\{display:block;white-space:nowrap\}/);
});

test("Cennik i nawigacja zachowują czytelność najważniejszych informacji", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /899 zł netto/);
  assert.match(home, /STRONY I SKLEPY WWW/);
  assert.match(home, /icon-facebook\.png/);
  assert.match(home, /icon-instagram\.png/);
  assert.match(home, /icon-github-zielona-marka\.svg/);
  assert.match(home, /class="zm-contact-dock"/);

  const offer = await (await render("/oferta")).text();
  assert.match(offer, /Ile naprawdę kosztuje strona: projekt, hosting i jej utrzymanie\?/);
  assert.match(offer, /DODATKI, KTÓRE MAJĄ SENS/);
  assert.match(offer, /899 zł netto/);

  const studio = await (await render("/projektuj-strone")).text();
  assert.match(studio, /Atelier asymetryczne/);
  assert.match(studio, /Katalog ofertowy/);
  const dtp = await (await render("/dtp")).text();
  assert.match(dtp, /Orientacyjna cena projektu/);
  const care = await (await render("/opieka-nad-strona")).text();
  assert.match(care, /netto \/ mies\./);
  const article = await (await render("/poradnik/ile-kosztuje-projekt-gazetki")).text();
  assert.match(article, /Łukasz Staniewicz/);
});

test("standardy QA mają wspólny wygląd serwisu, nawigację oraz pobieralne dokumenty", async () => {
  const pages = ["/standardy-jakosci", "/standard-jakosci", "/standard-dtp"];
  for (const path of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /class="zm-public qa-page"/, path + ": firmowy układ podstrony");
    assert.match(html, /href="\/standardy-jakosci"/, path + ": nawigacja jakości");
    assert.match(html, /ISO/i, path + ": wzmianka o normach");
    assert.match(html, /Nie (?:deklarujemy|oznacza|stanowi)|nie jest.*certyfikat/i, path + ": brak deklaracji certyfikacji");
    assert.match(html, /\/downloads\/zielona-marka-standard-dtp-prepress-qa-v3-1\.pdf/, path + ": PDF DTP");
    assert.match(html, /\/downloads\/zielona-marka-standard-jakosci-www-dtp-crm-v3-1\.pdf/, path + ": PDF QA");
  }
  const homepage = await render("/");
  const homeMarkup = await homepage.text();
  assert.match(homeMarkup, /href="\/standardy-jakosci"/, "strona główna odsyła do standardów");
  assert.match(homeMarkup, /Jakość i ISO/, "jakość jest w menu głównym");

  for (const file of ["zielona-marka-standard-dtp-prepress-qa.pdf", "zielona-marka-standard-jakosci-www-dtp-crm.pdf", "zielona-marka-standard-dtp-prepress-qa-v3-1.pdf", "zielona-marka-standard-jakosci-www-dtp-crm-v3-1.pdf"]) {
    const response = await fetch(new URL("/downloads/" + file, testBaseUrl));
    assert.equal(response.status, 200, file + ": jest udostępniony");
    assert.match(response.headers.get("content-type") || "", /application\/(?:pdf|octet-stream)/i, file + ": poprawna reprezentacja binarna");
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert.ok(bytes.length > 10000, file + ": pełen plik");
    assert.equal(new TextDecoder().decode(bytes.slice(0, 4)), "%PDF", file + ": nagłówek PDF");
  }
});

test("QA jest wyjaśnione prostym językiem na każdej kluczowej podstronie", async () => {
  const pages = [
    "/standardy-jakosci",
    "/standard-jakosci",
    "/standard-dtp",
    "/raport-qa",
    "/jak-pracuje",
  ];
  for (const path of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /Quality Assurance/i, path + ": wyjaśnienie skrótu QA");
    assert.match(html, /zapewnianie jakości/i, path + ": polskie znaczenie QA");
  }
  const dtp = await (await render("/dtp")).text();
  assert.match(dtp, /kontroli pliku przed drukiem/i);
  const hub = await (await render("/standardy-jakosci")).text();
  assert.match(hub, /sprawdzamy projekt, poprawiamy błędy/i);
});
