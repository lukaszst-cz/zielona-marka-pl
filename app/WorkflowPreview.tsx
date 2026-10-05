"use client";

import { useState } from "react";

type Variant = "auto" | "home" | "beauty";

const workflow = {
  auto: [
    ["Nowe zgłoszenie", "Klient podaje auto, problem, zdjęcia i dogodny termin."],
    ["Wstępna ocena", "Warsztat widzi komplet danych i decyduje, czy potrzebna jest diagnoza."],
    ["Termin lub wycena", "Klient otrzymuje proponowany następny krok, bez obietnic bez oględzin."],
    ["Status sprawy", "Zespół wie, kto prowadzi zgłoszenie i co ma wydarzyć się dalej."],
  ],
  home: [
    ["Nowe zapytanie", "Klient przekazuje zakres prac, lokalizację, zdjęcia i pilność."],
    ["Ocena zakresu", "Wykonawca od razu widzi dane potrzebne do decyzji o oględzinach lub wycenie."],
    ["Kolejny krok", "Klient dostaje odpowiedź: rozmowa, oględziny, wycena albo termin."],
    ["Porządek w sprawie", "Każde zgłoszenie ma status oraz osobę odpowiedzialną za kontakt."],
  ],
  beauty: [
    ["Wybór usługi", "Klient sprawdza ofertę, przygotowanie do wizyty i dostępne warianty."],
    ["Preferowany termin", "Salon otrzymuje usługę, preferencję czasową i ważne informacje."],
    ["Rezerwacja", "Strona kieruje do wybranego przez salon sposobu rezerwacji."],
    ["Przypomnienie", "Po wdrożeniu można dodać potwierdzenie wizyty oraz prośbę o opinię."],
  ],
} as const;

export default function WorkflowPreview({ variant }: { variant: Variant }) {
  const stages = workflow[variant];
  const [active, setActive] = useState(0);
  const [title, copy] = stages[active];

  return <section className="section workflow-preview-section">
    <div className="shell workflow-preview-grid">
      <div>
        <span className="section-no">INTERAKTYWNA ŚCIEŻKA OBSŁUGI</span>
        <h2>Po zgłoszeniu firma nadal wie, co zrobić.</h2>
        <p>Kliknij etap, aby zobaczyć przykład informacji i następnego kroku. To demonstracja sposobu działania, nie działający system klienta.</p>
      </div>
      <div className="workflow-preview-card">
        <div className="workflow-preview-tabs" role="tablist" aria-label="Etapy obsługi zgłoszenia">
          {stages.map(([stage], index) => <button key={stage} type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}><i>0{index + 1}</i>{stage}</button>)}
        </div>
        <article aria-live="polite"><span>AKTUALNY ETAP</span><h3>{title}</h3><p>{copy}</p><div><b>Wynik dla firmy</b><small>{active === stages.length - 1 ? "Żadna sprawa nie zostaje bez kolejnego kroku." : "Właściwa informacja trafia do właściwej osoby."}</small></div></article>
      </div>
    </div>
  </section>;
}
