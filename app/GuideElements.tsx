import Link from "./SafeLink";

export function GuideBreadcrumbs({ current }: { current?: string }) {
  return <nav className="guide-breadcrumbs" aria-label="Ścieżka strony"><Link href="/">Strona główna</Link><span aria-hidden="true">›</span>{current ? <><Link href="/poradnik">Poradniki</Link><span aria-hidden="true">›</span><span aria-current="page">{current}</span></> : <span aria-current="page">Poradniki</span>}</nav>;
}

export function GuideAuthor({ published, updated }: { published: string; updated: string }) {
  return <aside className="guide-author" aria-label="Autor i aktualność poradnika"><img src="/lukasz-zielona-marka-jak-pracuje-20260908.webp" width="96" height="96" loading="lazy" alt="Łukasz Staniewicz, autor poradnika Zielonej Marki" /><div><span>AUTOR PORADNIKA</span><h2>Łukasz Staniewicz <i aria-hidden="true">|</i> Zielona Marka</h2><p>Tworzę strony i proste systemy dla firm usługowych. Łączę czytelną ofertę, formularze, kontrolę jakości i praktyczną obsługę zapytań.</p><small>Opublikowano: {published} · aktualizacja: {updated}</small><Link href="/jak-pracuje">Zobacz, jak pracuję ↗</Link></div></aside>;
}

export function GuideFaq({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return <section className="section guide-faq"><div className="shell"><div className="section-head"><div><span className="section-no">PYTANIA PRAKTYCZNE</span><h2>Krótko i konkretnie.</h2></div><p>Odpowiedzi dotyczą standardowego zakresu. Nietypowe integracje i dodatkowe funkcje ustalamy przed rozpoczęciem.</p></div><div>{items.map(([question, answer], index) => <details key={question}><summary><b>{String(index + 1).padStart(2, "0")}</b>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>;
}
