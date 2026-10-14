import type { Metadata } from "next";
import Link from "../SafeLink";
import { GuideBreadcrumbs } from "../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import BlogExplorer from "./BlogExplorer";
import { blogArticles } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog – strony WWW, SEO, DTP i porady dla firm",
  description: "Blog Zielonej Marki: praktyczne artykuły o stronach internetowych, kosztach utrzymania, lokalnym SEO, projektowaniu gazetek, DTP i organizacji zapytań klientów.",
  alternates: { canonical: "/poradnik", types: { "application/rss+xml": "/poradnik/rss.xml" } },
  openGraph: {
    title: "Blog | Zielona Marka",
    description: "Praktycznie o stronach WWW, Google, DTP i sprawnym prowadzeniu małej firmy.",
    url: "/poradnik",
    images: [{ url: "/og-poradniki-zielona-marka.png", width: 1200, height: 630, alt: "Blog Zielonej Marki" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-poradniki-zielona-marka.png" ] },
};

export default function GuidesPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://zielona-marka.pl/poradnik#webpage",
    name: "Blog Zielonej Marki",
    description: metadata.description,
    url: "https://zielona-marka.pl/poradnik",
    isPartOf: { "@id": "https://zielona-marka.pl/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://zielona-marka.pl${article.href}`,
        name: article.title,
      })),
    },
  };
  return <><SiteHeader /><main className="zm-public guide-page guide-hub zm-blog-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
    <header className="page-hero shell zm-blog-hero">
      <GuideBreadcrumbs />
      <span className="eyebrow"><i /> BLOG ZIELONEJ MARKI / WIEDZA DLA FIRM</span>
      <h1>Blog Zielonej Marki. <em>Wiedza, która pomaga firmie rosnąć.</em></h1>
      <p>Strony internetowe, widoczność w Google, DTP i sprawna obsługa klientów. Konkretne artykuły, przykłady i narzędzia do wykorzystania w codziennej pracy — bez marketingowego żargonu.</p>
      <div className="hero-actions"><a className="button" href="#artykuly">Przeglądaj artykuły <span>↘</span></a><Link className="text-link" href="/dtp#kalkulator-dtp">Sprawdź kalkulator DTP ↗</Link></div>
    </header>
    <section className="section shell zm-blog-main" id="artykuly"><BlogExplorer /></section>
    <section className="section shell zm-blog-action">
      <div><span className="section-no">OD ARTYKUŁU DO DZIAŁANIA</span><h2>Masz temat, który chcesz przełożyć na działanie?</h2>
        <p>Możesz zacząć od minioceny obecnej strony, wyceny nowej witryny albo konfiguratora materiałów drukowanych. Dobieramy rozwiązanie do rzeczywistej potrzeby.</p></div>
      <div className="zm-blog-action-links">
        <Link href="/projektuj-strone">Zaprojektuj przykładową stronę ↗</Link>
        <Link href="/oferta#kalkulator-pelnego-kosztu">Policz koszt strony i utrzymania ↗</Link>
        <Link href="/dtp#kalkulator-dtp">Wyceń gazetkę, folder lub ulotkę ↗</Link>
      </div>
    </section>
    <section className="section guide-cta"><div className="shell"><span className="section-no">NIE ZNALAZŁEŚ ODPOWIEDZI?</span>
      <h2>Opisz swoją firmę albo podeślij stronę do oceny.</h2>
      <p>Wskażę pierwszy sensowny krok — bez presji i zobowiązania do współpracy.</p>
      <Link className="button" href="/modernizacja-strony#miniaudyt">Poproś o mini ocenę <span>↗</span></Link>
    </div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
