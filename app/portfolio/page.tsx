import type { Metadata } from "next";
import { SiteFooter, SiteHeader, QuickWhatsApp } from "../SiteChrome";
import PortfolioExplorer from "./PortfolioExplorer";
import { portfolioItems } from "./catalog";
import "./portfolio.css";
import "./zoom.css";

export const metadata: Metadata = {
  title: "Portfolio stron internetowych i koncepcji",
  description: "Autorskie projekty stron internetowych, koncepcje modernizacji, gazetki i narzędzia Zielonej Marki. Zobacz demonstracje i przykładowe rozwiązania.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: "Portfolio projektów | Zielona Marka",
    description: "Koncepcje stron internetowych, projekty demonstracyjne, gazetki i narzędzia dla firm. Zobacz wybrane rozwiązania Zielonej Marki.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio projektów | Zielona Marka",
    description: "Autorskie projekty i demonstracje: strony internetowe, gazetki, logo, aplikacje i arkusze. Obejrzyj portfolio Zielonej Marki.",
    images: ["/og.jpg"],
  },
};

export default function PortfolioPage() {
  return <>
    <SiteHeader />
    <main className="zm-public zmp-page">
      <PortfolioExplorer items={portfolioItems} />
      <section className="zmp-beforeafter shell" id="przed-po" aria-labelledby="zmp-przedpo-title">
        <div className="zmp-beforeafter-copy">
          <span className="zmp-overline">PRZED I PO</span>
          <h2 id="zmp-przedpo-title">Zobacz swoją stronę w nowej wersji, zanim cokolwiek zamówisz.</h2>
          <p>Koncepcje PION, FORMA i OKRUCH pokazują przykładowe strony przed odświeżeniem i po nim. To symulacje, a nie przebudowy wykonane dla klientów. Podobne porównanie mogę przygotować na podstawie Twojej strony, jej treści, zdjęć i oferty.</p>
          <p>Koncepcja jest bezpłatna i nie zobowiązuje do niczego. Jeśli się spodoba, rozmawiamy dalej. Jeśli nie, zostaje Ci gotowy pomysł na poprawki.</p>
          <div className="zmp-pdf-actions"><a href="/bezplatna-koncepcja-strony" className="zmp-btn zmp-btn-strong">Zamów symulację swojej strony ↗</a><a href="#zmp-katalog" className="zmp-btn zmp-btn-outline">Obejrzyj prace przed i po ↓</a></div>
        </div>
        <ol className="zmp-beforeafter-steps">
          <li><b>01</b><h3>Wysyłasz adres strony</h3><p>Wystarczy link i jedno zdanie o tym, co Cię w niej uwiera.</p></li>
          <li><b>02</b><h3>Przygotowuję nową wersję</h3><p>Na Twoich treściach, w układzie dopasowanym do tego, czego szuka Twój klient.</p></li>
          <li><b>03</b><h3>Oglądasz porównanie</h3><p>Stara i nowa wersja obok siebie, z komentarzem, co i dlaczego się zmieniło.</p></li>
        </ol>
      </section>
      <section className="zmp-bottom-cta shell" id="koncepcja">
        <div><span className="zmp-overline">BEZPŁATNA KONCEPCJA</span><h2>Chcesz zobaczyć swoją stronę w takiej wersji?</h2><p>Wklej adres swojej strony. Przygotuję nową wersję na Twoich treściach i pokażę porównanie starej z nową. Bez opłat, bez zobowiązań i bez pytania o budżet.</p></div>
        <form className="zmp-concept-form" method="get" action="/bezplatna-koncepcja-strony#zgloszenie">
          <input type="hidden" name="typ" value="existing" />
          <label htmlFor="zmp-concept-site">Adres Twojej strony</label>
          <div className="zmp-concept-row">
            <input id="zmp-concept-site" name="strona" type="text" inputMode="url" autoComplete="url" maxLength={200} placeholder="twojastrona.pl" />
            <button type="submit" className="zmp-btn zmp-btn-strong">Pokaż moją stronę w nowej wersji ↗</button>
          </div>
          <p className="zmp-concept-note">Nie masz jeszcze strony? <a href="/bezplatna-koncepcja-strony">Zamów koncepcję dla nowej firmy ↗</a> albo <a href="/kontakt">napisz do nas ↗</a>.</p>
        </form>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
