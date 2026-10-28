"use client";
/* eslint-disable @next/next/no-img-element -- Original WebP images already have responsive sizes; do not depend on an image optimization service. */

import { useEffect, useRef, useState } from "react";
import samples from "../../public/concept-samples-v2/manifest.json";

type PreviewKind = keyof typeof samples;

export default function ProjectPreview({ kind = "website" }: { kind?: PreviewKind }) {
  const [choice, setChoice] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const options = samples[kind];
  const sample = options[choice] ?? options[0];
  const src = `/concept-samples-v2/${sample.file}-1280.webp`;

  function select(index: number) {
    setChoice((index + options.length) % options.length);
    setZoomed(false);
    setFailed(false);
  }

  useEffect(() => {
    if (!expanded) return;
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setChoice(previous => (previous + direction + options.length) % options.length);
      setZoomed(false);
      setFailed(false);
    };
    modal.addEventListener("keydown", handleKey);
    return () => {
      modal.removeEventListener("keydown", handleKey);
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded, options.length]);

  return <figure className="zm-generated-sample">
    <div className="zm-sample-options" aria-label="Przykłady koncepcji">
      {options.map((option, index) => <button type="button" key={option.file} aria-pressed={sample.file === option.file} onClick={() => select(index)}>{option.title.split(" / ")[0]}</button>)}
    </div>
    <a className="zm-sample-open" href={src} aria-label={`Powiększ: ${sample.title}`} aria-haspopup="dialog" onClick={event => { event.preventDefault(); setZoomed(false); setExpanded(true); }}>
      {failed ? <p role="alert">Nie udało się wczytać podglądu. Spróbuj ponownie za chwilę.</p> : <img key={src} loading="lazy" decoding="async" src={src} srcSet={`/concept-samples-v2/${sample.file}-640.webp 640w, ${src} 1280w`} sizes="(max-width: 700px) 92vw, 700px" width={1536} height={1024} alt={sample.alt} onError={() => setFailed(true)} />}
      <span>Zobacz w pełnym rozmiarze ↗</span>
    </a>
    <figcaption><small>Przykład {choice + 1} z {options.length}</small><strong>{sample.title}</strong><span>Wygenerowana koncepcja fikcyjnej marki. Porównania „przed i po” są symulacją, nie przebudową strony klienta. Materiał poglądowy, nie plik produkcyjny.</span></figcaption>
    <dialog ref={dialog} className="zm-concept-lightbox" aria-label="Pełny podgląd koncepcji" onClose={() => setExpanded(false)}>
      {expanded && <div className="zm-concept-lightbox-content">
        <header><p aria-live="polite">{sample.title} <small>{choice + 1} / {options.length}</small></p><button type="button" onClick={() => setExpanded(false)}>Zamknij ✕</button></header>
        <div className={`zm-concept-lightbox-image${zoomed ? " is-zoomed" : ""}`}>
          {failed ? <p role="alert">Nie udało się wczytać podglądu.</p> : <img key={src} src={src} width={1536} height={1024} alt={sample.alt} onError={() => setFailed(true)} />}
        </div>
        <div className="zm-concept-lightbox-controls"><button type="button" onClick={() => select(choice - 1)}>← Poprzedni</button><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? "Dopasuj do ekranu" : "Powiększ szczegóły"}</button><button type="button" onClick={() => select(choice + 1)}>Następny →</button></div>
      </div>}
    </dialog>
  </figure>;
}
