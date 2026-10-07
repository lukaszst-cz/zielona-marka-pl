import QualityBadge from "../QualityBadge";
import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Przykładowy raport kontroli jakości",
  description: "Przykład prostego raportu kontroli jakości (QA), który klient otrzymuje przed publikacją strony.",
  alternates: { canonical: "/raport-qa" },
  robots: { index: false, follow: true },
};

const checks = [
  ["Widok i czytelność", "telefon, tablet i komputer", "nagłówki, przyciski, obrazy oraz układ nie zasłaniają treści"],
  ["Kontakt", "telefon, e-mail, formularz i WhatsApp", "każda droga kontaktu prowadzi we właściwe miejsce"],
  ["Podstawy Google", "tytuł, opis, główny adres, mapa strony", "wyszukiwarka otrzymuje uporządkowane informacje o stronie"],
  ["Szybkość i stabilność", "obciążenie strony oraz test Lighthouse", "wynik jest omawiany jako kontrola techniczna, nie obietnica pozycji w Google"],
  ["Przed publikacją", "adres domeny, HTTPS i przekierowania", "otwierają się właściwe wersje strony, bez ostrzeżeń przeglądarki"],
];

export default function QaReportPage() {
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell qa-report-hero"><span className="eyebrow"><i />PRZYKŁADOWY RAPORT KONTROLI JAKOŚCI</span><h1>Co sprawdzam, zanim strona <em>zacznie pracować na firmę.</em></h1><p>Kontrola jakości (QA, ang. Quality Assurance) to ostatnie sprawdzenie przed publikacją. Poniżej jest przykładowa forma podsumowania bez danych klienta. W konkretnym projekcie raport odnosi się do jego strony i ustalonego zakresu.</p><div className="hero-actions"><Link className="button" href="/kontakt">Omów swój projekt <span>↗</span></Link><a className="text-link" href="#raport">Przejdź do raportu <span>↓</span></a></div></section>
    <section className="section shell qa-report" id="raport"><div className="qa-report-heading"><div><span className="section-no">KONTROLA PRZED STARTEM</span><h2>Przykład: strona firmowa</h2></div><p>Możesz zapisać tę stronę jako PDF z poziomu przeglądarki: <b>Drukuj → Zapisz jako PDF</b>.</p></div><QualityBadge /><div className="qa-report-meta"><span>PROJEKT: przykładowa strona firmowa</span><span>STATUS: gotowa do publikacji po akceptacji</span><span>DATA: uzupełniana przy odbiorze</span></div><div className="qa-checks">{checks.map(([title, scope, result], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p><b>Sprawdzony zakres:</b> {scope}</p><p><b>Wynik kontroli:</b> {result}</p></div><strong>✓</strong></article>)}</div><div className="qa-report-note"><h3>Co oznacza „gotowa do publikacji”?</h3><p>Najważniejsze elementy z uzgodnionego zakresu zostały sprawdzone. Wdrożenie pozostaje zależne od akceptacji klienta, dostępu do domeny oraz ewentualnych materiałów lub usług zewnętrznych.</p></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
