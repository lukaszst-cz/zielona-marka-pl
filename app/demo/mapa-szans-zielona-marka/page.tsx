import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Przykład bezpłatnej Mapy Szans",
  description: "Alternatywny materiał pierwszego kontaktu przygotowany dla Zielonej Marki.",
  robots: { index: false, follow: false },
};

const path = [
  ["01", "WEJŚCIE", "Klient od razu rozumie, dla kogo jest oferta."],
  ["02", "KONKRET", "Poznaje zakres, cenę startową i realny termin."],
  ["03", "DOWÓD", "Ogląda przykład strony oraz jej zaplecza."],
  ["04", "KRÓTKI BRIEF", "Odpowiada na trzy pytania bez długiego formularza."],
  ["05", "DOBRY LEAD", "Zapytanie trafia do uporządkowanego procesu obsługi."],
] as const;

const plan = [
  ["DZIŚ", "Ustalić jeden główny cel strony", "Więcej wartościowych zapytań od lokalnych firm usługowych."],
  ["DNI 1–3", "Doprecyzować pierwszy ekran", "Dla kogo, jaki efekt, od jakiej ceny i jaki następny krok."],
  ["DNI 4–7", "Pokazać pełny przykład", "Połączyć widok strony, formularz i techniczne zaplecze w jedną historię."],
  ["DNI 8–14", "Uruchomić krótki brief", "Mierzyć rozpoczęcia, wysłania i jakość otrzymanych zapytań."],
] as const;

export default function OpportunityMapExample() {
  return <main className="opportunity-page">
    <nav className="demo-simple-nav" aria-label="Powrót do serwisu"><a href="/">← Wróć do strony głównej</a><a href="/demo/mini-audyt-zielona-marka">Porównaj z mini audytem ↗</a></nav>

    <section className="opportunity-hero">
      <div className="opportunity-shell opportunity-hero-grid">
        <div>
          <span className="opportunity-kicker">ALTERNATYWA PIERWSZEGO KONTAKTU · BEZPŁATNA MAPA SZANS</span>
          <h1>Nie tylko co poprawić.<br/><em>Dokąd warto pójść.</em></h1>
          <p>Jednostronicowy plan pokazujący potencjalnemu klientowi, jak jego strona może prowadzić od pierwszego wejścia do wartościowego zapytania.</p>
          <div className="opportunity-chips"><span>1 proponowana ścieżka</span><span>3 największe szanse</span><span>plan na 14 dni</span></div>
        </div>
        <figure className="opportunity-browser">
          <div><i></i><i></i><i></i><span>zielona-marka.pl</span></div>
          <img src="/mini-audit-zm/live-desktop.png" alt="Aktualny pierwszy ekran Zielonej Marki"/>
          <figcaption><b>PUNKT WYJŚCIA</b><span>Silna marka i dobre portfolio. Szansa: szybciej przeprowadzić klienta od zainteresowania do konkretnego zapytania.</span></figcaption>
        </figure>
      </div>
    </section>

    <section className="opportunity-context opportunity-shell">
      <div><span className="opportunity-kicker">CEL DLA ZIELONEJ MARKI</span><h2>Więcej dobrych rozmów, nie więcej przypadkowych kliknięć.</h2></div>
      <blockquote>„Klient ma w ciągu kilkudziesięciu sekund zrozumieć, czy Zielona Marka pasuje do jego firmy, zobaczyć dowód i wykonać prosty następny krok.”</blockquote>
    </section>

    <section className="opportunity-route">
      <div className="opportunity-shell">
        <header><span className="opportunity-kicker">PROPONOWANA DROGA KLIENTA</span><h2>Od wejścia do dobrego zapytania.</h2><p>To nie jest ocena punktowa. Klient dostaje gotowy kierunek, który może od razu zrozumieć i omówić.</p></header>
        <ol>{path.map(([number,label,copy])=><li key={number}><b>{number}</b><div><span>{label}</span><p>{copy}</p></div></li>)}</ol>
        <div className="opportunity-result"><span>WYNIK</span><strong>Strona wyjaśnia, pokazuje i kwalifikuje.</strong><small>Zamiast zostawiać cały ciężar pierwszej rozmowie.</small></div>
      </div>
    </section>

    <section className="opportunity-wins opportunity-shell">
      <header><span className="opportunity-kicker">TRZY NAJWIĘKSZE SZANSE</span><h2>Co może dać największy efekt.</h2></header>
      <div>
        <article><b>01</b><span>JASNOŚĆ</span><h3>Konkrety wcześniej</h3><p>Na pierwszym ekranie połączyć charakter marki z informacją: dla kogo, co powstaje, od jakiej ceny i w jakim czasie.</p><strong>EFEKT · mniej pytań podstawowych</strong></article>
        <article><b>02</b><span>DOWÓD</span><h3>Strona razem z zapleczem</h3><p>Pokazać nie tylko estetyczny projekt, ale też kalendarz, statusy, formularze i uporządkowaną obsługę klienta.</p><strong>EFEKT · większa wartość oferty</strong></article>
        <article><b>03</b><span>KONWERSJA</span><h3>Trzy pytania zamiast prośby o telefon</h3><p>Krótki brief: rodzaj firmy, obecna sytuacja i najważniejszy cel. Dopiero potem rozmowa dopasowana do odpowiedzi.</p><strong>EFEKT · lepiej przygotowane zapytania</strong></article>
      </div>
    </section>

    <section className="opportunity-plan">
      <div className="opportunity-shell opportunity-plan-grid">
        <div><span className="opportunity-kicker">PLAN STARTOWY</span><h2>Pierwsze 14 dni.</h2><p>Klient nie dostaje ogólnej porady. Otrzymuje krótką kolejność działań z celem każdego kroku.</p></div>
        <ol>{plan.map(([time,title,copy],index)=><li key={time}><b>{String(index+1).padStart(2,"0")}</b><div><span>{time}</span><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </div>
    </section>

    <section className="opportunity-choice opportunity-shell">
      <header><span className="opportunity-kicker">DWA RÓŻNE NARZĘDZIA</span><h2>Kiedy proponować którą opcję.</h2></header>
      <div>
        <article><span>OPCJA A</span><h3>Mini Audyt</h3><p>Dla firmy, która ma stronę i chce wiedzieć, co konkretnie poprawić.</p><a href="/demo/mini-audyt-zielona-marka">Zobacz przykład →</a></article>
        <article className="recommended"><span>OPCJA B · ALTERNATYWA</span><h3>Mapa Szans</h3><p>Dla firmy, która nie ma jasnego kierunku albo chce połączyć stronę z obsługą zapytań.</p><b>Większy efekt „wow”, lepiej pokazuje pełne możliwości Zielonej Marki.</b></article>
      </div>
    </section>

    <footer className="opportunity-footer"><div className="opportunity-shell"><b>ZIELONA MARKA</b><span>Przykład lokalny · nic nie zostało opublikowane</span></div></footer>
  </main>;
}
