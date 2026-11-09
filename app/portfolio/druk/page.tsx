import type { Metadata } from "next";
import PrintControls from "../PrintControls";
import { portfolioItems, portfolioCategories } from "../catalog";
import "../portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio do PDF",
  robots: { index: false, follow: false },
};

export default async function PortfolioPrintPage({ searchParams }: { searchParams: Promise<{ projekty?: string | string[] }> }) {
  const query = await searchParams;
  const raw = Array.isArray(query.projekty) ? query.projekty[0] : query.projekty;
  const requested = raw?.split(",").map(part => part.trim()).filter(Boolean) || [];
  const limit = new Set(requested);
  const items = requested.length ? requested.map(slug => portfolioItems.find(item => item.slug === slug)).filter((item): item is (typeof portfolioItems)[number] => Boolean(item)) : portfolioItems;
  const selected = items.length ? items : portfolioItems;
  const date = new Intl.DateTimeFormat("pl-PL", { day:"numeric", month:"long", year:"numeric", timeZone:"Europe/Warsaw" }).format(new Date());

  return <main className="zmp-print-layout">
    <PrintControls />
    <div className="zmp-print-document">
      <section className="zmp-print-cover">
        <div className="zmp-print-brand">
          <img src="/portfolio/logo-oryginal-biale.svg" width="96" height="96" alt="" />
          <strong>ZIELONA<br/>MARKA</strong>
        </div>
        <p>PORTFOLIO PROJEKTOWE / {date}</p>
        <h1>Przykłady prac<br/><em>Zielonej Marki.</em></h1>
        <p className="zmp-print-cover-description">Strony internetowe, grafika i DTP, gazetki produktowe, aplikacje oraz modele Excel. Wybór prac demonstracyjnych i koncepcyjnych.</p>
        <div className="zmp-print-cover-footer"><span>{selected.length} projektów</span><span>zielona-marka.pl/portfolio</span></div>
      </section>
      <section className="zmp-print-intro">
        <h2>Przegląd wybranych prac</h2>
        <p>Każdy projekt jest opisany pod kątem zastosowania, zakresu i dostępnych funkcji. Oznaczenie „koncepcja” lub „demonstracja” oznacza projekt pokazowy, a nie realizację zamówioną przez klienta. Ceny i dane na przykładach mogą być fikcyjne.</p>
        <ol>{selected.map((item,index)=><li key={item.slug}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><small>{portfolioCategories.find(category=>category.id===item.category)?.label}</small></li>)}</ol>
      </section>
      {selected.map((item,index)=><article key={item.slug} className="zmp-print-case">
        <header><span>PROJEKT {String(index+1).padStart(2,"0")} / {String(selected.length).padStart(2,"0")}</span><span>{portfolioCategories.find(group=>group.id===item.category)?.label}</span></header>
        <div className="zmp-print-case-body">
          <div className="zmp-print-case-image">{item.image ? <img src={item.image} alt={item.alt || `Prezentacja projektu ${item.title}`} /> : <div className="zmp-print-case-placeholder"><strong>{item.title}</strong><small>{item.industry}</small></div>}</div>
          <div className="zmp-print-case-copy">
            <p className="zmp-print-industry">{item.industry} / {item.status}</p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <p>{item.explanation}</p>
            <h3>W projekcie</h3>
            <ul>{item.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
            <p className="zmp-print-case-link"><strong>Karta projektu:</strong> <a href={`https://zielona-marka.pl/portfolio/${item.slug}`}>{`zielona-marka.pl/portfolio/${item.slug}`}</a></p>
            {item.demoUrl && <p className="zmp-print-case-link"><strong>Demonstracja:</strong> <a href={item.demoUrl.startsWith("http")?item.demoUrl:`https://zielona-marka.pl${item.demoUrl}`}>{item.demoUrl.startsWith("http")?item.demoUrl:`zielona-marka.pl${item.demoUrl}`}</a></p>}
          </div>
        </div>
        <footer><span>Zielona Marka / portfolio</span><span>Materiał koncepcyjny lub demonstracyjny</span></footer>
      </article>)}
      <section className="zmp-print-end">
        <div className="zmp-print-brand"><img src="/portfolio/logo-oryginal-biale.svg" alt="" width="85" height="85" /><strong>ZIELONA<br/>MARKA</strong></div>
        <h2>Masz podobny projekt?</h2>
        <p>Opisz swoją firmę, a przygotujemy propozycję dopasowaną do zakresu i celu.</p>
        <a href="https://zielona-marka.pl/kontakt">zielona-marka.pl/kontakt</a>
        <a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a>
        <p className="zmp-print-end-note">Materiały w dokumencie pokazują własne demonstracje i koncepcje. Nie są potwierdzeniem współpracy z firmami ani osiągniętych wyników sprzedaży.</p>
      </section>
    </div>
  </main>;
}
