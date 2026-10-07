import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Strony internetowe Marki i okolice", description: "Strony WWW, formularze wyceny, modernizacja i proste systemy dla lokalnych firm z Marek, Ząbek, Zielonki, Kobyłki, Targówka i Bródna.", alternates: { canonical: "/strony-internetowe-marki" } };

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
    <section className="page-hero shell"><span className="eyebrow"><i />MARKI I OKOLICE</span><h1>Strony internetowe dla lokalnych firm, <em>które chcą zdobywać konkretne zapytania.</em></h1><p>Pomagam firmom z Marek, Ząbek, Zielonki, Kobyłki, Wołomina, Radzymina, Nieporętu, Targówka, Bródna i Białołęki. Możemy pracować zdalnie albo spotkać się lokalnie.</p><Link className="button" href="#lokalny-kontakt">Opowiedz o firmie <span>↓</span></Link></section>
    <section className="section shell local-service-grid"><div><span className="section-no">DLA KOGO</span><h2>Firma jest lokalna, ale strona musi konkurować jakością.</h2><p>Najwięcej wartości daję firmom, które wyceniają zlecenia, przyjmują pojazdy lub umawiają klientów na termin.</p></div><div className="niche-grid"><article><h3>Motoryzacja</h3><p>Warsztaty, detailing, wulkanizacja i serwisy.</p><Link href="/strony-dla-warsztatow">Zobacz rozwiązanie ↗</Link></article><article><h3>Dom i instalacje</h3><p>Remonty, hydraulika, elektryka, klimatyzacja i serwis.</p><Link href="/strony-dla-firm-uslugowych">Zobacz rozwiązanie ↗</Link></article><article><h3>Beauty i wizyty</h3><p>Salony, fryzjerzy, barberzy, masaż i pokrewne usługi.</p><Link href="/strony-dla-beauty">Zobacz rozwiązanie ↗</Link></article></div></section>
    <section className="section local-proof"><div className="shell quality-grid"><div><span className="section-no">GOOGLE + STRONA + KONTAKT</span><h2>Spójna droga od wyniku wyszukiwania do rozmowy.</h2><p>Porządkuję podstawy techniczne strony, dane kontaktowe, opisy usług, obszar działania i mierzenie wysłanych formularzy. Nie gwarantuję konkretnej pozycji w Google.</p></div><ul><li><b>01</b>wersja mobilna i szybkość</li><li><b>02</b>lokalne dane firmy</li><li><b>03</b>usługi i obszar działania</li><li><b>04</b>formularz i mierzenie zapytań</li><li><b>05</b>mapa strony i Search Console</li><li><b>06</b>wsparcie Profilu Firmy Google</li></ul></div></section>
    <section className="section shell local-area-links"><div><span className="section-no">OBSZAR DZIAŁANIA</span><h2>Sprawdź rozwiązania dla swojej okolicy.</h2><p>Każda strona opisuje ten sam standard pracy Zielonej Marki, ale odpowiada na potrzeby klientów z konkretnego miasta lub dzielnicy.</p></div><div><Link href="/strony-internetowe">Wszystkie lokalizacje<span>↗</span></Link>{[["Ząbki","zabki"],["Zielonka","zielonka"],["Kobyłka","kobylka"],["Wołomin","wolomin"],["Radzymin","radzymin"],["Targówek","targowek"],["Białołęka","bialoleka"],["Warszawa","warszawa"]].map(([name,slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}<span>↗</span></Link>)}</div></section>
    <section className="section contact-section" id="lokalny-kontakt"><div className="shell contact-grid"><div><span className="section-no">LOKALNA ROZMOWA</span><h2>Najpierw sprawdzimy, czego naprawdę brakuje.</h2><p>Odpowiadam najpóźniej w następnym dniu roboczym. W wiadomości możesz podać adres obecnej strony lub Profilu Firmy w Google.</p></div><ContactForm audit /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
