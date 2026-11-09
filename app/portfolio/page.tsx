import type { Metadata } from "next";
import { SiteFooter, SiteHeader, QuickWhatsApp } from "../SiteChrome";
import PortfolioExplorer from "./PortfolioExplorer";
import { portfolioItems } from "./catalog";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio: strony WWW, gazetki, projekty i aplikacje",
  description: "Zobacz koncepcje stron WWW, gazetki, identyfikacje wizualne, aplikacje oraz projekty Excel marki Zielona Marka. Wybierz prace i przygotuj portfolio PDF dla klienta.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: "Portfolio projektów | Zielona Marka",
    description: "Własne projekty koncepcyjne i demonstracje: WWW, gazetki produktowe, logo, aplikacje i Excel.",
    images: ["/og.jpg"],
  },
};

export default function PortfolioPage() {
  return <>
    <SiteHeader />
    <main className="zm-public zmp-page">
      <PortfolioExplorer items={portfolioItems} />
      <section className="zmp-bottom-cta shell">
        <div><span className="zmp-overline">DOPASOWANE DO TWOJEJ FIRMY</span><h2>Masz podobny projekt?</h2><p>Zobacz przykłady i napisz, jaki efekt chcesz uzyskać. Zakres nowego wdrożenia ustalamy osobno. Prace koncepcyjne nie są przedstawiane jako realizacje dla klientów.</p></div>
        <a href="/kontakt" className="zmp-btn zmp-btn-strong">Porozmawiajmy o projekcie ↗</a>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
