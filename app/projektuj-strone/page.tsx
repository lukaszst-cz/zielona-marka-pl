import type { Metadata } from "next";
import Link from "../SafeLink";
import WebsiteConfigurator from "../WebsiteConfigurator";
import { SiteHeader, SiteFooter, QuickWhatsApp } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Kreator całej strony WWW i wycena — ZM Studio",
  description: "Zobacz pełną przykładową stronę WWW od nagłówka po stopkę. Dobierz branżę, kolory, sekcje i funkcje. Oblicz budżet wykonania oraz koszt pierwszego i trzech lat.",
  alternates: { canonical: "/projektuj-strone" }
  openGraph: { type: "website", url: "/projektuj-strone", title: "Kreator całej strony WWW i wycena — ZM Studio | Zielona Marka", description: "Zobacz pełną przykładową stronę WWW od nagłówka po stopkę. Dobierz branżę, kolory, sekcje i funkcje. Oblicz budżet wykonania oraz koszt pierwszego i trzech lat.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka – strony internetowe, DTP i rozwiązania dla firm" }] },
  twitter: { card: "summary_large_image", title: "Kreator całej strony WWW i wycena — ZM Studio | Zielona Marka", description: "Zobacz pełną przykładową stronę WWW od nagłówka po stopkę. Dobierz branżę, kolory, sekcje i funkcje. Oblicz budżet wykonania oraz koszt pierwszego i trzech lat.", images: ["/og.jpg"] },,
};

export default function Page() {
  return <><SiteHeader/><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i/> ZM STUDIO / KONFIGURATOR STRONY WWW</span><h1>Wybierz styl strony. <em>Zobacz, jak może wyglądać Twoja firma w internecie.</em></h1>
      <p>Wybierz branżę, nazwę firmy, styl, sekcje i funkcje. Zobacz pełną przykładową stronę od menu po stopkę oraz koszt wykonania, hostingu, domeny i opieki — bez logowania i bez zobowiązań.</p>
      <div className="hero-actions"><a href="#zm-konfigurator" className="button">Przejdź do konfiguratora ↗</a><Link href="/oferta#kalkulator-pelnego-kosztu" className="text-link">Koszt pierwszego i kolejnych lat ↗</Link></div>
    </section>
    <section id="zm-konfigurator" className="section shell"><div className="section-head"><div><span className="section-no">INTERAKTYWNY PODGLĄD</span><h2>Zaprojektuj całą stronę i od razu poznaj orientacyjny koszt.</h2></div><p>Podgląd obejmuje wszystkie podstawowe sekcje strony — od nawigacji aż po kontakt i stopkę. To demonstracja projektu, nie gotowy serwis; zakres dodatkowych podstron i funkcji potwierdzamy indywidualnie.</p></div><WebsiteConfigurator /></section>
    <section className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">PEŁNA PRZEJRZYSTOŚĆ</span><h2>Projekt to jedno. Domena, serwer i opieka to osobne koszty.</h2><p>W naszym kalkulatorze zobaczysz orientacyjne koszty wykonania, pierwszego roku działania strony, jej odnowienia oraz trzech lat użytkowania.</p><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Policz całkowity koszt ↗</Link></div><div><h3>Możesz też zacząć od:</h3><ul className="check-list"><li>ZM Mini — prosta wizytówka na start</li><li>ZM Start — kompletna jednostronicowa oferta</li><li>ZM LeadFlow — rozbudowana obsługa zapytań</li><li>Materiały drukowane — wizytówki, foldery i gazetki</li></ul><Link href="/dtp">Zobacz DTP i materiały drukowane ↗</Link></div></div></section>
  </main><QuickWhatsApp/><SiteFooter/></>;
}
