import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bistro Forma | sezonowa kuchnia i rezerwacje",
  description: "Pełna demonstracyjna strona restauracji: menu, klimat, rezerwacja, godziny i kontakt.",
  openGraph: { title: "Bistro Forma | demonstracyjna strona restauracji", description: "Menu, klimat i rezerwacja bez szukania informacji.", images: [] },
  twitter: { card: "summary", title: "Bistro Forma", description: "Menu, klimat i rezerwacja bez szukania informacji.", images: [] },
};

const menu = [
  ["01", "Na początek", "Pieczony kalafior", "labneh · pistacje · mięta", "29"],
  ["02", "Z ognia", "Kurczak kukurydziany", "młode ziemniaki · sos estragonowy", "52"],
  ["03", "Roślinnie", "Kaszotto z boczniakiem", "szparagi · dojrzewający ser", "44"],
  ["04", "Na słodko", "Sernik palony", "rabarbar · wanilia · migdał", "25"],
];

export default function BistroWebsiteDemo() {
  return <main className="bistro-site">
    <nav className="bistro-nav">
      <a className="bistro-wordmark" href="#start"><span>B</span>BISTRO FORMA</a>
      <div><a href="#menu">Menu</a><a href="#historia">O nas</a><a href="#kontakt">Kontakt</a></div>
      <a className="bistro-book" href="#rezerwacja">Rezerwuj stolik</a>
    </nav>

    <header id="start" className="bistro-hero">
      <div className="bistro-hero-copy"><span>WARSZAWA · KUCHNIA SEZONOWA</span><h1>Prosto.<br/><em>Świeżo.</em><br/>Razem.</h1><p>Codzienna kuchnia oparta na sezonie, dobrym produkcie i swobodnej atmosferze.</p><div><a href="#menu">Zobacz menu ↓</a><a href="#rezerwacja">Zarezerwuj stolik ↗</a></div></div>
      <figure><img src="/concept-bistro.jpg" alt="Stół i potrawy w Bistro Forma"/><figcaption><b>FORMA / 01</b><span>Lunch · kolacja · spotkania</span></figcaption></figure>
      <div className="bistro-stamp" aria-hidden="true">LOCAL<br/>SEASONAL<br/>HONEST</div>
    </header>

    <section className="bistro-info" aria-label="Najważniejsze informacje"><div><small>DZISIAJ</small><b>12:00–22:00</b></div><div><small>ADRES</small><b>Warszawa · lokal pokazowy</b></div><div><small>REZERWACJE</small><b>+48 450 458 466</b></div><a href="#kontakt">Jak dojechać ↗</a></section>

    <section id="menu" className="bistro-menu">
      <header><span>01 / KARTA</span><h2>Krótka karta.<br/>Dużo <em>sezonu.</em></h2><p>Menu demonstracyjne zmienia się razem z dostępnością produktów. Zapytaj obsługę o alergeny i wersje roślinne.</p></header>
      <div className="bistro-menu-list">{menu.map(([n, category, name, detail, price]) => <article key={n}><b>{n}</b><div><small>{category}</small><h3>{name}</h3><p>{detail}</p></div><strong>{price} zł</strong></article>)}</div>
      <footer><span>Pełne menu można aktualizować samodzielnie w panelu.</span><a href="/demo/bistro">Zobacz zaplecze restauracji ↗</a></footer>
    </section>

    <section id="historia" className="bistro-story"><div className="bistro-story-art"><span>FORMA</span><i/><i/><i/></div><div><span>02 / O NAS</span><h2>Miejsce na zwykły dzień i ważny wieczór.</h2><p>Bistro Forma to koncepcyjna marka restauracyjna pokazująca, jak lokal może połączyć charakter, aktualne menu, informacje praktyczne i prostą rezerwację w jednym mobilnym serwisie.</p><ul><li>sezonowa, czytelna karta</li><li>rezerwacja bez szukania numeru</li><li>wydarzenia i aktualności</li></ul></div></section>

    <section className="bistro-evening"><div><span>PIĄTKI / 19:00</span><h2>Stół degustacyjny</h2><p>Pięć dań, jeden wspólny stół i produkty wybrane tego samego tygodnia.</p></div><a href="#rezerwacja">Sprawdź termin <b>↗</b></a></section>

    <section id="rezerwacja" className="bistro-reservation"><div><span>03 / REZERWACJA</span><h2>Zostaw miejsce<br/>na dobry wieczór.</h2></div><div><p>W gotowym wdrożeniu formularz może łączyć się z kalendarzem, potwierdzeniami e-mail lub systemem rezerwacji.</p><a href="tel:+48450458466">Zadzwoń: +48 450 458 466 ↗</a><small>To demonstracja portfolio. Nie składa prawdziwej rezerwacji.</small></div></section>

    <footer id="kontakt" className="bistro-footer"><div className="bistro-wordmark"><span>B</span>BISTRO FORMA</div><div><small>GODZINY</small><p>wt–czw 12:00–22:00<br/>pt–sob 12:00–23:00<br/>nd 12:00–20:00</p></div><div><small>KONTAKT</small><p>+48 450 458 466<br/>lukasz.staniewicz@gmail.com</p></div><div><small>PROJEKT DEMONSTRACYJNY</small><p>Projekt i realizacja:<br/><a href="/?widok=realizacje#realizacje">Zielona Marka ↗</a></p></div></footer>
  </main>;
}
