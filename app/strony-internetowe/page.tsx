import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import ProcessStandard from "../ProcessStandard";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Strony internetowe lokalnie | Marki i Ząbki",
  description: "Tworzenie i modernizacja stron dla firm z Marek, Ząbek, Zielonki i okolic Warszawy. Zobacz ofertę dla swojej miejscowości.",
  alternates: { canonical: "/strony-internetowe" },
  openGraph: { type: "website", url: "/strony-internetowe", title: "Strony internetowe lokalnie | Marki i Ząbki | Zielona Marka", description: "Tworzenie i modernizacja stron dla firm z Marek, Ząbek, Zielonki i okolic Warszawy. Zobacz ofertę dla swojej miejscowości.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony WWW i narzędzia dla firm" }] },
  twitter: { card: "summary_large_image", title: "Strony internetowe lokalnie | Marki i Ząbki | Zielona Marka", description: "Tworzenie i modernizacja stron dla firm z Marek, Ząbek, Zielonki i okolic Warszawy. Zobacz ofertę dla swojej miejscowości.", images: ["/og.jpg"] },
};

const areas = [
  ["Marki", "/strony-internetowe-marki", "Strona dla lokalnej firmy z Marek z czytelnym zasięgiem działania i prostą drogą do kontaktu."],
  ["Ząbki", "/strony-internetowe/zabki", "Informacja o obszarze dojazdu, usługach i danych potrzebnych przed pierwszą rozmową."],
  ["Warszawa", "/strony-internetowe/warszawa", "Strona dla firmy usługowej konkurującej na dużym rynku: konkretna specjalizacja, dzielnice i jasny pierwszy krok."],
  ["Targówek", "/strony-internetowe/targowek", "Oferta i kontakt czytelne na telefonie dla klientów z Targówka, Bródna i Zacisza."],
  ["Białołęka", "/strony-internetowe/bialoleka", "Lokalizacja, dojazd i formularz, który zbiera dane potrzebne do wyceny usługi."],
  ["Zielonka", "/strony-internetowe/zielonka", "Oddzielna ścieżka dla pilnego telefonu i większego zapytania wymagającego wyceny."],
  ["Kobyłka", "/strony-internetowe/kobylka", "Formularz z lokalizacją, zdjęciami i terminem pomaga zacząć rozmowę od konkretów."],
  ["Wołomin", "/strony-internetowe/wolomin", "Jasny zasięg miasta i sąsiednich gmin oraz czytelne zasady pierwszej wyceny."],
  ["Radzymin", "/strony-internetowe/radzymin", "Dla firm z większym obszarem dojazdu: miejscowości, termin i adres już w pierwszym zgłoszeniu."],
] as const;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Strony internetowe dla firm. Marki, Ząbki i okolice",
    url: "https://zielona-marka.pl/strony-internetowe",
    description: "Lokalne strony internetowe i modernizacja dla firm z Marek, Ząbek i okolic Warszawy.",
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
      <span className="eyebrow"><i />MARKI, ZĄBKI I OKOLICE · STRONY DLA FIRM</span>
      <h1>Strony internetowe w Markach, Ząbkach i okolicach, <em>dopasowane do potrzeb firmy.</em></h1>
      <p>Projektuję nowe strony i odświeżam istniejące witryny firm z Marek, Ząbek i sąsiednich miejscowości. Pomagam uporządkować ofertę, pokazać zakres usług i ułatwić klientowi pierwszy kontakt.</p>
      <div className="hero-actions"><Link className="button" href="/kontakt">Porozmawiajmy o stronie <span>↗</span></Link><a className="text-link" href="#lokalizacje">Wybierz lokalizację <span>↓</span></a></div>
    </section>

    <section className="section shell local-city-value">
      <div><span className="section-no">LOKALNE SEO ZACZYNA SIĘ OD JASNEJ OFERTY</span><h2>Klient powinien szybko wiedzieć, czy działasz w jego okolicy.</h2></div>
      <div><p>Sama nazwa miasta w nagłówku nie wystarczy. Liczy się to, co klient chce wiedzieć: dokąd dojeżdżasz, jak zamówić wycenę i co przygotować przed rozmową.</p><p>Strona główna, Profil Firmy Google, dane kontaktowe i lokalne podstrony powinny opowiadać tę samą historię. To pomaga wyszukiwarce zrozumieć obszar działania, a klientowi szybciej podjąć decyzję.</p></div>
    </section>

    <section className="section shell"><div className="section-head"><div><span className="section-no">DLA MIKROFIRM</span><h2>Prosta wizytówka internetowa od 899 zł netto, 3 sekcje i materiały klienta.</h2></div><p>Czasem wystarczy jedna starannie przygotowana strona, z usługami i łatwym kontaktem. Domenę, hosting i opcjonalną opiekę rozliczamy oddzielnie.</p></div><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Sprawdź pełny koszt strony <span>↗</span></Link></section>
    <section className="section shell local-related" id="lokalizacje">
      <div><span className="section-no">OBSZAR DZIAŁANIA</span><h2>Wybierz miasto lub dzielnicę.</h2></div>
      <nav aria-label="Lokalizacje obsługiwane przez markę Zielona Marka">{areas.map(([name, href, copy]) => <Link key={href} href={href}><span><b>{name}</b><small>{copy}</small></span><span>↗</span></Link>)}</nav>
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

    <ProcessStandard variant="web" />
    <section className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Powiedz, gdzie działasz i czego potrzebują Twoi klienci.</h2><p>Opowiedz mi, gdzie pracujesz i z czym zgłaszają się klienci. Wtedy ocenimy, czy lepsza będzie jedna strona, czy osobne opisy usług i lokalizacji.</p></div><ContactForm audit /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
