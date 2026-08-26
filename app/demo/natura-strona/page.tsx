import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Natura Studio | demonstracyjna strona wellness",
  description: "Spokojna, editorialowa strona studia wellness z usługami, cennikiem i prostą rezerwacją.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

const treatments = [
  ["01", "Rytuał twarzy", "75 min", "od 240 zł"],
  ["02", "Masaż kojący", "60 min", "od 190 zł"],
  ["03", "Pielęgnacja ciała", "90 min", "od 290 zł"],
];

export default function NaturaSite() {
  return (
    <main className="natura-site">
      <nav className="natura-nav">
        <Link className="natura-brand" href="/"><i />NATURA <b>STUDIO</b></Link>
        <div><a href="#zabiegi">Zabiegi</a><a href="#filozofia">Filozofia</a><a href="#rezerwacja">Kontakt</a><a href="/#realizacje">Portfolio</a><a href="/">Zielona Marka</a></div>
        <a className="natura-book" href="#rezerwacja">Zarezerwuj termin</a>
      </nav>
      <header className="natura-hero">
        <div className="natura-hero-copy">
          <span>STUDIO PIELĘGNACJI / WARSZAWA</span>
          <h1>Ciszej.<br/><em>Bliżej siebie.</em></h1>
          <p>Indywidualne rytuały pielęgnacyjne, spokojna atmosfera i rezerwacja bez zbędnych kroków.</p>
          <a href="#zabiegi">Poznaj zabiegi <b>↓</b></a>
        </div>
        <figure><img src="/concept-natura.jpg" alt="Spokojne, naturalne wnętrze studia wellness"/><figcaption><small>OTWARTE DZISIAJ</small><b>10:00–20:00</b></figcaption></figure>
        <div className="natura-seal">NATURALNIE<br/>DLA CIEBIE<br/>01</div>
      </header>
      <section className="natura-intro" id="filozofia">
        <span>NASZA FILOZOFIA</span>
        <h2>Mniej pośpiechu.<br/>Więcej uważności.</h2>
        <div><p>Najpierw słuchamy, potem dobieramy zabieg. Każda wizyta ma jasny przebieg, czas i cenę.</p><p>Strona prowadzi do decyzji delikatnie, ale konkretnie: usługa, termin, kontakt.</p></div>
      </section>
      <section className="natura-treatments" id="zabiegi">
        <header><span>WYBRANE RYTUAŁY</span><h2>Znajdź chwilę dla siebie.</h2></header>
        <div>{treatments.map(([no,name,time,price])=><article key={no}><b>{no}</b><h3>{name}</h3><p>Spokojny rytuał dobierany do aktualnych potrzeb skóry i samopoczucia.</p><footer><span>{time}</span><strong>{price}</strong><a href="#rezerwacja">Wybierz ↗</a></footer></article>)}</div>
      </section>
      <section className="natura-moment"><div><span>TWÓJ MOMENT</span><h2>Oddech, dotyk i regeneracja.</h2></div><div className="natura-rings" aria-hidden="true"><i/><i/><i/></div></section>
      <section className="natura-reservation" id="rezerwacja">
        <div><span>REZERWACJA</span><h2>Wybierz dogodny sposób kontaktu.</h2><p>W gotowej wersji rezerwacja może łączyć się z kalendarzem, potwierdzeniami e-mail i przypomnieniami.</p></div>
        <div><a href="tel:+48450458466">Zadzwoń +48 450 458 466 <b>↗</b></a><a href="/#kontakt">Napisz do studia <b>↗</b></a><small>Projekt demonstracyjny. Nie przyjmuje prawdziwych rezerwacji.</small></div>
      </section>
      <footer className="natura-footer"><Link className="natura-brand" href="/"><i/>NATURA <b>STUDIO</b></Link><p>Projekt koncepcyjny Zielonej Marki.</p><Link href="/demo/natura">Zobacz zaplecze rezerwacji ↗</Link></footer>
    </main>
  );
}
