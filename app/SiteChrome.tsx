import Link from "./SafeLink";
import BrandSignature from "./BrandSignature";
import DemoAssistant from "./DemoAssistant";
import FloatingContactVisibility from "./FloatingContactVisibility";
import SiteNavigationBehavior from "./SiteNavigationBehavior";
import { socialLinks } from "./site-data";
import { CookieSettingsLink } from "./CookieConsent";


export const offerNavigation = [
  ["Strony WWW", "/oferta"], ["Modernizacja strony", "/modernizacja-strony"],
  ["CRM i obsługa klientów", "/maly-crm-dla-firm"], ["Usprawnienia i automatyzacje", "/usprawnienia-firmy"],
  ["Firmy usługowe", "/strony-dla-firm-uslugowych"], ["Beauty", "/strony-dla-beauty"],
  ["Warsztaty", "/strony-dla-warsztatow"], ["Asystent zapytań", "/asystent-zapytan"],
  ["Warszawa · Targówek", "/strony-internetowe/targowek"],
] as const;

function LanguageSwitch({ english }: { english: boolean }) {
  return <span className="zm-languages" role="group" aria-label={english ? "Language" : "Język strony"}>
    <Link href="/" lang="pl" hrefLang="pl" aria-label="Polski" aria-current={!english ? "true" : undefined}>PL</Link>
    <Link href="/en" lang="en" hrefLang="en" aria-label="English" aria-current={english ? "true" : undefined}>EN</Link>
  </span>;
}

export function SiteHeader({ english = false }: { english?: boolean }) {
  return <header className="zm-header"><nav className="zm-nav" aria-label={english ? "Main navigation" : "Główna nawigacja"}>
    <Link className="zm-brand" href={english ? "/en" : "/"} aria-label="Zielona Marka"><BrandSignature /></Link>
    <div className="zm-nav-desktop">
      <details className="zm-offer-menu"><summary>{english ? "Services" : "Oferta"} <span aria-hidden="true">⌄</span></summary><div>{offerNavigation.map(([label, href]) => <Link key={href} href={english ? "/en#services" : href}>{english ? ({"Strony WWW":"Websites","Modernizacja strony":"Website redesign","CRM i obsługa klientów":"CRM and client service","Usprawnienia i automatyzacje":"Process automation","Firmy usługowe":"Service businesses","Beauty":"Beauty","Warsztaty":"Car workshops","Asystent zapytań":"Enquiry assistant","Chatbot dla firmy":"Business chatbot","Warszawa · Targówek":"Local websites"}[label]) : label}</Link>)}</div></details>
      <Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link>{!english && <Link href="/praktyczne-narzedzia">Narzędzia</Link>}<Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link><Link href={english ? "/en#contact" : "/kontakt"}>{english ? "Contact" : "Kontakt"}</Link><Link className="zm-client-link" href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link>
      <LanguageSwitch english={english} />
    </div>
    <details className="zm-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><div>{english ? <><a href="#services">Services</a><a href="#projects">Projects</a><a href="#process">Working together</a><a href="#contact">Contact</a></> : <>{offerNavigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/realizacje">Projekty</Link><Link href="/praktyczne-narzedzia">Praktyczne narzędzia</Link><Link href="/jak-pracuje">Współpraca</Link><Link href="/kontakt">Kontakt</Link></>}<Link href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link><LanguageSwitch english={english} /><a href="tel:+48450458466">+48 450 458 466</a></div></details>
  <SiteNavigationBehavior /></nav></header>;
}

export function SiteFooter({ english = false }: { english?: boolean }) {
  return <footer className="zm-footer"><div className="zm-footer-inner">
    <div className="zm-footer-brand"><Link href={english ? "/en" : "/"}><BrandSignature /></Link><p>{english ? "Websites and systems for businesses." : "Strony WWW i systemy dla firm."}<br />{english ? "Warsaw, Targówek and nearby. Remote work across Poland." : "Warszawa, Targówek i okolice. Zdalnie w całej Polsce."}</p></div>
    <div><h2>{english ? "Explore" : "Poznaj ofertę"}</h2><Link href={english ? "/en#services" : "/oferta"}>{english ? "Services" : "Oferta"}</Link><Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link><Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link><Link href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link></div>
    <div><h2>{english ? "Resources" : "Centrum zasobów"}</h2>{english ? <><Link href="/poradnik">Guides (PL)</Link><Link href="/praktyczne-narzedzia">Practical tools (PL)</Link></> : <><Link href="/poradnik">Poradniki</Link><Link href="/praktyczne-narzedzia">Praktyczne narzędzia</Link></>}</div>
    <div><h2>{english ? "Contact" : "Porozmawiajmy"}</h2><a href="tel:+48450458466">+48 450 458 466</a><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a><a href={socialLinks.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
    {!english && <div className="zm-footer-locations"><h2>Warszawa · Targówek i okolice</h2><div>{[["Targówek", "targowek"], ["Warszawa", "warszawa"], ["Ząbki", "zabki"], ["Zielonka", "zielonka"], ["Kobyłka", "kobylka"], ["Wołomin", "wolomin"], ["Radzymin", "radzymin"], ["Białołęka", "bialoleka"]].map(([name, slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}</Link>)}<Link href="/strony-internetowe-marki">Marki</Link></div></div>}<div className="zm-footer-bottom"><small>© {new Date().getFullYear()} Zielona Marka</small><Link href="/polityka-prywatnosci">{english ? "Privacy policy (PL)" : "Polityka prywatności"}</Link><CookieSettingsLink english={english} /><Link href={english ? "/" : "/en"}>{english ? "Polski" : "English"}</Link></div>
  </div></footer>;
}

export function QuickWhatsApp() {
  return <><FloatingContactVisibility /><DemoAssistant /><a className="whatsapp-float" href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer" aria-label="Napisz do Zielonej Marki na WhatsAppie">
    <span aria-hidden="true">◌</span><b>Napisz na WhatsApp</b><small>Szybka wiadomość</small><i aria-hidden="true">↗</i>
  </a></>;
}
