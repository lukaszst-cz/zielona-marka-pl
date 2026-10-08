import type { Metadata } from "next";
import Link from "../../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "TransportFlow 360 | proces transportowy",
  description: "Demonstracyjny proces transportowy od zapytania i wyceny do dokumentów, faktury i kontroli wyników. Portal PWA, Excel, kod i materiały QA.",
  alternates: { canonical: "/realizacje/transportflow" },
  openGraph: { title: "TransportFlow 360 | Zielona Marka", description: "Zobacz demonstrację procesu transportowego, portal PWA, Excel i dokumentację jakości.", images: [{ url: "/demo/routeflow/assets/transport-hero.png", alt: "Demonstracja TransportFlow 360" }] },
};

export default function TransportFlowPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TransportFlow 360",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Demonstracja procesu transportowego obejmującego wycenę, realizację przewozu, dokumenty, fakturę i kontrolę wyników.",
    url: "https://zielona-marka.pl/realizacje/transportflow",
    codeRepository: "https://github.com/lukaszst-cz/transportflow-360",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: "Zielona Marka", url: "https://zielona-marka.pl", logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.png" },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SiteHeader />
    <main className="zm-public transportflow-case">
      <section className="page-hero shell"><span className="eyebrow"><i />PROJEKT DEMONSTRACYJNY / TRANSPORT</span><h1>TransportFlow 360.<br /><em>Jeden przebieg zlecenia.</em></h1><p>Projekt pokazuje, jak połączyć zapytanie, kalkulację stawki, pojazd, kierowcę, dokumenty i rozliczenie. Wszystkie dane, trasy i kwoty są przykładowe. To demonstracja procesu, nie system produkcyjny działający u klienta.</p><div className="hero-actions"><Link className="button" href="/demo/transport">Otwórz demonstrację <span>↗</span></Link><a className="text-link" href="https://github.com/lukaszst-cz/transportflow-360" target="_blank" rel="noreferrer">Kod, Excel i dokumentacja na GitHubie ↗</a></div></section>
      <section className="section transportflow-process"><div className="shell"><div className="section-head"><div><span className="section-no">OD ZAPYTANIA DO PŁATNOŚCI</span><h2>Informacja nie musi kończyć w kilku arkuszach.</h2></div><p>Każdy etap ma potrzebne dane, osobę odpowiedzialną i jasny następny krok. Portal oraz arkusz pokazują ten sam przykładowy proces z dwóch stron.</p></div><ol><li><b>01</b><h3>Zapytanie i wycena</h3><p>Trasa, ładunek, termin, koszty i marża.</p></li><li><b>02</b><h3>Planowanie</h3><p>Pojazd, kierowca, okna i wymagane dokumenty.</p></li><li><b>03</b><h3>Realizacja</h3><p>Status, ETA, odchylenia i potwierdzenie dostawy.</p></li><li><b>04</b><h3>Rozliczenie</h3><p>Dokumenty, faktura, płatność i wynik trasy.</p></li></ol></div></section>
      <section className="section transportflow-proof-wrap"><div className="shell transportflow-proof"><div><span className="section-no">CO JEST W PROJEKCIE</span><h2>Można sprawdzić działanie, dane i sposób testowania.</h2></div><ul><li>portal PWA z rolami i statusem zlecenia</li><li>kalkulator transportowy i przykładowa flota</li><li>edytowalny skoroszyt Excel</li><li>syntetyczne dane bez informacji klientów</li><li>scenariusze testowe i materiały QA</li><li>publiczne repozytorium z opisem ograniczeń</li></ul></div></section>
      <section className="section tools-contact"><div className="shell tools-contact-inner"><div><span className="section-no">PODOBNY PROCES W TWOJEJ FIRMIE</span><h2>Zacznijmy od miejsca, w którym dziś ginie informacja.</h2><p>Nie trzeba od razu budować dużego systemu. Najpierw można uporządkować formularz, statusy albo jeden obieg dokumentu.</p></div><Link className="button" href="/kontakt">Porozmawiajmy o procesie <span>↗</span></Link></div></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
