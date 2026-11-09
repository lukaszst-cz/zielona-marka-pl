/* eslint-disable @next/next/no-img-element -- Portfolio uses authored static project visuals and preview assets. */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "../SafeLink";
import { portfolioCategories, type PortfolioItem } from "./catalog";

const filters = [
  { id: "all", label: "Wszystkie", symbol: "▦" },
  { id: "building", label: "Budownictwo", symbol: "⌂" },
  { id: "trade", label: "Handel i hurtownie", symbol: "▤" },
  { id: "health", label: "Medycyna i zdrowie", symbol: "+" },
  { id: "services", label: "Usługi i firmy", symbol: "◇" },
  { id: "aplikacje", label: "Aplikacje i systemy", symbol: "▣" },
] as const;

function matchesFilter(item: PortfolioItem, filter: string) {
  const industry = item.industry.toLocaleLowerCase("pl-PL");
  if (filter === "all") return true;
  if (portfolioCategories.some(option => option.id === filter)) return item.category === filter;
  if (filter === "building") return /budow|budyn|elektr|instala|ogr[oó]d|architekt|wyko[ńn]cz|materia[łl]/i.test(industry);
  if (filter === "trade") return /hurt|handel|sklep|fmcg|produkt|delikates|mebl|wyposa[żz]|promocj/i.test(industry) || item.slug.includes("gazetka");
  if (filter === "health") return /zdrow|stomat|wellness|beauty|weterynar|medyc/i.test(industry);
  if (filter === "services") return /us[łl]ug|gastronom|piekarn|auto|warsztat|nieruch|turyst|kultura|projekt|r[eę]kodzie|poligraf/i.test(industry);
  return false;
}

export default function PortfolioExplorer({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const featuredOrder = ["budrivo", "navoro-hurt", "nexio-elektro", "materivo", "aktywnik-plus", "okruch", "szlak"];
  const featured = featuredOrder.map(slug => items.find(item => item.slug === slug)).filter((item): item is PortfolioItem => Boolean(item));
  const current = featured[active] || featured[0];

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("kategoria");
    if (!value) return;
    const frame = window.requestAnimationFrame(() => {
      if (portfolioCategories.some(category => category.id === value)) setFilter(value);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pl-PL");
    return items.filter(item => matchesFilter(item, filter) &&
      (!query || [item.title, item.industry, item.summary, ...item.features].join(" ").toLocaleLowerCase("pl-PL").includes(query)));
  }, [items, filter, search]);

  function changeFilter(id: string) {
    setFilter(id);
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => document.getElementById("zmp-katalog")?.scrollIntoView({ block: "start", behavior: "smooth" }));
    }
  }

  return <div className="zmp-explorer">
    <div className="zmp-forest">
      <section className="zmp-hero shell" aria-labelledby="zmp-title">
        <div className="zmp-hero-copy">
          <span className="zmp-overline">PORTFOLIO ZIELONA MARKA</span>
          <h1 id="zmp-title">Nasze projekty. <em>Zobacz je w działaniu.</em></h1>
          <p>Strony internetowe, interaktywne gazetki, katalogi i lekkie systemy dla firm. Zobacz projekty i otwórz działające demonstracje.</p>
        </div>
        <div className="zmp-stage" role="region" aria-label="Karuzela wyróżnionych projektów">
          <div className="zmp-stage-light" aria-hidden="true" />
          {featured.map((item, index) => {
            let offset = index - active;
            if (offset > featured.length / 2) offset -= featured.length;
            if (offset < -featured.length / 2) offset += featured.length;
            const distance = Math.abs(offset);
            return <Link key={item.slug} href={`/portfolio/${item.slug}`}
              aria-label={`Zobacz projekt ${item.title}`}
              aria-hidden={distance > 2 ? true : undefined}
              tabIndex={distance > 2 ? -1 : 0}
              className={`zmp-laptop${distance === 0 ? " is-current" : ""}${distance > 2 ? " is-outside" : ""}`}
              style={{ transform: `translateX(calc(-50% + ${offset * 76}%)) translateY(-50%) rotateY(${offset * -25}deg) scale(${distance===0 ? 1 : distance===1 ? .8 : .67})`, opacity: distance>2?0:1, zIndex:featured.length-distance }}>
              <span className="zmp-laptop-display">
                <span className="zmp-laptop-camera" aria-hidden="true" />
                <span className="zmp-laptop-screen">
                  <img src={item.image} alt={item.alt || `Wizualizacja projektu ${item.title}`} loading={distance===0 ? "eager" : "lazy"} />
                  <span className="zmp-laptop-caption"><small>{item.industry}</small><strong>{item.title}</strong></span>
                </span>
              </span>
              <span className="zmp-laptop-base" aria-hidden="true" />
            </Link>;
          })}
          <button type="button" className="zmp-stage-prev" aria-label="Poprzedni projekt" onClick={() => setActive(index => (index - 1 + featured.length) % featured.length)}>‹</button>
          <button type="button" className="zmp-stage-next" aria-label="Następny projekt" onClick={() => setActive(index => (index + 1) % featured.length)}>›</button>
        </div>
        {current && <div className="zmp-featured-caption" aria-live="polite">
          <strong>{current.title}</strong>
          <p>{current.summary}</p>
          <div className="zmp-featured-actions">
            {current.demoUrl && <a href={current.demoUrl} target={current.demoUrl.startsWith("http") ? "_blank" : undefined} rel={current.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined} className="zmp-btn zmp-btn-strong">Otwórz demonstrację <span aria-hidden="true">↗</span></a>}
            <Link href={`/portfolio/${current.slug}`} className="zmp-btn zmp-btn-outline">Opis projektu <span aria-hidden="true">↗</span></Link>
          </div>
        </div>}
        <div className="zmp-stage-dots" aria-label="Wybierz wyróżniony projekt">
          {featured.map((item,index)=><button key={item.slug} type="button" className={index===active?"is-active":""} aria-current={index===active?"true":undefined} aria-label={`Pokaż ${item.title}`} onClick={()=>setActive(index)} />)}
        </div>
      </section>
      <nav className="zmp-filter-dock shell" aria-label="Przeglądaj portfolio według branży">
        <b>Przeglądaj według branży:</b>
        <div className="zmp-filter-list">
          {filters.map(option => <button key={option.id} type="button" onClick={()=>changeFilter(option.id)}
            className={filter===option.id?"is-active":""} aria-pressed={filter===option.id}>
            <span aria-hidden="true">{option.symbol}</span> {option.label}
          </button>)}
        </div>
      </nav>
    </div>

    <section className="zmp-gallery-surface" id="zmp-katalog">
      <div className="shell zmp-gallery-intro">
        <span className="zmp-ornament" aria-hidden="true">❦</span>
        <h2>Jedna marka. <em>Wiele formatów.</em></h2>
        <p>Od pomysłu na stronę po gazetkę produktową, aplikację i narzędzia dla firmy. Każdy projekt ma własną prezentację i opis zakresu.</p>
      </div>
      <div className="shell zmp-catalog">
        <div className="zmp-catalog-top">
          <div className="zmp-category-links" role="group" aria-label="Rodzaj projektu">
            <button type="button" className={filter==="all"?"is-active":""} aria-pressed={filter==="all"} onClick={()=>setFilter("all")}>Wszystkie prace</button>
            {portfolioCategories.map(category=><button key={category.id} type="button" aria-pressed={filter===category.id} className={filter===category.id?"is-active":""} onClick={()=>setFilter(category.id)}>{category.label}</button>)}
          </div>
          <label className="zmp-search"><span>Wyszukaj</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Nazwa projektu lub branża..." /></label>
        </div>
        <div className="zmp-results-heading">
          <h3>{filter==="all" ? "Wybrane realizacje i koncepcje" : filters.find(x=>x.id===filter)?.label || portfolioCategories.find(x=>x.id===filter)?.label || "Projekty"}</h3>
          <span>{filtered.length} / {items.length}</span>
        </div>
        <div className="zmp-grid">
          {filtered.map(item=><article className="zmp-tile" key={item.slug}>
            <Link href={`/portfolio/${item.slug}`} className="zmp-tile-photo" aria-label={`Otwórz projekt ${item.title}`}>
              <img src={item.image} alt={item.alt || `Grafika projektu ${item.title}`} loading="lazy" />
              <span className="zmp-tile-tag">{item.status.includes("beta") ? "Projekt rozwijany" : "Projekt demonstracyjny"}</span>
              <span className="zmp-media-cta" aria-hidden="true">↗</span>
            </Link>
            <div className="zmp-tile-content">
              <small>{portfolioCategories.find(c=>c.id===item.category)?.label} / {item.industry}</small>
              <h3><Link href={`/portfolio/${item.slug}`}>{item.title}</Link></h3>
              <p>{item.summary}</p>
              <div className="zmp-tile-links">
                {item.demoUrl ? <a href={item.demoUrl} target={item.demoUrl.startsWith("http")?"_blank":undefined} rel={item.demoUrl.startsWith("http")?"noopener noreferrer":undefined}>Zobacz demonstrację ↗</a> : <Link href={`/portfolio/${item.slug}`}>Zobacz wizualizację ↗</Link>}
                <Link href={`/portfolio/${item.slug}`}>Szczegóły ↗</Link>
              </div>
            </div>
          </article>)}
        </div>
        {filtered.length===0 && <div className="zmp-empty">Brak projektów spełniających te kryteria. <button type="button" onClick={()=>{setFilter("all");setSearch("")}}>Pokaż wszystkie</button></div>}
      </div>
      <section className="shell zmp-public-pdf">
        <div>
          <span className="zmp-overline">PORTFOLIO W FORMACIE PDF</span>
          <h2>Wolisz przeglądać na spokojnie?</h2>
          <p>Otwórz pełny przegląd projektów w formacie do zapisania jako PDF albo napisz do nas, jeśli interesuje Cię konkretna branża.</p>
        </div>
        <div className="zmp-pdf-actions">
          <Link href="/portfolio/druk" target="_blank" rel="noopener noreferrer" className="zmp-btn zmp-btn-strong">Zapisz portfolio jako PDF ↗</Link>
          <Link href="/kontakt" className="zmp-btn zmp-btn-outline">Zapytaj o podobny projekt ↗</Link>
        </div>
      </section>
    </section>
  </div>;
}
