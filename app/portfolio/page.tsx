import type { Metadata } from "next";
import { SiteFooter, SiteHeader, QuickWhatsApp } from "../SiteChrome";
import PortfolioExplorer from "./PortfolioExplorer";
import { portfolioItems } from "./catalog";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio: strony WWW, gazetki, projekty i aplikacje",
  description: "Strony WWW, gazetki, logo, aplikacje i arkusze Excel marki Zielona Marka. Obejrzyj działające demo każdej pracy albo zapisz całe portfolio jako PDF.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: "Portfolio projektów | Zielona Marka",
    description: "Prace Zielonej Marki: strony WWW, gazetki produktowe, logo, aplikacje i Excel, każda z działającym podglądem.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio projektów | Zielona Marka",
    description: "Strony internetowe, gazetki, logo, aplikacje i Excel. Obejrzyj prace na żywo albo pobierz portfolio w PDF.",
    images: ["/og.jpg"],
  },
};

export default function PortfolioPage() {
  return <>
    <SiteHeader />
    <main className="zm-public zmp-page">
      <PortfolioExplorer items={portfolioItems} />
      <section className="zmp-bottom-cta shell">
        <div><span className="zmp-overline">DOPASOWANE DO TWOJEJ FIRMY</span><h2>Chcesz coś podobnego u siebie?</h2><p>Napisz w dwóch zdaniach, co Twoja strona ma robić, a odpiszemy, ile to zajmie i ile kosztuje. Zakres ustalamy przed startem, więc na fakturze nie ma niespodzianek.</p></div>
        <a href="/kontakt" className="zmp-btn zmp-btn-strong">Porozmawiajmy o projekcie ↗</a>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
