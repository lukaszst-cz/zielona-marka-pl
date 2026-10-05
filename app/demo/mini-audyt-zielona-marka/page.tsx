import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Przykład bezpłatnego mini audytu",
  description: "Przykładowy mini audyt strony przygotowany na podstawie zielona-marka.pl.",
  robots: { index: false, follow: false },
};

const findings = [
  {
    no: "01",
    label: "PIERWSZY EKRAN",
    title: "Pokaż konkretny punkt startu wcześniej.",
    observation: "Hasło buduje klimat i jasno mówi o stronach oraz systemach, ale cena startowa i czas realizacji pojawiają się dopiero w ofercie.",
    action: "Dodać pod opisem krótką linię: „ZM Start od 1 449 zł netto · od 72 godzin do 14 dni”.",
    effect: "Klient szybciej ocenia, czy oferta jest dla niego i chętniej przechodzi do rozmowy.",
  },
  {
    no: "02",
    label: "DROGA DO KONTAKTU",
    title: "Zebrać krótki brief wcześniej.",
    observation: "Pełny formularz jest dostępny dopiero pod koniec długiej strony. Osoba gotowa napisać wcześniej musi przejść przez wiele sekcji.",
    action: "Po sekcji „Wszystko zaczyna się łączyć” pokazać trzy pola: imię, e-mail i jedno pytanie o potrzebę.",
    effect: "Mniej kroków do wysłania wartościowego zapytania, bez odbierania stronie jej opowieści.",
  },
  {
    no: "03",
    label: "NISKI PRÓG WEJŚCIA",
    title: "Dać klientowi wartość przed rozmową.",
    observation: "Obecne CTA prowadzą do oferty lub rozmowy. Brakuje małego, bezpiecznego kroku dla osoby, która jeszcze nie wie, czego potrzebuje.",
    action: "Dodać „Bezpłatny Mini Audyt: 3 obserwacje + 1 priorytet + przykład zmiany”.",
    effect: "Klient poznaje sposób pracy Zielonej Marki, zanim zdecyduje się na wycenę.",
  },
] as const;

export default function MiniAuditExample() {
  return <main className="mini-audit-page">
    <nav className="demo-simple-nav" aria-label="Powrót do serwisu"><a href="/">← Wróć do strony głównej</a><a href="/kontakt">Porozmawiajmy ↗</a></nav>

    <section className="mini-audit-cover">
      <div className="mini-audit-shell mini-audit-cover-grid">
        <div>
          <span className="mini-audit-kicker">BEZPŁATNY MINI AUDYT · PRZYKŁAD</span>
          <h1>Dobry fundament.<br/><em>Trzy konkretne kroki dalej.</em></h1>
          <p>Przykład materiału, który potencjalny klient mógłby otrzymać po przesłaniu adresu swojej strony.</p>
          <div className="mini-audit-meta"><span>STRONA<br/><b>zielona-marka.pl</b></span><span>DATA<br/><b>28.09.2026</b></span><span>ZAKRES<br/><b>pierwszy ekran · kontakt · mobile</b></span></div>
        </div>
        <figure className="mini-audit-source"><img src="/mini-audit-zm/live-desktop.png" alt="Aktualny pierwszy ekran strony Zielona Marka"/><figcaption>Aktualny pierwszy ekran · widok komputerowy</figcaption></figure>
      </div>
    </section>

    <section className="mini-audit-summary mini-audit-shell">
      <div><span>OCENA KIERUNKU</span><strong>Dobry fundament</strong><small>Nie przebudowywać bez potrzeby. Wzmocnić konkrety i drogę do kontaktu.</small></div>
      <div className="mini-audit-score"><article><span>Oferta</span><b>8/10</b></article><article><span>Pierwszy ekran</span><b>8/10</b></article><article><span>Kontakt</span><b>6/10</b></article><article><span>Mobile</span><b>8/10</b></article></div>
    </section>

    <section className="mini-audit-findings mini-audit-shell">
      <header><span className="mini-audit-kicker">TRZY OBSERWACJE · JEDEN PRIORYTET</span><h2>Co warto zmienić najpierw.</h2><p>Każdy punkt łączy obserwację, konkretną zmianę i oczekiwany efekt. Bez technicznego żargonu.</p></header>
      <div>{findings.map((finding,index)=><article className={index===0?"priority":""} key={finding.no}><div className="mini-audit-finding-head"><b>{finding.no}</b><span>{finding.label}</span>{index===0&&<i>PRIORYTET</i>}</div><h3>{finding.title}</h3><dl><div><dt>CO WIDAĆ</dt><dd>{finding.observation}</dd></div><div><dt>CO ZROBIĆ</dt><dd>{finding.action}</dd></div><div><dt>PO CO</dt><dd>{finding.effect}</dd></div></dl></article>)}</div>
    </section>

    <section className="mini-audit-before-after">
      <div className="mini-audit-shell">
        <header><span className="mini-audit-kicker">PRZYKŁAD ZMIANY · NIE GOTOWA PUBLIKACJA</span><h2>Jedna rekomendacja pokazana od razu.</h2></header>
        <div className="mini-audit-compare">
          <article className="mini-audit-before"><span>OBECNIE</span><h3>Masz dobrą firmę.<br/><em>Pokażmy ją z dobrej strony.</em></h3><p>Projektuję strony WWW dla firm usługowych. Pomagam też uporządkować zapytania, sprzedaż i obsługę klientów.</p><div><b>Zobacz możliwości ↓</b><u>Porozmawiajmy ↗</u></div></article>
          <article className="mini-audit-after"><span>PROPONOWANY KIERUNEK</span><h3>Masz dobrą firmę.<br/><em>Pokażmy ją z dobrej strony.</em></h3><p>Strony WWW i proste systemy dla lokalnych firm usługowych. Jasny zakres, wersja mobilna i publikacja dopiero po akceptacji.</p><strong>ZM Start od 1 449 zł netto · od 72 godzin do 14 dni*</strong><div><b>Poproś o bezpłatny mini audyt →</b><u>Zobacz ofertę</u></div><small>*Po otrzymaniu materiałów i ustaleniu zakresu.</small></article>
        </div>
      </div>
    </section>

    <section className="mini-audit-delivery mini-audit-shell"><div><span className="mini-audit-kicker">CO DOSTAJE KLIENT</span><h2>Mały materiał, realna wartość.</h2></div><ol><li><b>01</b><span>3 spersonalizowane obserwacje</span></li><li><b>02</b><span>1 priorytet do wdrożenia</span></li><li><b>03</b><span>1 przykład zmiany „przed i po”</span></li><li><b>04</b><span>krótkie nagranie lub jedna strona raportu</span></li></ol></section>

    <footer className="mini-audit-footer"><div className="mini-audit-shell"><b>ZIELONA MARKA</b><span>Przykład lokalny · nic nie zostało opublikowane</span></div></footer>
  </main>;
}
