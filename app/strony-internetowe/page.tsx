import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Strony internetowe Warszawa i okolice",
  description: "Strony WWW dla firm z Warszawy, Targówka, Białołęki, Marek, Ząbek, Zielonki, Kobyłki, Wołomina i Radzymina. Lokalna widoczność, formularze i wygodny kontakt.",
  alternates: { canonical: "/strony-internetowe" },
};

const areas = [
  ["Warszawa", "/strony-internetowe/warszawa", "Strona dla firmy usługowej konkurującej na dużym rynku: konkretna specjalizacja, dzielnice i jasny pierwszy krok."],
  ["Targówek", "/strony-internetowe/targowek", "Oferta i kontakt czytelne na telefonie dla klientów z Targówka, Bródna i Zacisza."],
  ["Białołęka", "/strony-internetowe/bialoleka", "Lokalizacja, dojazd i formularz, który zbiera dane potrzebne do wyceny usługi."],
  ["Marki", "/strony-internetowe-marki", "Strona dla lokalnej firmy z Marek z czytelnym zasięgiem działania i prostą drogą do kontaktu."],
  ["Ząbki", "/strony-internetowe/zabki", "Informacja o obszarze dojazdu, usługach i danych potrzebnych przed pierwszą rozmową."],
  ["Zielonka", "/strony-internetowe/zielonka", "Oddzielna ścieżka dla pilnego telefonu i większego zapytania wymagającego wyceny."],
  ["Kobyłka", "/strony-internetowe/kobylka", "Formularz z lokalizacją, zdjęciami i terminem pomaga zacząć rozmowę od konkretów."],
  ["Wołomin", "/strony-internetowe/wolomin", "Jasny zasięg miasta i sąsiednich gmin oraz czytelne zasady pierwszej wyceny."],
  ["Radzymin", "/strony-internetowe/radzymin", "Dla firm z większym obszarem dojazdu: miejscowości, termin i adres już w pierwszym zgłoszeniu."],
] as const;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Strony internetowe dla firm – Warszawa i okolice",
    url: "https://zielona-marka.pl/strony-internetowe",
    description: "Lokalne strony internetowe dla firm usługowych z Warszawy i okolic.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: areas.map(([name, href], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `https://zielona-marka.pl${href}`,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Strony internetowe lokalnie" },
    ],
  },
];

export default function LocalWebsitesHubPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteHeader /><main className="zm-public">
    <section className="page-hero shell">
      <span className="eyebrow"><i />WARSZAWA I OKOLICE · STRONY DLA FIRM</span>
      <h1>Strony internetowe dla lokalnych firm, które mają prowadzić do <em>konkretnego kontaktu.</em></h1>
      <p>Projektuję strony WWW dla firm usługowych z Warszawy i miejscowości po wschodniej stronie miasta. Łączę czytelną ofertę, lokalny zasięg, formularz i podstawy techniczne potrzebne do widoczności w Google.</p>
      <div className="hero-actions"><Link className="button" href="/kontakt">Porozmawiajmy o stronie <span>↗</span></Link><a className="text-link" href="#lokalizacje">Wybierz lokalizację <span>↓</span></a></div>
    </section>

    <section className="section shell local-city-value">
      <div><span className="section-no">LOKALNE SEO ZACZYNA SIĘ OD JASNEJ OFERTY</span><h2>Klient powinien szybko wiedzieć, czy działasz w jego okolicy.</h2></div>
      <div><p>Nie chodzi o dopisywanie nazwy miasta do przypadkowej strony. Każda lokalna podstrona opisuje rzeczywisty kontekst: zasięg dojazdu, sposób pierwszej wyceny, dane potrzebne przed rozmową i typowe potrzeby klientów z danego obszaru.</p><p>Strona główna, Profil Firmy Google, dane kontaktowe i lokalne podstrony powinny opowiadać tę samą historię. To pomaga wyszukiwarce zrozumieć obszar działania, a klientowi szybciej podjąć decyzję.</p></div>
    </section>

    <section className="section shell local-related" id="lokalizacje">
      <div><span className="section-no">OBSZAR DZIAŁANIA</span><h2>Wybierz miasto lub dzielnicę.</h2></div>
      <nav aria-label="Lokalizacje obsługiwane przez Zieloną Markę">{areas.map(([name, href, copy]) => <Link key={href} href={href}><span><b>{name}</b><small>{copy}</small></span><span>↗</span></Link>)}</nav>
    </section>

    <section className="section shell local-city-process">
      <div className="section-head"><div><span className="section-no">CO ŁĄCZY LOKALNE WDROŻENIA</span><h2>Widoczność, konkret i wygodny pierwszy krok.</h2></div><p>Zakres strony wynika z procesu firmy, nie z samej nazwy miejscowości.</p></div>
      <div className="local-benefit-grid">
        <article><b>01</b><h3>Jasna specjalizacja</h3><p>Klient od razu widzi, jakie usługi wykonujesz i dla kogo pracujesz.</p></article>
        <article><b>02</b><h3>Realny obszar działania</h3><p>Miasta, dzielnice i zasady dojazdu są opisane bez ogólników.</p></article>
        <article><b>03</b><h3>Formularz pod usługę</h3><p>Adres, termin, opis i zdjęcia mogą trafić do firmy jeszcze przed oddzwonieniem.</p></article>
        <article><b>04</b><h3>Podstawy Google</h3><p>Canonical, sitemap, dane strukturalne, wersja mobilna i logiczne linkowanie tworzą techniczną bazę.</p></article>
      </div>
    </section>

    <section className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Powiedz, gdzie działasz i czego potrzebują Twoi klienci.</h2><p>Na tej podstawie ustalimy, czy wystarczy jedna mocna strona, czy warto wydzielić osobne usługi lub lokalizacje.</p></div><ContactForm audit /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
