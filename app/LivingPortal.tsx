"use client";

import { useEffect, useRef, useState } from "react";

/** A bounded, scroll-led reveal. Content and contact remain usable without JS. */
export default function LivingPortal({ contact = false }: { contact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
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
    const playback = () => {
      setReduced(media.matches);
      update();
      const clip = video.current;
      if (!clip) return;
      if (!visible || document.hidden || media.matches || paused) { clip.pause(); return; }
      if ((navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData) return;
      if (!clip.src) clip.src = matchMedia("(max-width: 700px)").matches
        ? "/brand-review-v5/fern-moss-stream-mobile-20260929.mp4"
        : "/brand-review-v5/fern-moss-stream-20260919.mp4";
      clip.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) el.classList.add("zmh-media-ready");
      playback();
    });
    observer.observe(el);
    media.addEventListener("change", playback);
    document.addEventListener("visibilitychange", playback);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    playback();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", playback); document.removeEventListener("visibilitychange", playback); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); video.current?.pause(); };
  }, [paused]);

  return <div ref={root} id={contact ? undefined : "opowiesc"} className={contact ? "zmh-water-portal" : "zmh-assembly"} onPointerMove={event => {
    if (event.pointerType !== "mouse" || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
  }} onPointerLeave={event => event.currentTarget.style.setProperty("--tilt", "0deg")}>
    {contact ? <>
      <div className="zmh-water-orbit" aria-hidden="true"><div className="zmh-water-drop"><video ref={video} muted loop playsInline preload="none" /><span /></div><i /><i /></div>
      <p>Dobry pomysł.<br /><em>Niech płynie dalej.</em></p>
      <button type="button" disabled={reduced} aria-pressed={paused || reduced} onClick={() => setPaused(value => !value)}>{reduced ? "Spokojny widok" : paused ? "Ożyw wodę ↗" : "Zatrzymaj wodę Ⅱ"}</button>
    </> : <>
      <div className="zmh-assembly-heading"><span>Z CHAOSU DO PORZĄDKU</span><h2>Wszystko zaczyna<br />się <em>łączyć.</em></h2><p>Strona. Zapytanie. Kolejny krok.<br />Przewiń i zobacz, jak tworzą całość.</p></div>
      <div className="zmh-assembly-board" aria-label="Ilustracja połączenia strony, zapytania i obsługi klienta">
        <div className="zmh-assembly-lines" aria-hidden="true"><svg viewBox="0 0 600 400"><path d="M80 90 C300 90 150 310 350 310 S480 210 550 210" /></svg></div>
        <div className="zmh-piece zmh-piece-web"><small>01 / TWOJA STRONA</small><strong>Dobra firma.<br />Dobry początek.</strong><div className="zmh-piece-photo" /><span>Oferta · Kontakt ↗</span></div>
        <div className="zmh-piece-inquiry"><small>02 / ZAPYTANIE</small><b>Nowy kontakt <i>✓</i></b><span>Potrzeba · Termin · Szczegóły</span></div>
        <div className="zmh-piece-order"><small>03 / KOLEJNY KROK</small><b>Wszystko na swoim miejscu.</b><span>Zapytanie <i>→</i> Wycena <i>→</i> Realizacja</span></div>
        <span className="zmh-assembly-note">PRZYKŁADOWY PROCES DLA TWOJEJ FIRMY</span>
      </div>
    </>}
  </div>;
}
