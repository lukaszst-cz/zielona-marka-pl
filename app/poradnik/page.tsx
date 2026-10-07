import type { Metadata } from "next";
import Link from "../SafeLink";
import { GuideBreadcrumbs } from "../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import RelatedServices from "../RelatedServices";

export const metadata: Metadata = {
  title: "Poradniki dla małych firm",
  description: "Praktyczne poradniki Zielonej Marki o kosztach strony, zdobywaniu zapytań, modernizacji i obsłudze klientów w małej firmie.",
  alternates: { canonical: "/poradnik", types: { "application/rss+xml": "/poradnik/rss.xml" } },
  openGraph: { title: "Poradniki dla małych firm | Zielona Marka", description: "Praktycznie o stronach, zapytaniach i widoczności lokalnej.", url: "/poradnik", images: [{ url: "/og-poradniki-zielona-marka.png", width: 1200, height: 630, alt: "Poradniki Zielonej Marki dla małych firm" }] },
  twitter: { card: "summary_large_image", images: ["/og-poradniki-zielona-marka.png"] },
};

const guides = [
  { href: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", no: "01", label: "WIDOCZNOŚĆ I KONTAKT", title: "Dlaczego strona firmy nie przynosi zapytań?", text: "Siedem częstych przeszkód oraz kolejność poprawek przed inwestycją w reklamę.", time: "około 7 minut" },
  { href: "/poradnik/ile-kosztuje-strona-dla-malej-firmy", no: "02", label: "KOSZT I ZAKRES", title: "Ile kosztuje strona internetowa dla małej firmy?", text: "Trzy praktyczne warianty, czynniki wpływające na cenę oraz koszty płatne osobno.", time: "około 8 minut" },
  { href: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac", no: "03", label: "WARSZTAT I DETAILING", title: "Co powinna zawierać strona internetowa warsztatu?", text: "Praktyczna lista elementów: usługi, telefon, lokalizacja, formularz, zdjęcia, opinie i lokalna widoczność.", time: "około 9 minut" },
  { href: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac", no: "04", label: "SALON BEAUTY", title: "Co powinna zawierać strona internetowa salonu beauty?", text: "Oferta, cennik, efekty, rezerwacja, przygotowanie do wizyty, lokalna widoczność oraz sprzedaż voucherów i produktów.", time: "około 9 minut" },
] as const;

export default function GuidesPage() {
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://zielona-marka.pl/poradnik#webpage", name: "Poradniki Zielonej Marki", url: "https://zielona-marka.pl/poradnik", isPartOf: { "@id": "https://zielona-marka.pl/#website" }, mainEntity: { "@type": "ItemList", itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `https://zielona-marka.pl${guide.href}`, name: guide.title })) } };
  return <><SiteHeader /><main className="zm-public guide-page guide-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
    <header className="page-hero shell"><GuideBreadcrumbs /><span className="eyebrow"><i />WIEDZA DLA MAŁEJ FIRMY</span><h1>Praktycznie o stronie, widoczności <em>i obsłudze zapytań.</em></h1><p>Bez technicznego nadmiaru. Każdy poradnik pomaga rozpoznać problem, podjąć decyzję i wybrać następny sensowny krok.</p></header>
    <section className="section shell guide-library"><div className="section-head"><div><span className="section-no">AKTUALNE PORADNIKI</span><h2>Zacznij od pytania, które dotyczy Twojej firmy.</h2></div><p>Biblioteka będzie rozwijana na podstawie rzeczywistych pytań klientów, nie przypadkowych słów kluczowych.</p></div><div>{guides.map(guide => <Link href={guide.href} key={guide.href}><span>{guide.no} / {guide.label}</span><h2>{guide.title}</h2><p>{guide.text}</p><div className="guide-card-meta"><b>Czytaj poradnik ↗</b><small>{guide.time}</small></div></Link>)}</div></section>
    <RelatedServices items={[{ href: "/modernizacja-strony", label: "Modernizacja strony", text: "Sprawdź, co poprawić, gdy obecna strona nie przynosi zapytań lub źle działa na telefonie." }, { href: "/maly-crm-dla-firm", label: "Mały CRM", text: "Uporządkuj kontakty, wyceny, terminy i następne działania po otrzymaniu zapytania." }, { href: "/strony-internetowe", label: "Widoczność lokalna", text: "Zobacz podejście do stron dla firm z Warszawy, Targówka, Marek i okolic." }]} />
    <section className="section guide-cta"><div className="shell"><span className="section-no">NIE WIESZ, OD CZEGO ZACZĄĆ?</span><h2>Wyślij adres strony albo opisz firmę.</h2><p>Wskażę najważniejszy następny krok bez rozmowy o budżecie i bez zobowiązania do dalszej współpracy.</p><Link className="button" href="/modernizacja-strony#miniaudyt">Poproś o mini ocenę <span>↗</span></Link></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
