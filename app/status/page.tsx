"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const benefits = [
  ["01", "Aktualny etap", "Widzisz, na jakim etapie jest praca i ile zostało do kolejnego kroku."],
  ["02", "Jedno miejsce", "Zakres, termin, informacja od wykonawcy i umowa są zawsze pod tym samym adresem."],
  ["03", "Bezpieczny dostęp", "Kod otwiera tylko Twój projekt. Nie jest publiczną listą realizacji."],
];

export default function StatusEntry() {
  const [code, setCode] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const clean = code.trim().toUpperCase();
    if (clean) window.location.href = `/status/${encodeURIComponent(clean)}`;
  }

  return (
    <main className="status-entry">
      <nav className="nav shell">
        <Link className="brand" href="/">
          <img className="brand-logo" src="/logo.png" alt="" />
          <span>ZIELONA MARKA</span>
        </Link>
        <Link href="/">Strona główna</Link>
      </nav>
      <section className="status-intro">
        <div>
          <span className="section-no">STREFA KLIENTA</span>
          <h1>Wiesz, co dzieje się z Twoim projektem.</h1>
          <p>
            Po rejestracji zlecenia otrzymujesz indywidualny kod. Dzięki niemu
            samodzielnie sprawdzisz postęp, najbliższy krok, termin i dokumenty.
          </p>
        </div>
        <form onSubmit={submit}>
          <label>
            Kod projektu
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="ZM-XXXX-XXXX-XXXX"
              autoComplete="off"
              required
            />
          </label>
          <button className="button">Otwórz status <span>↗</span></button>
          <small>Kod dostałeś/-aś w wiadomości po rejestracji projektu.</small>
        </form>
      </section>
      <section className="status-benefits shell" aria-label="Co znajdziesz w strefie klienta">
        {benefits.map(([number, title, description]) => (
          <article key={number}>
            <b>{number}</b>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <section className="status-note shell">
        <div>
          <span className="section-no">PRZEJRZYSTA WSPÓŁPRACA</span>
          <h2>Nie musisz pytać, czy coś już jest gotowe.</h2>
        </div>
        <p>
          Gdy potrzebne będą materiały, akceptacja lub podpisana umowa, zobaczysz
          konkretną informację w statusie. Przed publikacją projekt przechodzi
          kontrolę QA: telefon, komputer, formularze, linki i podstawowe SEO.
        </p>
      </section>
      <p className="status-security shell">
        Kod daje dostęp tylko do jednego projektu. Nie udostępniaj go osobom postronnym.
        W razie problemu napisz na <a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a>.
      </p>
    </main>
  );
}
