"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const projects = [
  {
    n: "01",
    name: "Natura Studio",
    type: "Strona usługowa",
    note: "Projekt koncepcyjny",
    color: "project-a",
  },
  {
    n: "02",
    name: "Bistro Forma",
    type: "Restauracja",
    note: "Projekt koncepcyjny",
    color: "project-b",
  },
  {
    n: "03",
    name: "Dom Dobry",
    type: "Nieruchomości",
    note: "Projekt koncepcyjny",
    color: "project-c",
  },
];
const services = [
  [
    "Landing page",
    "od 2 900 zł",
    "Jedna dopracowana strona sprzedażowa, formularz, analityka i podstawowe SEO.",
  ],
  [
    "Strona firmowa",
    "od 5 900 zł",
    "Do 7 podstron, indywidualny projekt, edytowalne treści, szkolenie i optymalizacja.",
  ],
  [
    "Portfolio",
    "od 3 500 zł",
    "Responsywne portfolio usług lub realizacji z wygodną ścieżką kontaktu.",
  ],
  [
    "Prototyp portalu lub PWA",
    "od 7 900 zł",
    "Interaktywny prototyp aplikacji, panelu klienta lub narzędzia instalowanego na telefonie.",
  ],
  [
    "Opieka nad stroną",
    "od 390 zł / mies.",
    "Aktualizacje, kopie zapasowe, monitoring i drobne zmiany treści.",
  ],
  [
    "Formularz zapytań",
    "od 450 zł",
    "Formularz przekierowujący kompletne zapytanie na e-mail lub do wybranego narzędzia.",
  ],
  [
    "Prezentacja usług i cennika",
    "od 900 zł",
    "Czytelna sekcja sprzedażowa, oferta PDF albo prezentacja do wysyłki klientom.",
  ],
  [
    "Publikacja i hosting",
    "od 490 zł",
    "Konfiguracja prostego hostingu, domeny, HTTPS i bezpieczne uruchomienie strony.",
  ],
  [
    "SEO techniczne",
    "od 900 zł",
    "Meta dane, nagłówki, mapa witryny, robots.txt, indeksowanie i kontrola wydajności.",
  ],
  [
    "Prywatność i cookies",
    "od 650 zł",
    "Dopasowany materiał informacyjny o prywatności i cookies — z rekomendacją weryfikacji prawnej.",
  ],
  [
    "Excel i Google Sheets",
    "od 1 200 zł",
    "Kalkulatory, wyceny, rejestry klientów, raporty oraz proste automatyzacje pracy.",
  ],
  [
    "Instrukcja aktualizacji",
    "od 350 zł",
    "Praktyczna instrukcja obsługi strony wraz z krótkim szkoleniem online.",
  ],
];

export default function Home() {
  const [siteType, setSiteType] = useState("Strona firmowa");
  const [pages, setPages] = useState(5);
  const [shop, setShop] = useState(false);
  const [copy, setCopy] = useState(false);
  const [sent, setSent] = useState(false);
  const estimate = useMemo(() => {
    const base =
      siteType === "Landing page"
        ? 2900
        : siteType === "Sklep internetowy"
          ? 9900
          : 4900;
    return (
      base +
      Math.max(0, pages - (siteType === "Landing page" ? 1 : 5)) * 450 +
      (shop && siteType !== "Sklep internetowy" ? 3500 : 0) +
      (copy ? 1200 : 0)
    );
  }, [siteType, pages, shop, copy]);
  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Zapytanie ze strony — ${form.get("company") || "nowy projekt"}`,
    );
    const body = encodeURIComponent(
      `Imię: ${form.get("name")}\nE-mail: ${form.get("email")}\nFirma: ${form.get("company")}\nBudżet: ${form.get("budget")}\n\nProjekt:\n${form.get("message")}`,
    );
    setSent(true);
    window.location.href = `mailto:lukasz.staniewicz@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <nav className="nav shell" aria-label="Główna nawigacja">
        <Link
          className="brand"
          href="/"
          aria-label="Zielona Marka — strona główna"
        >
          <img className="brand-logo" src="/logo.png" alt="" />
          <span>ZIELONA MARKA</span>
        </Link>
        <div className="nav-links">
          <a href="#realizacje">Realizacje</a>
          <a href="#oferta">Oferta</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <a className="button button-small" href="#kalkulator">
          Wyceń projekt
        </a>
      </nav>
      <section className="hero shell">
        <div className="eyebrow">
          <span />
          STRONY, KTÓRE PRACUJĄ NA TWÓJ BIZNES
        </div>
        <h1>
          Tworzę cyfrowe miejsca, <em>w których marki rosną.</em>
        </h1>
        <p>
          Projektuję szybkie i charakterystyczne strony internetowe dla firm,
          które chcą wyglądać profesjonalnie i zdobywać więcej klientów.
        </p>
        <div className="hero-actions">
          <a className="button" href="#realizacje">
            Zobacz realizacje <span>↗</span>
          </a>
          <a className="text-link" href="#proces">
            Jak wygląda współpraca <span>↓</span>
          </a>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <i />
          <b>01</b>
          <span>
            PROJEKT
            <br />
            STRATEGIA
            <br />
            WDROŻENIE
          </span>
        </div>
      </section>
      <section className="statement dark-section">
        <div className="shell statement-grid">
          <span className="section-no">02 / PODEJŚCIE</span>
          <h2>
            Łączę estetykę z celem biznesowym.{" "}
            <em>Każdy detal ma prowadzić do działania.</em>
          </h2>
          <div className="stats">
            <div>
              <b>90+</b>
              <span>cel wydajności Lighthouse</span>
            </div>
            <div>
              <b>3–6</b>
              <span>typowy czas realizacji</span>
            </div>
            <div>
              <b>100%</b>
              <span>indywidualny projekt</span>
            </div>
          </div>
        </div>
      </section>
      <section id="realizacje" className="section shell">
        <div className="section-head">
          <div>
            <span className="section-no">03 / WYBRANE REALIZACJE</span>
            <h2>Strony z charakterem.</h2>
          </div>
          <p>
            To miejsca na pierwsze projekty. Gdy zrealizujesz stronę dla
            klienta, podmienisz nazwę, opis i podgląd bez przebudowy całego
            portfolio.
          </p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <article className={`project ${project.color}`} key={project.n}>
              <div className="project-top">
                <span>{project.note}</span>
                <b>{project.n}</b>
              </div>
              <div className="browser-mock">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="mock-body">
                  <small>{project.type}</small>
                  <strong>{project.name}</strong>
                  <span>
                    Przemyślany projekt.
                    <br />
                    Wyraźny efekt.
                  </span>
                  <button aria-label={`Otwórz ${project.name}`}>↗</button>
                </div>
              </div>
              <div className="project-caption">
                <h3>{project.name}</h3>
                <span>{project.type}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="oferta" className="section offer-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-no">04 / OFERTA I CENNIK</span>
              <h2>Jasny zakres. Realne ceny.</h2>
            </div>
            <p>
              Każdy projekt otrzymuje indywidualną wycenę po krótkim briefie.
              Poniższe kwoty to praktyczny punkt startu dla usług, które możesz
              bezpiecznie realizować już teraz.
            </p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service[0]}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service[0]}</h3>
                <p>{service[2]}</p>
                <b>{service[1]}</b>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="kalkulator" className="section calculator-section">
        <div className="shell calculator-grid">
          <div>
            <span className="section-no">05 / SZYBKA WYCENA</span>
            <h2>Sprawdź budżet swojego projektu.</h2>
            <p>
              Wynik jest orientacyjny. Finalna oferta zależy od zakresu,
              integracji i gotowości materiałów.
            </p>
          </div>
          <div className="calculator-card">
            <label>
              Rodzaj strony
              <select
                value={siteType}
                onChange={(e) => setSiteType(e.target.value)}
              >
                <option>Landing page</option>
                <option>Strona firmowa</option>
                <option>Sklep internetowy</option>
              </select>
            </label>
            <label>
              Liczba podstron <b>{pages}</b>
              <input
                type="range"
                min="1"
                max="20"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={shop}
                onChange={(e) => setShop(e.target.checked)}
              />
              <span>Funkcje sprzedażowe / płatności</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={copy}
                onChange={(e) => setCopy(e.target.checked)}
              />
              <span>Przygotowanie tekstów</span>
            </label>
            <div className="estimate">
              <span>Orientacyjny budżet</span>
              <strong>
                {estimate.toLocaleString("pl-PL")}–
                {Math.ceil((estimate * 1.2) / 100) * 100} zł
              </strong>
              <small>netto</small>
            </div>
            <a className="button" href="#kontakt">
              Poproś o dokładną wycenę <span>↓</span>
            </a>
          </div>
        </div>
      </section>
      <section id="proces" className="section shell">
        <div className="section-head">
          <div>
            <span className="section-no">06 / PROCES</span>
            <h2>Od pomysłu do działającej strony.</h2>
          </div>
          <p>
            Prosty proces, jasne decyzje i stały kontakt. Wiesz, co dzieje się z
            projektem na każdym etapie.
          </p>
        </div>
        <div className="process">
          {[
            [
              "01",
              "Brief i cel",
              "Poznaję firmę, klientów i najważniejszy cel strony.",
            ],
            [
              "02",
              "Strategia i treść",
              "Układam strukturę, komunikację oraz ścieżkę użytkownika.",
            ],
            [
              "03",
              "Projekt",
              "Tworzę indywidualny kierunek wizualny i widoki strony.",
            ],
            [
              "04",
              "Wdrożenie",
              "Koduję, testuję, optymalizuję i konfiguruję analitykę.",
            ],
            [
              "05",
              "Start i opieka",
              "Publikuję stronę, przekazuję instrukcję i wspieram dalej.",
            ],
          ].map((step) => (
            <article key={step[0]}>
              <b>{step[0]}</b>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section included">
        <div className="shell">
          <span className="section-no">07 / W STANDARDZIE</span>
          <div className="included-grid">
            <h2>Gotowa nie tylko do oglądania, ale do pracy.</h2>
            <ul>
              <li>Responsywność na telefonie i komputerze</li>
              <li>Podstawowe SEO i dane dla Google</li>
              <li>Analityka i mierzenie zapytań</li>
              <li>Optymalizacja szybkości</li>
              <li>Formularz i zabezpieczenia prywatności</li>
              <li>Instrukcja samodzielnej obsługi</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="kontakt" className="section contact-section">
        <div className="shell contact-grid">
          <div>
            <span className="section-no">08 / ZACZNIJMY</span>
            <h2>Opowiedz mi o swojej marce.</h2>
            <p>
              Odpowiem z propozycją kolejnych kroków i wstępną wyceną. Bez
              zobowiązań.
            </p>
            <a className="mail" href="mailto:lukasz.staniewicz@gmail.com">
              lukasz.staniewicz@gmail.com ↗
            </a>
          </div>
          <form onSubmit={submitBrief}>
            <div className="form-row">
              <label>
                Imię
                <input required name="name" placeholder="Jak masz na imię?" />
              </label>
              <label>
                E-mail
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="twoj@email.pl"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Firma
                <input name="company" placeholder="Nazwa firmy" />
              </label>
              <label>
                Budżet
                <select name="budget" defaultValue="">
                  <option value="" disabled>
                    Wybierz przedział
                  </option>
                  <option>3–6 tys. zł</option>
                  <option>6–10 tys. zł</option>
                  <option>10–20 tys. zł</option>
                  <option>powyżej 20 tys. zł</option>
                </select>
              </label>
            </div>
            <label>
              O projekcie
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Czego potrzebujesz i jaki jest cel strony?"
              />
            </label>
            <label className="consent">
              <input required type="checkbox" />{" "}
              <span>
                Akceptuję{" "}
                <Link href="/polityka-prywatnosci">politykę prywatności</Link> i
                zgodę na kontakt w sprawie wyceny.
              </span>
            </label>
            <button className="button" type="submit">
              {sent ? "Otwieram pocztę…" : "Wyślij brief"}
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>
      <footer>
        <div className="shell footer-grid">
          <Link className="brand" href="/">
            <img className="brand-logo" src="/logo.png" alt="" />
            <span>ZIELONA MARKA</span>
          </Link>
          <p>
            Projektowanie i wdrażanie stron internetowych dla świadomych marek.
          </p>
          <div>
            <Link href="/studio">Studio pracy</Link>
            <Link href="/polityka-prywatnosci">Prywatność</Link>
            <a href="#">Instagram</a>
          </div>
          <small>© {new Date().getFullYear()} Zielona Marka</small>
        </div>
      </footer>
    </main>
  );
}
