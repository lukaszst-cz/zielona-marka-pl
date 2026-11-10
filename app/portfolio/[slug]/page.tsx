 
import type { Metadata } from "next";
import Link from "../../SafeLink";
import { notFound } from "next/navigation";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";
import { findPortfolioItem, portfolioCategories, portfolioItems } from "../catalog";
import ProjectCover from "../ProjectCover";
import DetailMotion from "../DetailMotion";
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
    <DetailMotion />
    <main className="zm-public zmp-page zmp-detail">
      <nav className="shell zmp-back" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span>/</span><Link href="/portfolio">Portfolio</Link><span>/</span><span aria-current="page">{item.title}</span></nav>
      <section className="shell zmp-detail-hero zmx-reveal">
        <div className="zmp-detail-copy">
          <span className="zmp-overline">{category?.label} / {item.industry}</span>
          <h1>{item.title}</h1>
          <p className="zmp-detail-lead">{item.summary}</p>
          {item.openAccess && <p className="zmx-open-note">
            {item.openAccess === "github"
              ? "Kod tego narzędzia jest na GitHubie na licencji MIT: można go pobrać, uruchomić u siebie, zmieniać i używać także komercyjnie."
              : "Narzędzie działa w przeglądarce za darmo, bez zakładania konta."}
          </p>}
          {item.status.includes("beta") && <div className="zmp-detail-status">W budowie: {item.status}</div>}
          <div className="zmp-detail-actions">
            {item.demoUrl && <a className="zmp-btn zmp-btn-strong" href={item.demoUrl} target={item.demoUrl.startsWith("http") ? "_blank" : undefined} rel={item.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>Zobacz, jak to działa ↗</a>}
            <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/druk?projekty=${item.slug}`} target="_blank" rel="noopener noreferrer">Zapisz kartę jako PDF ↗</Link>
          </div>
        </div>
        <figure className="zmp-detail-visual" data-media={
          item.image?.includes("-ekran.webp") || item.image?.includes("-autentyczny-podglad.png")
            ? "screen"
            : ["gazetki", "logo", "przed-po", "excel"].includes(item.category) || item.image?.includes("/concept-samples-v2/")
              ? "art"
              : "photo"
        }>
          {item.image
            ? <span className="zmx-detail-stage"><ProjectCover slug={item.slug} title={item.title} image={item.image} alt={item.alt} priority /></span>
            : <div className="zmp-detail-placeholder"><span>Zielona Marka / portfolio</span><strong>{item.title}</strong><small>{item.industry}</small></div>}
          <figcaption>{item.image ? `Kadr z projektu ${item.title}` : "Tej pracy nie pokazujemy na zrzucie"}</figcaption>
        </figure>
      </section>
      <section className="shell zmp-detail-text zmx-reveal">
        <article><span className="zmp-overline"><i>01</i> PO CO TO POWSTAŁO</span><h2>Pomysł w skrócie</h2><p>{item.explanation}</p></article>
        <article><span className="zmp-overline"><i>02</i> CO JEST W ŚRODKU</span><h2>Na co zwrócić uwagę</h2><ul className="zmx-feature-list">{item.features.map((feature,index)=><li key={feature} style={{ ["--zmx-i" as string]: String(index) }}>{feature}</li>)}</ul></article>
      </section>
      <section className="shell zmp-disclaimer zmx-reveal"><strong>Szczerze o tej pracy</strong><p>To nasz własny projekt, a nie wdrożenie zamówione przez firmę o tej nazwie. Nazwy, ceny, produkty i dostępność są wymyślone na potrzeby pokazu.</p></section>
      {other.length > 0 && <section className="shell zmp-related zmx-reveal"><span className="zmp-overline">PODOBNE PRACE</span><h2>W tej samej kategorii</h2><div>{other.map(project=><Link key={project.slug} href={`/portfolio/${project.slug}`}><strong>{project.title}</strong><span>{project.industry} ↗</span></Link>)}</div></section>}
      <section className="shell zmp-bottom-cta zmx-reveal"><div><span className="zmp-overline">KOLEJNY PROJEKT</span><h2>Zróbmy to dla Twojej firmy.</h2><p>Twoja strona dostanie własne treści, zdjęcia i zakres. To, co widzisz obok, pokazuje kierunek i poziom wykonania.</p></div><Link href="/kontakt" className="zmp-btn zmp-btn-strong">Napisz do nas ↗</Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
