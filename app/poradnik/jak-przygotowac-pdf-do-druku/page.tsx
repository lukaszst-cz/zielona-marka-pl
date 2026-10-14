import type { Metadata } from "next";
import Link from "../../SafeLink";
import { GuideAuthor, GuideBreadcrumbs } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Jak przygotować PDF do druku? Spady, CMYK i PDF/X",
  description: "Praktyczna lista do kontroli plików PDF przed drukiem: format, spady, marginesy, fonty, rozdzielczość obrazów, ICC i PDF/X. Bez typowych błędów produkcyjnych.",
  alternates: { canonical: "/poradnik/jak-przygotowac-pdf-do-druku" },
};

const checks = [
  ["01", "Ustal wymagania drukarni", "Sprawdź format netto, orientację pracy, rodzaj oprawy, papier, wymagany standard PDF oraz sposób przekazania pliku. Parametry ustala drukarnia, a nie przypadkowy poradnik w internecie."],
  ["02", "Dodaj właściwe spady", "Spad to grafika wychodząca poza linię cięcia. Drukarnie często proszą o 3 mm, ale nie jest to reguła uniwersalna. Zawsze korzystaj z aktualnej specyfikacji konkretnego zlecenia."],
  ["03", "Zachowaj margines bezpieczeństwa", "Logo, numery telefonów, ceny i drobny tekst nie powinny leżeć przy linii cięcia lub zgięcia. Odległość zależy od projektu, technologii i rodzaju wykończenia."],
  ["04", "Sprawdź zdjęcia w skali wydruku", "Istotna jest efektywna rozdzielczość grafiki po umieszczeniu jej w docelowym rozmiarze. Nie poprawisz jakości, wpisując większą wartość DPI przy eksporcie."],
  ["05", "Ustal przestrzeń barwną i profil ICC", "CMYK, RGB, kolory Pantone i profil ICC dobiera się do technologii oraz profilu wybranego zakładu. Nie każda drukarnia wymaga wcześniejszej konwersji wszystkich elementów do CMYK."],
  ["06", "Skontroluj fonty, przezroczystości i eksport PDF", "Zadbaj o osadzone fonty i poprawny eksport. Wariant PDF/X oraz ewentualne spłaszczanie przezroczystości muszą odpowiadać procesowi drukarni."],
  ["07", "Zrób ostateczną kontrolę przed wysyłką", "Otwórz eksportowany PDF, sprawdź strony, orientację, ceny, numery telefonów, znaki diakrytyczne i liczbę stron. Po akceptacji produkcyjnej zachowaj finalny plik i wersję źródłową."],
] as const;
const questions = [
  ["Czy wszędzie potrzebne są spady 3 mm?", "Nie. To częsta wartość dla wielu druków akcydensowych, ale ostateczne wymiary spadów podaje drukarnia, szczególnie przy niestandardowych formatach i oprawach."],
  ["Czy wystarczy zapisać JPG zamiast PDF?", "Zazwyczaj nie jest to najlepsza metoda dla materiałów z tekstami. Plik PDF z prawidłowymi ustawieniami lepiej zachowuje układ, typografię oraz ustawienia produkcyjne, ale zawsze stosuj specyfikację zakładu."],
  ["Co oznacza PDF/X?", "To rodzina standardów wymiany plików do druku. Konkretna odmiana standardu powinna być dobrana do technologii oraz wymagań drukarni."],
] as const;
export default function GuidePrintPdf() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jak przygotować PDF do druku? Spady, CMYK i PDF/X",
    datePublished: "2026-10-14",
    dateModified: "2026-10-14",
    author: { "@id": "https://zielona-marka.pl/#lukasz-st-cz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/jak-przygotowac-pdf-do-druku",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Jak przygotować PDF do druku?", item: "https://zielona-marka.pl/poradnik/jak-przygotowac-pdf-do-druku" },
    ],
  };
  return <><SiteHeader /><main className="zm-public guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <article>
      <header className="page-hero shell"><GuideBreadcrumbs current="Jak przygotować PDF do druku?" /><span className="eyebrow"><i />PORADNIK DTP · 14.10.2026 · 6 MIN</span>
        <h1>Jak przygotować PDF do drukarni? <em>Spady, CMYK i PDF/X bez zgadywania.</em></h1>
        <p>Przed wysyłką wizytówki, ulotki lub gazetki warto sprawdzić siedem podstawowych elementów. Zbyt małe spady, niewłaściwy profil barwny albo błędny format mogą zatrzymać produkcję lub wymusić poprawki.</p>
        <div className="hero-actions"><Link className="button" href="/dtp">Sprawdź ofertę przygotowania do druku ↗</Link><Link className="text-link" href="/poradnik">Wróć do bloga ↗</Link></div>
      </header>
      <section className="section shell"><div className="section-head"><div><span className="section-no">LISTA KONTROLNA</span><h2>Siedem kontroli przed oddaniem pliku.</h2></div><p>Nie ma jednego uniwersalnego presetu „drukarnia”. Najpierw pozyskaj specyfikację produkcyjną, potem dostosuj projekt i eksport.</p></div>
        <div className="about-proof-list">{checks.map(([no,title,description]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="section mini-shop-section"><div className="shell mini-shop-grid">
        <div><span className="section-no">PRAKTYCZNY SCENARIUSZ</span><h2>Ulotka A5 to nie tylko obraz o wymiarach A5.</h2>
          <p>W zamówieniu trzeba ustalić format po obcięciu, spady, rodzaj zadruku, papier i wykończenie. Dopiero wtedy przygotuj obszar projektu i eksport zgodny z wymaganiami dostawcy.</p>
          <Link className="button" href="/dtp#kalkulator-dtp">Wyceń ulotkę lub folder ↗</Link>
        </div>
        <div><h3>Co warto przekazać projektantowi?</h3><ul className="check-list">
          <li>Specyfikację PDF i profil druku</li><li>Wymiary netto, spady i sposób składania</li>
          <li>Logo, teksty, fotografie i poprawne ceny</li><li>Planowany nakład i rodzaj wykończenia</li>
          <li>Ostateczny termin na korektę i akceptację</li></ul></div>
      </div></section>
      <section className="section shell faq-page"><div className="section-head"><div><span className="section-no">NAJCZĘSTSZE PYTANIA</span><h2>Jeszcze przed produkcją.</h2></div></div>
        <div className="faq-list">{questions.map(([q,a],i) => <details key={q} open={i === 0}><summary><span>{String(i + 1).padStart(2,"0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div>
      </section>
      <section className="section guide-cta"><div className="shell"><span className="section-no">KONTROLA DTP</span><h2>Masz gotowy PDF, ale nie masz pewności, czy nadaje się do druku?</h2>
        <p>Możesz zlecić weryfikację techniczną, korekty lub przygotowanie całego projektu. Ocena nie zastępuje sprawdzenia treści i cen przez zamawiającego.</p><Link className="button" href="/kontakt?pakiet=DTP%3A%20Kontrola%20PDF">Zapytaj o kontrolę pliku ↗</Link></div></section>
      <div className="shell zm-article-author-wrap"><GuideAuthor published="14 października 2026" updated="14 października 2026" /></div>
    </article>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
