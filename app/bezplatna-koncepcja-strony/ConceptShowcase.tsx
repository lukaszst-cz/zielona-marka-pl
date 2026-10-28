"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Link from "../SafeLink";
import ProjectPreview from "./ConceptImagePreview";

type Mode = "existing" | "new" | "logo" | "promo" | "sales";
const concepts: { mode: Mode; title: string; note: string; description: string }[] = [
  { mode:"existing", title:"Nowy wygląd obecnej strony", note:"Modernizacja WWW", description:"Poglądowa przebudowa pierwszego ekranu obecnej strony. Lepsza czytelność oferty i łatwiejszy kontakt." },
  { mode:"new", title:"Strona dla nowej firmy", note:"Nowa strona WWW", description:"Wstępny kierunek wizualny dla firmy, która dopiero zaczyna lub jeszcze nie ma swojej witryny." },
  { mode:"logo", title:"Koncepcja logo", note:"Identyfikacja", description:"Jeden kierunek nowego znaku albo odświeżenia dotychczasowego logo. Propozycja poglądowa, nie plik produkcyjny." },
  { mode:"promo", title:"Gazetka reklamowa", note:"Reklama i materiały", description:"Przykładowy układ okładki lub strony gazetki informacyjnej: czytelna oferta i zapamiętywalny styl." },
  { mode:"sales", title:"Gazetka sprzedażowa", note:"Oferta produktowa", description:"Wizualizacja strony gazetki z produktami i promocjami. Wyraźna hierarchia, ceny i czytelne informacje." },
];

function Illustration({ mode }: { mode: Mode }) {
  switch(mode) {
    case "existing": return <ProjectPreview />;
    case "new": return <ProjectPreview kind="new" />;
    case "logo": return <ProjectPreview kind="logo" />;
    case "promo": return <ProjectPreview kind="promo" />;
    case "sales": return <ProjectPreview kind="sales" />;
  }
}

export default function ConceptShowcase() {
  const [selected, setSelected] = useState<Mode>("existing");
  const current = concepts.find(item => item.mode === selected) ?? concepts[0];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("typ");
    if (requested && concepts.some(item => item.mode === requested)) {
      window.requestAnimationFrame(() => setSelected(requested as Mode));
    }
    const handleMode = (event: Event) => {
      const mode = (event as CustomEvent<Mode>).detail;
      if (concepts.some(item => item.mode === mode)) setSelected(mode);
    };
    window.addEventListener("zm-concept-mode", handleMode);
    return () => window.removeEventListener("zm-concept-mode", handleMode);
  }, []);
  function selectMode(mode: Mode) {
    setSelected(mode);
    window.dispatchEvent(new CustomEvent("zm-concept-mode", { detail: mode }));
  }
  function requestSelected() {
    selectMode(selected);
  }
  function onTabsKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = concepts.findIndex(item => item.mode === selected);
    const nextIndex = event.key === "ArrowRight" || event.key === "ArrowDown"
      ? (currentIndex + 1) % concepts.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp"
        ? (currentIndex + concepts.length - 1) % concepts.length
        : event.key === "Home" ? 0
          : event.key === "End" ? concepts.length - 1 : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    const nextMode = concepts[nextIndex].mode;
    selectMode(nextMode);
    document.getElementById(`zv5-tab-${nextMode}`)?.focus();
  }
  return <section className="section zm-concept-gallery" id="mozliwosci" aria-labelledby="zm-concept-gallery-heading">
    <div className="shell">
      <div className="zv5-gallery-intro"><div><span className="zv5-kicker">CO MOŻEMY ZAPROPONOWAĆ</span><h2 id="zm-concept-gallery-heading">Zobacz przykłady.<br/><em>Wyobraź sobie swoją firmę.</em></h2></div><p>15 przykładów w pięciu kategoriach. W każdej możesz przełączyć trzy różne marki, a kliknięciem grafiki otworzysz pełny podgląd. Wybierz kierunek i poproś o pomysł dla swojej firmy.</p></div>
      <div className="zv5-gallery-layout">
        <div className="zv5-tabs" role="tablist" aria-label="Wybierz rodzaj koncepcji">
          {concepts.map((item,index)=><button type="button" key={item.mode} role="tab" id={`zv5-tab-${item.mode}`} aria-selected={selected===item.mode} aria-controls="zv5-preview-panel" className={selected===item.mode?"zv5-tab is-active":"zv5-tab"} tabIndex={selected===item.mode?0:-1} onKeyDown={onTabsKeyDown} onClick={()=>selectMode(item.mode)}><span>0{index+1}</span><b>{item.title}</b><small>{item.note}</small><i aria-hidden="true">↗</i></button>)}
        </div>
        <div id="zv5-preview-panel" className="zv5-preview-panel" role="tabpanel" aria-labelledby={`zv5-tab-${selected}`} tabIndex={0}>
          <div className="zv5-preview-top"><span>PRZYKŁAD OPRACOWANIA</span><strong>0{concepts.indexOf(current)+1} / 05</strong></div>
          <div className="zv5-preview-stage"><Illustration key={selected} mode={selected}/></div>
          <div className="zv5-preview-bottom"><div><h3>{current.title}</h3><p>{current.description}</p></div><a href="#zgloszenie" className="zv5-preview-cta" onClick={requestSelected}>Chcę podgląd dla mojej firmy ↗</a></div>
          <p className="zv5-preview-clarity">To przykłady możliwości, nie realizacje dla klientów. Bezpłatna koncepcja nie zawiera gotowych plików produkcyjnych ani kodu strony.</p>
        </div>
      </div>
      <p className="zv5-gallery-foot">Chcesz samodzielnie stworzyć podgląd WWW? <Link href="/projektuj-strone#zm-konfigurator">Przejdź do ZM Studio ↗</Link></p>
    </div>
  </section>;
}
