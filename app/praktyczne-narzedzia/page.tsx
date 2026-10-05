import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { additionalProjects, practicalTools } from "./tools";

export const metadata: Metadata = {
  title: "Praktyczne narzędzia i aplikacje dla firm",
  description: "Bezpłatne narzędzia online, demonstracje oraz kod z dokumentacją do zapytań, dokumentów, produkcji i transportu.",
  alternates: { canonical: "/praktyczne-narzedzia" },
  openGraph: {
    title: "Praktyczne narzędzia i aplikacje | Zielona Marka",
    description: "Sprawdź bezpłatne narzędzia, demonstracje i kod projektów Zielonej Marki.",
    images: [{ url: "/og.jpg", alt: "Praktyczne narzędzia i aplikacje Zielonej Marki" }],
  },
};

export default function PracticalToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praktyczne narzędzia i aplikacje Zielonej Marki",
    url: "https://zielona-marka.pl/praktyczne-narzedzia",
    numberOfItems: practicalTools.length,
    itemListElement: practicalTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: `${tool.problem} ${tool.benefit}`,
        url: tool.primaryUrl.startsWith("http") ? tool.primaryUrl : `https://zielona-marka.pl${tool.primaryUrl}`,
        codeRepository: tool.repositoryUrl,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "PLN", description: tool.freeDetails },
        author: { "@type": "Organization", name: "Zielona Marka", url: "https://zielona-marka.pl", logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.png" },
      },
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SiteHeader />
    <main className="zm-public practical-tools-page">
      <section className="page-hero shell"><span className="eyebrow"><i />BEZPŁATNE NARZĘDZIA, DEMONSTRACJE I KOD</span><h1>Praktyczne narzędzia i aplikacje. <em>Sprawdź bezpłatnie.</em></h1><p>Każdy projekt ma jasno opisany bezpłatny zakres. Możesz uruchomić narzędzie, obejrzeć demonstrację albo zajrzeć do kodu i dokumentacji. Wdrożenie dopasowane do konkretnej firmy jest ustalane osobno.</p><a className="button" href="#narzedzia">Zobacz narzędzia <span>↓</span></a></section>

      <section id="narzedzia" className="section shell"><div className="project-list">{practicalTools.map((tool, index) => <article className="project-case" key={tool.name}>
        <div className="project-case-image" style={{ backgroundImage: `linear-gradient(115deg,rgba(10,31,22,.82),rgba(10,31,22,.08)),url(${tool.imageUrl})` }}><span>{tool.status}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
        <div><small>{tool.status}</small><h2>{tool.name}</h2><p><b>Problem:</b> {tool.problem}</p><p><b>Co robi:</b> {tool.benefit}</p><p className="tool-free-note"><b>Co jest bezpłatne:</b> {tool.freeDetails}</p><ul className="tool-scope">{tool.scope.map(item => <li key={item}>{item}</li>)}</ul><div className="project-case-links"><a className="button" href={tool.primaryUrl} target={tool.primaryUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{tool.primaryLabel} <span>↗</span></a>{tool.repositoryUrl !== tool.primaryUrl && <a className="text-link" href={tool.repositoryUrl} target="_blank" rel="noreferrer">Kod i dokumentacja na GitHubie <span>↗</span></a>}</div></div>
      </article>)}</div></section>

      <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">JASNE ZASADY</span><h2>Bezpłatny dostęp nie oznacza gotowego wdrożenia dla każdej firmy.</h2><p>Narzędzia i demonstracje służą do samodzielnego sprawdzenia pomysłu. Nie wysyłają wiadomości bez decyzji użytkownika i nie zastępują kontroli człowieka.</p></div><div><a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">Zobacz profil GitHub ↗</a><Link href="/realizacje">Zobacz pozostałe projekty ↗</Link></div></div></section>
      <section className="section shell practical-more"><div className="section-head"><div><span className="section-no">POZOSTAŁE PROGRAMY NA OBECNYM ETAPIE</span><h2>Można już pokazać ich zastosowanie i kod.</h2></div><p>Nie wszystkie mają gotową publiczną wersję online. Dlatego opisuję wprost, co można dziś pobrać lub sprawdzić na GitHubie.</p></div><div className="extra-grid">{additionalProjects.map(project => <article key={project.name}><span>{project.status}</span><h3>{project.name}</h3><p><b>Do czego służy:</b> {project.purpose}</p><p><b>Co znajdziesz na GitHubie:</b> {project.access}</p><a href={project.url} target="_blank" rel="noreferrer">Otwórz właściwe repozytorium ↗</a></article>)}</div></section>
      <section className="section shell next-project"><span className="section-no">PODOBNY PROBLEM W TWOJEJ FIRMIE</span><h2>Najpierw ustalmy, gdzie ginie czas albo informacja.</h2><p>Opisz krótko obecny sposób pracy. Sprawdzimy, czy wystarczy formularz, prosty status sprawy czy osobne narzędzie.</p><Link className="button" href="/kontakt">Opisz swoją sytuację <span>↗</span></Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
