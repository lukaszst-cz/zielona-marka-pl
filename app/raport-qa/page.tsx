import QualityBadge from "../QualityBadge";
import ProcessStandard from "../ProcessStandard";
import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Przykładowy raport kontroli jakości",
  description: "Zobacz przykład raportu sprawdzania jakości strony przed publikacją: funkcje, formularze, wyświetlanie i wyniki testów.",
  alternates: { canonical: "/raport-qa" },
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
    <section className="page-hero shell qa-report-hero"><span className="eyebrow"><i />PRZYKŁADOWY RAPORT KONTROLI JAKOŚCI</span><h1>Co sprawdzam, zanim strona <em>zacznie pracować na firmę.</em></h1><p>QA (ang. Quality Assurance) oznacza zapewnianie jakości. To sposób pracy, w którym ustalamy, co trzeba sprawdzić, testujemy stronę, poprawiamy błędy i zapisujemy wynik. Poniżej pokazujemy przykład takiego podsumowania — nie jest to raport z testów konkretnego klienta.</p><div className="hero-actions"><Link className="button" href="/kontakt">Omów swój projekt <span>↗</span></Link><a className="text-link" href="#raport">Przejdź do raportu <span>↓</span></a></div></section>
    <ProcessStandard variant="qa" />
    <section className="section shell" aria-label="Poznaj szczegółowe standardy sprawdzania jakości"><div className="section-head"><div><span className="section-no">ZASADY PRACY</span><h2>Każdy projekt ma własny zakres testów.</h2></div><div><p>Pełne standardy pokazują, jakie obszary mogą podlegać kontroli. Ten przykładowy raport nie jest rzeczywistym wynikiem testu strony klienta.</p><Link className="text-link" href="/standard-jakosci">Standard jakości ↗</Link> <Link className="text-link" href="/standard-dtp">Kontrola plików przed drukiem ↗</Link></div></div></section>
    <section className="section shell qa-report" id="raport"><div className="qa-report-heading"><div><span className="section-no">KONTROLA PRZED STARTEM</span><h2>Przykład: strona firmowa</h2></div><p>Możesz zapisać tę stronę jako PDF z poziomu przeglądarki: <b>Drukuj → Zapisz jako PDF</b>.</p></div><QualityBadge /><div className="qa-report-meta"><span>PROJEKT: przykładowa strona firmowa</span><span>STATUS: gotowa do publikacji po akceptacji</span><span>DATA: uzupełniana przy odbiorze</span></div><div className="qa-checks">{checks.map(([title, scope, result], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p><b>Sprawdzony zakres:</b> {scope}</p><p><b>Wynik kontroli:</b> {result}</p></div><strong>✓</strong></article>)}</div><div className="qa-report-note"><h3>Co oznacza „gotowa do publikacji”?</h3><p>Najważniejsze elementy z uzgodnionego zakresu zostały sprawdzone. Wdrożenie pozostaje zależne od akceptacji klienta, dostępu do domeny oraz ewentualnych materiałów lub usług zewnętrznych.</p></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
