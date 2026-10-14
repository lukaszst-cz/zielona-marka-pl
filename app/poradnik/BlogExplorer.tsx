"use client";

import { useMemo, useState } from "react";
import Link from "../SafeLink";
import { blogArticles, blogCategories, categoryName } from "./blog-data";
import type { BlogCategory } from "./blog-data";

function clean(value: string) {
  return value.toLocaleLowerCase("pl-PL").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("pl-PL", { timeZone: "Europe/Warsaw", year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

export default function BlogExplorer() {
  const [category, setCategory] = useState<"all" | BlogCategory>("all");
  const [search, setSearch] = useState("");
  const filterActive = category !== "all" || Boolean(search.trim());
  const results = useMemo(() => {
    const query = clean(search);
    return blogArticles.filter((article) => {
      if (category !== "all" && article.category !== category) return false;
      return !query || clean([article.title, article.summary, categoryName(article.category)].join(" ")).includes(query);
    });
  }, [category, search]);
  const featured = blogArticles.find((article) => article.featured) ?? blogArticles[0];
  const cards = filterActive ? results : results.filter((item) => item.href !== featured.href);
  return <div className="zm-blog-explorer">
    {!filterActive && <section className="zm-blog-feature" aria-label="Artykuł wyróżniony">
      <div className="zm-blog-feature-text">
        <span className="zm-blog-kicker">WYRÓŻNIONY ARTYKUŁ · {categoryName(featured.category).toLocaleUpperCase("pl-PL")}</span>
        <h2><Link href={featured.href}>{featured.title}</Link></h2>
        <p>{featured.summary}</p>
        <div className="zm-blog-feature-foot"><span>{dateLabel(featured.publishedAt)} · {featured.minutes} min czytania</span><Link href={featured.href}>Czytaj poradnik ↗</Link></div>
      </div>
      <div className="zm-blog-feature-art" aria-hidden="true"><span>01</span><b>WIEDZA, KTÓRA PRACUJE</b><i>↗</i></div>
    </section>}
    <section className="zm-blog-library" aria-label="Lista poradników">
      <div className="zm-blog-library-top">
        <div><span className="section-no">BIBLIOTEKA WIEDZY</span><h2>Znajdź odpowiedź na konkretne pytanie.</h2></div>
        <a href="/poradnik/rss.xml" className="zm-blog-rss" type="application/rss+xml">Kanał RSS ↗</a>
      </div>
      <div className="zm-blog-search-row">
        <div className="zm-blog-search">
          <label htmlFor="zm-blog-search">Szukaj w poradnikach</label>
          <input id="zm-blog-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Np. gazetka, koszt strony, Google…" autoComplete="off" />
        </div>
        <div className="zm-blog-result-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? "artykuł" : results.length >= 2 && results.length <= 4 ? "artykuły" : "artykułów"}</div>
      </div>
      <div className="zm-blog-categories" aria-label="Filtr kategorii">
        {blogCategories.map((item) => <button type="button" key={item.id} className={category === item.id ? "active" : ""}
          aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
      </div>
      {cards.length ? <div className="zm-blog-grid">{cards.map((item) => <article className="zm-blog-card" key={item.href}>
        <span className="zm-blog-card-category">{categoryName(item.category)}</span>
        <h3><Link href={item.href}>{item.title}</Link></h3>
        <p>{item.summary}</p>
        <div className="zm-blog-card-foot"><time dateTime={item.publishedAt}>{dateLabel(item.publishedAt)}</time><span>{item.minutes} min</span></div>
        <Link className="zm-blog-card-link" href={item.href}>Przeczytaj artykuł <span aria-hidden="true">↗</span></Link>
      </article>)}</div> : <div className="zm-blog-empty" role="status">
        <h3>Nie znaleziono poradników.</h3>
        <p>Zmień słowo lub kategorię, aby zobaczyć inne tematy.</p>
        <button type="button" onClick={() => { setCategory("all"); setSearch(""); }}>Pokaż wszystkie artykuły ↗</button>
      </div>}
    </section>
  </div>;
}
