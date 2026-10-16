"use client";

import { useMemo, useState } from "react";
import Link from "../SafeLink";
import { blogArticles, blogCategories, categoryName } from "./blog-data";
import type { BlogCategory } from "./blog-data";

function clean(value: string) {
  return value.toLocaleLowerCase("pl-PL").replace(/ł/g, "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function matchesSearch(text: string, search: string) {
  const content = clean(text);
  const terms = clean(search).split(/[\s,.;:!?/]+/).filter(Boolean);
  // A simple suffix tolerance handles common Polish queries such as
  // "gazetka" → "gazetki" and "koszt strony" → "koszt strona".
  return terms.every((term) =>
    content.includes(term) ||
    (term.length >= 5 && /[aeiy]$/.test(term) && content.includes(term.slice(0, -1)))
  );
}

function publishedLabel(date: string) {
  return new Intl.DateTimeFormat("pl-PL", { year: "numeric", month: "long", day: "numeric", timeZone: "Europe/Warsaw" }).format(new Date(date));
}

export default function BlogExplorer() {
  const [category, setCategory] = useState<"all" | BlogCategory>("all");
  const [search, setSearch] = useState("");
  const articles = useMemo(() => {
    return blogArticles.filter((article) =>
      (category === "all" || article.category === category) &&
      matchesSearch([article.title, article.summary, categoryName(article.category)].join(" "), search)
    );
  }, [category, search]);

  return <div className="guide-library zm-blog-library">
    <div className="section-head">
      <div>
        <span className="section-no">BLOG / ARTYKUŁY I WIEDZA</span>
        <h2>Znajdź odpowiedź na pytanie, które masz dziś.</h2>
      </div>
      <p>O stronach internetowych, Google, druku i obsłudze klientów — z przykładami zamiast samych ogólników.</p>
    </div>

    <div className="zm-blog-tools">
      <div className="zm-blog-search">
        <label htmlFor="zm-blog-search">Szukaj na blogu</label>
        <input id="zm-blog-search" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Np. gazetka, koszt strony, PDF do druku…" autoComplete="off" />
      </div>
      <div className="zm-blog-filters" role="group" aria-label="Kategorie wpisów">
        {blogCategories.map((item) =>
          <button type="button" key={item.id} aria-pressed={category === item.id}
            className={category === item.id ? "selected" : ""}
            onClick={() => setCategory(item.id)}>{item.label}</button>
        )}
      </div>
      <div className="zm-blog-tools-bottom">
        <span role="status" aria-live="polite">
          {articles.length} {articles.length === 1 ? "artykuł" : articles.length >= 2 && articles.length <= 4 ? "artykuły" : "artykułów"}
        </span>
        <a href="/poradnik/rss.xml" type="application/rss+xml">Kanał RSS ↗</a>
      </div>
    </div>

    <div className="zm-blog-results">
      {articles.length ? articles.map((article, index) => <Link href={article.href} key={article.href}>
        <span>{String(index + 1).padStart(2, "0")} / {categoryName(article.category).toLocaleUpperCase("pl-PL")}</span>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <div className="guide-card-meta">
          <b>Czytaj artykuł ↗</b>
          <small><time dateTime={article.publishedAt}>{publishedLabel(article.publishedAt)}</time> · {article.minutes} min czytania</small>
        </div>
      </Link>) : <div className="zm-blog-empty" role="status">
        <h3>Nie znaleziono artykułów.</h3>
        <p>Spróbuj innego hasła lub wybierz wszystkie kategorie.</p>
        <button type="button" onClick={() => {setCategory("all");setSearch("");}}>Pokaż wszystkie artykuły ↗</button>
      </div>}
    </div>
  </div>;
}
