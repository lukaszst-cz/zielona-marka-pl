import type { Metadata } from "next";
import Link from "../SafeLink";
import { SiteHeader, SiteFooter, QuickWhatsApp } from "../SiteChrome";
import { QaDocumentCards, QaLocalNav } from "../QaStandardsNavigation";

export const metadata: Metadata = {
  title: "Jakość i normy ISO — standardy pracy i dokumenty",
  description: "Poznaj standardy kontroli jakości marki Zielona Marka, proces odbioru projektów, zakres sprawdzania stron WWW i plików do druku oraz pobierz firmowe PDF. Uczciwe odniesienia do norm ISO — bez deklaracji certyfikacji.",
  alternates: { canonical: "/standardy-jakosci" },
  openGraph: { type: "website", url: "/standardy-jakosci", title: "Standardy jakości i normy ISO | Zielona Marka", description: "Jak sprawdzamy strony, sklepy, CRM i pliki do druku? Procedury sprawdzania jakości, punkty odniesienia ISO oraz dokumenty PDF do pobrania." },
};

export default function QualityHubPage() {
  return <><SiteHeader /><main className="zm-public qa-page">
    <section className="page-hero shell qa-hero">
      <nav className="qa-crumbs" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span>Jakość i normy</span></nav>
      <span className="eyebrow">ZIELONA MARKA / ZASADY PRACY I KONTROLI</span>
      <h1>Jakość, którą można <em>sprawdzić, a nie tylko obiecać.</em></h1>
      <p>QA (ang. Quality Assurance) oznacza zapewnianie jakości. W praktyce — zanim oddam stronę, sklep, CRM lub plik do druku, ustalam kryteria kontroli, sprawdzam działanie i dokumentuję wynik. Zakres testów dobieram do zlecenia.</p>
      <div className="hero-actions qa-hero-actions">
        <a className="button" href="#dokumenty">Pobierz standardy pracy <span aria-hidden="true">↓</span></a>
        <a className="text-link" href="#iso">Jak odnosimy się do ISO? <span aria-hidden="true">↓</span></a>
      </div>
      <p className="qa-hero-detail">To wewnętrzne zasady pracy Zielona Marka, opracowane z uwzględnieniem dobrych praktyk i norm technicznych. Nie oznaczają certyfikacji ISO.</p>
    </section>
    <QaLocalNav active="/standardy-jakosci" />

    <section className="section shell qa-section" id="proces">
      <div className="section-head"><div><span className="section-no">OD POCZĄTKU DO ODBIORU</span><h2>Klient wie, co się dzieje z projektem.</h2></div><p>Kontrola jakości zaczyna się przy pierwszych ustaleniach, nie tuż przed publikacją. Dzięki temu obie strony wiedzą, po czym poznamy, że praca jest gotowa.</p></div>
      <div className="qa-cards qa-cards--three">
        <article className="qa-card"><span className="qa-kicker">01 / USTALENIA</span><h3>Wymagania i zakres</h3><p>Dokumentujemy cel, materiały, wymagania techniczne i sposób akceptacji, zanim rozpoczniemy produkcję.</p></article>
        <article className="qa-card"><span className="qa-kicker">02 / REALIZACJA</span><h3>Kontrole właściwe dla produktu</h3><p>Inne testy wykonuje się dla formularza strony, inne dla sklepu i systemu, a jeszcze inne dla pliku drukarskiego.</p></article>
        <article className="qa-card"><span className="qa-kicker">03 / WYDANIE</span><h3>Wynik, poprawki, odbiór</h3><p>Problemy są poprawiane i sprawdzane ponownie, a gotowość do wydania wymaga uzasadnionej decyzji.</p></article>
      </div>
      <div className="qa-link-stack"><Link href="/standard-jakosci">Osiem etapów i zakres kontroli WWW / CRM ↗</Link><Link href="/raport-qa">Przykładowy raport kontroli jakości ↗</Link></div>
    </section>

    <section className="section shell qa-section" id="dokumenty">
      <div className="section-head"><div><span className="section-no">BEZPŁATNE MATERIAŁY / PDF</span><h2>Dokumenty, które możesz pobrać.</h2></div><p>Aktualne firmowe wersje procedur do przeczytania, zapisania lub wydrukowania. Bez podawania danych i bez formularza kontaktowego.</p></div>
      <QaDocumentCards />
      <p className="qa-note-p">Wydanie 3.1 (z zachowaną treścią wydania 3.0) — opisuje zasady i zakres możliwych kontroli. Nie zastępuje wyniku technicznego badania konkretnego projektu.</p>
    </section>

    <section className="section shell qa-section" id="zakres">
      <div className="section-head"><div><span className="section-no">DWA UZUPEŁNIAJĄCE SIĘ OBSZARY</span><h2>Każdy rodzaj realizacji ma własne kontrole.</h2></div><p>Nie stosujemy jednego szablonu testów do wszystkich usług. Kryteria dobieramy do potrzeb i sposobu użycia produktu.</p></div>
      <div className="qa-cards">
        <article className="qa-card"><span className="qa-kicker">WWW / E-COMMERCE / CRM</span><h3>Strony i systemy</h3><ul><li>Ścieżka klienta, działanie przycisków i formularzy</li><li>Widok mobilny, czytelność, dostępność</li><li>Techniczne SEO, wydajność, bezpieczeństwo</li><li>Odbiór funkcji oraz dokumentowanie odstępstw</li></ul><Link className="text-link" href="/standard-jakosci">Sprawdź standard WWW i CRM ↗</Link></article>
        <article className="qa-card"><span className="qa-kicker">DTP / PREPRESS / DRUK</span><h3>Materiały do drukarni</h3><ul><li>Treść, fonty, rozdzielczość, spady i geometria</li><li>ICC, CMYK, kolory dodatkowe i separacje</li><li>PDF/X, preflight, overprint, proof</li><li>Introligatornia, wykrojniki, kody i odbiór</li></ul><Link className="text-link" href="/standard-dtp">Zobacz 12 obszarów DTP ↗</Link></article>
      </div>
    </section>

    <section className="section shell qa-section" id="iso">
      <div className="section-head"><div><span className="section-no">NORMY JAKO PUNKTY ODNIESIENIA</span><h2>Co oznacza ISO w naszych procedurach?</h2></div><p>Odwołujemy się do uporządkowanych zasad pracy oraz technicznych standardów właściwych dla realizacji. Nie przedstawiamy tego jako posiadanego certyfikatu.</p></div>
      <div className="qa-cards qa-cards--three">
        <article className="qa-card"><span className="qa-kicker">PROCES</span><h3>ISO 9001:2026</h3><p>Podstawy podejścia procesowego, dokumentowania wymagań, reagowania na niezgodności i doskonalenia.</p></article>
        <article className="qa-card"><span className="qa-kicker">OPROGRAMOWANIE</span><h3>ISO/IEC 25010:2023</h3><p>Model jakości pomocny przy definiowaniu oczekiwań wobec produktu cyfrowego i jego testów.</p></article>
        <article className="qa-card"><span className="qa-kicker">POLIGRAFIA</span><h3>ISO 15930, 12647 i inne</h3><p>Standardy określające wybrane aspekty plików PDF/X, druku, proofingu i oceny barwy — zależnie od technologii.</p></article>
      </div>
      <div className="qa-standards-note"><strong>Stan faktyczny:</strong> Zielona Marka ma własne procedury zapewniania jakości, inspirowane odpowiednimi normami. Nie oznacza to certyfikacji ISO 9001, zewnętrznego audytu, akredytacji ani pełnej zgodności z każdą przywołaną normą. Certyfikowane wdrożenie jest osobnym przedsięwzięciem.</div>
      <p className="qa-note-p">Od października 2026 rozwijamy wewnętrzny system zapisów jakości: raporty dla konkretnych wersji projektów, rejestr niezgodności, decyzje o odbiorze oraz okresowe przeglądy. Etap wdrażania nie oznacza zakończonego audytu zgodności. Publiczne PDF-y wydania 3.1 zawierają rozdziały operacyjne oraz zachowane strony wydania 3.0. Nadal nie stanowią certyfikatu ISO.</p>
      <details className="qa-faq"><summary>Czy Zielona Marka posiada certyfikat ISO 9001?</summary><p>Nie. Publicznie prezentujemy własną metodykę pracy i kontrolę jakości, a nie certyfikację ISO.</p></details>
      <details className="qa-faq"><summary>Czy każdy projekt przechodzi wszystkie testy?</summary><p>Nie. Zakres kontroli określają funkcje, technologie, specyfikacja drukarni i uzgodnione ryzyka. Wynik konkretnych testów wymaga faktycznej weryfikacji.</p></details>
      <details className="qa-faq"><summary>Czy raport przykładowy jest potwierdzeniem wykonania testów?</summary><p>Nie. Pokazuje formę dokumentacji. Raport konkretnej realizacji powstaje na podstawie rzeczywistych wyników i dostępnych dowodów.</p></details>
      <div className="qa-link-stack"><Link href="/standard-jakosci#normy-iso">Normy stosowane w standardzie WWW ↗</Link><Link href="/standard-dtp#normy-iso">Normy techniczne w DTP ↗</Link></div>
    </section>
    <section className="section shell qa-section"><div className="qa-ending"><span className="section-no">JAKOŚĆ W PRAKTYCE</span><h2>Uzgodnijmy, co naprawdę ma działać.</h2><p>Przed rozpoczęciem projektu określamy mierzalny zakres, kryteria odbioru i sposób zgłaszania poprawek.</p><div className="hero-actions"><Link className="button" href="/kontakt">Zapytaj o projekt <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/jak-pracuje">Zobacz przebieg współpracy <span aria-hidden="true">↗</span></Link></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
