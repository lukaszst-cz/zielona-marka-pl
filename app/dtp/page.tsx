import type { Metadata } from "next";
import Link from "../SafeLink";
import DtpQuoteBuilder from "../DtpQuoteBuilder";
import ProcessStandard from "../ProcessStandard";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "DTP, wizytówki, ulotki i przygotowanie do druku",
  description: "Projektowanie wizytówek, ulotek, folderów, gazetek i przygotowanie plików do druku. Kontrola PDF, spady, CMYK, kolory dodatkowe i współpraca z drukarnią. Warszawa, Marki i cała Polska.",
  alternates: { canonical: "/dtp" },
};

const services = [
  { title: "Kontrola pliku przed drukiem", price: "od 79 zł netto", description: "Sprawdzam plik dostarczony przez klienta i wskazuję problemy przed wysłaniem do drukarni.", points: ["Format i spady według specyfikacji drukarni", "Czcionki, grafiki, rozdzielczość i przezroczystości", "Przestrzeń barwna, profile ICC, CMYK i kolory dodatkowe"], code: "kontrola-pliku" },
  { title: "Projekt wizytówki", price: "od 149 zł netto", description: "Czytelna wizytówka z danymi kontaktowymi i projektem do akceptacji.", points: ["Projekt na podstawie przekazanych materiałów", "Dwie strony w ustalonym układzie", "Plik produkcyjny PDF zgodny ze specyfikacją drukarni"], code: "wizytowka" },
  { title: "Ulotka A5", price: "od 249 zł netto", description: "Ulotka jednostronna do przedstawienia usługi, promocji lub wydarzenia.", points: ["Hierarchia treści i czytelny układ", "Dopasowanie dostarczonych zdjęć i logo", "Plik do druku i podgląd cyfrowy"], code: "ulotka-a5" },
  { title: "Folder i materiały firmowe", price: "wycena indywidualna", description: "Foldery składane, papier firmowy, szablony ofert, vouchery i inne nośniki wizerunku.", points: ["Spójność materiałów ze stroną internetową", "Przygotowanie do wybranego formatu", "Eksport według wymagań drukarni"], code: "folder" },
  { title: "Gazetka i katalog", price: "wycena indywidualna", description: "Skład cyklicznych gazetek produktowych, cenników oraz katalogów o większej objętości.", points: ["Makieta i siatka powtarzalnych elementów", "Praca na tabelach produktów i cenach", "Przygotowanie produkcyjne i korekty"], code: "gazetka" },
  { title: "Poprawki do plików DTP", price: "wycena po sprawdzeniu pliku", description: "Przystosowanie istniejących projektów do wymogów produkcji poligraficznej.", points: ["Poprawki układu i danych", "Konwersje i korekty techniczne", "Weryfikacja po eksporcie"], code: "poprawki" },
] as const;

const faq = [
  ["Czy drukujecie materiały?", "Oferta dotyczy projektu, składu i przygotowania plików. Druk i dostawa nie są wliczone; można je wycenić osobno u wybranej drukarni."],
  ["Co trzeba dostarczyć?", "Najlepiej teksty, logo w dobrej jakości, zdjęcia, format i wskazówki drukarni. Jeżeli nie masz specyfikacji, pomogę określić wymagania przed przygotowaniem pliku."],
  ["Czy każdy plik musi być w CMYK?", "Nie zawsze. Przestrzeń barwną, profil ICC, kolory dodatkowe i wymagany standard PDF dobiera się do technologii i wymogów konkretnej drukarni."],
  ["Czy uwzględniasz spady?", "Tak, zgodnie z zamówionym formatem i specyfikacją drukarni. Dla wielu wydruków spotyka się 3 mm, ale nie jest to uniwersalny wymóg."],
  ["Czy mogę zamówić stronę i materiały drukowane razem?", "Tak. Strona internetowa, wizytówka, ulotka i gazetka mogą korzystać z tej samej identyfikacji wizualnej oraz spójnych danych kontaktowych."],
] as const;

export default function DtpPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Projektowanie DTP i przygotowanie plików do druku",
    serviceType: ["DTP", "Prepress", "Projektowanie wizytówek", "Projektowanie ulotek", "Skład katalogów"],
    provider: { "@id": "https://zielona-marka.pl/#business" },
    url: "https://zielona-marka.pl/dtp",
    areaServed: { "@type": "Country", name: "Polska" },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />DTP / PREPRESS / PROJEKTOWANIE DO DRUKU</span><h1>Od projektu na ekranie <em>do pliku gotowego dla drukarni.</em></h1>
      <p>Projektuję wizytówki, ulotki, foldery i gazetki promocyjne oraz przygotowuję pliki do druku. Sprawdź cenę projektu i zaplanuj regularne wydania z rabatem lojalnościowym. Możemy połączyć stronę WWW i materiały drukowane w jeden spójny wizerunek firmy.</p>
      <div className="hero-actions"><a className="button" href="#kalkulator-dtp">Skonfiguruj i wyceń materiał <span>↗</span></a><a className="text-link" href="#uslugi-dtp">Zobacz zakres <span>↓</span></a></div>
    </section>
    <section className="section shell" id="uslugi-dtp"><div className="section-head"><div><span className="section-no">OD PROSTEJ WIZYTÓWKI DO GAZETKI</span><h2>Materiały, które dobrze wyglądają i są poprawnie przygotowane.</h2></div><p className="zm-dtp-note">Ceny są orientacyjne, netto i dotyczą ustalonego zakresu prac projektowych, bez kosztów druku. Ostateczna wycena zależy od materiałów, liczby stron i poprawek.</p></div>
      <div className="zm-dtp-prices">{services.map((item, index) => <article key={item.code}><span className="section-no">0{index + 1} / DTP</span><h3>{item.title}</h3><span className="zm-price-kicker">Orientacyjna cena projektu</span><strong>{item.price}</strong><p>{item.description}</p><h4 className="zm-package-list-label">Co obejmuje ustalany zakres?</h4><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><p className="zm-price-exclusion">Druk i dostawa nie są wliczone w cenę projektu.</p><Link href={"/kontakt?pakiet=" + encodeURIComponent("DTP: " + item.title)}>Zapytaj o tę usługę ↗</Link></article>)}</div>
    </section>
    <section className="section shell"><div className="section-head"><div><span className="section-no">INTERAKTYWNA WYCENA DTP</span><h2>Wybierz format, materiały i częstotliwość. Zobacz koszt każdego wydania.</h2></div><p>Od pojedynczej ulotki po cykliczną gazetkę. Dla stałej współpracy kalkulator zwiększa rabat wraz z kolejnymi wydaniami, do określonego limitu i z uwzględnieniem zakresu zmian.</p></div><DtpQuoteBuilder /></section>
    <section className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">PRAKTYKA PREPRESS</span><h2>Drukarnia powinna otrzymać plik przygotowany pod jej proces.</h2><p>Przed eksportem ustalam wymagany format, spady, przestrzeń barwną, profil ICC oraz sposób przygotowania czcionek i kolorów dodatkowych. Standard PDF/X dobieramy według wymagań drukarni. W razie potrzeby przygotowuję plik kontrolny do weryfikacji.</p></div><div><h3>Co sprawdzam?</h3><ul className="check-list"><li>Wymiary netto i brutto, spady oraz margines bezpieczeństwa</li><li>Jakość zdjęć i grafik w docelowym rozmiarze</li><li>CMYK, Pantone, profil ICC i poprawne separacje</li><li>Czcionki i przezroczystości</li><li>Zgodność końcowego PDF ze specyfikacją drukarni</li></ul><p className="legal-note">Kontrola techniczna pliku nie zastępuje akceptacji treści, numerów telefonów, cen i poprawności merytorycznej przez klienta.</p></div></div></section>
    <section className="section shell"><div className="section-head"><div><span className="section-no">SPÓJNY WIZERUNEK</span><h2>Strona, wizytówka, ulotka i katalog mogą mówić jednym językiem.</h2></div><p>Jedna typografia, kolory marki, zdjęcia i konsekwentna prezentacja oferty pomagają zbudować rozpoznawalność. Nie musisz zamawiać wszystkiego naraz.</p></div><p className="zm-dtp-note"><Link href="/oferta">Zobacz ofertę stron WWW ↗</Link></p></section>
    <section className="section shell"><div className="section-head"><div><span className="section-no">PRZEWODNIK DLA FIRM</span><h2>Co wpływa na koszt cyklicznej gazetki?</h2></div><p>Sprawdź, jak przygotować arkusz produktów, zdjęcia i stałą makietę, żeby obniżyć cenę kolejnych wydań bez utraty jakości.</p></div><Link className="button" href="/poradnik/ile-kosztuje-projekt-gazetki">Przeczytaj o cenie i rabatach ↗</Link></section>
    <section className="section shell faq-page"><div className="section-head"><div><span className="section-no">PYTANIA PRZED ZAMÓWIENIEM</span><h2>DTP bez niejasnych ustaleń.</h2></div></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>
    <ProcessStandard variant="dtp" />
    <section className="section shell" aria-labelledby="dtp-standard-title"><div className="section-head"><div><span className="section-no">12 OBSZARÓW KONTROLI DTP</span><h2 id="dtp-standard-title">Przed drukiem sprawdzam znacznie więcej niż tylko spady.</h2></div><p>Typografia, treść, obrazy, profile ICC, separacje, overprint, PDF/X, proofing i wymagania introligatorskie mają swoje punkty kontrolne. Zakres zależy od specyfikacji drukarni.</p></div><Link className="button" href="/standard-dtp">Zobacz pełną checklistę prepress <span>↗</span></Link></section>
    <section className="section guide-cta"><div className="shell"><span className="section-no">WYCENA DTP</span><h2>Wyślij format, liczbę stron i materiały.</h2><p>Powiedz, czy potrzebujesz projektu od początku, czy tylko sprawdzenia i przygotowania pliku do druku. W odpowiedzi ustalimy zakres, termin i cenę.</p><Link className="button" href="/kontakt?pakiet=DTP%20i%20przygotowanie%20do%20druku">Poproś o wycenę <span>↗</span></Link></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
