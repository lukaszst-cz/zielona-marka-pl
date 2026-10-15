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
      ["ZM Studio – stwórz przykład", "/projektuj-strone"],
      ["Kalkulator kosztów", "/oferta#kalkulator-pelnego-kosztu"],
      ["Modernizacja strony", "/modernizacja-strony"],
      ["Bezpłatna koncepcja wyglądu", "/bezplatna-koncepcja-strony"],
      ["Opieka, domena i hosting", "/opieka-nad-strona"],
      ["Standard jakości WWW i CRM", "/standard-jakosci"],
    ],
  },
  {
    title: "Materiały i identyfikacja", description: "Projekty przygotowane do druku",
    links: [
      ["DTP, gazetki i katalogi", "/dtp"],
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

export const offerNavigation = offerGroups.flatMap((group) => group.links);

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
              <div className="zm-mega-intro"><strong>Co możemy dla Ciebie zrobić?</strong><p>Wybierz usługę, branżę albo bezpłatnie sprawdź przykładowy projekt.</p><div className="zm-mega-quick-actions"><Link href="/projektuj-strone">Zaprojektuj własną stronę ↗</Link><Link href="/oferta">Porównaj pakiety i ceny ↗</Link><Link href="/dtp">Projekt do druku ↗</Link></div></div>
              <div className="zm-mega-groups">{offerGroups.map((group) => <section key={group.title} className="zm-mega-group" aria-label={group.title}>
                <h2>{group.title}</h2><p>{group.description}</p>
                {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </section>)}</div>
            </div>
          </details>}
      <Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link>{!english && <><Link className="zm-nav-studio" href="/projektuj-strone">ZM Studio</Link><Link href="/poradnik">Blog</Link></>}<Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link>{!english && <Link href="/standardy-jakosci">Jakość i ISO</Link>}<Link href={english ? "/en#contact" : "/kontakt"}>{english ? "Contact" : "Kontakt"}</Link><Link className="zm-client-link" href="/status" rel="nofollow">{english ? "Client area (PL)" : "Strefa klienta"}</Link>
      <LanguageSwitch english={english} />
    </div>
    <details className="zm-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary>
      <div className="zm-mobile-menu-panel">
        {english ? <><a href="/en#services">Services</a><a href="/en#projects">Projects</a><a href="/en#process">Working together</a><a href="/en#contact">Contact</a></>
          : <>
            <div className="zm-mobile-menu-shortcuts"><Link href="/oferta">Oferta</Link><Link href="/realizacje">Projekty</Link><Link href="/poradnik">Blog</Link><Link href="/standardy-jakosci">Jakość i normy</Link><Link href="/kontakt">Kontakt</Link></div>
            {offerGroups.map((group) => <section className="zm-mobile-menu-group" key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </section>)}
            <section className="zm-mobile-menu-group" aria-label="O Zielonej Marce"><h2>Więcej informacji</h2>
              <Link href="/praktyczne-narzedzia">Narzędzia</Link><Link href="/projektuj-strone">ZM Studio — kreator strony</Link><Link href="/jak-pracuje">Współpraca</Link><Link href="/standardy-jakosci">Jakość i ISO</Link><Link href="/standard-dtp">Standard DTP</Link>
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
    <div className="zm-footer-brand"><Link href={english ? "/en" : "/"}><BrandSignature /></Link><p>{english ? "Websites and systems for businesses." : "Strony i sklepy WWW, systemy CRM i DTP dla firm."}<br />{english ? "Warsaw, Targówek and nearby. Remote work across Poland." : "Warszawa, Targówek i okolice. Zdalnie w całej Polsce."}</p></div>
    <div><h2>{english ? "Explore" : "Poznaj ofertę"}</h2><Link href={english ? "/en#services" : "/oferta"}>{english ? "Services" : "Oferta"}</Link><Link href={english ? "/en#projects" : "/realizacje"}>{english ? "Projects" : "Projekty"}</Link><Link href={english ? "/en#process" : "/jak-pracuje"}>{english ? "Working together" : "Współpraca"}</Link>{!english && <><Link href="/dtp">DTP i materiały do druku</Link><Link href="/standardy-jakosci">Standardy jakości i ISO</Link></>}<Link href="/status" rel="nofollow">{english ? "Client area (PL)" : "Strefa klienta"}</Link></div>
    <div><h2>{english ? "Resources" : "Centrum zasobów"}</h2>{english ? <><Link href="/poradnik">Blog (PL)</Link><Link href="/praktyczne-narzedzia">Free zone and tools (PL)</Link></> : <><Link href="/poradnik">Blog</Link><Link href="/praktyczne-narzedzia">Narzędzia i Strefa Free</Link><Link href="/projektuj-strone">ZM Studio — projekt i wycena</Link><Link href="/projekty-flow">Projekty Flow</Link></>}</div>
    <div><h2>{english ? "Contact" : "Porozmawiajmy"}</h2><a href="tel:+48450458466">+48 450 458 466</a><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a><div className="zm-footer-social-links">
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-facebook.png" width={22} height={22} alt="" unoptimized />Facebook <span aria-hidden="true">↗</span></a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-instagram.png" width={22} height={22} alt="" unoptimized />Instagram <span aria-hidden="true">↗</span></a>
      <Link href="/" aria-label="Zielona Marka — strona internetowa"><Image src="/podpis-email/icon-www.png" width={22} height={22} alt="" unoptimized />WWW</Link>
      <a href="https://www.google.com/maps/search/?api=1&amp;query=Zielona%20Marka%20strony%20WWW%20Warszawa" target="_blank" rel="noopener noreferrer" aria-label="Wyszukaj markę Zielona Marka w Mapach Google"><Image src="/podpis-email/icon-google.png" width={22} height={22} alt="" unoptimized />Mapy Google <span aria-hidden="true">↗</span></a>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Image src="/icon-github-zielona-marka.svg" width={22} height={22} alt="" unoptimized />GitHub <span aria-hidden="true">↗</span></a>
    </div></div>
    {!english && <div className="zm-footer-locations"><h2>Warszawa · Targówek i okolice</h2><div><Link href="/strony-internetowe">Wszystkie lokalizacje</Link>{[["Targówek", "targowek"], ["Warszawa", "warszawa"], ["Ząbki", "zabki"], ["Zielonka", "zielonka"], ["Kobyłka", "kobylka"], ["Wołomin", "wolomin"], ["Radzymin", "radzymin"], ["Białołęka", "bialoleka"]].map(([name, slug]) => <Link key={slug} href={`/strony-internetowe/${slug}`}>{name}</Link>)}<Link href="/strony-internetowe-marki">Marki</Link></div></div>}<div className="zm-footer-bottom"><small>© {new Date().getFullYear()} Zielona Marka · Łukasz Staniewicz</small><Link href="/polityka-prywatnosci">{english ? "Privacy policy (PL)" : "Polityka prywatności"}</Link><CookieSettingsLink english={english} /><Link href={english ? "/" : "/en"}>{english ? "Polski" : "English"}</Link></div>
  </div></footer>;
}

export function QuickWhatsApp() {
  return <aside className="zm-contact-dock" aria-label="Szybki kontakt z marką Zielona Marka"><DemoAssistant /><a className="whatsapp-float" href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer" aria-label="Napisz do zespołu Zielona Marka na WhatsAppie">
    <span aria-hidden="true">◌</span><b>Napisz na WhatsApp</b><small>Szybka wiadomość</small><i aria-hidden="true">↗</i>
  </a></aside>;
}
