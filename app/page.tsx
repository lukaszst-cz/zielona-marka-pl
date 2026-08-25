"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { concepts, services, technologies } from "./content";

type PortfolioCard = { n:string; name:string; type:string; note:string; color:string; description?:string; imageUrl?:string; websiteUrl?:string };
const projects: PortfolioCard[] = [
  {
    n: "01",
    name: "Natura Studio",
    type: "Strona usługowa",
    note: "Projekt koncepcyjny",
    color: "project-a",
    description: "Strona i zaplecze rezerwacji dla studia wellness.",
    imageUrl: "/concept-natura.jpg",
    websiteUrl: "/realizacje/natura-studio",
  },
  {
    n: "02",
    name: "Bistro Forma",
    type: "Restauracja",
    note: "Projekt koncepcyjny",
    color: "project-b",
    description: "Strona restauracji, rezerwacje i panel operacyjny.",
    imageUrl: "/concept-bistro.jpg",
    websiteUrl: "/realizacje/bistro-forma",
  },
  {
    n: "03",
    name: "Dom Dobry",
    type: "Nieruchomości",
    note: "Projekt koncepcyjny",
    color: "project-c",
    description: "Katalog inwestycji, leady i statusy sprzedaży.",
    imageUrl: "/concept-dom.jpg",
    websiteUrl: "/realizacje/dom-dobry",
  },
];
export default function Home() {
  const [siteType, setSiteType] = useState("Strona firmowa");
  const [pages, setPages] = useState(5);
  const [shop, setShop] = useState(false);
  const [copy, setCopy] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [portfolioProjects, setPortfolioProjects] = useState(projects);
  const [expandedService, setExpandedService] = useState<number | null>(0);
  const [expandedTech, setExpandedTech] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json() as Promise<{ projects?: Array<{ id: number; title: string; type: string; description: string; imageUrl: string; websiteUrl: string }> }>)
      .then((payload) => {
        if (payload.projects?.length) {
          setPortfolioProjects(
            payload.projects.map((project: { id: number; title: string; type: string; description: string; imageUrl: string; websiteUrl: string }, index: number) => ({
              n: String(index + 1).padStart(2, "0"),
              name: project.title,
              type: project.type,
              note: "Realizacja",
              color: ["project-a", "project-b", "project-c"][index % 3],
              description: project.description,
              imageUrl: project.imageUrl,
              websiteUrl: project.websiteUrl,
            })),
          );
        }
      })
      .catch(() => undefined);
  }, []);
  const estimate = useMemo(() => {
    const base =
      siteType === "Landing page"
        ? 1900
        : siteType === "Automatyzacja Start"
          ? 1200
          : siteType === "Dashboard KPI"
            ? 1800
            : siteType === "Panel klienta"
              ? 4900
        : siteType === "Sklep internetowy"
          ? 7900
          : 3400;
    const copyPrice =
      siteType === "Landing page" ? 650 :
      siteType === "Strona firmowa" ? 1500 :
      siteType === "Sklep internetowy" ? 2200 :
      siteType === "Panel klienta" ? 1200 :
      siteType === "Dashboard KPI" ? 500 :
      350;
    return (
      base +
      Math.max(0, pages - (siteType === "Landing page" ? 1 : 5)) * 300 +
      (shop && siteType !== "Sklep internetowy" ? 2500 : 0) +
      (copy ? copyPrice : 0)
    );
  }, [siteType, pages, shop, copy]);
  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFormError("");
    const formElement = event.currentTarget;
    const payload = Object.fromEntries(new FormData(formElement));
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSending(false);
    if (response.ok) { setSent(true); formElement.reset(); }
    else setFormError("Nie udało się zapisać wiadomości. Napisz bezpośrednio na e-mail.");
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
          <Link href="/status">Status projektu</Link>
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
          {portfolioProjects.map((project) => {
            const conceptSlug = Object.entries(concepts).find(([, concept]) => concept.name === project.name)?.[0];
            const target = project.websiteUrl || (conceptSlug ? `/realizacje/${conceptSlug}` : "#kontakt");
            return (
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
                <div className="mock-body" style={project.imageUrl ? { backgroundImage: `linear-gradient(120deg,rgba(244,241,232,.3),rgba(255,255,255,.64)),url(${project.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
                  <small>{project.type}</small>
                  <strong>{project.name}</strong>
                  <span>{project.description || <>Przemyślany projekt.<br />Wyraźny efekt.</>}</span>
                  <Link href={target} target={project.websiteUrl?.startsWith("http") ? "_blank" : undefined} aria-label={`Otwórz ${project.name}`}>↗</Link>
                </div>
              </div>
              <div className="project-caption">
                <h3>{project.name}</h3>
                <span>{project.type}</span>
              </div>
            </article>
          )})}
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
          <div className="service-list service-accordion">
            {services.map((service, index) => (
              <article key={service.title} className={expandedService === index ? "expanded" : ""}>
                <button className="service-summary" onClick={() => setExpandedService(expandedService === index ? null : index)} aria-expanded={expandedService === index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.lead}</p>
                  <b>{service.price}</b>
                  <i>{expandedService === index ? "−" : "+"}</i>
                </button>
                {expandedService === index && <div className="service-detail">
                  <div><small>DLA KOGO</small><p>{service.forWhom}</p></div>
                  <div><small>CO OTRZYMUJESZ</small><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul></div>
                  <div><small>CZAS REALIZACJI</small><p>{service.time}</p><a href="#kontakt">Zapytaj o ten pakiet →</a></div>
                </div>}
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
                <option>Automatyzacja Start</option>
                <option>Dashboard KPI</option>
                <option>Panel klienta</option>
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
              <span>Przygotowanie tekstów na stronę</span>
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
              "Testy i QA",
              "Sprawdzam telefon, komputer, formularze, linki, szybkość, SEO, dostępność i cały proces.",
            ],
            [
              "06",
              "Start i opieka",
              "Publikuję stronę, przekazuję instrukcję, kod statusu klienta i wspieram dalej.",
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
      <section id="technologie" className="section tech-section">
        <div className="shell">
          <div className="section-head"><div><span className="section-no">08 / TECHNOLOGIE</span><h2>Dobieram narzędzie do celu.</h2></div><p>Nie sprzedaję jednej technologii każdemu. Prosta strona powinna pozostać prosta, a zaplecze firmy ma naprawdę oszczędzać czas.</p></div>
          <div className="tech-grid">
            {technologies.map((tech, index) => <article key={tech.title} className={expandedTech === index ? "expanded" : ""}>
              <button onClick={() => setExpandedTech(expandedTech === index ? null : index)} aria-expanded={expandedTech === index}>
                <span>{String(index + 1).padStart(2, "0")}</span><i>{expandedTech === index ? "−" : "+"}</i>
                <h3>{tech.title}</h3><p>{tech.summary}</p>
              </button>
              {expandedTech === index && <div className="tech-detail">
                <div><small>CO TO JEST</small><p>{tech.what}</p></div>
                <div><small>KIEDY WARTO</small><p>{tech.use}</p></div>
                <div><small>EFEKT DLA FIRMY</small><p>{tech.effect}</p></div>
                <div><small>NARZĘDZIA</small><p>{tech.tools}</p></div>
              </div>}
            </article>)}
          </div>
        </div>
      </section>
      <section className="section automation-showcase">
        <div className="shell showcase-grid">
          <div>
            <span className="section-no">09 / AUTOMATYZACJA W PRAKTYCE</span>
            <h2>Zobacz, jak może pracować firma transportowa.</h2>
            <p>Interaktywne demo pokazuje cały obieg zlecenia: od formularza, przez kierowcę i dostawę, aż do dokumentów, faktury oraz KPI.</p>
            <Link className="button" href="/demo/transport">Uruchom demonstrację <span>↗</span></Link>
          </div>
          <div className="flow-preview" aria-label="Przykładowy obieg zlecenia">
            {["Zapytanie", "Wycena", "Kierowca", "Dostawa", "Faktura", "KPI"].map((item, index) => <div key={item}><b>{String(index + 1).padStart(2,"0")}</b><span>{item}</span>{index < 5 && <i>→</i>}</div>)}
          </div>
        </div>
      </section>
      <section className="section client-portal-showcase">
        <div className="shell portal-showcase-grid">
          <div>
            <span className="section-no">10 / STREFA KLIENTA</span>
            <h2>Twój klient zawsze wie, na jakim etapie jest projekt.</h2>
            <p>Po rejestracji zlecenia otrzymuje indywidualny kod. Bez logowania do Twojego Studio sprawdza postęp, kolejny krok, termin i roboczą umowę do pobrania.</p>
            <ul>
              <li>prywatny widok jednego projektu,</li>
              <li>procent postępu i aktualny etap,</li>
              <li>informacja, czego potrzebujesz od klienta,</li>
              <li>umowa do wydruku lub zapisania jako PDF.</li>
            </ul>
          </div>
          <div className="portal-code-card">
            <span className="section-no">MASZ JUŻ KOD?</span>
            <h3>Otwórz status projektu.</h3>
            <p>Przykład: ZM-AB12-CD34-EF56</p>
            <Link className="button" href="/status">Wpisz kod klienta <span>↗</span></Link>
            <small>Nowy kod tworzysz w Studio automatycznie podczas zakładania projektu.</small>
          </div>
        </div>
      </section>
      <section id="kontakt" className="section contact-section">
        <div className="shell contact-grid">
          <div>
            <span className="section-no">11 / ZACZNIJMY</span>
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
                  <option>Nie chcę teraz mówić o budżecie</option>
                  <option>2–4 tys. zł</option>
                  <option>4–7 tys. zł</option>
                  <option>7–12 tys. zł</option>
                  <option>powyżej 12 tys. zł</option>
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
              {sent ? "Wiadomość zapisana ✓" : sending ? "Zapisuję…" : "Wyślij brief"}
              <span>↗</span>
            </button>
            {formError && <p className="form-error">{formError}</p>}
          </form>
        </div>
      </section>
      <footer>
        <div className="shell footer-grid">
          <Link className="brand" href="/">
            <span className="footer-logo-plate"><img className="brand-logo" src="/logo.png" alt="" /></span>
            <span>ZIELONA MARKA</span>
          </Link>
          <p>
            Projektowanie i wdrażanie stron internetowych dla świadomych marek.
          </p>
          <div>
            <Link href="/studio">Studio pracy</Link>
            <Link href="/status">Status projektu</Link>
            <a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link href="/polityka-prywatnosci">Prywatność</Link>
          </div>
          <small>© {new Date().getFullYear()} Zielona Marka</small>
        </div>
      </footer>
    </main>
  );
}
