"use client";

import { useState } from "react";
import Link from "../SafeLink";

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
    case "existing": return <div className="zv5-demo-comparison" aria-hidden="true"><div className="zv5-demo-old"><small>OBECNA STRONA</small><strong>Oferta firmy</strong><i/><i/><i/><span>Kontakt</span></div><span className="zv5-demo-arrow">→</span><div className="zv5-demo-new"><small>NOWA KONCEPCJA</small><strong>Twoja oferta.<br/><em>Nowe spojrzenie.</em></strong><span>Poznaj usługi ↗</span></div></div>;
    case "new": return <div className="zv5-demo-brand" aria-hidden="true"><header><b>forma<span>.</span></b><small>Oferta · O nas · Kontakt</small></header><div className="zv5-demo-brand-body"><div><small>STUDIO ZIELENI</small><strong>Piękno blisko <em>natury.</em></strong><span>Poznaj nas ↗</span></div><div className="zv5-demo-brand-nature"><i/><i/><i/></div></div></div>;
    case "logo": return <div className="zv5-demo-logo" aria-hidden="true"><div className="zv5-demo-sign">L</div><div><strong>LUMI</strong><small>PRACOWNIA WNĘTRZ</small></div><footer><span/><span/><span/><b>Symbol · Typografia · Kolor</b></footer></div>;
    case "promo": return <div className="zv5-demo-promo" aria-hidden="true"><div className="zv5-demo-paper"><small>PRZYKŁADOWA OKŁADKA</small><strong>Nowe <em>pomysły.</em></strong><span>Odkryj ofertę i inspiracje</span><b>SPRAWDŹ WIĘCEJ ↗</b></div><span className="zv5-demo-ribbon">GAZETKA REKLAMOWA</span></div>;
    case "sales": return <div className="zv5-demo-sales" aria-hidden="true"><div className="zv5-demo-sales-head"><small>KATALOG / DEMO</small><strong>Przejrzysta oferta.</strong></div><div className="zv5-demo-products">{["01","02","03"].map((n)=><div key={n}><i/><b>PRODUKT {n}</b><small>Przykładowy opis</small><span>od 49 zł</span></div>)}</div></div>;
  }
}

export default function ConceptShowcase() {
  const [selected, setSelected] = useState<Mode>("existing");
  const current = concepts.find(item => item.mode === selected) ?? concepts[0];
  function requestSelected() {
    window.dispatchEvent(new CustomEvent("zm-concept-mode", { detail: selected }));
  }
  return <section className="section zm-concept-gallery" id="mozliwosci" aria-labelledby="zm-concept-gallery-heading">
    <div className="shell">
      <div className="zv5-gallery-intro"><div><span className="zv5-kicker">CO MOŻEMY ZAPROPONOWAĆ</span><h2 id="zm-concept-gallery-heading">Pięć kierunków.<br/><em>Jedna bezpłatna propozycja.</em></h2></div><p>Zobacz pięć różnych przykładów: od strony WWW po gazetkę. Wybierz kierunek najbliższy Twojej firmie i napisz, co chcesz zmienić.</p></div>
      <div className="zv5-gallery-layout">
        <div className="zv5-tabs" role="tablist" aria-label="Wybierz rodzaj koncepcji">
          {concepts.map((item,index)=><button type="button" key={item.mode} role="tab" id={`zv5-tab-${item.mode}`} aria-selected={selected===item.mode} aria-controls="zv5-preview-panel" className={selected===item.mode?"zv5-tab is-active":"zv5-tab"} onClick={()=>setSelected(item.mode)}><span>0{index+1}</span><b>{item.title}</b><small>{item.note}</small><i aria-hidden="true">↗</i></button>)}
        </div>
        <div id="zv5-preview-panel" className="zv5-preview-panel" role="tabpanel" aria-labelledby={`zv5-tab-${selected}`} tabIndex={0}>
          <div className="zv5-preview-top"><span>PRZYKŁADOWY KIERUNEK WIZUALNY</span><strong>0{concepts.indexOf(current)+1} / 05</strong></div>
          <div className="zv5-preview-stage"><Illustration mode={selected}/></div>
          <div className="zv5-preview-bottom"><div><h3>{current.title}</h3><p>{current.description}</p></div><a href="#zgloszenie" className="zv5-preview-cta" onClick={requestSelected}>Wybierz ten kierunek ↗</a></div>
          <p className="zv5-preview-clarity">To przykłady możliwości, nie realizacje dla klientów. Bezpłatna koncepcja nie zawiera gotowych plików produkcyjnych ani kodu strony.</p>
        </div>
      </div>
      <p className="zv5-gallery-foot">Chcesz samodzielnie stworzyć podgląd WWW? <Link href="/projektuj-strone#zm-konfigurator">Przejdź do ZM Studio ↗</Link></p>
    </div>
  </section>;
}
