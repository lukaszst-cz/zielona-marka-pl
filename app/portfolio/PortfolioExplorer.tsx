/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- Scena karuzeli jest celowo sterowana klawiszami i wskaźnikiem, obok zwykłych przycisków nawigacji. */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "../SafeLink";
import ProjectCover from "./ProjectCover";
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

/* Czternaście prac na scenie: przekrój przez wszystkie formaty, bez tłoku na jednym ekranie. */
const featuredOrder = [
  "materivo", "aktywnik-plus", "navoro-hurt", "szlak", "nexio-elektro", "transportflow", "okruch",
  "budrivo", "gazetka-nexio", "black-harbor", "auto-naprawa", "peleton", "eltravia", "excel-dashboard",
];

const AUTOPLAY_MS = 6500;
function mediaPresentation(item: PortfolioItem): "screen" | "art" | "photo" {
  const src = item.image || "";
  if (src.includes("-autentyczny-podglad.png") || src.includes("aktywnik-plus-aktualny-ekran.png")) return "screen";
  if (["gazetki", "logo", "przed-po", "excel"].includes(item.category) || src.includes("/concept-samples-v2/")) return "art";
  return "photo";
}

function cardKicker(item: PortfolioItem) {
  if (item.category === "www") return "KONCEPCJA WWW";
  if (item.category === "aplikacje") return "APLIKACJA";
  if (item.category === "gazetki") return "GAZETKA";
  if (item.category === "logo") return "IDENTYFIKACJA";
  if (item.category === "excel") return "ARKUSZ";
  return "PROJEKT";
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function PortfolioExplorer({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState(0);
  const [industry, setIndustry] = useState("all");
  const [format, setFormat] = useState<PortfolioCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef<number | null>(null);

  const featured = useMemo(() => featuredOrder.map(slug => items.find(item => item.slug === slug))
    .filter((item): item is PortfolioItem => Boolean(item && item.image)), [items]);

  const current = featured[active] || featured[0];
  const step = useCallback((direction: number) => {
    setActive(index => (index + direction + featured.length) % featured.length);
  }, [featured.length]);

  /* Scena krąży sama, zatrzymuje się pod kursorem, przy przeciąganiu i na nieaktywnej karcie przeglądarki. */
  useEffect(() => {
    if (reducedMotion || paused || featured.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, featured.length, step]);

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

  const filterKey = `${industry}|${format}|${search.trim().toLocaleLowerCase("pl-PL")}`;

  /* Karty katalogu wchodzą kolejno, gdy wjeżdżają w pole widzenia. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".zmp-project-card"));
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      cards.forEach(card => card.classList.add("is-revealed"));
      return;
    }
    cards.forEach(card => card.classList.remove("is-revealed"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: .12 });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [filterKey, filtered.length, reducedMotion]);

  function chooseIndustry(id: string) {
    setIndustry(id);
    setFormat("all");
  }

  function onStageKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragOrigin.current = event.clientX;
    setPaused(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (dragOrigin.current !== null) {
      setDrag(event.clientX - dragOrigin.current);
      return;
    }
    if (!stage || reducedMotion || event.pointerType !== "mouse") return;
    const box = stage.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - box.left) / box.width - .5) * 2,
      y: ((event.clientY - box.top) / box.height - .5) * 2,
    });
  }

  function endDrag() {
    if (dragOrigin.current === null) return;
    const distance = drag;
    dragOrigin.current = null;
    setDrag(0);
    setPaused(false);
    if (Math.abs(distance) > 55) step(distance < 0 ? 1 : -1);
  }

  return <div className="zmp-explorer zmx-explorer">
    <div className="zmp-cinematic">
      <section className="zmp-hero shell" aria-labelledby="zmp-title">
        <div className="zmp-hero-text">
          <span className="zmp-overline">PORTFOLIO ZIELONA MARKA</span>
          <h1 id="zmp-title">Zobacz, co <em>tworzymy.</em></h1>
          <p>Strony, sklepy, gazetki i małe systemy dla firm. Kliknij w kartę i zobacz, jak to działa w środku, bez umawiania się na prezentację.</p>
        </div>

        <div ref={stageRef}
          className={`zmp-visual-stage zmx-stage${drag ? " is-dragging" : ""}`}
          role="region"
          aria-roledescription="karuzela"
          aria-label="Przegląd wyróżnionych projektów"
          tabIndex={0}
          onKeyDown={onStageKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setTilt({ x: 0, y: 0 }); }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ ["--zmx-drag" as string]: `${drag * .35}px` }}>
          <span className="zmp-stage-glow" aria-hidden="true" />
          {featured.map((item, index) => {
            let offset = index - active;
            if (offset > featured.length / 2) offset -= featured.length;
            if (offset < -featured.length / 2) offset += featured.length;
            const distance = Math.abs(offset);
            const hidden = distance > 3;
            const isCurrent = distance === 0;
            const scale = isCurrent ? 1 : distance === 1 ? .87 : distance === 2 ? .76 : .68;
            const lift = isCurrent ? 0 : distance * 10;
            const tiltY = isCurrent ? tilt.x * 5 : 0;
            const tiltX = isCurrent ? tilt.y * -4 : 0;
            return <Link key={item.slug} href={`/portfolio/${item.slug}`}
              aria-label={`Zobacz projekt ${item.title}`}
              aria-hidden={hidden ? true : undefined}
              tabIndex={hidden ? -1 : 0}
              draggable={false}
              onClick={event => { if (Math.abs(drag) > 8) event.preventDefault(); }}
              className={`zmp-floating-card zmx-card${isCurrent ? " is-current" : ""}${hidden ? " is-outside" : ""}`}
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${offset * 64}% + ${isCurrent ? "var(--zmx-drag, 0px)" : "0px"})) translateY(${lift}px) rotateY(${offset * -17 + tiltY}deg) rotateX(${tiltX}deg) scale(${scale})`,
                opacity: hidden ? 0 : distance === 3 ? .45 : 1,
                filter: distance >= 2 ? `blur(${distance === 3 ? 4 : 1.6}px) saturate(.8)` : undefined,
                zIndex: featured.length - distance,
              }}>
              <span className="zmp-floating-topline">
                <span className="zmp-floating-dot" /> {cardKicker(item)}
                <span>↗</span>
              </span>
              <span className="zmp-floating-visual" data-media={mediaPresentation(item)}>
                <ProjectCover slug={item.slug} title={item.title} image={item.image} alt={item.alt}
                  priority={distance <= 1} />
                <span className="zmx-card-sheen" aria-hidden="true" />
              </span>
              <span className="zmp-floating-copy"><strong>{item.title}</strong><small>{item.industry}</small></span>
            </Link>;
          })}
          {featured.length > 1 && <>
            <button className="zmp-nav-arrow zmp-nav-prev" type="button" aria-label="Poprzedni projekt" onClick={() => step(-1)}>‹</button>
            <button className="zmp-nav-arrow zmp-nav-next" type="button" aria-label="Następny projekt" onClick={() => step(1)}>›</button>
          </>}
        </div>

        {current && <div className="zmp-feature-legend zmx-legend" aria-live="polite">
          <span className="zmx-counter">
            <b>{String(active + 1).padStart(2, "0")}</b>
            <i aria-hidden="true" />
            {String(featured.length).padStart(2, "0")}
          </span>
          <strong>{current.title}</strong>
          <p>{current.summary}</p>
          <div className="zmp-feature-buttons">
            {current.demoUrl && <a className="zmp-btn zmp-btn-strong" href={current.demoUrl}
              target={current.demoUrl.startsWith("http") ? "_blank" : undefined}
              rel={current.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>Otwórz demonstrację ↗</a>}
            <Link className="zmp-btn zmp-btn-outline" href={`/portfolio/${current.slug}`}>Szczegóły projektu ↗</Link>
          </div>
        </div>}

        <div className="zmx-track" aria-hidden="true">
          <span key={`${active}-${paused}`} className={`zmx-track-run${paused || reducedMotion ? " is-paused" : ""}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
        </div>

        <div className="zmp-stage-dots zmx-dots" aria-label="Wybór wyróżnionego projektu">
          {featured.map((item, index) => <button key={item.slug} type="button"
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
          <h2>Wszystko, co mamy <em>na podorędziu.</em></h2>
          <p>Każda praca ma działające demo albo plik do obejrzenia i krótki opis, do czego służy. Filtruj po branży albo wpisz, czego szukasz.</p>
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
        <div className="zmp-grid zmx-grid" ref={gridRef}>
          {filtered.map((item, index) => <article className="zmp-project-card zmx-project-card" key={`${filterKey}|${item.slug}`}
            style={{ ["--zmx-i" as string]: String(Math.min(index, 11)) }}
            onMouseMove={event => {
              if (reducedMotion) return;
              const card = event.currentTarget;
              const box = card.getBoundingClientRect();
              card.style.setProperty("--zmx-mx", `${event.clientX - box.left}px`);
              card.style.setProperty("--zmx-my", `${event.clientY - box.top}px`);
            }}>
            <Link href={`/portfolio/${item.slug}`} className="zmp-project-photo" data-media={mediaPresentation(item)} data-project={item.slug} aria-label={`Poznaj projekt ${item.title}`}>
              <ProjectCover slug={item.slug} title={item.title} image={item.image} alt={item.alt} />
              <span className="zmp-project-category">{portfolioCategories.find(x=>x.id===item.category)?.label}</span>
              <span className="zmp-project-expand" aria-hidden="true">↗</span>
            </Link>
            <div className="zmp-project-info">
              <div className="zmp-project-meta"><span>{item.industry}</span>{item.status.includes("beta") ? <span>W budowie</span> : item.category === "przed-po" ? <span>Projekt demonstracyjny</span> : null}</div>
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
