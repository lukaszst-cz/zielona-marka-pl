import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { concepts } from "../../content";
import { SiteFooter } from "../../SiteChrome";

type Slug = keyof typeof concepts;

const conceptDetails = {
  "natura-studio": {
    audienceTitle: "Salon lub studio, które chce połączyć spokojną markę z prostą rezerwacją.",
    audience: "Scenariusz jest przeznaczony dla usług umawianych na termin, w których klient chce najpierw zobaczyć klimat, zakres zabiegów, czas i orientacyjną cenę. W realnym wdrożeniu zdjęcia, cennik i system rezerwacji należą do salonu; ten projekt pokazuje strukturę decyzji i sposób prowadzenia użytkownika.",
    flowTitle: "Od poznania zabiegu do rezerwacji bez przeskakiwania między kanałami.",
    flow: "Klient zaczyna od kategorii usług, porównuje rytuały i warunki wizyty, a następnie przechodzi do jednego wybranego sposobu rezerwacji. Zaplecze może później porządkować zgłoszenia, przypomnienia i kontakt po wizycie. Najważniejszy element konceptu to połączenie estetyki z czytelnym następnym krokiem.",
    implementation: "Przy prawdziwym wdrożeniu trzeba ustalić aktualny cennik, nazwy usług, zasady odwołania wizyty, sposób rezerwacji oraz materiały, na które salon ma prawa. Jeśli publikowane są zdjęcia efektów, dochodzą też zgody klientów i jasny proces aktualizacji galerii.",
  },
  "bistro-forma": {
    audienceTitle: "Lokal gastronomiczny, który chce pokazać menu i klimat bez ukrywania konkretów.",
    audience: "Koncepcja odpowiada na sytuację, w której gość przed wizytą chce szybko sprawdzić menu, godziny, charakter miejsca i sposób rezerwacji. Projekt nie przedstawia prawdziwej restauracji ani rzeczywistych cen. Pokazuje, jak uporządkować informacje, żeby mobilna strona wspierała decyzję o wizycie zamiast być wyłącznie galerią zdjęć.",
    flowTitle: "Od szybkiego sprawdzenia oferty do wizyty przy stole.",
    flow: "Pierwszy ekran buduje charakter lokalu, a kolejne sekcje prowadzą do karty, informacji praktycznych i kontaktu. W prawdziwym wdrożeniu menu może być aktualizowane bez przebudowy całej strony, a rezerwacja może prowadzić do używanego systemu albo prostego formularza. Koncept pokazuje spójną ścieżkę zamiast rozrzucania informacji między social media i PDF.",
    implementation: "Przy realnej restauracji trzeba wskazać osobę odpowiedzialną za aktualizację menu, godzin i informacji o rezerwacji. Ważne są też zasady publikowania cen, oznaczenia alergenów, godziny świąteczne oraz jedno źródło prawdy, żeby strona, Profil Firmy Google i social media nie podawały różnych danych.",
  },
  "dom-dobry": {
    audienceTitle: "Kameralna inwestycja, która potrzebuje czytelnie pokazać lokale i ich dostępność.",
    audience: "Ten scenariusz jest przeznaczony dla niewielkiej oferty nieruchomości, w której klient porównuje metraż, cenę, standard i status lokalu przed rozmową ze sprzedażą. Wszystkie lokale, ceny i terminy w demonstracji są fikcyjne. Projekt pokazuje architekturę informacji, a nie prawdziwą ofertę deweloperską.",
    flowTitle: "Od porównania lokali do konkretnego pytania o dostępność.",
    flow: "Klient zaczyna od najważniejszych parametrów inwestycji, przechodzi do listy dostępnych lokali i porównuje warianty bez przeglądania kilku plików. Następny krok prowadzi do kontaktu w sprawie wybranego lokalu. Zaplecze może aktualizować statusy i ograniczać ryzyko prezentowania nieaktualnej dostępności na stronie.",
    implementation: "W rzeczywistym wdrożeniu kluczowe jest jedno źródło danych o cenach i dostępności lokali, osoba odpowiedzialna za ich aktualizację oraz sposób przekazania zapytania do sprzedaży. Trzeba też ustalić dokumenty inwestycji, obowiązkowe informacje prawne i reguły publikowania zmian statusu bez opóźnień.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(concepts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = concepts[slug as Slug];
  if (!project) return {};
  const description = `${project.headline} Zobacz koncepcję strony, drogę klienta i przykładowe zaplecze procesowe dla branży ${project.category.toLowerCase()}.`;
  return { alternates: {canonical: `/realizacje/${slug}`}, title: `${project.name} | projekt koncepcyjny`, description, openGraph: { title: `${project.name} | projekt koncepcyjny Zielonej Marki`, description, images: [{ url: project.image, alt: `Koncepcja marki ${project.name}` }] }, twitter: { card: "summary_large_image", title: project.name, description, images: [project.image] } };
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = concepts[slug as Slug];
  if (!project) notFound();
  const details = conceptDetails[slug as Slug];
  const conceptStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name}, projekt koncepcyjny`,
    abstract: project.solution,
    genre: `Projekt koncepcyjny dla branży ${project.category.toLowerCase()}`,
    creator: { "@type": "Organization", name: "Zielona Marka", url: "https://zielona-marka.pl", logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.png" },
    url: `https://zielona-marka.pl/realizacje/${slug}`,
    image: new URL(project.image, "https://zielona-marka.pl").toString(),
    keywords: project.stack,
    audience: { "@type": "Audience", audienceType: details.audienceTitle },
    isAccessibleForFree: true,
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conceptStructuredData) }} /><main className={`zm-public concept-page concept-${slug}`} style={{ "--concept": project.accent } as React.CSSProperties}>
    <nav className="demo-simple-nav" aria-label="Powrót do serwisu"><a href="/">← Wróć do strony głównej</a><a href="/realizacje">Wszystkie projekty ↗</a></nav>
    <header className="concept-hero shell">
      <div><span className="section-no">PROJEKT KONCEPCYJNY / {project.category}</span><h1>{project.name}</h1><p>{project.headline}</p></div>
      <figure><img src={project.image} alt={`Koncepcyjny wizerunek marki ${project.name}`}/></figure>
    </header>
    <section className="concept-intro shell">
      <article><small>WYZWANIE</small><h2>{project.challenge}</h2></article>
      <article><small>ROZWIĄZANIE</small><p>{project.solution}</p></article>
    </section>
    <section className="concept-intro shell" aria-label="Kontekst projektu koncepcyjnego">
      <article><small>DLA KOGO JEST TEN SCENARIUSZ</small><h2>{details.audienceTitle}</h2><p>{details.audience}</p></article>
      <article><small>JAK DZIAŁA ŚCIEŻKA</small><h2>{details.flowTitle}</h2><p>{details.flow}</p><p><b>Przy wdrożeniu:</b> {details.implementation}</p></article>
    </section>
    <section className="concept-screen shell">
      <div className="concept-browser"><span>● ● ●</span><div><small>{project.category}</small><h2>{project.headline}</h2><a className="button" href={project.website}>Zobacz demonstrację →</a></div></div>
      <aside><span className="section-no">ZAKRES I TECHNOLOGIE</span>{project.stack.map((item, index)=><div key={item}><b>{String(index+1).padStart(2,"0")}</b><span>{item}</span></div>)}</aside>
    </section>
    <section className="concept-cta"><div className="shell"><span className="section-no">STRONA + ZAPLECZE PROCESOWE</span><h2>Zobacz pełny efekt oraz sposób pracy firmy od środka.</h2><div className="concept-actions">{"website" in project && <a className="button" href={project.website}>Otwórz pełną stronę <span>↗</span></a>}<a className="button" href={project.demo}>Uruchom demo zaplecza <span>↗</span></a><a className="text-link" href="tel:+48450458466">Porozmawiajmy o wdrożeniu</a></div></div></section>
  </main><SiteFooter /></>;
}
