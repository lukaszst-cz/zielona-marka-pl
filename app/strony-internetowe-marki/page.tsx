import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Strony internetowe Marki | Projekt i modernizacja", description: "Projektowanie i modernizacja stron internetowych dla firm z Marek. Czytelna oferta, dobra wersja mobilna i zachowanie ważnych adresów przy przebudowie.", alternates: { canonical: "/strony-internetowe-marki" },
  openGraph: { type: "website", url: "/strony-internetowe-marki", title: "Strony internetowe Marki | Projekt i modernizacja | Zielona Marka", description: "Projektowanie i modernizacja stron internetowych dla firm z Marek. Czytelna oferta, dobra wersja mobilna i zachowanie ważnych adresów przy przebudowie.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony WWW i narzędzia dla firm" }] },
  twitter: { card: "summary_large_image", title: "Strony internetowe Marki | Projekt i modernizacja | Zielona Marka", description: "Projektowanie i modernizacja stron internetowych dla firm z Marek. Czytelna oferta, dobra wersja mobilna i zachowanie ważnych adresów przy przebudowie.", images: ["/og.jpg"] },};

export default function LocalPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Strony internetowe dla firm z Marek",
      provider: { "@type": "ProfessionalService", name: "Zielona Marka", url: "https://zielona-marka.pl", telephone: "+48 450 458 466" },
      areaServed: { "@type": "City", name: "Marki" },
      serviceType: ["Projektowanie stron internetowych", "Modernizacja stron", "Formularze wyceny", "Systemy obsługi klientów"],
      url: "https://zielona-marka.pl/strony-internetowe-marki",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
        { "@type": "ListItem", position: 2, name: "Strony internetowe lokalnie", item: "https://zielona-marka.pl/strony-internetowe" },
        { "@type": "ListItem", position: 3, name: "Marki" },
      ],
    },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />MARKI I OKOLICE</span><h1>Strony internetowe w Markach, <em>projektowanie i modernizacja dla firm.</em></h1><p>Projektuję nowe strony i odświeżam istniejące witryny firm z Marek oraz sąsiednich Ząbek. Porządkuję ofertę, poprawiam wygodę korzystania na telefonie i ułatwiam klientom wysłanie zapytania. Współpracę możemy prowadzić zdalnie.</p><div className="hero-actions"><Link className="button" href="#lokalny-kontakt">Opowiedz o firmie <span>↓</span></Link><Link className="text-link" href="/modernizacja-strony">Masz już stronę? Zobacz modernizację <span>↗</span></Link></div></section>
    <section className="section shell local-service-grid"><div><span className="section-no">DLA KOGO</span><h2>Firma jest lokalna, ale strona musi konkurować jakością.</h2><p>Najlepiej znam potrzeby firm, w których liczy się szybka wycena, umówienie terminu i dobry kontakt z klientem.</p></div><div className="niche-grid"><article><h3>Motoryzacja</h3><p>Dla warsztatu czy studia detailingu formularz może zebrać model auta, zdjęcia i preferowany termin.</p><Link href="/strony-dla-warsztatow">Zobacz rozwiązanie ↗</Link></article><article><h3>Dom i instalacje</h3><p>Przy remoncie czy montażu klient poda zakres pracy, lokalizację i zdjęcia potrzebne do wyceny.</p><Link href="/strony-dla-firm-uslugowych">Zobacz rozwiązanie ↗</Link></article><article><h3>Beauty i wizyty</h3><p>Dla salonu ważne są zrozumiałe usługi, informacja o terminach i łatwy kontakt z telefonu.</p><Link href="/strony-dla-beauty">Zobacz rozwiązanie ↗</Link></article></div></section>
    <section className="section local-proof"><div className="shell quality-grid"><div><span className="section-no">GOOGLE + STRONA + KONTAKT</span><h2>Spójna droga od wyniku wyszukiwania do rozmowy.</h2><p>Porządkuję podstawy techniczne strony, dane kontaktowe, opisy usług, obszar działania i mierzenie wysłanych formularzy. Nie gwarantuję konkretnej pozycji w Google.</p></div><ul><li><b>01</b>wersja mobilna i szybkość</li><li><b>02</b>lokalne dane firmy</li><li><b>03</b>usługi i obszar działania</li><li><b>04</b>formularz i mierzenie zapytań</li><li><b>05</b>mapa strony i Search Console</li><li><b>06</b>wsparcie Profilu Firmy Google</li></ul></div></section>
    <section className="section shell local-city-value"><div><span className="section-no">MODERNIZACJA STRON W MARKACH</span><h2>Istniejąca strona może być dobrym punktem wyjścia.</h2></div><div><p>Masz działającą stronę firmy z Marek, ale trudno na niej znaleźć usługi albo wysłać zapytanie? Sprawdzam, które podstrony warto zachować, a gdzie przeszkadza układ, słaba wersja mobilna lub nieczytelny kontakt. Często wystarczy poprawić obecną witrynę bez budowania wszystkiego od nowa.</p><p>Przy większych zmianach przygotowuję plan zachowania ważnych adresów, przekierowań i danych potrzebnych wyszukiwarce. Możesz też <Link href="/portfolio">obejrzeć koncepcje i demonstracje stron ↗</Link>. <Link href="/modernizacja-strony">Sprawdź zakres modernizacji strony ↗</Link> albo <Link href="/strony-internetowe/zabki">zobacz ofertę dla firm z Ząbek ↗</Link>.</p></div></section>
    <section className="section shell local-area-links"><div><span className="section-no">OBSZAR DZIAŁANIA</span><h2>Sprawdź rozwiązania dla swojej okolicy.</h2><p>Każda strona opisuje ten sam standard pracy marki Zielona Marka, ale odpowiada na potrzeby klientów z konkretnego miasta lub dzielnicy.</p></div><div><Link href="/strony-internetowe">Wszystkie lokalizacje<span>↗</span></Link>{[["Ząbki","zabki"],["Zielonka","zielonka"],["Kobyłka","kobylka"],["Wołomin","wolomin"],["Radzymin","radzymin"],["Targówek","targowek"],["Białołęka","bialoleka"],["Warszawa","warszawa"]].map(([name,slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}<span>↗</span></Link>)}</div></section>
    <section className="section contact-section" id="lokalny-kontakt"><div className="shell contact-grid"><div><span className="section-no">LOKALNA ROZMOWA</span><h2>Najpierw sprawdzimy, czego naprawdę brakuje.</h2><p>Podeślij adres strony albo Profilu Firmy Google. Odpowiem najpóźniej w następnym dniu roboczym, zaczniemy od tego, co już masz.</p></div><ContactForm audit /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
