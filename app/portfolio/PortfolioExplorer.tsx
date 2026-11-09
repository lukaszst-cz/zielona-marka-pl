/* eslint-disable @next/next/no-img-element -- Podglądy to istniejące statyczne grafiki WebP i SVG, bez potrzeby zewnętrznego optymalizatora. */
"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "./catalog";
import { portfolioCategories, liczbaProjektow } from "./catalog";

const presets = [
  { label: "Hurtownia i handel", slugs: ["budrivo","navoro-hurt","nexio-elektro","materivo","gazetka-navoro","gazetka-nexio","gazetka-budrivo","gazetka-materivo","dobry-koszyk","zielony-sezon"] },
  { label: "Usługi i gabinety", slugs: ["solidom","solident","black-harbor","natura-studio","bistro-forma","dom-dobry","okruch","pion"] },
  { label: "Grafika i DTP", slugs: ["szlak","lodyga","palona","peleton","poglos","dalej","dobry-koszyk","modul","zielony-sezon"] },
  { label: "Systemy i Excel", slugs: ["printflow","transportflow","workshopflow","auto-naprawa","lead-offer-copilot","excel-printflow","excel-transportflow","excel-dashboard"] },
] as const;

function selectedPdfUrl(slugs: string[]) {
  return slugs.length ? `/portfolio/druk?projekty=${encodeURIComponent(slugs.join(","))}` : "/portfolio/druk";
}

export default function PortfolioExplorer({ items }: { items: PortfolioItem[] }) {
  const [category, setCategory] = useState<PortfolioCategory | "wszystkie">("wszystkie");
  const [search, setSearch] = useState("");
  const [onlySelected, setOnlySelected] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [feedback, setFeedback] = useState("");
  const featured = items.filter(item => item.featured);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("kategoria");
    const requestedProjects = params.get("projekty")?.split(",").filter(Boolean) || [];
    const known = new Set(items.map(item => item.slug));
    const frame = window.requestAnimationFrame(() => {
      if (portfolioCategories.some(item => item.id === requestedCategory)) setCategory(requestedCategory as PortfolioCategory);
      if (requestedProjects.length) {
        setSelected(requestedProjects.filter(slug => known.has(slug)));
        setOnlySelected(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [items]);
  const filtered = useMemo(() => {
    const q = search.toLocaleLowerCase("pl-PL").trim();
    return items.filter(item => (category === "wszystkie" || item.category === category) &&
      (!onlySelected || selected.includes(item.slug)) &&
      (!q || [item.title,item.summary,item.industry,...item.features].join(" ").toLocaleLowerCase("pl-PL").includes(q)));
  },[items,category,search,onlySelected,selected]);

  const selectedItems = selected.map(slug => items.find(item => item.slug === slug)).filter((item): item is PortfolioItem => Boolean(item));
  function toggle(slug: string) {
    setSelected(current => current.includes(slug) ? current.filter(item => item !== slug) : [...current,slug]);
  }
  function choosePreset(slugs: readonly string[]) {
    const known = new Set(items.map(item => item.slug));
    setSelected(slugs.filter(slug => known.has(slug)));
    setOnlySelected(false);
    setFeedback("Zestaw wybrany. Możesz dodać lub usunąć pojedyncze projekty.");
  }
  async function copyLink() {
    const url = new URL("/portfolio", window.location.origin);
    if (selected.length) url.searchParams.set("projekty", selected.join(","));
    try {
      await navigator.clipboard.writeText(url.toString());
      setFeedback("Skopiowano link do portfolio.");
    } catch {
      setFeedback("Nie udało się skopiować linku. Skorzystaj z przycisku eksportu.");
    }
  }

  return <div className="zmp-explorer">
    <section className="zmp-hero shell" aria-labelledby="zmp-title">
      <span className="zmp-overline">ZIELONA MARKA / PROJEKTY</span>
      <h1 id="zmp-title">Portfolio, które można <em>obejrzeć i wysłać.</em></h1>
      <p>Strony WWW, projekty identyfikacji, gazetki, systemy i narzędzia Excel. Wszystkie materiały mają opis charakteru i zakresu. Prace koncepcyjne są oznaczone jako demonstracje.</p>
      <div className="zmp-hero-actions">
        <a href="#zmp-katalog" className="zmp-btn zmp-btn-strong">Przeglądaj projekty <span aria-hidden="true">↓</span></a>
        <a href="#zmp-zestaw" className="zmp-btn zmp-btn-outline">Przygotuj portfolio dla klienta ↗</a>
      </div>
    </section>
    <section className="zmp-showcase shell" aria-label="Wyróżnione projekty marki Zielona Marka">
      <div className="zmp-section-head"><div><small>WYBRANE PRACE</small><h2>Różne projekty. Jeden standard prezentacji.</h2></div><p>Przejdź przez przykłady i otwórz kartę wybranej pracy.</p></div>
      <div className="zmp-stage" aria-roledescription="karuzela">
        {featured.map((item,index) => {
          let offset = index - active;
          if (offset > featured.length / 2) offset -= featured.length;
          if (offset < -featured.length / 2) offset += featured.length;
          const distance = Math.abs(offset);
          return <a key={item.slug} href={`/portfolio/${item.slug}`} tabIndex={distance > 1 ? -1 : 0}
            aria-hidden={distance > 1 ? true : undefined}
            className={`zmp-cover${distance === 0 ? " is-current" : ""}${distance > 1 ? " is-hidden" : ""}`}
            style={{ transform: `translateX(${offset * 72}%) translateZ(${distance === 0 ? 30 : -175}px) rotateY(${offset * -19}deg) scale(${distance === 0 ? 1 : .88})`, zIndex: featured.length-distance, opacity: distance > 1 ? 0 : 1 }}>
            {item.image ? <img src={item.image} alt={item.alt || item.title} loading={distance===0?"eager":"lazy"} /> : <div className="zmp-cover-placeholder"><span>{item.industry}</span><strong>{item.title}</strong><small>Projekt demonstracyjny</small></div>}
            <span className="zmp-cover-caption"><small>{item.industry}</small><b>{item.title}</b></span>
          </a>;
        })}
        <button type="button" aria-label="Poprzedni projekt" className="zmp-stage-prev" onClick={()=>setActive(i=>(i-1+featured.length)%featured.length)}>‹</button>
        <button type="button" aria-label="Następny projekt" className="zmp-stage-next" onClick={()=>setActive(i=>(i+1)%featured.length)}>›</button>
      </div>
      <div className="zmp-stage-foot"><span>{String(active+1).padStart(2,"0")} / {String(featured.length).padStart(2,"0")}</span><p>Otwórz kartę projektu, aby zobaczyć opis i dostępne materiały.</p></div>
    </section>

    <section className="shell zmp-selection" id="zmp-zestaw" aria-label="Przygotowanie portfolio dla klienta">
      <div><span className="zmp-overline">PORTFOLIO DO WYSYŁKI</span><h2>Wybierz prace pasujące do klienta.</h2><p>Możesz zacząć od gotowego zestawu lub samodzielnie zaznaczyć projekty niżej. Potem zapisz przejrzysty dokument jako PDF i dołącz do wiadomości e-mail.</p></div>
      <div className="zmp-selection-actions">
        <div className="zmp-presets">{presets.map(item=><button type="button" key={item.label} onClick={()=>choosePreset(item.slugs)}>{item.label}</button>)}</div>
        <div className="zmp-selection-bottom">
          <strong>{selected.length ? `Zaznaczono ${liczbaProjektow(selected.length)}` : "Brak zaznaczonych projektów"}</strong>
          <a className="zmp-btn zmp-btn-strong" href={selectedPdfUrl(selected)} target="_blank" rel="noopener noreferrer">{selected.length ? "Otwórz zestaw do PDF ↗" : "Otwórz pełne portfolio do PDF ↗"}</a>
          {selected.length > 0 && <button type="button" onClick={()=>setSelected([])}>Wyczyść wybór</button>}
        </div>
        <small>W widoku eksportu wybierz „Drukuj / Zapisz PDF”, a następnie „Zapisz jako PDF”. To gotowy załącznik do wiadomości.</small>
      </div>
    </section>

    <section id="zmp-katalog" className="shell zmp-catalog">
      <div className="zmp-section-head"><div><small>KATALOG PROJEKTÓW</small><h2>Wszystkie prace w jednym miejscu.</h2></div><p>Filtruj po rodzaju prac, szukaj po nazwie lub branży.</p></div>
      <div className="zmp-catalog-controls">
        <div role="group" aria-label="Filtruj projekty" className="zmp-filters">
          <button type="button" aria-pressed={category==="wszystkie"} onClick={()=>setCategory("wszystkie")}>Wszystkie</button>
          {portfolioCategories.map(item=><button type="button" key={item.id} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)}>{item.label}</button>)}
        </div>
        <label className="zmp-search"><span>Wyszukaj projekt</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Nazwa, branża lub funkcja..." /></label>
      </div>
      <div className="zmp-results-head"><p className="zmp-count">Wyświetlono {filtered.length} z {items.length} projektów. Wybierz prace, aby przygotować spersonalizowany PDF.</p><label className="zmp-check"><input type="checkbox" checked={onlySelected} onChange={event => setOnlySelected(event.target.checked)} disabled={selected.length === 0} /> Pokaż tylko wybrane</label></div>
      <div className="zmp-grid">
        {filtered.map(item=><article className="zmp-tile" key={item.slug}>
          <a href={`/portfolio/${item.slug}`} className="zmp-tile-photo" aria-label={`Zobacz projekt ${item.title}`}>
            {item.image ? <img src={item.image} alt={item.alt || item.title} loading="lazy" /> : <div className="zmp-tile-placeholder"><span>Projekt / Zielona Marka</span><strong>{item.title}</strong></div>}
            <span className="zmp-tile-tag">{portfolioCategories.find(c=>c.id===item.category)?.label}</span>
          </a>
          <div className="zmp-tile-content"><small>{item.industry}</small><h3><a href={`/portfolio/${item.slug}`}>{item.title}</a></h3><p>{item.summary}</p><span className="zmp-status">{item.status}</span><div className="zmp-tile-links"><a href={`/portfolio/${item.slug}`}>Opis projektu ↗</a><label className="zmp-check"><input type="checkbox" checked={selected.includes(item.slug)} onChange={()=>toggle(item.slug)} /> Dodaj do PDF</label></div></div>
        </article>)}
      </div>
      {filtered.length === 0 && <p className="zmp-empty">Brak projektów pasujących do wyszukiwania. Zmień filtry lub frazę.</p>}
    </section>
    <nav className="zmp-floating-export" aria-label="Wybrane projekty" hidden={selected.length===0}>
      <b>{selectedItems.length} wybranych</b>
      <a href={selectedPdfUrl(selected)} target="_blank" rel="noopener noreferrer">Przygotuj PDF ↗</a>
      <button type="button" onClick={copyLink}>Kopiuj link</button>
      <button type="button" aria-label="Wyczyść wybór" onClick={()=>setSelected([])}>✕</button>
    </nav>
    {feedback && <p className="zmp-toast" role="status">{feedback}</p>}
  </div>;
}
