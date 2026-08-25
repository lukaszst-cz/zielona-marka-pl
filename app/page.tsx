"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { concepts, services, technologies } from "./content";

type PortfolioCard = { n:string; name:string; type:string; note:string; color:string; description?:string; imageUrl?:string; websiteUrl?:string; backendUrl?:string };
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
  {
    n: "04",
    name: "Auto Naprawa",
    type: "Strona + system obsługi",
    note: "Pełna demonstracja procesowa",
    color: "project-auto project-featured",
    description: "Strona warsztatu, portal klienta, panel kierownika, kosztorysy, KPI oraz demonstracja faktur i KSeF.",
    imageUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/assets/workshop-hero.png",
    websiteUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/",
    backendUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/portal/?role=manager",
  },
];
const websiteEstimateTypes = ["One Page / landing page", "Mała wizytówka", "Firma online", "Firma Plus", "Sklep internetowy"];
const estimatePageDefaults: Record<string, number> = {
  "One Page / landing page": 1,
  "Mała wizytówka": 3,
  "Firma online": 7,
  "Firma Plus": 10,
  "Sklep internetowy": 5,
};
const technologyMarks = ["CMS", "</>", "FLOW", "KPI", "XLS", "CRM", "PWA", "API", "AI", "SEO", "WWW", "SQL", "CLOUD"];
const processSteps = [
  { number: "01", title: "Brief i cel", description: "Poznaję firmę, klientów i najważniejszy cel strony.", output: ["podsumowanie celów", "lista potrzebnych materiałów", "plan dalszych decyzji"] },
  { number: "02", title: "Strategia i treść", description: "Układam strukturę, komunikację oraz ścieżkę użytkownika.", output: ["mapa strony", "plan treści i CTA", "ustalony zakres projektu"] },
  { number: "03", title: "Projekt", description: "Tworzę indywidualny kierunek wizualny i widoki strony.", output: ["kierunek wizualny", "widoki telefonu i komputera", "runda akceptacji"] },
  { number: "04", title: "Wdrożenie", description: "Koduję, optymalizuję i konfiguruję potrzebne integracje.", output: ["działająca wersja strony", "formularze i analityka", "zaplecze uzgodnionych funkcji"] },
  { number: "05", title: "Testy jakości", description: "Sprawdzam urządzenia, formularze, szybkość, SEO, dostępność i cały proces.", output: ["checklista kontroli jakości (QA)", "lista wykonanych poprawek", "raport odbiorowy dla klienta"] },
  { number: "06", title: "Start i opieka", description: "Publikuję stronę, przekazuję instrukcję i wspieram dalszy rozwój.", output: ["opublikowana strona", "instrukcja obsługi", "kod statusu i zalecenia na przyszłość"] },
];

export default function Home() {
  const [siteType, setSiteType] = useState("Firma online");
  const [pages, setPages] = useState(7);
  const [shop, setShop] = useState(false);
  const [copy, setCopy] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSent, setChatSent] = useState(false);
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const [portfolioProjects, setPortfolioProjects] = useState(projects);
  const [expandedService, setExpandedService] = useState<number | null>(0);
  const [expandedTech, setExpandedTech] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activePackage, setActivePackage] = useState(0);
  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json() as Promise<{ projects?: Array<{ id: number; title: string; type: string; description: string; imageUrl: string; websiteUrl: string }> }>)
      .then((payload) => {
        if (payload.projects?.length) {
          const remoteProjects = payload.projects.map((project: { id: number; title: string; type: string; description: string; imageUrl: string; websiteUrl: string }, index: number) => ({
              n: String(index + 1).padStart(2, "0"),
              name: project.title,
              type: project.type,
              note: "Realizacja",
              color: ["project-a", "project-b", "project-c"][index % 3],
              description: project.description,
              imageUrl: project.imageUrl,
              websiteUrl: project.websiteUrl,
            }));
          const remoteNames = new Set(remoteProjects.map((project) => project.name));
          setPortfolioProjects([...projects.filter((project) => !remoteNames.has(project.name)), ...remoteProjects]);
        }
      })
      .catch(() => undefined);
  }, []);
  const estimate = useMemo(() => {
    const config: Record<string, { base: number; included: number; copy: number }> = {
      "One Page / landing page": { base: 1900, included: 1, copy: 650 },
      "Mała wizytówka": { base: 2400, included: 3, copy: 900 },
      "Firma online": { base: 3900, included: 7, copy: 1500 },
      "Firma Plus": { base: 5900, included: 10, copy: 2200 },
      "Sklep internetowy": { base: 5900, included: 5, copy: 2200 },
      "Automatyzacja Start": { base: 1200, included: 0, copy: 350 },
      "Dashboard KPI": { base: 1800, included: 0, copy: 500 },
      "Panel klienta": { base: 4900, included: 0, copy: 1200 },
    };
    const current = config[siteType] ?? config["Firma online"];
    const isWebsite = websiteEstimateTypes.includes(siteType);
    return (
      current.base +
      (isWebsite ? Math.max(0, pages - current.included) * 350 : 0) +
      (shop && isWebsite && siteType !== "Sklep internetowy" ? 2500 : 0) +
      (copy && isWebsite ? current.copy : 0)
    );
  }, [siteType, pages, shop, copy]);
  const isWebsiteEstimate = websiteEstimateTypes.includes(siteType);
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
  async function submitQuickMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChatSending(true);
    setChatError("");
    const formElement = event.currentTarget;
    const payload = Object.fromEntries(new FormData(formElement));
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, company: "Szybki kontakt" }) });
    setChatSending(false);
    if (response.ok) { setChatSent(true); formElement.reset(); }
    else setChatError("Nie udało się wysłać. Zadzwoń lub napisz e-mail.");
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
          <a href="/status">Status projektu</a>
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

      <section className="quick-start">
        <div className="shell quick-start-inner">
          <div className="quick-start-intro">
            <span className="section-no">OD CZEGO ZACZYNAMY</span>
            <h2>
              Wybierz sytuację, <em>w której jest dziś Twoja firma.</em>
            </h2>
            <p>
              Nie musisz znać technologii ani mieć gotowego briefu. Wystarczy,
              że powiesz, co dziś nie działa lub co chcesz usprawnić.
            </p>
          </div>
          <div className="quick-start-cards">
            <a className="quick-start-card" href="#oferta">
              <span>01</span>
              <div className="quick-card-mark" aria-hidden="true">⌖</div>
              <h3>Mam wizytówkę Google, ale mało zapytań.</h3>
              <p>
                Porządkujemy ofertę i budujemy miejsce, do którego klient przechodzi
                po znalezieniu Cię w mapach.
              </p>
              <b>Zobacz stronę dla firmy <i>↗</i></b>
            </a>
            <a className="quick-start-card" href="#realizacje">
              <span>02</span>
              <div className="quick-card-mark" aria-hidden="true">◫</div>
              <h3>Potrzebuję strony, która wygląda profesjonalnie.</h3>
              <p>
                Projektujemy układ, treści i formularz tak, aby marka była zrozumiała
                od pierwszego kliknięcia.
              </p>
              <b>Zobacz kierunki projektowe <i>↗</i></b>
            </a>
            <a className="quick-start-card quick-start-card-dark" href="#technologie">
              <span>03</span>
              <div className="quick-card-mark" aria-hidden="true">↗</div>
              <h3>Firma rośnie, a procesy zabierają zbyt dużo czasu.</h3>
              <p>
                Dobieramy formularze, statusy, KPI i automatyzacje, które porządkują
                pracę zespołu.
              </p>
              <b>Zobacz automatyzacje <i>↗</i></b>
            </a>
          </div>
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
              <b>2–4 tyg.</b>
              <span>typowy czas realizacji małej strony firmowej</span>
            </div>
            <div>
              <b>100%</b>
              <span>indywidualny projekt</span>
            </div>
          </div>
          <p className="lighthouse-note"><b>Lighthouse</b> to automatyczny test Google sprawdzający m.in. szybkość, dostępność i techniczną jakość strony. Wynik mierzę przed publikacją; nie jest obietnicą konkretnej pozycji w Google.</p>
        </div>
      </section>
      <section id="realizacje" className="section shell">
        <div className="section-head">
          <div>
            <span className="section-no">03 / WYBRANE REALIZACJE</span>
            <h2>Strony z charakterem.</h2>
          </div>
          <p>
            Zobacz działające wdrożenie wraz z zapleczem oraz dopracowane
            kierunki koncepcyjne dla różnych branż. Portfolio może rosnąć bez
            przebudowy całej strony.
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
                <div className="mock-body" style={project.imageUrl ? { backgroundImage: `linear-gradient(112deg,rgba(10,31,22,.9) 0%,rgba(10,31,22,.78) 48%,rgba(10,31,22,.16) 100%),url(${project.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
                  <small>{project.type}</small>
                  <strong>{project.name}</strong>
                  <span>{project.description || <>Przemyślany projekt.<br />Wyraźny efekt.</>}</span>
                  <Link href={target} target={project.websiteUrl?.startsWith("http") ? "_blank" : undefined} aria-label={`Otwórz ${project.name}`}>↗</Link>
                </div>
              </div>
              <div className="project-caption">
                <div><h3>{project.name}</h3><span>{project.type}</span></div>
                <div className="project-actions">
                  <Link href={target} target={target.startsWith("http") ? "_blank" : undefined}>Zobacz stronę ↗</Link>
                  {project.backendUrl && <Link href={project.backendUrl} target="_blank">Zobacz zaplecze ↗</Link>}
                </div>
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
              Poniższe kwoty to praktyczny punkt startu dla usług, które
              realizuję w jasno określonym zakresie.
            </p>
          </div>
          <div className="featured-packages" aria-label="Główne pakiety stron internetowych">
            {services.slice(0, 3).map((service, index) => (
              <article key={service.title} className={activePackage === index ? "active" : ""}>
                <button type="button" onClick={() => setActivePackage(index)} aria-expanded={activePackage === index}>
                  <header><span>PAKIET {String(index + 1).padStart(2, "0")}</span>{index === 0 && <b>NAJLEPSZY DLA MAŁEJ FIRMY</b>}</header>
                  <div className={`package-visual package-visual-${index}`} aria-hidden="true"><i /><i /><i /><strong>{index === 0 ? "ONE PAGE" : index === 1 ? "WWW" : "PLUS"}</strong></div>
                  <h3>{index === 0 ? "One Page / wizytówka" : service.title}</h3>
                  <p>{service.lead}</p>
                  <div className="package-price"><small>OD</small><strong>{service.price}</strong><i>{activePackage === index ? "−" : "+"}</i></div>
                </button>
                {activePackage === index && (
                  <div className="package-expanded">
                    <small>W PAKIECIE</small>
                    <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                    <footer><span>{service.time}</span><a href="#kontakt">Zapytaj o pakiet →</a></footer>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="offer-more-head"><span>PEŁNA OFERTA</span><p>Strony, automatyzacje, dane, teksty i zaplecze firmy.</p></div>
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
          <div className="pricing-notes" aria-label="Jak czytać cennik">
            <article>
              <span>01</span>
              <h3>Co zawiera cena</h3>
              <p>Uzgodniony zakres, projekt, wdrożenie, publikację, podstawowe SEO, instrukcję i końcową kontrolę jakości (QA).</p>
            </article>
            <article>
              <span>02</span>
              <h3>Koszty zewnętrzne</h3>
              <p>Domena, płatny hosting, licencje, prowizje płatności i abonamenty narzędzi są zatwierdzane przed zakupem i rozliczane osobno.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Bez niespodzianek</h3>
              <p>Przed startem otrzymujesz zakres, harmonogram i cenę. Dodatkowa praca wymaga Twojej akceptacji, zanim wpłynie na budżet.</p>
            </article>
          </div>
          <p className="pricing-disclaimer">Podane ceny są orientacyjne. Ostateczna wycena powstaje po krótkim briefie i zależy od funkcji, materiałów, integracji oraz terminu.</p>
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
                onChange={(e) => {
                  const nextType = e.target.value;
                  setSiteType(nextType);
                  setPages(estimatePageDefaults[nextType] ?? 1);
                  setShop(false);
                  setCopy(false);
                }}
              >
                <option>One Page / landing page</option>
                <option>Mała wizytówka</option>
                <option>Firma online</option>
                <option>Firma Plus</option>
                <option>Sklep internetowy</option>
                <option>Automatyzacja Start</option>
                <option>Dashboard KPI</option>
                <option>Panel klienta</option>
              </select>
            </label>
            {isWebsiteEstimate && <label>
              Liczba podstron <b>{pages}</b>
              <input
                type="range"
                min="1"
                max="20"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
              />
            </label>}
            {isWebsiteEstimate && siteType !== "Sklep internetowy" && <label className="check">
              <input
                type="checkbox"
                checked={shop}
                onChange={(e) => setShop(e.target.checked)}
              />
              <span>Funkcje sprzedażowe / płatności</span>
            </label>}
            {isWebsiteEstimate && <label className="check">
              <input
                type="checkbox"
                checked={copy}
                onChange={(e) => setCopy(e.target.checked)}
              />
              <span>Przygotowanie tekstów na stronę</span>
            </label>}
            <div className="estimate">
              <span>Orientacyjny budżet</span>
              <strong>
                {estimate.toLocaleString("pl-PL")}–
                {Math.ceil((estimate * 1.2) / 100) * 100} zł
              </strong>
              <small>wycena orientacyjna</small>
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
        <div className="process-flow" role="tablist" aria-label="Etapy realizacji projektu">
          {processSteps.map((step, index) => (
            <button key={step.number} role="tab" aria-selected={activeProcess === index} className={activeProcess === index ? "active" : ""} onClick={() => setActiveProcess(index)}>
              <b>{step.number}</b><span>{step.title}</span><i aria-hidden="true">{activeProcess === index ? "●" : "○"}</i>
            </button>
          ))}
        </div>
        <div className="process-detail" role="tabpanel">
          <div>
            <span className="section-no">ETAP {processSteps[activeProcess].number}</span>
            <h3>{processSteps[activeProcess].title}</h3>
            <p>{processSteps[activeProcess].description}</p>
          </div>
          <div>
            <small>CO OTRZYMUJE KLIENT</small>
            <ul>{processSteps[activeProcess].output.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="process-meter" aria-label={`Etap ${activeProcess + 1} z ${processSteps.length}`}>
            <span><i style={{ width: `${((activeProcess + 1) / processSteps.length) * 100}%` }} /></span>
            <b>{activeProcess + 1} / {processSteps.length}</b>
            <button type="button" onClick={() => setActiveProcess((activeProcess + 1) % processSteps.length)}>Następny etap →</button>
          </div>
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
          <div className="quality-board" aria-label="Zakres końcowych testów jakości">
            <header>
              <div><i /><span>RAPORT ODBIOROWY / KONTROLA JAKOŚCI (QA)</span></div>
              <b>GOTOWA DO STARTU</b>
            </header>
            <div className="quality-board-grid">
              <div className="quality-devices" aria-hidden="true">
                <div className="quality-phone"><span /><span /><span /></div>
                <div className="quality-desktop"><span /><span /><span /></div>
              </div>
              <div className="quality-checks">
                {["Telefon i komputer", "Formularze i linki", "Szybkość i stabilność", "SEO techniczne", "Dostępność", "Pełna ścieżka klienta"].map((item, index) => (
                  <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span><i>SPRAWDZONE ✓</i></div>
                ))}
              </div>
            </div>
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
                <div className={`tech-graphic tech-graphic-${index % 5}`} aria-hidden="true">
                  <b>{technologyMarks[index]}</b><span /><span /><span />
                </div>
                <h3>{tech.title}</h3><p>{tech.summary}</p>
                <div className="tech-chips" aria-label={`Przykładowe narzędzia: ${tech.tools}`}>
                  {tech.tools.split(",").slice(0, 3).map((tool) => <small key={tool}>{tool.trim()}</small>)}
                </div>
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
            <a className="button" href="/demo/transport">Uruchom demonstrację <span>↗</span></a>
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
            <a className="button" href="/status">Wpisz kod klienta <span>↗</span></a>
            <small>Nowy kod tworzysz w Studio automatycznie podczas zakładania projektu.</small>
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="shell faq-grid">
          <div>
            <span className="section-no">11 / FAQ</span>
            <h2>Najczęstsze pytania przed startem.</h2>
            <p>Krótko i konkretnie — żeby od początku było wiadomo, jak wygląda współpraca.</p>
          </div>
          <div className="faq-list">
            {[
              ["Czy będę mógł samodzielnie edytować treści?", "Tak, jeśli projekt tego wymaga, dobiorę WordPress lub inne proste zaplecze. Przy stronie kodowanej indywidualnie ustalamy wygodny sposób aktualizacji przed rozpoczęciem pracy."],
              ["Od czego zależy cena strony?", "Od liczby widoków, przygotowania materiałów, funkcji, integracji i terminu. Przed startem otrzymujesz dokładny zakres i cenę — dodatkowe prace wymagają Twojej akceptacji."],
              ["Czy musimy spotykać się osobiście?", "Nie. Konsultacje możemy prowadzić przez Google Meet, Microsoft Teams, telefon lub e-mail. Spotkanie osobiste w obsługiwanym regionie ustalamy wtedy, gdy rzeczywiście pomaga w projekcie."],
              ["Czy strona będzie widoczna w Google?", "Przygotuję podstawy SEO technicznego, strukturę treści, indeksowanie i dane firmy. Pozycja zależy również od konkurencji, treści, opinii, linków i dalszej pracy — nie obiecuję nierealnych gwarancji."],
              ["Jak wygląda rozliczenie?", "Zakres, harmonogram i sposób płatności ustalamy przed rozpoczęciem. Projekt może być rozliczony etapami lub przez uzgodnioną platformę pośredniczącą, np. Useme."],
              ["Co dzieje się po oddaniu strony?", "Otrzymujesz działającą stronę, instrukcję, dostęp do ustalonych narzędzi oraz raport końcowej kontroli jakości (QA). Możemy też umówić dalszą opiekę i rozwój."],
              ["Co zawiera opieka nad stroną?", "Monitoring działania i SSL, kontrolowane aktualizacje, kopie bezpieczeństwa, sprawdzenie formularzy, drobne zmiany treści w ustalonym limicie oraz miesięczne podsumowanie. Większe nowe funkcje, płatne licencje i rozbudowa serwisu są wyceniane osobno przed rozpoczęciem."],
            ].map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="kontakt" className="section contact-section">
        <div className="shell contact-grid">
          <div>
            <span className="section-no">12 / ZACZNIJMY</span>
            <h2>Opowiedz mi o swojej marce.</h2>
            <p>
              Odpowiem z propozycją kolejnych kroków i wstępną wyceną. Bez
              zobowiązań.
            </p>
            <p className="contact-area">
              Lokalnie: Ząbki, Marki, Warszawa, Kobyłka, Zielonka, Radzymin,
              Wołomin, Nieporęt i Legionowo. Zdalnie: cała Polska.
            </p>
            <a className="mail" href="tel:+48450458466">
              +48 450 458 466 ↗
            </a>
            <a className="mail" href="mailto:kontakt@zielona-marka.pl">
              kontakt@zielona-marka.pl ↗
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
                Zapoznałem/-am się z{" "}
                <Link href="/polityka-prywatnosci">politykę prywatności</Link> i
                proszę o kontakt w sprawie wyceny.
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
      <aside className={`quick-chat ${chatOpen ? "open" : ""}`} aria-label="Szybki kontakt">
        {chatOpen && (
          <div className="quick-chat-panel">
            <header>
              <div>
                <span className="quick-chat-status"><i /> SZYBKI KONTAKT</span>
                <h2>Napisz, czego potrzebujesz.</h2>
                <p>To szybka wiadomość, nie automat. Odpowiem osobiście możliwie szybko.</p>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Zamknij szybki kontakt">×</button>
            </header>
            {chatSent ? (
              <div className="quick-chat-success">
                <b>Wiadomość zapisana ✓</b>
                <p>Wrócę do Ciebie na podany adres e-mail.</p>
                <button type="button" onClick={() => { setChatSent(false); setChatOpen(false); }}>Gotowe</button>
              </div>
            ) : (
              <>
              <a className="quick-chat-whatsapp" href="https://wa.me/48603806833?text=Dzie%C5%84%20dobry%2C%20znalaz%C5%82em%20Zielon%C4%85%20Mark%C4%99%20i%20chc%C4%99%20zapyta%C4%87%20o%20projekt." target="_blank" rel="noreferrer">
                <span className="quick-chat-whatsapp-mark" aria-hidden="true">●</span>
                <span><b>Napisz na WhatsApp</b><small>Rozmowa na numer +48 603 806 833</small></span>
                <i>↗</i>
              </a>
              <div className="quick-chat-divider"><span>lub zostaw wiadomość</span></div>
              <form onSubmit={submitQuickMessage}>
                <label>Imię<input required name="name" autoComplete="name" placeholder="Jak masz na imię?" /></label>
                <label>E-mail<input required name="email" type="email" autoComplete="email" placeholder="twoj@email.pl" /></label>
                <label>Wiadomość<textarea required name="message" rows={3} placeholder="Strona, automatyzacja, Google…" /></label>
                <label className="quick-chat-consent"><input required type="checkbox" /><span>Akceptuję <Link href="/polityka-prywatnosci">politykę prywatności</Link> i proszę o kontakt.</span></label>
                <button className="quick-chat-send" type="submit" disabled={chatSending}>{chatSending ? "Wysyłam…" : "Wyślij wiadomość"}<span>↗</span></button>
                {chatError && <p className="quick-chat-error">{chatError}</p>}
              </form>
              </>
            )}
            <a className="quick-chat-phone" href="tel:+48450458466">Wolisz porozmawiać? <b>+48 450 458 466</b></a>
          </div>
        )}
        <button className="quick-chat-toggle" type="button" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen}>
          <span className="quick-chat-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span><b>{chatOpen ? "Zamknij kontakt" : "Napisz do mnie"}</b><small>Szybka wiadomość</small></span>
          <i aria-hidden="true">{chatOpen ? "×" : "↗"}</i>
        </button>
      </aside>
      <footer>
        <div className="shell footer-grid">
          <a className="brand" href="/">
            <span className="footer-logo-plate"><img className="brand-logo" src="/logo.png" alt="" /></span>
            <span>ZIELONA MARKA</span>
          </a>
          <p>
            Projektowanie i wdrażanie stron internetowych dla świadomych marek.
          </p>
          <div>
            <a href="/studio">Studio pracy</a>
            <a href="/status">Status projektu</a>
            <a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="/polityka-prywatnosci">Prywatność</a>
          </div>
          <small>© {new Date().getFullYear()} Zielona Marka</small>
        </div>
      </footer>
    </main>
  );
}
