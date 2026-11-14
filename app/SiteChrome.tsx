import Link from "./SafeLink";
import Image from "next/image";
import BrandSignature from "./BrandSignature";
import DemoAssistant from "./DemoAssistant";
import SiteNavigationBehavior from "./SiteNavigationBehavior";
import { socialLinks } from "./site-data";
import { CookieSettingsLink } from "./CookieConsent";


export const offerGroups = [
  {
    title: "Strony internetowe", description: "Projekt, koszt i opieka",
    links: [
      ["Strony WWW i pakiety", "/oferta"],
      ["ZM Studio: stwórz przykład", "/projektuj-strone"],
      ["Kalkulator kosztów", "/oferta#kalkulator-pelnego-kosztu"],
      ["Modernizacja strony", "/modernizacja-strony"],
      ["Bezpłatna koncepcja", "/bezplatna-koncepcja-strony"],
      ["Opieka, domena i hosting", "/opieka-nad-strona"],
      ["Standard jakości WWW i CRM", "/standard-jakosci"],
    ],
  },
  {
    title: "Materiały i identyfikacja", description: "Projekty przygotowane do druku",
    links: [
      ["DTP, gazetki i katalogi", "/dtp"],
      ["Bezpłatny pomysł na logo i gazetkę", "/bezplatna-koncepcja-strony"],
      ["Standard kontroli DTP", "/standard-dtp"],
    ],
  },
  {
    title: "Systemy dla firm", description: "Mniej ręcznej pracy",
    links: [
      ["CRM i obsługa klientów", "/maly-crm-dla-firm"],
      ["Automatyzacje i usprawnienia", "/usprawnienia-firmy"],
      ["Asystent zapytań", "/asystent-zapytan"],
      ["Narzędzia bezpłatne", "/praktyczne-narzedzia"],
    ],
  },
  {
    title: "Strony dla branż", description: "Rozwiązania dla konkretnych firm",
    links: [
      ["Firmy usługowe", "/strony-dla-firm-uslugowych"],
      ["Salony beauty", "/strony-dla-beauty"],
      ["Warsztaty", "/strony-dla-warsztatow"],
      ["Warszawa i okolice", "/strony-internetowe"],
    ],
  },
] as const;

export const offerNavigation = offerGroups.flatMap<readonly [string, string]>((group) => group.links);

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
      {english
        ? <Link href="/en#services">Services</Link>
        : <details className="zm-offer-menu"><summary>Oferta <span aria-hidden="true">⌄</span></summary>
            <div className="zm-mega-menu">
              <div className="zm-mega-intro"><strong>W czym mogę Ci pomóc?</strong><p>Zajrzyj do usług i przykładów, łatwiej będzie wybrać, od czego zacząć.</p><div className="zm-mega-quick-actions"><Link href="/projektuj-strone">Zaprojektuj własną stronę ↗</Link><Link href="/oferta">Porównaj pakiety i ceny ↗</Link><Link href="/dtp">Projekt do druku ↗</Link></div></div>
              <div className="zm-mega-groups">{offerGroups.map((group) => <section key={group.title} className="zm-mega-group" aria-label={group.title}>
                <h2>{group.title}</h2><p>{group.description}</p>
                {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </section>)}</div>
            </div>
          </details>}
      <Link href={english ? "/en#projects" : "/portfolio"}>{english ? "Projects" : "Projekty"}</Link>{!english && <><Link className="zm-nav-studio" href="/projektuj-strone">ZM Studio</Link><Link href="/poradnik">Blog</Link></>}<Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link>{!english && <Link href="/standardy-jakosci">Jakość i ISO</Link>}<Link href={english ? "/en#contact" : "/kontakt"}>{english ? "Contact" : "Kontakt"}</Link><Link className="zm-client-link" href="/status" rel="nofollow">{english ? "Client area (PL)" : "Strefa klienta"}</Link>
      <LanguageSwitch english={english} />
    </div>
    <details className="zm-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary>
      <div className="zm-mobile-menu-panel">
        {english ? <><a href="/en#services">Services</a><a href="/en#projects">Projects</a><a href="/en#process">Working together</a><a href="/en#contact">Contact</a></>
          : <>
            <div className="zm-mobile-menu-shortcuts"><Link href="/oferta">Oferta</Link><Link href="/portfolio">Projekty</Link><Link href="/poradnik">Blog</Link><Link href="/standardy-jakosci">Jakość i normy</Link><Link href="/kontakt">Kontakt</Link></div>
            {offerGroups.map((group) => <section className="zm-mobile-menu-group" key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </section>)}
            <section className="zm-mobile-menu-group" aria-label="O Zielonej Marce"><h2>Więcej informacji</h2>
              <Link href="/praktyczne-narzedzia">Narzędzia</Link><Link href="/projektuj-strone">ZM Studio: kreator strony</Link><Link href="/jak-pracuje">Współpraca</Link><Link href="/standardy-jakosci">Jakość i ISO</Link><Link href="/standard-dtp">Standard DTP</Link>
            </section>
          </>}
        <Link href="/status" rel="nofollow">{english ? "Client area (PL)" : "Strefa klienta"}</Link>
        <LanguageSwitch english={english} />
        <a href="tel:+48450458466">+48 450 458 466</a>
      </div>
    </details>
  <SiteNavigationBehavior /></nav></header>;
}

export function SiteFooter({ english = false }: { english?: boolean }) {
  return <footer className="zm-footer"><div className="zm-footer-inner">
    <div className="zm-footer-top">
    <div className="zm-footer-brand"><Link href={english ? "/en" : "/"} aria-label="Zielona Marka"><BrandSignature /></Link><div className="zm-footer-identity"><span className="zm-footer-identity-label">{english ? "PROJECT AND CONTACT" : "PROJEKT I KONTAKT"}</span><h2>Zielona Marka</h2><p>{english ? "Website design and modernisation" : "Projektowanie i modernizacja stron internetowych"}</p><span>{english ? "Marki, Masovian Voivodeship, Poland" : "Marki, woj. mazowieckie"}</span><div className="zm-footer-identity-links"><Link href="/">zielona-marka.pl</Link><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a><a href="tel:+48450458466">+48 450 458 466</a></div><small>{english ? "Project owner: Łukasz Staniewicz" : "Projekt prowadzi Łukasz Staniewicz"}</small></div></div>
    <div className="zm-footer-billing" id="fakturowanie"><h2>{english ? "Current invoicing provider: Bizky Freelance" : "Obecne rozliczenia i dane do faktury: Bizky Freelance"}</h2><p><strong>Bizky sp. z o.o.</strong> <span>(wcześniej beChange sp. z o.o.)</span><br />Al. Księcia Józefa Poniatowskiego 1, klatka K4, poziom 1, 03-901 Warszawa, Polska<br /><span>NIP: 7010150265</span><span className="zm-footer-billing-separator" aria-hidden="true"> · </span><span>KRS: 0000312229</span><br /><a href="https://bizky.ai/" target="_blank" rel="noopener noreferrer">bizky.ai</a></p></div>
    </div>
    <div><h2>{english ? "Explore" : "Poznaj ofertę"}</h2><Link href={english ? "/en#services" : "/oferta"}>{english ? "Services" : "Oferta"}</Link><Link href={english ? "/en#projects" : "/portfolio"}>{english ? "Projects" : "Projekty"}</Link><Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link>{!english && <><Link href="/strony-internetowe">Strony internetowe</Link><Link href="/modernizacja-strony">Modernizacja strony</Link><Link href="/opieka-nad-strona">Opieka nad stroną</Link><Link href="/maly-crm-dla-firm">Mały CRM dla firm</Link><Link href="/asystent-zapytan">Asystent zapytań</Link><Link href="/usprawnienia-firmy">Usprawnienia firmy</Link><Link href="/bezplatna-koncepcja-strony">Bezpłatna koncepcja</Link><Link href="/dtp">DTP i materiały do druku</Link><Link href="/standardy-jakosci">Standardy jakości i ISO</Link></>}<Link href="/status" rel="nofollow">{english ? "Client area (PL)" : "Strefa klienta"}</Link></div>
    <div><h2>{english ? "Resources" : "Centrum zasobów"}</h2>{english ? <><Link href="/poradnik">Blog (PL)</Link><Link href="/praktyczne-narzedzia">Free zone and tools (PL)</Link></> : <><Link href="/poradnik">Blog</Link><Link href="/praktyczne-narzedzia">Narzędzia i Strefa Free</Link><Link href="/projektuj-strone">ZM Studio: projekt i wycena</Link><Link href="/projekty-flow">Projekty Flow</Link><Link href="/przyklady-zaplecza">Przykłady zaplecza</Link><Link href="/raport-qa">Przykładowy raport QA</Link></>}</div>
    <div><h2>{english ? "Contact" : "Porozmawiajmy"}</h2><a href="tel:+48450458466">+48 450 458 466</a><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a><div className="zm-footer-social-links">
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-facebook.png" width={22} height={22} alt="" unoptimized />Facebook <span aria-hidden="true">↗</span></a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-instagram.png" width={22} height={22} alt="" unoptimized />Instagram <span aria-hidden="true">↗</span></a>
      <Link href="/" aria-label="Zielona Marka: strona internetowa"><Image src="/podpis-email/icon-www.png" width={22} height={22} alt="" unoptimized />WWW</Link>
      <a href="https://www.google.com/maps/search/?api=1&amp;query=Zielona%20Marka%20strony%20WWW%20Warszawa" target="_blank" rel="noopener noreferrer" aria-label="Wyszukaj markę Zielona Marka w Mapach Google"><Image src="/podpis-email/icon-google.png" width={22} height={22} alt="" unoptimized />Mapy Google <span aria-hidden="true">↗</span></a>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Image src="/icon-github-zielona-marka.svg" width={22} height={22} alt="" unoptimized />GitHub <span aria-hidden="true">↗</span></a>
    </div></div>
    <div className="zm-footer-billing" id="uk-invoicing" lang="en"><h2>UK clients: alternative invoicing through Juuli</h2><p>For UK-based clients, invoicing and payment may also be arranged through Juuli by individual agreement. The invoicing entity is:<br /><strong>JUULI OÜ</strong><br />Veskiposti 2, Avala, Electra Building, 9th Floor, 10138 Tallinn, Estonia<br />Registry code: 16579396 · VAT: EE102608520<br /><a href="https://www.juuli.com/" target="_blank" rel="noopener noreferrer">www.juuli.com</a></p><p>The invoicing provider and payment instructions will be confirmed before the invoice is issued.</p></div>
    {!english && <div className="zm-footer-locations"><h2>Warszawa · Targówek i okolice</h2><div><Link href="/strony-internetowe">Wszystkie lokalizacje</Link>{[["Targówek", "targowek"], ["Warszawa", "warszawa"], ["Ząbki", "zabki"], ["Zielonka", "zielonka"], ["Kobyłka", "kobylka"], ["Wołomin", "wolomin"], ["Radzymin", "radzymin"], ["Białołęka", "bialoleka"]].map(([name, slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}</Link>)}<Link href="/strony-internetowe-marki">Marki</Link></div></div>}<div className="zm-footer-bottom"><small>© {new Date().getFullYear()} Zielona Marka · Łukasz Staniewicz</small><Link href="/polityka-prywatnosci">{english ? "Privacy policy (PL)" : "Polityka prywatności"}</Link><CookieSettingsLink english={english} /><Link href={english ? "/" : "/en"}>{english ? "Polski" : "English"}</Link></div>
  </div></footer>;
}

export function QuickWhatsApp() {
  return <aside className="zm-contact-dock" aria-label="Szybki kontakt z marką Zielona Marka"><DemoAssistant /><a className="whatsapp-float" href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer" aria-label="Napisz do marki Zielona Marka na WhatsAppie">
    <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" role="presentation" focusable="false"><path d="M12 3.2c-4.7 0-8.5 3.6-8.5 8.1 0 1.5.4 2.9 1.2 4.1l-1 3.6 3.8-1a8.9 8.9 0 0 0 4.5 1.2c4.7 0 8.5-3.6 8.5-8.1S16.7 3.2 12 3.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9.3 8.6c.3-.1.6 0 .8.3l.7 1.2c.2.3.1.6-.1.8l-.4.4a5 5 0 0 0 2.4 2.3l.4-.4c.2-.2.6-.3.8-.1l1.2.7c.3.2.4.5.3.8-.3.8-1.1 1.3-2 1.2-2.6-.3-5-2.6-5.4-5.2-.1-.8.4-1.6 1.3-2Z" fill="currentColor"/></svg></span><b>Napisz na WhatsApp</b><small>WhatsApp: +48 603 806 833</small><i aria-hidden="true">↗</i>
  </a></aside>;
}
