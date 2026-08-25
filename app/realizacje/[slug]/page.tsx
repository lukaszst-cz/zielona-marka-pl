import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts } from "../../content";

type Slug = keyof typeof concepts;

export function generateStaticParams() {
  return Object.keys(concepts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = concepts[slug as Slug];
  if (!project) return {};
  return { title: `${project.name} — projekt koncepcyjny`, description: project.headline, openGraph: { title: `${project.name} — projekt koncepcyjny Zielonej Marki`, description: project.headline, images: [] }, twitter: { card: "summary", title: project.name, description: project.headline, images: [] } };
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = concepts[slug as Slug];
  if (!project) notFound();
  return <main className="concept-page" style={{ "--concept": project.accent } as React.CSSProperties}>
    <nav className="nav shell"><Link className="brand" href="/"><img className="brand-logo" src="/logo.png" alt=""/><span>ZIELONA MARKA</span></Link><a className="text-link" href="/?widok=realizacje#realizacje">← Wszystkie realizacje</a></nav>
    <header className="concept-hero shell">
      <div><span className="section-no">PROJEKT KONCEPCYJNY / {project.category}</span><h1>{project.name}</h1><p>{project.headline}</p></div>
      <figure><img src={project.image} alt={`Koncepcyjny wizerunek marki ${project.name}`}/></figure>
    </header>
    <section className="concept-intro shell">
      <article><small>WYZWANIE</small><h2>{project.challenge}</h2></article>
      <article><small>ROZWIĄZANIE</small><p>{project.solution}</p></article>
    </section>
    <section className="concept-screen shell">
      <div className="concept-browser"><span>● ● ●</span><div><small>{project.category}</small><h2>{project.headline}</h2><button>Umów rozmowę →</button></div></div>
      <aside><span className="section-no">ZAKRES I TECHNOLOGIE</span>{project.stack.map((item, index)=><div key={item}><b>{String(index+1).padStart(2,"0")}</b><span>{item}</span></div>)}</aside>
    </section>
    <section className="concept-cta"><div className="shell"><span className="section-no">STRONA + ZAPLECZE PROCESOWE</span><h2>Zobacz, jak ta firma mogłaby pracować od środka.</h2><div className="concept-actions"><Link className="button" href={project.demo}>Uruchom demo zaplecza <span>↗</span></Link><Link className="text-link" href="/#kontakt">Porozmawiajmy o wdrożeniu</Link></div></div></section>
  </main>;
}
