/* eslint-disable @next/next/no-img-element -- Podglądy to istniejące statyczne grafiki WebP i SVG, bez potrzeby zewnętrznego optymalizatora. */
import type { Metadata } from "next";
import Link from "../../SafeLink";
import { notFound } from "next/navigation";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";
import { findPortfolioItem, portfolioCategories, portfolioItems } from "../catalog";
import "../portfolio.css";

export function generateStaticParams() {
  return portfolioItems.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findPortfolioItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} | portfolio projektowe`,
    description: `${item.summary} ${item.explanation}`.slice(0, 270),
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      type: "article",
      url: `/portfolio/${slug}`,
      title: `${item.title} | Zielona Marka`,
      description: item.summary,
      images: [item.image || "/og.jpg"],
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findPortfolioItem(slug);
  if (!item) notFound();
  const category = portfolioCategories.find(group => group.id === item.category);
  const other = portfolioItems.filter(project => project.category === item.category && project.slug !== item.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    abstract: item.explanation,
    genre: category?.label,
    audience: { "@type": "Audience", audienceType: item.industry },
    creator: { "@type": "Organization", name: "Zielona Marka", url: "https://zielona-marka.pl" },
    url: `https://zielona-marka.pl/portfolio/${item.slug}`,
    ...(item.image ? { image: new URL(item.image,"https://zielona-marka.pl").toString() } : {}),
    isAccessibleForFree: true,
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <SiteHeader />
    <main className="zm-public zmp-page zmp-detail">
      <nav className="shell zmp-back" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span>/</span><Link href="/portfolio">Portfolio</Link><span>/</span><span aria-current="page">{item.title}</span></nav>
      <section className="shell zmp-detail-hero">
        <div className="zmp-detail-copy">
          <span className="zmp-overline">{category?.label} / {item.industry}</span>
          <h1>{item.title}</h1>
          <p className="zmp-detail-lead">{item.summary}</p>
          <div className="zmp-detail-status">Status: {item.status}</div>
          <div className="zmp-detail-actions">
            {item.demoUrl && <a className="zmp-btn zmp-btn-strong" href={item.demoUrl} target={item.demoUrl.startsWith("http") ? "_blank" : undefined} rel={item.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>Otwórz dostępny materiał ↗</a>}
            <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/druk?projekty=${item.slug}`} target="_blank" rel="noopener noreferrer">Zapisz kartę jako PDF ↗</Link>
          </div>
        </div>
        <figure className="zmp-detail-visual" data-media={
          item.image?.includes("-autentyczny-podglad.png") || item.image?.includes("aktywnik-plus-aktualny-ekran.png")
            ? "screen"
            : ["gazetki", "logo", "przed-po", "excel"].includes(item.category) || item.image?.includes("/concept-samples-v2/")
              ? "art"
              : "photo"
        }>
          {item.image ? <img src={item.image} alt={item.alt || `Podgląd projektu ${item.title}`} /> : <div className="zmp-detail-placeholder"><span>Zielona Marka / portfolio</span><strong>{item.title}</strong><small>{item.industry}</small></div>}
          <figcaption>{item.image ? "Materiał koncepcyjny lub podgląd projektu" : "Projekt demonstracyjny, bez udostępnionego zrzutu na stronie portfolio"}</figcaption>
        </figure>
      </section>
      <section className="shell zmp-detail-text">
        <article><span className="zmp-overline">ZAMYSŁ PROJEKTU</span><h2>Co pokazuje ten projekt?</h2><p>{item.explanation}</p></article>
        <article><span className="zmp-overline">ZAKRES PREZENTACJI</span><h2>Elementy do obejrzenia</h2><ul>{item.features.map(feature=><li key={feature}>{feature}</li>)}</ul></article>
      </section>
      <section className="shell zmp-disclaimer"><strong>Charakter materiałów</strong><p>To portfolio koncepcji, projektów własnych i demonstracji marki Zielona Marka. Nie oznacza, że prezentowane rozwiązanie zostało wdrożone dla rzeczywistego klienta. Tam, gdzie występują ceny, produkty, dostępność lub dane operacyjne, mogą być one fikcyjne i służą wyłącznie pokazowi.</p></section>
      {other.length > 0 && <section className="shell zmp-related"><span className="zmp-overline">PODOBNE PRACE</span><h2>W tej samej kategorii</h2><div>{other.map(project=><Link key={project.slug} href={`/portfolio/${project.slug}`}><strong>{project.title}</strong><span>{project.industry} ↗</span></Link>)}</div></section>}
      <section className="shell zmp-bottom-cta"><div><span className="zmp-overline">KOLEJNY PROJEKT</span><h2>Porozmawiajmy o Twojej firmie.</h2><p>Każde zlecenie wymaga własnego zakresu i materiałów. Demo pokazuje kierunek, a nie gotowy produkt do skopiowania.</p></div><Link href="/kontakt" className="zmp-btn zmp-btn-strong">Napisz do marki Zielona Marka ↗</Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
