import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { concepts } from "../../content";
import { SiteFooter } from "../../SiteChrome";

type Slug = keyof typeof concepts;

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
    <section className="concept-screen shell">
      <div className="concept-browser"><span>● ● ●</span><div><small>{project.category}</small><h2>{project.headline}</h2><a className="button" href={project.website}>Zobacz demonstrację →</a></div></div>
      <aside><span className="section-no">ZAKRES I TECHNOLOGIE</span>{project.stack.map((item, index)=><div key={item}><b>{String(index+1).padStart(2,"0")}</b><span>{item}</span></div>)}</aside>
    </section>
    <section className="concept-cta"><div className="shell"><span className="section-no">STRONA + ZAPLECZE PROCESOWE</span><h2>Zobacz pełny efekt oraz sposób pracy firmy od środka.</h2><div className="concept-actions">{"website" in project && <a className="button" href={project.website}>Otwórz pełną stronę <span>↗</span></a>}<a className="button" href={project.demo}>Uruchom demo zaplecza <span>↗</span></a><a className="text-link" href="tel:+48450458466">Porozmawiajmy o wdrożeniu</a></div></div></section>
  </main><SiteFooter /></>;
}
