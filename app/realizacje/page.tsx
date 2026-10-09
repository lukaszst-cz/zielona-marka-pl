import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { projects } from "../site-data";

export const metadata: Metadata = { title: "Realizacje demonstracyjne", description: "Różne układy dla różnych branż: strony, formularze, sprzedaż online i systemy dla firm.", alternates: { canonical: "/realizacje" } };

const conceptPageByName: Record<string, string> = {
  "Natura Studio": "/realizacje/natura-studio",
  "Bistro Forma": "/realizacje/bistro-forma",
  "Dom Dobry": "/realizacje/dom-dobry",
};

export default function RealizationsPage() {
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />REALIZACJE I DEMONSTRACJE</span><h1>Nie jeden szablon dla wszystkich. <em>Różne cele, różne układy.</em></h1><p>Każda demonstracja ma własny rytm: dom i usługi prowadzą do wyceny, beauty do wizyty lub sprzedaży, a transport i CRM do decyzji operacyjnej. Są to projekty koncepcyjne, nie realizacje klientów.</p><a className="button" href="#projekty">Zobacz projekty <span>↓</span></a></section>
    <section id="projekty" className="section shell"><div className="project-list">{projects.map((project) => <article className="project-case" key={project.name}><div className="project-case-image" style={{ backgroundImage: `linear-gradient(115deg,rgba(10,31,22,.84),rgba(10,31,22,.12)),url(${project.imageUrl})` }}><span>{project.note}</span><b>{project.n}</b></div><div><small>{project.type}</small><h2>{project.name}</h2><p>{project.description}</p><div className="project-case-links"><a className="button" href={project.websiteUrl} target={project.websiteUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.primaryLabel} <span>↗</span></a>{project.backendUrl && <a className="text-link" href={project.backendUrl} target={project.backendUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.secondaryLabel} <span>↗</span></a>}{conceptPageByName[project.name] && <Link className="text-link" href={conceptPageByName[project.name]}>Zobacz opis koncepcji <span>↗</span></Link>}</div></div></article>)}</div></section>
    <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">PRZYKŁADY ZAPLECZA FIRMY</span><h2>Strona może być początkiem lepiej uporządkowanej pracy.</h2><p>Te przykłady pokazują obsługę zleceń, role, dokumenty, najważniejsze liczby firmy oraz kontrolę jakości w&nbsp;różnych sytuacjach biznesowych.</p></div><div><Link className="button" href="/praktyczne-narzedzia">Praktyczne narzędzia i aplikacje <span>↗</span></Link><a href="/przyklady-zaplecza">Zobacz przykłady zaplecza ↗</a><a href="https://github.com/lukaszst-cz/operations-office-portfolio" target="_blank" rel="noreferrer">Kod i dokumentacja na GitHubie ↗</a></div></div></section>
    <section className="section shell case-study-template"><div className="section-head"><div><span className="section-no">PIERWSZA PRAWDZIWA REALIZACJA</span><h2>Tak pokażemy efekt, gdy klient wyrazi zgodę.</h2></div><p>Nie przypisuję demonstracji do istniejących firm. Po zakończeniu pierwszego wdrożenia ten układ uzupełnimy wyłącznie prawdziwymi, zaakceptowanymi danymi.</p></div><div><article><b>01</b><h3>Punkt wyjścia</h3><p>Problem klienta i stan przed wdrożeniem.</p></article><article><b>02</b><h3>Decyzja</h3><p>Dlaczego wybraliśmy taki zakres i kolejność.</p></article><article><b>03</b><h3>Rozwiązanie</h3><p>Strona, formularz, proces lub automatyzacja.</p></article><article><b>04</b><h3>Wynik</h3><p>Mierzalna zmiana po ustalonym okresie.</p></article><article><b>05</b><h3>Głos klienta</h3><p>Autoryzowana opinia i zakres współpracy.</p></article></div><small>Szablon do uzupełnienia po pierwszej realizacji. Obecnie nie przedstawia wyników żadnego klienta.</small></section>
    <section className="section shell next-project"><span className="section-no">TWOJA FIRMA</span><h2>Masz branżę, której jeszcze nie ma w&nbsp;portfolio?</h2><p>Nie kopiuję układu z&nbsp;innego projektu. Zaczynamy od tego, co klient Twojej firmy musi znaleźć i&nbsp;zrobić.</p><Link className="button" href="tel:+48450458466">Porozmawiajmy o projekcie <span>↗</span></Link></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
