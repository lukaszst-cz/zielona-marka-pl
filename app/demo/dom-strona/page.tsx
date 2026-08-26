import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dom Dobry | demonstracyjny serwis nieruchomości",
  description: "Architektoniczna strona inwestycji z ofertą lokali, dostępnością i kontaktem ze sprzedażą.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

const homes = [
  ["A.01", "3 pokoje", "61,8 m²", "ogród 84 m²", "Dostępny"],
  ["A.04", "4 pokoje", "78,2 m²", "taras 18 m²", "Rezerwacja"],
  ["B.02", "3 pokoje", "66,4 m²", "ogród 56 m²", "Dostępny"],
];

export default function DomSite() {
  return (
    <main className="dom-site">
      <nav className="dom-nav"><a className="dom-brand" href="/"><i>DD</i><span>DOM<br/><b>DOBRY</b></span></a><div><a href="#inwestycja">Inwestycja</a><a href="#lokale">Lokale</a><a href="#standard">Standard</a><a href="/#realizacje">Portfolio</a></div><a href="#kontakt">Zapytaj o lokal ↗</a></nav>
      <header className="dom-hero">
        <div className="dom-hero-copy"><span>NOWA INWESTYCJA / ZIELONE PRZEDMIEŚCIA</span><h1>Przestrzeń,<br/>do której <em>wracasz.</em></h1><p>12 kameralnych domów. Funkcjonalne układy, prywatne ogrody i szybki dojazd do miasta.</p><div><a href="#lokale">Sprawdź dostępność</a><a href="#inwestycja">Poznaj inwestycję ↓</a></div></div>
        <figure><img src="/concept-dom.jpg" alt="Nowoczesny dom w zielonym otoczeniu"/><figcaption><b>ETAP I</b><span>ODBIÓR / IV KW. 2027</span></figcaption></figure>
        <aside><small>POWIERZCHNIA</small><b>61–92 m²</b><small>CENY</small><b>od 689 tys. zł</b><small>DOSTĘPNE</small><b>7 z 12</b></aside>
      </header>
      <section className="dom-story" id="inwestycja"><div><span>01 / INWESTYCJA</span><h2>Dobry układ. Dobra decyzja.</h2></div><div><p>Najważniejsze informacje są widoczne od razu: metraż, termin, standard oraz status lokalu.</p><p>Klient nie musi przeszukiwać plików PDF. Porównuje ofertę i przechodzi prosto do rozmowy z doradcą.</p></div></section>
      <section className="dom-list" id="lokale"><header><div><span>02 / DOSTĘPNE LOKALE</span><h2>Wybierz swój dom.</h2></div><div className="dom-filters"><button>Wszystkie</button><button>3 pokoje</button><button>4 pokoje</button></div></header><div className="dom-table"><div className="dom-table-head"><span>LOKAL</span><span>UKŁAD</span><span>METRAŻ</span><span>DODATKOWO</span><span>STATUS</span><span/></div>{homes.map(row=><article key={row[0]}>{row.map((cell,index)=><span key={cell} className={index===4?"status":""}>{cell}</span>)}<a href="#kontakt">Karta lokalu ↗</a></article>)}</div></section>
      <section className="dom-standard" id="standard"><div className="dom-blueprint" aria-hidden="true"><i/><i/><i/><b>A.01</b><span>61,8 M²</span></div><div><span>03 / STANDARD</span><h2>Konkrety, które budują zaufanie.</h2><ul><li>pompa ciepła i ogrzewanie podłogowe</li><li>duże przeszklenia i prywatny ogród</li><li>dwa miejsca postojowe</li><li>przygotowanie pod fotowoltaikę</li></ul></div></section>
      <section className="dom-contact" id="kontakt"><span>POROZMAWIAJMY O TWOIM DOMU</span><h2>Zapytaj o dostępność, cenę i harmonogram.</h2><div><a href="tel:+48450458466">+48 450 458 466 ↗</a><a href="/#kontakt">Wyślij zapytanie ↗</a></div><small>Projekt demonstracyjny. Lokale i ceny są przykładowe.</small></section>
      <footer className="dom-footer"><a className="dom-brand" href="/"><i>DD</i><span>DOM <b>DOBRY</b></span></a><p>Projekt koncepcyjny Zielonej Marki.</p><a href="/demo/dom">Zobacz panel sprzedaży ↗</a></footer>
    </main>
  );
}
