import fs from 'node:fs';
const p='app/SiteChrome.tsx';let s=fs.readFileSync(p,'utf8');const from=s.indexOf('const navigation =');const to=s.indexOf('export function QuickWhatsApp');s=s.slice(0,from)+`
export const offerNavigation = [
  ["Strony WWW", "/oferta"], ["Modernizacja strony", "/modernizacja-strony"],
  ["CRM i obsługa klientów", "/maly-crm-dla-firm"], ["Usprawnienia i automatyzacje", "/usprawnienia-firmy"],
  ["Firmy usługowe", "/strony-dla-firm-uslugowych"], ["Beauty", "/strony-dla-beauty"],
  ["Warsztaty", "/strony-dla-warsztatow"], ["Asystent zapytań", "/asystent-zapytan"],
  ["Chatbot dla firmy", "/chatbot-dla-firm"], ["Strony w Markach", "/strony-internetowe-marki"],
] as const;

export function SiteHeader({ english = false }: { english?: boolean }) {
  return <header className="zm-header"><nav className="zm-nav" aria-label={english ? "Main navigation" : "Główna nawigacja"}>
    <Link className="zm-brand" href={english ? "/en" : "/"} aria-label="Zielona Marka"><BrandSignature /></Link>
    <div className="zm-nav-desktop">
      <details className="zm-offer-menu"><summary>{english ? "Services" : "Oferta"} <span aria-hidden="true">⌄</span></summary><div>{offerNavigation.map(([label, href]) => <Link key={href} href={english ? "/en#services" : href}>{english ? ({"Strony WWW":"Websites","Modernizacja strony":"Website redesign","CRM i obsługa klientów":"CRM and client service","Usprawnienia i automatyzacje":"Process automation","Firmy usługowe":"Service businesses","Beauty":"Beauty","Warsztaty":"Car workshops","Asystent zapytań":"Enquiry assistant","Chatbot dla firmy":"Business chatbot","Strony w Markach":"Local websites"}[label]) : label}</Link>)}</div></details>
      <Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link><Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link><Link href={english ? "/en#contact" : "/kontakt"}>{english ? "Contact" : "Kontakt"}</Link><Link className="zm-client-link" href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link>
      <span className="zm-languages"><Link href="/" lang="pl">PL</Link><Link href="/en" lang="en">EN</Link></span>
    </div>
    <details className="zm-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><div>{english ? <><a href="#services">Services</a><a href="#projects">Projects</a><a href="#process">Working together</a><a href="#contact">Contact</a></> : <>{offerNavigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/realizacje">Projekty</Link><Link href="/jak-pracuje">Współpraca</Link><Link href="/kontakt">Kontakt</Link></>}<Link href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link><span><Link href="/">PL</Link> / <Link href="/en">EN</Link></span><a href="tel:+48450458466">+48 450 458 466</a></div></details>
  </nav></header>;
}

export function SiteFooter({ english = false }: { english?: boolean }) {
  return <footer className="zm-footer"><div className="zm-footer-inner">
    <div className="zm-footer-brand"><Link href={english ? "/en" : "/"}><BrandSignature /></Link><p>{english ? "Websites and systems for businesses." : "Strony WWW i systemy dla firm."}<br />{english ? "Marki and nearby. Remote work across Poland." : "Marki i okolice. Zdalnie w całej Polsce."}</p></div>
    <div><h2>{english ? "Explore" : "Poznaj ofertę"}</h2><Link href={english ? "/en#services" : "/oferta"}>{english ? "Services" : "Oferta"}</Link><Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link><Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link><Link href="/status">{english ? "Client area (PL)" : "Strefa klienta"}</Link></div>
    <div><h2>{english ? "Contact" : "Porozmawiajmy"}</h2><a href="tel:+48450458466">+48 450 458 466</a><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a><a href={socialLinks.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
    <div className="zm-footer-bottom"><small>© {new Date().getFullYear()} Zielona Marka</small><Link href="/polityka-prywatnosci">{english ? "Privacy policy (PL)" : "Polityka prywatności"}</Link><CookieSettingsLink /><Link href={english ? "/" : "/en"}>{english ? "Polski" : "English"}</Link></div>
  </div></footer>;
}

`+s.slice(to);fs.writeFileSync(p,s);
let h=fs.readFileSync('app/OrganicHome.tsx','utf8').replace('import { QuickWhatsApp }','import { QuickWhatsApp, SiteHeader, SiteFooter }');h=h.replace(/<header className="zmh-nav zmh-wrap">[\s\S]*?<\/header>/,'<SiteHeader />');h=h.replace(/<footer className="zmh-wrap">[\s\S]*?<\/footer>/,'<SiteFooter />');fs.writeFileSync('app/OrganicHome.tsx',h);
