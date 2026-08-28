import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Usprawnienia firmy", description: "Proste automatyzacje, statusy zleceń, dashboardy i lekkie panele klienta dla rosnących firm." };

const situations = [
  ["Zapytania giną", "Formularz może utworzyć wpis w uporządkowanej bazie, wysłać potwierdzenie i przypomnieć o odpowiedzi."],
  ["Zespół pyta o status", "Prosty widok zlecenia pokazuje etap, termin, osobę odpowiedzialną i następny krok."],
  ["Wyniki są w kilku arkuszach", "Najważniejsze liczby mogą trafić na jeden czytelny ekran, bez ręcznego przepisywania."],
];
const tools = [
  ["Automatyzacje", "Powtarzalne czynności wykonywane przez system: powiadomienia, potwierdzenia, statusy, przypomnienia."],
  ["Baza klientów", "Kontakty, zapytania, oferta i kolejny krok w jednym miejscu zamiast w rozmowach i notatkach."],
  ["Panel klienta", "Prywatny status zlecenia, dokumenty i terminy dostępne dla klienta bez kolejnego telefonu."],
  ["Najważniejsze liczby", "Sprzedaż, terminy, zlecenia i obciążenie zespołu widoczne na jednym ekranie."],
  ["Excel i Google Sheets", "Dobry pierwszy etap, gdy firma nie potrzebuje jeszcze rozbudowanego systemu."],
  ["Łączenie narzędzi", "Strona, poczta, kalendarz i używane programy mogą przekazywać sobie informacje automatycznie."],
];

export default function ImprovementsPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell"><span className="eyebrow"><i />PROSTE PANELE I USPRAWNIENIA FIRMY</span><h1>Najpierw strona. Potem <em>mniej ręcznej pracy.</em></h1><p>Mała firma nie potrzebuje dużego systemu na zapas. Wystarczy wybrać jeden proces, który dziś zabiera czas lub powoduje błędy.</p><Link className="button" href="/kontakt">Opowiedz o procesie <span>↗</span></Link></section>
    <section className="section process-video-section" id="film"><div className="shell process-video-grid"><div><span className="section-no">ZOBACZ, JAK TO DZIAŁA</span><h2>W 20 sekund: od chaosu w wiadomościach do uporządkowanej obsługi.</h2><p>Strona może zbierać zapytania, a prosty panel pomaga pilnować wycen, etapów pracy i kontaktu z klientem. Nie zaczynamy od wielkiego programu, tylko od tego, co faktycznie ułatwi codzienną pracę.</p><Link className="text-link" href="/kontakt">Porozmawiajmy o Twoim procesie <span>↗</span></Link></div><div className="process-video-frame"><video controls preload="metadata" poster="/social-post-start-zielona-marka-v1.png" aria-label="Film: jak strona i prosty panel porządkują zapytania"><source src="/zielona-marka-jak-dziala.mp4" type="video/mp4" />Twoja przeglądarka nie obsługuje wideo.</video><small>Film 20 s · strona, panel klientów i zleceń oraz proste automatyzacje</small></div></div></section>
    <section className="section shell" id="crm"><div className="section-head"><div><span className="section-no">ZACZYNAMY OD KONKRETU</span><h2>Prosty panel zleceń zamiast chaosu w wiadomościach.</h2></div><p>To może być mały CRM, czyli prosty system dopasowany do Twojej firmy. Zamiast kupować duży program, zaczynamy od klientów, zleceń, statusów i kolejnego kroku.</p></div><div className="situation-grid">{situations.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section dark-section"><div className="shell process-strip"><span>Zapytanie</span><i>→</i><span>Wycena</span><i>→</i><span>Realizacja</span><i>→</i><span>Dokumenty</span><i>→</i><span>Wyniki</span></div></section>
    <section className="section shell" id="automatyzacje"><div className="section-head"><div><span className="section-no">AUTOMATYZACJE, PANELE I INTEGRACJE</span><h2>Dobierane wtedy, gdy są potrzebne.</h2></div><p>Możesz zacząć od jednego przepływu. Jeśli działa, spokojnie rozbudujemy go w kolejnym etapie.</p></div><div className="tool-grid">{tools.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section transport-demo"><div className="shell transport-demo-grid"><div><span className="section-no">DEMONSTRACJA TRANSPORTU</span><h2>Zobacz, jak wygląda obieg zlecenia od zapytania do faktury.</h2><p className="spaced-copy">Przykład RouteFlow pokazuje osobne widoki dla dyspozytora, kierowcy, księgowości oraz klienta.</p></div><div><Link className="button" href="/demo/transport">Uruchom demonstrację <span>↗</span></Link><a href="https://lukaszst-cz.github.io/operations-office-portfolio/transport-preview/portal/?role=manager" target="_blank" rel="noreferrer">Zobacz Control Tower ↗</a></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
