import type { Metadata } from "next";
import Image from "next/image";
import Link from "../SafeLink";
import { GuideBreadcrumbs, GuideFaq } from "../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import BlogExplorer from "./BlogExplorer";
import { blogArticles } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog – strony WWW, SEO, DTP i porady dla firm",
  description: "Blog Zielona Marka: praktyczne artykuły o stronach internetowych, kosztach utrzymania, lokalnym SEO, projektowaniu gazetek, DTP i organizacji zapytań klientów.",
  alternates: { canonical: "/poradnik", types: { "application/rss+xml": "/poradnik/rss.xml" } },
  openGraph: {
    title: "Blog | Zielona Marka",
    description: "Praktycznie o stronach WWW, Google, DTP i sprawnym prowadzeniu małej firmy.",
    url: "/poradnik",
    images: [{ url: "/og-poradniki-zielona-marka.png", width: 1200, height: 630, alt: "Blog Zielona Marka" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-poradniki-zielona-marka.png" ] },
};

const blogFaq = [
  ["Od którego artykułu najlepiej zacząć?", "Wybierz temat związany z najbliższym zadaniem firmy: nową stroną, usprawnieniem kontaktu, widocznością w Google albo przygotowaniem materiałów do druku. Możesz też skorzystać z wyszukiwarki i filtrów."],
  ["Czy porady przydadzą się, jeśli mam już stronę?", "Tak. Część tekstów dotyczy poprawiania istniejącej witryny, jej kosztów utrzymania, treści, formularzy i widoczności lokalnej."],
  ["Czy artykuły zastępują audyt i indywidualną wycenę?", "Nie. Pokazują zasady i możliwe rozwiązania. Dobór zakresu i kosztów do konkretnej firmy wymaga poznania jej potrzeb i sprawdzenia obecnej sytuacji."],
  ["Kto przygotowuje poradniki?", "Autorem jest Łukasz Staniewicz z marki Zielona Marka. Na stronie każdego artykułu znajdziesz informację o autorze i dacie aktualizacji."],
] as const;

export default function GuidesPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://zielona-marka.pl/poradnik#webpage",
    name: "Blog Zielona Marka",
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
  return <><SiteHeader /><main className="zm-public guide-page zm-blog-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
    <section className="page-hero shell">
      <GuideBreadcrumbs />
      <span className="eyebrow"><i /> BLOG / ZIELONA MARKA</span>
      <h1>Blog Zielona Marka. <em>Wiedza przydatna w Twojej firmie.</em></h1>
      <p>Strony WWW, widoczność w Google, projektowanie materiałów do druku i proste sposoby usprawniania pracy. Sprawdzone rozwiązania wyjaśnione zrozumiałym językiem.</p>
      <div className="hero-actions">
        <a className="button" href="#artykuly">Zobacz artykuły <span aria-hidden="true">↗</span></a>
        <Link className="text-link" href="/dtp">Oferta DTP <span aria-hidden="true">↗</span></Link>
      </div>
      <aside className="zm-blog-byline" aria-label="Autor artykułów">
        <Image src="/lukasz-kontakt-naturalny-20260919.webp" alt="" width={60} height={60} unoptimized />
        <div>
          <small>AUTOR PORADNIKÓW</small>
          <strong>Łukasz Staniewicz</strong>
          <Link href="/jak-pracuje">Poznaj autora i sposób pracy ↗</Link>
        </div>
      </aside>
    </section>
    <section className="section shell" id="artykuly"><BlogExplorer /></section>
    <section className="section shell zm-blog-service-links">
      <div className="section-head">
        <div><span className="section-no">OD INFORMACJI DO DZIAŁANIA</span><h2>Możemy też zająć się tym za Ciebie.</h2></div>
        <p>Gdy artykuł wyjaśni problem, możesz przejść bezpośrednio do właściwej usługi marki Zielona Marka.</p>
      </div>
      <div className="zm-blog-service-grid">
        <Link href="/oferta#kalkulator-pelnego-kosztu"><span>01 / STRONY WWW</span><h3>Wyceń stronę internetową</h3><p>Sprawdź koszty wykonania, domeny, serwera i opieki.</p><b>Sprawdź kalkulator ↗</b></Link>
        <Link href="/dtp#kalkulator-dtp"><span>02 / DTP I DRUK</span><h3>Wyceń gazetkę lub ulotkę</h3><p>Dobierz format, materiały, liczbę stron i kolejne wydania.</p><b>Konfigurator DTP ↗</b></Link>
        <Link href="/maly-crm-dla-firm"><span>03 / OBSŁUGA KLIENTÓW</span><h3>Uporządkuj zapytania</h3><p>Formularze, statusy i terminy kontaktu z klientami.</p><b>Zobacz rozwiązanie ↗</b></Link>
      </div>
    </section>
    <GuideFaq items={blogFaq} />
    <section className="section guide-cta"><div className="shell"><span className="section-no">NIE ZNALAZŁEŚ ODPOWIEDZI?</span>
      <h2>Opisz swoją firmę albo podeślij stronę do oceny.</h2>
      <p>Wskażę pierwszy sensowny krok — bez presji i zobowiązania do współpracy.</p>
      <Link className="button" href="/modernizacja-strony#miniaudyt">Poproś o mini ocenę <span>↗</span></Link>
    </div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
