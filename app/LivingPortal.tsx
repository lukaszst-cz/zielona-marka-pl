"use client";

import { useEffect, useRef, useState } from "react";

/** A bounded, scroll-led reveal. Content and contact remain usable without JS. */
export default function LivingPortal({ contact = false }: { contact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * .85 - rect.top) / (innerHeight * .6)));
      el.style.setProperty("--gather", String(media.matches ? 1 : progress));
    };
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const reflectPreference = () => { setReduced(media.matches); update(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) el.classList.add("zmh-media-ready");
      reflectPreference();
    });
    observer.observe(el);
    media.addEventListener("change", reflectPreference);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    reflectPreference();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", reflectPreference); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); };
  }, []);

  return <div ref={root} id={contact ? undefined : "opowiesc"} className={contact ? "zmh-water-portal" : "zmh-assembly"} onPointerMove={event => {
    if (event.pointerType !== "mouse" || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
  }} onPointerLeave={event => event.currentTarget.style.setProperty("--tilt", "0deg")}>
    {contact ? <>
      <div className="zmh-contact-preview" aria-hidden="true">
        <span className="zmh-contact-preview-caption">PRZYKŁADOWA ROZMOWA / ZIELONA MARKA</span>
        <div className="zmh-contact-preview-message">
          <span>NOWE ZAPYTANIE <i>✓</i></span>
          <strong>Chcę pokazać swoją firmę z dobrej strony.</strong>
          <small>Opisz pomysł. Resztę wspólnie ustalimy.</small>
        </div>
        <div className="zmh-contact-preview-flow"><span>01 / Rozmowa</span><i>→</i><span>02 / Koncepcja</span><i>→</i><span>03 / Działanie</span></div>
      </div>
      <p>Dobry pomysł.<br /><em>Zacznijmy od rozmowy.</em></p>
    </> : <>
      <div className="zmh-assembly-heading"><span>Z CHAOSU DO PORZĄDKU</span><h2>Wszystko zaczyna<br />się <em>łączyć.</em></h2><p>Strona. Zapytanie. Kolejny krok.<br />Przewiń i zobacz, jak tworzą całość.</p></div>
      <div className="zmh-assembly-board zmh-assembly-board--premium" aria-label="Ilustracja strony internetowej, nowego zapytania i uporządkowanej realizacji">
        <div className="zmh-assembly-lines" aria-hidden="true"><svg viewBox="0 0 600 400"><path d="M50 285 C170 285 200 180 310 180 S445 260 560 132" /></svg></div>
        <div className="zmh-piece zmh-piece-web" aria-hidden="true">
          <div className="zmh-preview-chrome"><span className="zmh-preview-dots"><i /><i /><i /></span><span>przykladowa-firma.pl</span><i>↗</i></div>
          <div className="zmh-preview-website">
            <div className="zmh-preview-site-copy"><small>01 / TWOJA STRONA</small><strong>Dobra firma.<br />Dobry początek.</strong><span>Oferta, którą łatwo poznać.</span><span className="zmh-preview-button">Poznaj ofertę ↗</span></div>
            <div className="zmh-piece-photo" />
          </div>
          <div className="zmh-preview-site-foot"><span>Oferta</span><span>O firmie</span><span>Kontakt ↗</span></div>
        </div>
        <div className="zmh-piece zmh-piece-inquiry" aria-hidden="true">
          <div className="zmh-preview-card-icon">↗</div>
          <div><small>02 / ZAPYTANIE</small><b>Nowy kontakt <i>✓</i></b><span>Potrzeba · Termin · Szczegóły</span></div>
        </div>
        <div className="zmh-piece zmh-piece-order" aria-hidden="true">
          <small>03 / KOLEJNY KROK</small><b>Wszystko na swoim miejscu.</b>
          <div className="zmh-preview-statuses"><span><i>✓</i> Zapytanie</span><span><i>→</i> Wycena</span><span><i>◎</i> Realizacja</span></div>
        </div>
        <span className="zmh-assembly-note">PRZYKŁADOWY PROCES DLA TWOJEJ FIRMY</span>
      </div>
    </>}
  </div>;
}
