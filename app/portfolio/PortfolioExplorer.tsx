/* eslint-disable @next/next/no-img-element -- Project visuals are authored assets and public demo images. */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "../SafeLink";
import { portfolioCategories, type PortfolioCategory, type PortfolioItem } from "./catalog";

const industryFilters = [
  { id: "all", label: "Wszystkie", icon: "▦" },
  { id: "building", label: "Budownictwo", icon: "⌂" },
  { id: "trade", label: "Handel i hurtownie", icon: "▤" },
  { id: "health", label: "Medycyna i zdrowie", icon: "+" },
  { id: "services", label: "Usługi i firmy", icon: "◇" },
  { id: "aplikacje", label: "Aplikacje i systemy", icon: "▣" },
] as const;

function matchesIndustry(item: PortfolioItem, filter: string) {
  const industry = item.industry.toLocaleLowerCase("pl-PL");
  if (filter === "all") return true;
  if (filter === "aplikacje") return item.category === "aplikacje" || item.category === "excel";
  if (filter === "building") return /budow|budyn|elektr|instala|ogr[oó]d|architekt|wyko[ńn]cz|materia[łl]/i.test(industry);
  if (filter === "trade") return /hurt|handel|sklep|fmcg|produkt|delikates|mebl|wyposa[żz]|promocj/i.test(industry) || item.slug.includes("gazetka");
  if (filter === "health") return /zdrow|stomat|wellness|beauty|weterynar|medyc/i.test(industry);
  if (filter === "services") return /us[łl]ug|gastronom|piekarn|auto|warsztat|nieruch|turyst|kultura|projekt|r[eę]kodzie|poligraf/i.test(industry);
  return true;
}

const featuredOrder = ["szlak", "materivo", "aktywnik-plus", "okruch", "budrivo", "navoro-hurt", "solident", "nexio-elektro"];

function mediaPresentation(item: PortfolioItem): "screen" | "art" | "photo" {
  const src = item.image || "";
  if (src.includes("-autentyczny-podglad.png") || src.includes("aktywnik-plus-aktualny-ekran.png")) return "screen";
  if (["gazetki", "logo", "przed-po", "excel"].includes(item.category) || src.includes("/concept-samples-v2/")) return "art";
  return "photo";
}

export default function PortfolioExplorer({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState(0);
  const [industry, setIndustry] = useState("all");
  const [format, setFormat] = useState<PortfolioCategory | "all">("all");
  const [search, setSearch] = useState("");

  const featured = useMemo(() => featuredOrder.map(slug => items.find(item => item.slug === slug))
    .filter((item): item is PortfolioItem => Boolean(item && item.image)), [items]);

  const current = featured[active] || featured[0];

  useEffect(() => {
    const queryCategory = new URLSearchParams(window.location.search).get("kategoria");
    if (!queryCategory) return;
    const frame = window.requestAnimationFrame(() => {
      if (portfolioCategories.some(category => category.id === queryCategory)) setFormat(queryCategory as PortfolioCategory);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pl-PL");
    return items.filter(item => matchesIndustry(item, industry) && (format === "all" || item.category === format) &&
      (!query || [item.title, item.industry, item.summary, item.explanation, ...item.features]
        .join(" ").toLocaleLowerCase("pl-PL").includes(query)));
  }, [items, industry, format, search]);

  function chooseIndustry(id: string) {
    setIndustry(id);
    setFormat("all");
  }

  return <div className="zmp-explorer">
    <div className="zmp-cinematic">
      <section className="zmp-hero shell" aria-labelledby="zmp-title">
        <div className="zmp-hero-text">
          <span className="zmp-overline">PORTFOLIO ZIELONA MARKA</span>
          <h1 id="zmp-title">Zobacz, co <em>tworzymy.</em></h1>
          <p>Nowoczesne strony internetowe, katalogi, gazetki i rozwiązania online dopasowane do różnych branż.</p>
        </div>

        <div className="zmp-visual-stage" role="region" aria-label="Przegląd wyróżnionych projektów">
          <span className="zmp-stage-glow" aria-hidden="true" />
          {featured.map((item, index) => {
            let offset = index - active;
            if (offset > featured.length / 2) offset -= featured.length;
            if (offset < -featured.length / 2) offset += featured.length;
            const distance = Math.abs(offset);
            return <Link key={item.slug} href={`/portfolio/${item.slug}`}
              aria-label={`Zobacz projekt ${item.title}`}
              aria-hidden={distance > 2 ? true : undefined}
              tabIndex={distance > 2 ? -1 : 0}
              className={`zmp-floating-card${distance === 0 ? " is-current" : ""}${distance > 2 ? " is-outside" : ""}`}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 67}%) rotateY(${offset * -18}deg) scale(${distance === 0 ? 1 : distance === 1 ? .88 : .76})`,
                opacity: distance > 2 ? 0 : 1,
                zIndex: featured.length - distance,
              }}>
              <span className="zmp-floating-topline"><span className="zmp-floating-dot" /> {item.category === "www" ? "KONCEPCJA WWW" : item.category === "aplikacje" ? "APLIKACJA" : "PROJEKT"} <span>↗</span></span>
              <span className="zmp-floating-visual" data-media={mediaPresentation(item)}>
                <img src={item.image} alt={item.alt || `Prezentacja ${item.title}`} loading={distance <= 1 ? "eager" : "lazy"} />
              </span>
              <span className="zmp-floating-copy"><strong>{item.title}</strong><small>{item.industry}</small></span>
            </Link>;
          })}
          {featured.length > 1 && <>
            <button className="zmp-nav-arrow zmp-nav-prev" type="button" aria-label="Poprzedni projekt" onClick={() => setActive(n => (n - 1 + featured.length) % featured.length)}>‹</button>
            <button className="zmp-nav-arrow zmp-nav-next" type="button" aria-label="Następny projekt" onClick={() => setActive(n => (n + 1) % featured.length)}>›</button>
          </>}
        </div>

        {current && <div className="zmp-feature-legend" aria-live="polite">
          <strong>{current.title}</strong>
          <p>{current.summary}</p>
          <div className="zmp-feature-buttons">
            {current.demoUrl && <a className="zmp-btn zmp-btn-strong" href={current.demoUrl}
              target={current.demoUrl.startsWith("http") ? "_blank" : undefined}
              rel={current.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>Otwórz demonstrację ↗</a>}
            <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/${current.slug}`}>Szczegóły projektu ↗</Link>
          </div>
        </div>}
        <div className="zmp-stage-dots" aria-label="Wybór wyróżnionego projektu">
          {featured.map((item,index) => <button key={item.slug} type="button"
            aria-label={`Pokaż projekt ${item.title}`} aria-current={index === active ? "true" : undefined}
            className={index === active ? "is-active" : ""} onClick={() => setActive(index)} />)}
        </div>
      </section>

      <nav className="shell zmp-industry-dock" aria-label="Filtruj portfolio według branży">
        <span>Przeglądaj według branży</span>
        <div className="zmp-industry-list">
          {industryFilters.map(option => <button key={option.id} type="button" onClick={() => chooseIndustry(option.id)}
            aria-pressed={industry === option.id} className={industry === option.id ? "is-active" : ""}>
            <span aria-hidden="true">{option.icon}</span>{option.label}
          </button>)}
        </div>
      </nav>
    </div>

    <section id="zmp-katalog" className="zmp-projects">
      <div className="shell">
        <div className="zmp-projects-title">
          <span className="zmp-overline">PROJEKTY I DEMONSTRACJE</span>
          <h2>Projekty, które <em>warto zobaczyć.</em></h2>
          <p>Każda praca ma własną grafikę, opis zastosowania oraz informacje o funkcjach. Zobacz, jak różne rozwiązania mogą wyglądać w praktyce.</p>
        </div>
        <div className="zmp-projects-tools">
          <label className="zmp-format-field">
            <span>Rodzaj projektu</span>
            <select value={format} onChange={event => setFormat(event.target.value as PortfolioCategory | "all")}>
              <option value="all">Wszystkie formaty</option>
              {portfolioCategories.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="zmp-query-field"><span>Znajdź projekt</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)}
            placeholder="Wpisz nazwę, branżę lub funkcję" /></label>
          <span className="zmp-result-count">{filtered.length} z {items.length} projektów</span>
        </div>
        <div className="zmp-grid">
          {filtered.map(item => <article className="zmp-project-card" key={item.slug}>
            <Link href={`/portfolio/${item.slug}`} className="zmp-project-photo" data-media={mediaPresentation(item)} data-project={item.slug} aria-label={`Poznaj projekt ${item.title}`}>
              <img src={item.image} alt={item.alt || `Podgląd projektu ${item.title}`} loading="lazy" />
              <span className="zmp-project-category">{portfolioCategories.find(x=>x.id===item.category)?.label}</span>
              <span className="zmp-project-expand" aria-hidden="true">↗</span>
            </Link>
            <div className="zmp-project-info">
              <div className="zmp-project-meta"><span>{item.industry}</span><span>{item.status.includes("beta")?"Projekt rozwijany":"Projekt demonstracyjny"}</span></div>
              <h3><Link href={`/portfolio/${item.slug}`}>{item.title}</Link></h3>
              <p className="zmp-project-intro">{item.summary}</p>
              <p className="zmp-project-description">{item.explanation}</p>
              <div className="zmp-project-features" aria-label="Elementy projektu">
                {item.features.slice(0,3).map(feature=><span key={feature}>{feature}</span>)}
              </div>
              <div className="zmp-project-actions">
                <Link className="zmp-project-open" href={`/portfolio/${item.slug}`}>Zobacz projekt <span aria-hidden="true">↗</span></Link>
                {item.demoUrl && <a className="zmp-project-demo" href={item.demoUrl}
                  target={item.demoUrl.startsWith("http")?"_blank":undefined}
                  rel={item.demoUrl.startsWith("http")?"noopener noreferrer":undefined}>Otwórz demo ↗</a>}
              </div>
            </div>
          </article>)}
        </div>
        {filtered.length===0 && <div className="zmp-no-results">
          <p>Nie znaleziono projektów w tej kategorii.</p>
          <button type="button" onClick={()=>{setIndustry("all");setFormat("all");setSearch("")}}>Pokaż wszystkie projekty</button>
        </div>}

        <div className="zmp-pdf-footer">
          <div><span className="zmp-overline">DO OBEJRZENIA I ZAPISANIA</span><h2>Portfolio także w PDF</h2>
            <p>Możesz zapisać pełne portfolio jako dokument PDF. Jeśli interesuje Cię konkretna branża, napisz, a dobierzemy odpowiednie przykłady.</p></div>
          <div className="zmp-pdf-actions">
            <Link className="zmp-btn zmp-btn-strong" href="/portfolio/druk" target="_blank" rel="noopener noreferrer">Otwórz portfolio do PDF ↗</Link>
            <Link className="zmp-btn zmp-btn-outline" href="/kontakt">Skontaktuj się ↗</Link>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
