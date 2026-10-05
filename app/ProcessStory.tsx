"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  ["01 / SŁUCHAM", "Twoja wiadomość.", "Chcę stronę, na której klient zrozumie ofertę i zamówi usługę.", "POTRZEBA → BRIEF"],
  ["02 / PORZĄDKUJĘ", "Mapa Twojej firmy.", "Oferta, odbiorcy, sposób wyceny i obsługa po sprzedaży. Każdy krok ma swoje miejsce.", "BRIEF → PLAN"],
  ["03 / PROJEKTUJĘ", "Charakter staje się stroną.", "Własna grafika, czytelne teksty i układ dopasowany do tego, jak wybiera Twój klient.", "PLAN → PROTOTYP"],
  ["04 / ŁĄCZĘ", "Strona zaczyna pracować.", "Formularz przekazuje zapytanie do CRM. Sklep może przyjąć płatność za produkt lub voucher.", "FORMULARZ → CRM → PŁATNOŚĆ"],
  ["05 / SPRAWDZAM", "Gotowe na pierwszy kontakt.", "Sprawdzamy telefon, formularze i drogę klienta. Oglądasz całość przed publikacją.", "TESTY → TWÓJ ODBIÓR"],
  ["06 / OPIEKUJĘ SIĘ", "Dalej też jesteśmy w kontakcie.", "Uzgodniona opieka, kopie, poprawki i kolejne usprawnienia, gdy firma ich potrzebuje.", "START → OBSŁUGA → ROZWÓJ"],
];

export default function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = setTimeout(() => {
      if (active === scenes.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 4500);
    return () => clearTimeout(timer);
  }, [playing, visible, active]);
  return <section ref={ref} className="process-cinema shell" id="proces">
    <header><p className="organic-label">OD WIADOMOŚCI DO DZIAŁAJĄCEJ STRONY</p><h2>Tak powstaje<br /><em>Twoje miejsce w sieci.</em></h2><p>Obejrzyj proces albo wybierz etap, który Cię interesuje.</p></header>
    <div className="cinema-screen"><div key={active} className="cinema-scene"><span>{scenes[active][0]}</span><h3>{scenes[active][1]}</h3><p>{scenes[active][2]}</p><div className="cinema-preview" aria-hidden="true"><i /><i /><i /><strong>{scenes[active][3]}</strong></div></div>
    <div className="cinema-controls"><button type="button" onClick={() => { if (active === scenes.length - 1) setActive(0); setPlaying(!playing); }}>{playing ? "Wstrzymaj" : "Odtwórz opowieść · 27 s"}</button><span>{active + 1} / {scenes.length}</span></div>
    <div className="cinema-timeline" aria-label="Etapy procesu">{scenes.map((scene,index) => <button key={scene[0]} type="button" aria-pressed={active === index} aria-label={scene[0]} onClick={() => {setActive(index);setPlaying(false);}}><span>{scene[0]}</span></button>)}</div></div>
  </section>;
}
