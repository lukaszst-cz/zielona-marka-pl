 
import type { Metadata } from "next";
import Link from "../../SafeLink";
import { notFound } from "next/navigation";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";
import { findPortfolioItem, portfolioCategories, portfolioItems } from "../catalog";
import ZoomableProjectCover from "../ZoomableProjectCover";
import WorkflowConnections from "../WorkflowConnections";
import "../zoom.css";
import DetailMotion from "../DetailMotion";
import { websiteCaseStudies } from "../websiteCaseStudies";
import { additionalCaseStudies } from "../additionalCaseStudies";
import "../portfolio.css";
import "../materivo-variants.css";

export function generateStaticParams() {
  return portfolioItems.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findPortfolioItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} | portfolio projektowe`,
    description: item.summary.length <= 158
      ? item.summary
      : item.summary.slice(0, 157).replace(/\\s+\\S*$/, "") + ".",
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
  const caseStudy = websiteCaseStudies[item.slug] ?? additionalCaseStudies[item.slug];
  const category = portfolioCategories.find(group => group.id === item.category);
  const other = portfolioItems.filter(project => project.category === item.category && project.slug !== item.slug).slice(0, 3);
  const materivoAlternative = slug === "materivo" ? findPortfolioItem("materivo-eko") : slug === "materivo-eko" ? findPortfolioItem("materivo") : null;
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
          {item.image?.startsWith("/concept-") && <div className="zmp-detail-status">Materiał koncepcyjny. Grafika pokazuje kierunek projektu, a nie wdrożenie u klienta.</div>}
          <div className="zmp-detail-actions">
            {item.demoUrl && <a className="zmp-btn zmp-btn-strong" href={item.demoUrl} target={item.demoUrl.startsWith("http") ? "_blank" : undefined} rel={item.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>Zobacz, jak to działa ↗</a>}
            {item.downloadUrl && <a className="zmp-btn zmp-btn-strong" href={item.downloadUrl} download>{item.downloadLabel ?? "Pobierz plik"} ↓</a>}
            {item.slug === "centrum-budowlane-pwa" && <a className="zmp-btn zmp-btn-outline" href="https://github.com/lukaszst-cz/centrum-budowlane-pwa" target="_blank" rel="noopener noreferrer">Zobacz kod na GitHubie ↗</a>}
            <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/druk?projekty=${item.slug}`} target="_blank" rel="noopener noreferrer">Zapisz kartę jako PDF ↗</Link>
          </div>
        </div>
        <figure className="zmp-detail-visual" data-project={item.slug} data-media={
          item.slug === "centrum-budowlane-pwa" ? "screen" :
          item.image?.includes("-ekran.webp") || item.image?.includes("-autentyczny-podglad.png")
            ? "screen"
            : ["gazetki", "logo", "przed-po", "excel"].includes(item.category) || item.image?.includes("/concept-samples-v2/")
              ? "art"
              : "photo"
        }>
          {item.image
            ? <ZoomableProjectCover slug={item.slug} title={item.title} image={item.image} alt={item.alt} />
            : <div className="zmp-detail-placeholder"><span>Zielona Marka / portfolio</span><strong>{item.title}</strong><small>{item.industry}</small></div>}
          <figcaption>{item.image ? `Kadr z projektu ${item.title}. Kliknij obraz, aby go powiększyć.` : "Tej pracy nie pokazujemy na zrzucie"}</figcaption>
        </figure>
      </section>
      {materivoAlternative && <section className="shell zmp-materivo-variants zmx-reveal" aria-label="Warianty projektu MATERIVO">
        <div>
          <span className="zmp-overline">DWA WARIANTY JEDNEJ KONCEPCJI</span>
          <h2>Porównaj wersje MATERIVO</h2>
          <p>{slug === "materivo-eko" ? "Przeglądasz wersję ekonomiczną. Zobacz bardziej rozbudowaną wersję projektu." : "Przeglądasz rozbudowaną wersję. Zobacz prostszy wariant ekonomiczny."}</p>
        </div>
        <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/${materivoAlternative.slug}`}>Otwórz {materivoAlternative.title} ↗</Link>
      </section>}
      <section className="shell zmp-detail-text zmx-reveal">
        <article><span className="zmp-overline"><i>01</i> PO CO TO POWSTAŁO</span><h2>Pomysł w skrócie</h2><p>{item.explanation}</p></article>
        <article><span className="zmp-overline"><i>02</i> CO JEST W ŚRODKU</span><h2>Na co zwrócić uwagę</h2><ul className="zmx-feature-list">{item.features.map((feature,index)=><li key={feature} style={{ ["--zmx-i" as string]: String(index) }}>{feature}</li>)}</ul></article>
      </section>
      <WorkflowConnections item={item} />
      {caseStudy && <section className="shell zmp-website-story zmx-reveal" aria-label="Opis wykonania strony">
        <header className="zmp-story-heading">
          <div><span className="zmp-overline">JAK POWSTAŁ PROJEKT</span><h2>Od pomysłu do wykonania</h2></div>
          {caseStudy.version && <p className="zmp-story-version">{caseStudy.version}</p>}
        </header>
        <div className="zmp-story-grid">
          <article><span className="zmp-story-step">01 / WYGLĄD</span><h3>Warstwa wizualna</h3><p>{caseStudy.visual}</p></article>
          <article><span className="zmp-story-step">02 / KORZYSTANIE</span><h3>Ścieżka użytkownika</h3><p>{caseStudy.flow}</p></article>
          <article><span className="zmp-story-step">03 / REALIZACJA</span><h3>Sposób wykonania</h3><p>{caseStudy.technical}</p></article>
          <article><span className="zmp-story-step">04 / REZULTAT</span><h3>Zakres wykonania</h3><p>{caseStudy.scope}</p>
            {caseStudy.sources && <nav aria-label="Pliki projektu" className="zmp-story-links">{caseStudy.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</nav>}
          </article>
        </div>
      </section>}
      <section className="shell zmp-disclaimer zmx-reveal"><strong>Szczerze o tej pracy</strong><p>{caseStudy?.honest ?? "To nasz własny projekt, a nie wdrożenie zamówione przez firmę o tej nazwie. Nazwy, ceny, produkty i dostępność są wymyślone na potrzeby pokazu."}</p>{caseStudy?.variant && <p className="zmp-story-variant">{caseStudy.variant}</p>}</section>
      {other.length > 0 && <section className="shell zmp-related zmx-reveal"><span className="zmp-overline">PODOBNE PRACE</span><h2>W tej samej kategorii</h2><div>{other.map(project=><Link key={project.slug} href={`/portfolio/${project.slug}`}><strong>{project.title}</strong><span>{project.industry} ↗</span></Link>)}</div></section>}
      <section className="shell zmp-bottom-cta zmx-reveal"><div><span className="zmp-overline">KOLEJNY PROJEKT</span><h2>Zróbmy to dla Twojej firmy.</h2><p>Twoja strona dostanie własne treści, zdjęcia i zakres. To, co widzisz obok, pokazuje kierunek i poziom wykonania.</p></div><Link href="/kontakt" className="zmp-btn zmp-btn-strong">Napisz do nas ↗</Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
