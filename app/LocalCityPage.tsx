import Link from "./SafeLink";
import ContactForm from "./ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "./SiteChrome";

export type LocalCity = {
  name: string;
  genitive: string;
  locative: string;
  nearby: string;
  lead: string;
  localNeed: string;
  localContext: string;
  exampleTitle: string;
  example: string;
  checklist: string[];
  related: [string, string][];
};

const industries = [
  { title: "Warsztaty i detailing", copy: "Zgłoszenie z danymi auta, opisem problemu, zdjęciami i preferowanym terminem.", href: "/strony-dla-warsztatow", image: "/portfolio-auto-naprawa-live.png" },
  { title: "Remonty i instalacje", copy: "Zakres prac, lokalizacja, pilność oraz materiały do pierwszej oceny w jednym formularzu.", href: "/strony-dla-firm-uslugowych", image: "/concept-dom.jpg" },
  { title: "Beauty i usługi na termin", copy: "Czytelna oferta, przygotowanie do wizyty i prosta droga do rezerwacji.", href: "/strony-dla-beauty", image: "/concept-natura.jpg" },
] as const;

export default function LocalCityPage({ city }: { city: LocalCity }) {
  const faqs = [
    ["Czy obsługujesz firmy z " + city.genitive + "?", `Tak. Zielona Marka projektuje strony i proste systemy dla firm działających w ${city.locative} oraz w okolicy: ${city.nearby}. Współpraca może odbywać się online.`],
    ["Ile kosztuje strona dla lokalnej firmy?", "Kompletna strona startowa kosztuje od 1 449 zł netto. Rozbudowana strona z formularzem kwalifikującym zaczyna się od 4 490 zł netto. Dokładny zakres ustalamy po krótkiej rozmowie."],
    ["Czy strona może pomóc w lokalnej widoczności?", "Tak. Przygotowuję strukturę, treści, dane firmy, mapę witryny oraz podstawy techniczne. Widoczność rozwija się z czasem i zależy również od konkurencji, opinii, Profilu Firmy Google i jakości oferty."],
    ["Czy można poprawić istniejącą stronę?", "Tak. Najpierw sprawdzam wersję mobilną, ofertę, kontakt, szybkość i podstawy widoczności. Dopiero wtedy rekomenduję modernizację albo budowę od nowa."],
  ];
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Strony internetowe dla firm z ${city.genitive}`,
      provider: { "@type": "ProfessionalService", name: "Zielona Marka", url: "https://zielona-marka.pl", telephone: "+48 450 458 466" },
      areaServed: { "@type": "City", name: city.name },
      serviceType: ["Projektowanie stron internetowych", "Formularze wyceny", "Systemy obsługi klientów", "Modernizacja stron"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
        { "@type": "ListItem", position: 2, name: "Strony internetowe lokalnie", item: "https://zielona-marka.pl/strony-internetowe" },
        { "@type": "ListItem", position: 3, name: city.name },
      ],
    },
  ];

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteHeader /><main className="zm-public">
    <section className="local-city-hero"><div className="shell"><span className="eyebrow"><i />{city.name.toUpperCase()} · STRONY I SYSTEMY DLA FIRM</span><h1>Strona internetowa, która pomaga firmie z {city.genitive} zdobywać <em>konkretne zapytania.</em></h1><p>{city.lead}</p><div className="hero-actions"><Link className="button" href="#lokalny-kontakt">Porozmawiajmy o firmie <span>↗</span></Link><a className="text-link" href="#przyklady">Zobacz przykłady <span>↓</span></a></div></div></section>
    <section className="section shell local-city-value"><div><span className="section-no">LOKALNY KLIENT CHCE SZYBKIEJ ODPOWIEDZI</span><h2>Od wyniku w Google do informacji potrzebnych do wyceny.</h2></div><div><p>{city.localNeed}</p><p>{city.localContext}</p></div></section>
    <section className="section local-city-process"><div className="shell"><div className="section-head"><div><span className="section-no">CO MOŻE ZYSKAĆ FIRMA</span><h2>Strona pracuje przed pierwszym telefonem.</h2></div><p>Najpierw klient rozumie usługę. Potem przekazuje dane, które pozwalają szybciej odpowiedzieć.</p></div><div className="local-benefit-grid"><article><b>01</b><h3>Lepsza decyzja</h3><p>Czytelna oferta pokazuje zakres, obszar działania i sposób rozpoczęcia współpracy.</p></article><article><b>02</b><h3>Kompletne zapytanie</h3><p>Formularz zbiera usługę, lokalizację, termin, opis i zdjęcia potrzebne do pierwszej oceny.</p></article><article><b>03</b><h3>Widoczny następny krok</h3><p>Telefon, e-mail i formularz prowadzą do konkretnej rozmowy zamiast pozostawiać klienta bez odpowiedzi.</p></article><article><b>04</b><h3>Porządek po kontakcie</h3><p>Prosty system może przypisać status, termin i osobę odpowiedzialną za dalszą obsługę.</p></article></div></div></section>
    <section className="section shell local-city-example"><div><span className="section-no">KONKRETNY SCENARIUSZ</span><h2>{city.exampleTitle}</h2><p>{city.example}</p></div><div><small>Na stronie warto jasno podać:</small><ul>{city.checklist.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="section shell local-industry-section" id="przyklady"><div className="section-head"><div><span className="section-no">PRZYKŁADY DLA BRANŻ</span><h2>Zobacz, jak strona może działać w praktyce.</h2></div><p>Demonstracje pokazują mechanizm. Wdrożenie otrzymuje treść, pytania i wygląd dopasowane do konkretnej firmy.</p></div><div className="local-industry-grid">{industries.map(item => <Link href={item.href} key={item.title}><img src={item.image} alt={`${item.title} – przykład strony dla lokalnej firmy`} loading="lazy" /><div><h3>{item.title}</h3><p>{item.copy}</p><b>Zobacz rozwiązanie ↗</b></div></Link>)}</div></section>
    <section className="section local-city-seo"><div className="shell quality-grid"><div><span className="section-no">WIDOCZNOŚĆ LOKALNA</span><h2>Spójna informacja na stronie i w Google.</h2><p>Przygotowuję stronę do indeksowania, lokalne treści, dane strukturalne, mapę witryny i pomiar kontaktów. Nie obiecuję konkretnego miejsca, bo pozycja zależy również od konkurencji i historii domeny.</p></div><ul><li><b>01</b>unikalna treść dla {city.genitive}</li><li><b>02</b>czytelny obszar działania</li><li><b>03</b>wersja mobilna i szybkość</li><li><b>04</b>linki do właściwych usług</li><li><b>05</b>formularz i mierzenie kontaktu</li><li><b>06</b>mapa strony dla Google</li></ul></div></section>
    <section className="section shell local-faq"><div><span className="section-no">NAJCZĘSTSZE PYTANIA</span><h2>Co warto wiedzieć przed rozmową?</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><b>0{index + 1}</b>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>
    <section className="section shell local-related"><div><span className="section-no">OBSZAR DZIAŁANIA</span><h2>Sprawdź sąsiednie lokalizacje.</h2></div><nav aria-label={`Strony dla firm w okolicy ${city.genitive}`}>{city.related.map(([name, slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}<span>↗</span></Link>)}<Link href="/strony-internetowe-marki">Marki<span>↗</span></Link></nav></section>
    <section className="section contact-section" id="lokalny-kontakt"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Opowiedz, co dziś nie działa.</h2><p>Podaj obecną stronę, rodzaj usług i sposób, w jaki klienci najczęściej się kontaktują. Odpowiadam najpóźniej w następnym dniu roboczym.</p></div><ContactForm audit /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
