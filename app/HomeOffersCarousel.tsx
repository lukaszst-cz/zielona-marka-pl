"use client";

import { useRef, useState } from "react";
import Link from "./SafeLink";

const slides = [
  {
    label: "01 / MASZ JUŻ STRONĘ",
    name: "Mini audyt",
    title: "Zobacz, co dziś",
    accent: "utrudnia klientom kontakt.",
    description: "Pokaż mi obecną stronę. Wskażę jedną rzecz, która może utrudniać klientom kontakt i zaproponuję, jak ją poprawić.",
    action: "Odbierz bezpłatny mini audyt",
    href: "/modernizacja-strony#miniaudyt",
    benefits: "Jedna konkretna rekomendacja · Bez zobowiązań",
    links: [
      { label: "Zobacz przykład", href: "/demo/mini-audyt-zielona-marka" },
      { label: "Przeczytaj poradnik", href: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan" },
    ],
    kind: "audit",
  },
  {
    label: "02 / POTRZEBUJESZ KIERUNKU",
    name: "Mapa Szans",
    title: "Od pierwszego wejścia",
    accent: "do dobrej rozmowy.",
    description: "Bezpłatna Mapa Szans. przyjrzymy się drodze klienta od oferty, przez formularz, aż po odpowiedź na wiadomość. Otrzymasz czytelny plan pierwszych usprawnień.",
    action: "Odbierz bezpłatną Mapę Szans",
    href: "/kontakt",
    benefits: "Strona · Zapytanie · Kolejny krok",
    links: [{ label: "Zobacz przykład", href: "/demo/mapa-szans-zielona-marka" }],
    kind: "map",
  },
  {
    label: "03 / CHCESZ ZOBACZYĆ NOWY WYGLĄD?",
    name: "Bezpłatna koncepcja",
    title: "Zobacz swoją firmę",
    accent: "w nowej odsłonie.",
    description: "Zastanawiasz się, jak mogłaby wyglądać Twoja nowa strona, logo albo gazetka? Wybierz jeden materiał. Przygotuję poglądowy kierunek, który pomoże Ci podjąć decyzję.",
    action: "Zamów bezpłatną koncepcję",
    href: "/bezplatna-koncepcja-strony",
    benefits: "WWW · Logo · Gazetki · Bez zobowiązań",
    links: [],
    kind: "concept",
  },
] as const;

type Artwork = (typeof slides)[number]["kind"];

function SlideArtwork({ kind }: { kind: Artwork }) {
  if (kind === "audit") {
    return (
      <div className="zm-offer-art zm-offer-art--audit" aria-hidden="true">
        <div className="zm-offer-app">
          <div className="zm-offer-window-top"><span /><span /><span /><b>MINI AUDYT / PRZYKŁAD</b></div>
          <div className="zm-offer-audit-body">
            <div><small>PIERWSZY KROK</small><strong>Co można poprawić na stronie?</strong><p>Krótka analiza pierwszego wrażenia i drogi do kontaktu.</p></div>
            <div className="zm-offer-audit-list">
              <span><i>✓</i> Czytelna oferta</span>
              <span><i>✓</i> Wersja mobilna</span>
              <span><i>→</i> Widoczny kontakt</span>
            </div>
          </div>
        </div>
        <div className="zm-offer-floating-card zm-offer-floating-card--audit"><small>REKOMENDACJA</small><strong>Jeden dobry krok na początek.</strong><span>Bez zobowiązań ↗</span></div>
      </div>
    );
  }

  if (kind === "map") {
    return (
      <div className="zm-offer-art zm-offer-art--map" aria-hidden="true">
        <div className="zm-offer-app zm-offer-flow-app">
          <div className="zm-offer-window-top"><span /><span /><span /><b>MAPA SZANS / PRZYKŁAD</b></div>
          <small className="zm-offer-preview-caption">Od zainteresowania do rozmowy</small>
          <div className="zm-offer-map-steps">
            <div><span>01</span><b>Twoja oferta</b><small>Jasny przekaz</small></div>
            <i>↗</i>
            <div><span>02</span><b>Zapytanie</b><small>Dobry formularz</small></div>
            <i>↗</i>
            <div><span>03</span><b>Kontakt</b><small>Wygodna obsługa</small></div>
          </div>
          <div className="zm-offer-flow-footer"><span>Przejrzysty proces</span><b>Wszystko w jednym kierunku ✓</b></div>
        </div>
        <div className="zm-offer-floating-card zm-offer-floating-card--map"><small>PRZYKŁADOWY PLAN</small><strong>Mniej zgadywania, więcej konkretów.</strong></div>
      </div>
    );
  }

  return (
    <div className="zm-offer-art zm-offer-art--concept" aria-hidden="true">
      <div className="zm-offer-browser">
        <div className="zm-offer-browser-nav"><b><span>✳</span> TWOJA FIRMA</b><span>Oferta · Realizacje · Kontakt</span><i>Porozmawiajmy ↗</i></div>
        <div className="zm-offer-browser-page">
          <div><small>PRZYKŁADOWA KONCEPCJA WWW</small><strong>Dobry pomysł.<br />Nowe możliwości.</strong><span>Strona, którą chce się poznawać.</span><i>Zobacz ofertę ↗</i></div>
          <div className="zm-offer-browser-photo" />
        </div>
        <div className="zm-offer-browser-bottom"><span>✳ Przejrzysta oferta</span><span>◎ Wygodny kontakt</span><span>↗ Nowy kierunek</span></div>
      </div>
      <div className="zm-offer-floating-card zm-offer-floating-card--logo"><small>KONCEPCJA LOGO</small><b>✳ Twoja firma</b><div><i /><i /><i /></div></div>
      <div className="zm-offer-floating-card zm-offer-floating-card--inquiry"><small>PRZYKŁADOWY KONTAKT</small><strong>Nowe zapytanie <i>✓</i></strong><span>Wiadomo, co dalej.</span></div>
    </div>
  );
}

export default function HomeOffersCarousel() {
  const [active, setActive] = useState(2);
  const swipeStart = useRef<{x:number,y:number}|null>(null);
  const show = (step: number) => setActive(current => (current + step + slides.length) % slides.length);

  return (
    <section className="zm-home-offers zmh-wrap" aria-labelledby="free-start-title" id="bezplatny-start">
      <header className="zm-home-offers-intro">
        <div>
          <p className="zmh-eyebrow">DOBRY POCZĄTEK / BEZPŁATNIE</p>
          <h2 id="free-start-title">Zobacz możliwości <em>dla swojej firmy.</em></h2>
        </div>
        <p>Nie musisz od razu zamawiać strony. Możesz zacząć od mini audytu, Mapy Szans albo indywidualnej koncepcji wyglądu i ocenić, co pasuje do Twojej firmy.</p>
      </header>
      <div className="zm-home-carousel" role="region" aria-roledescription="karuzela" aria-label="Trzy bezpłatne propozycje dla firmy"
        onTouchStart={event => {
          const touch = event.touches[0];
          if (touch) swipeStart.current = {x: touch.clientX, y: touch.clientY};
        }}
        onTouchEnd={event => {
          const start = swipeStart.current;
          swipeStart.current = null;
          const touch = event.changedTouches[0];
          if (!start || !touch) return;
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          // Do not intercept a user's normal vertical page scroll.
          if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            show(deltaX < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => { swipeStart.current = null; }}
      >
        {slides.map((slide, index) => (
          <article className="zm-home-slide" hidden={index !== active} key={slide.kind} aria-roledescription="slajd" aria-label={slide.name}>
            <div className="zm-home-slide-copy">
              <span className="zm-home-slide-kicker">{slide.label}</span>
              <h3>{slide.title}<br /><em>{slide.accent}</em></h3>
              <p>{slide.description}</p>
              <div className="zm-home-slide-actions">
                <Link className="zmh-pill" href={slide.href}>{slide.action} <span aria-hidden="true">↗</span></Link>
                <span className="zm-home-slide-benefits">{slide.benefits}</span>
              </div>
              {slide.links.length > 0 && <div className="zm-home-slide-links">
                {slide.links.map(link => <Link key={link.href} className="zmh-text-link" href={link.href}>{link.label} ↗</Link>)}
              </div>}
            </div>
            <SlideArtwork kind={slide.kind} />
          </article>
        ))}
        <div className="zm-home-carousel-footer">
          <div className="zm-home-carousel-controls" aria-label="Wybór slajdu">
            <button type="button" onClick={() => show(-1)} aria-label="Poprzedni slajd">←</button>
            <span className="zm-home-slide-counter" role="status" aria-live="polite">{String(active + 1).padStart(2, "0")} / 03</span>
            <div className="zm-home-slide-dots">
              {slides.map((slide, index) => <button type="button" key={slide.kind} onClick={() => setActive(index)} aria-label={"Pokaż slajd " + (index + 1) + ": " + slide.name} aria-pressed={index === active} className={index === active ? "is-active" : ""} />)}
            </div>
            <button type="button" onClick={() => show(1)} aria-label="Następny slajd">→</button>
          </div>
          <p>Każda bezpłatna propozycja dotyczy jednej firmy. Nie zobowiązuje do zamówienia usług. Mini audyt nie jest pełnym audytem, Mapa Szans nie zastępuje strategii, a koncepcja wizualna nie jest gotowym projektem do wdrożenia.</p>
        </div>
      </div>
    </section>
  );
}
