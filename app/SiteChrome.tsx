import Link from "./SafeLink";
import BrandSignature from "./BrandSignature";
import { socialLinks } from "./site-data";

const navigation = [
  ["Oferta", "/oferta"],
  ["Dla branż", "/#dla-kogo"],
  ["Modernizacja", "/modernizacja-strony"],
  ["Realizacje", "/realizacje"],
  ["Mały CRM", "/maly-crm-dla-firm"],
  ["Usprawnienia", "/usprawnienia-firmy"],
  ["Jak pracuję", "/jak-pracuje"],
] as const;

export function SiteHeader() {
  return <header className="site-header">
    <nav className="nav shell" aria-label="Główna nawigacja">
      <Link className="brand" href="/" aria-label="Zielona Marka, strona główna"><BrandSignature /></Link>
      <div className="nav-links">
        {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <Link href="/kontakt">Kontakt</Link>
      </div>
      <div className="language-switch" aria-label="Wybór języka">
        <Link className="active" href="/" lang="pl" aria-label="Polska wersja językowa">🇵🇱 <span>PL</span></Link>
        <Link href="/en" lang="en" aria-label="English version">🇬🇧 <span>EN</span></Link>
      </div>
      <Link className="button button-small" href="/kontakt">Wyceń projekt</Link>
      <details className="mobile-menu">
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <div>{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/kontakt">Kontakt i wycena</Link><Link href="/status">Strefa klienta</Link></div>
      </details>
    </nav>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <Link className="brand" href="/"><BrandSignature /></Link>
      <p>Strony WWW, formularze wyceny i systemy, które porządkują codzienną pracę firm.</p>
      <div>
        <Link href="/oferta">Oferta</Link>
        <Link href="/realizacje">Realizacje</Link>
        <Link href="/status">Status projektu</Link>
        <Link href="/studio">Studio pracy</Link>
        <a href={socialLinks.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>
        <a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <Link href="/polityka-prywatnosci">Prywatność</Link>
      </div>
      <small>© {new Date().getFullYear()} Zielona Marka</small>
    </div>
  </footer>;
}

export function QuickWhatsApp() {
  return <a className="whatsapp-float" href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer" aria-label="Napisz do Zielonej Marki na WhatsAppie">
    <span aria-hidden="true">◌</span><b>Napisz na WhatsApp</b><small>Szybka wiadomość</small><i aria-hidden="true">↗</i>
  </a>;
}
