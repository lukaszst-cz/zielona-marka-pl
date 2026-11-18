"use client";

import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";
import { saveQuoteTransfer } from "./QuoteTransfer";

const industries = [
  {
    id: "services", label: "Firma usługowa", brand: "Solidna Usługa",
    kicker: "USŁUGI / WARSZAWA I OKOLICE",
    title: "Fachowa obsługa. Jasne zasady. Spokojna współpraca.",
    lead: "Poznaj nasze usługi i dowiedz się, jak wygląda współpraca: od pierwszego kontaktu do realizacji.",
    services: ["Usługa podstawowa", "Realizacja indywidualna", "Stała obsługa"],
    about: "Pokazujemy, czym się zajmujemy, jak pracujemy i jak można się z nami skontaktować. Bez zbędnych obietnic.",
    question: "Jak wygląda współpraca?", answer: "Najpierw poznajemy zakres, ustalamy termin i przygotowujemy propozycję.",
  },
  {
    id: "beauty", label: "Salon beauty i wellness", brand: "Natura Studio",
    kicker: "PIELĘGNACJA / TWOJE MIASTO",
    title: "Chwila dla siebie zaczyna się tutaj.",
    lead: "Poznaj ofertę zabiegów, warunki wizyt i sposób umówienia dogodnego terminu.",
    services: ["Pielęgnacja", "Zabiegi specjalistyczne", "Konsultacje"],
    about: "Kameralne miejsce, czytelna oferta i informacje, które pomagają wybrać odpowiednią usługę.",
    question: "Jak umówić wizytę?", answer: "Skontaktuj się z salonem, by ustalić usługę i dostępny termin.",
  },
  {
    id: "auto", label: "Warsztat samochodowy", brand: "Auto Expert",
    kicker: "SERWIS SAMOCHODOWY / TWOJE MIASTO",
    title: "Dobry serwis zaczyna się od rzetelnej diagnozy.",
    lead: "Przejrzysta lista usług, dane kontaktowe i dogodny sposób zapytania o termin.",
    services: ["Diagnostyka", "Przeglądy i serwis", "Naprawy bieżące"],
    about: "Opisujemy zakres wykonywanych prac, przebieg przyjęcia pojazdu i sposób kontaktu z warsztatem.",
    question: "Co przygotować przed wizytą?", answer: "Opisz objawy i model pojazdu, aby łatwiej ustalić dalsze działania.",
  },
  {
    id: "food", label: "Gastronomia", brand: "Bistro Forma",
    kicker: "BISTRO / TWOJE MIASTO",
    title: "Prosto, świeżo i z przyjemnością.",
    lead: "Poznaj przykładowe menu, godziny pracy i sposób kontaktu z naszym lokalem.",
    services: ["Menu dnia", "Dania na wynos", "Zamówienia grupowe"],
    about: "W jednym miejscu pokazujemy, co serwujemy, gdzie nas znaleźć i jak się z nami skontaktować.",
    question: "Gdzie sprawdzić aktualne menu?", answer: "Menu i godziny serwowania są prezentowane w sekcji oferty.",
  },
];
const palettes = [
  { id: "forest", label: "Botaniczny", bg: "#e9f0e4", ink: "#173c2d", accent: "#236144", text: "#456551", panel: "#ffffff", hero: "#103b28" },
  { id: "ocean", label: "Nowoczesny", bg: "#eaf2f8", ink: "#173c58", accent: "#276d9d", text: "#456479", panel: "#ffffff", hero: "#123d5b" },
  { id: "dark", label: "Elegancki premium", bg: "#111d19", ink: "#f2f5e9", accent: "#c1e58b", text: "#c3d5c7", panel: "#20332a", hero: "#172a20" },
  { id: "stone", label: "Jasny atelier", bg: "#f3efe7", ink: "#263b36", accent: "#315b50", text: "#4c5d57", panel: "#fffdf9", hero: "#253d35" },
  { id: "clay", label: "Ciepły terrakota", bg: "#fbf0e8", ink: "#51312b", accent: "#9d4d3b", text: "#66514b", panel: "#fffaf5", hero: "#60342b" },
  { id: "plum", label: "Kreatywny śliwkowy", bg: "#f1eaf1", ink: "#36253f", accent: "#6b3c75", text: "#58465f", panel: "#fff", hero: "#3f2748" },
];
const siteLayouts = [
  { id: "classic", label: "Klasyczny firmowy", description: "Sprawdzona struktura: tekst obok grafiki, niżej oferta i zaufanie.", mark: "▥" },
  { id: "editorial", label: "Editorial premium", description: "Duża typografia, szeroki hero i wizualne sekcje jak w magazynie.", mark: "▤" },
  { id: "minimal", label: "Minimal & elegancja", description: "Wyśrodkowane komunikaty, dużo oddechu i staranna siatka.", mark: "▭" },
  { id: "showcase", label: "Galeria i realizacje", description: "Mocniejsza część wizualna, niestandardowa kompozycja oraz oferta w kaflach.", mark: "◫" },
  { id: "contact", label: "Lokalny kontakt", description: "Telefon i szybkie zapytanie na pierwszym planie, oferta od razu pod nagłówkiem.", mark: "▦" },

  { id: "atelier", label: "Atelier asymetryczne", description: "Duży panel graficzny, zwarta oferta i naprzemienne sekcje dla marki kreatywnej.", mark: "◩" },
  { id: "catalog", label: "Katalog ofertowy", description: "Szybki przegląd usług, katalog kart i spokojna, praktyczna ścieżka do kontaktu.", mark: "▧" },
];
const plans = [
  { id: "wizytowka", label: "Wizytówka, 1 strona z 3 sekcjami", amount: 899 },
  { id: "jednostronicowa", label: "Strona jednostronicowa, 6–7 sekcji", amount: 1449 },
  { id: "firmowa", label: "Strona firmowa, do 6 podstron", amount: 2999 },
  { id: "rozbudowana", label: "Strona rozbudowana, do 12 podstron", amount: 4499 },
];
const careOptions = [
  { id: "none", label: "Bez usługi miesięcznej", amount: 0 },
  { id: "care", label: "Opieka nad stroną (monitoring)", amount: 79 },
  { id: "profile", label: "Profil Google", amount: 299 },
  { id: "local", label: "Lokalna widoczność", amount: 499 },
];
const pln = (amount) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(amount) + " zł";
const priceCap = (v) => Math.max(0, Math.min(100000, Number.isFinite(Number(v)) ? Number(v) : 0));
const safeText = (value, max = 70) => String(value).replace(/[<>]/g, "").trim().slice(0, max);

export default function WebsiteConfigurator() {
  const [industry, setIndustry] = useState("services");
  const [brand, setBrand] = useState("Solidna Usługa");
  const [place, setPlace] = useState("Warszawa i okolice");
  const [palette, setPalette] = useState("forest");
  const [siteLayout, setSiteLayout] = useState("classic");
  const [plan, setPlan] = useState("jednostronicowa");
  const [sections, setSections] = useState(["about", "services", "process", "faq", "contact"]);
  const [extras, setExtras] = useState(["contact"]);
  const [extraPages, setExtraPages] = useState(0);
  const [copywriting, setCopywriting] = useState(false);
  const [googleProfile, setGoogleProfile] = useState(false);
  const [care, setCare] = useState("none");
  const [gbpSetup, setGbpSetup] = useState(false);
  const [view, setView] = useState("desktop");

  const concept = industries.find((x) => x.id === industry) ?? industries[0];
  const theme = palettes.find((x) => x.id === palette) ?? palettes[0];
  const selectedPlan = plans.find((x) => x.id === plan) ?? plans[1];
  const selectedCare = careOptions.find((x) => x.id === care) ?? careOptions[0];
    const sectionsForPreview = useMemo(() => {
    // Wizytówka to krótka strona; pozostałe pakiety pokazują pełne sekcje pod nagłówkiem.
    if (plan === "wizytowka") return ["services", "about", "contact"];
    return ["services", "about", "process", "faq", "contact"].filter((section) => sections.includes(section));
  }, [plan, sections]);
  const quote = useMemo(() => {
    const small = plan === "wizytowka" || plan === "jednostronicowa";
    const big = plan === "firmowa" || plan === "rozbudowana";
    const items = [];
    if (plan === "wizytowka" && copywriting) items.push(249);
    if (plan === "wizytowka" && extras.includes("contact")) items.push(149);
    if (small && googleProfile) items.push(149);
    if (big && extraPages > 0) items.push(349 * extraPages);
    if (gbpSetup) items.push(390);
    const project = selectedPlan.amount + items.reduce((sum, value) => sum + value, 0);
    const manualItems = [
      ...(small && extraPages > 0 ? ["Dodatkowe podstrony"] : []),
      ...(extras.includes("booking") ? ["Rezerwacje"] : []),
      ...(extras.includes("crm") ? ["Mały CRM"] : []),
    ];
    return { project, gross: project * 1.23, monthly: selectedCare.amount, manualItems };
  }, [selectedPlan, selectedCare, copywriting, googleProfile, gbpSetup, extraPages, extras, plan]);

  function changeIndustry(id) {
    const newChoice = industries.find((x) => x.id === id) ?? industries[0];
    if (brand === concept.brand || !brand.trim()) setBrand(newChoice.brand);
    setIndustry(id);
  }
  function changePlan(id) {
    setPlan(id);
    setExtras((previous) => id === "wizytowka" ? previous.filter((x) => x !== "contact") : previous.includes("contact") ? previous : [...previous, "contact"]);
    if (id === "firmowa" || id === "rozbudowana") setCopywriting(false);
  }
  function toggle(setter, name) {
    setter((items) => items.includes(name) ? items.filter((x) => x !== name) : [...items, name]);
  }

  const businessName = safeText(brand, 56) || concept.brand;
  const locationName = safeText(place, 65) || "Twoja okolica";
  const features = [
    { id: "contact", label: "Formularz zapytań", hint: plan === "wizytowka" ? "dodatek +149 zł" : "w cenie wybranego pakietu" },
    { id: "booking", label: "Rezerwacje wizyt", hint: "osobna wycena" },
    { id: "crm", label: "Mały CRM", hint: "osobna wycena" },
  ];
  const summary = [
    "KONFIGURACJA STRONY WWW. ZM STUDIO",
    "Branża: " + concept.label + "; nazwa: " + businessName + "; obszar: " + locationName,
    "Kolory: " + theme.label + "; układ: " + (siteLayouts.find(x => x.id === siteLayout)?.label ?? "Klasyczny firmowy") + "; pakiet: " + selectedPlan.label,
    "Sekcje na stronie głównej: " + sectionsForPreview.join(", "),
    "Dodatkowe podstrony: " + extraPages + "; funkcje: " + (extras.join(", ") || "brak"),
    "Dodatki: teksty po rozmowie " + (copywriting && plan === "wizytowka" ? "tak" : "nie") + ", powiązanie z Profilem Firmy Google " + (googleProfile ? "tak" : "nie") + ", założenie lub uporządkowanie Profilu Google " + (gbpSetup ? "tak" : "nie"),
    "Usługa miesięczna: " + selectedCare.label + (selectedCare.amount ? " (od " + pln(selectedCare.amount) + " netto/mies.)" : ""),
    "Kwota jednorazowa: od " + pln(quote.project) + " netto (" + new Intl.NumberFormat("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(quote.gross) + " zł brutto)",
    quote.manualItems.length ? "DO OSOBNEJ WYCENY: " + quote.manualItems.join(", ") : "Bez pozycji wymagających osobnej wyceny.",
    "Kwoty orientacyjne, bez zobowiązania. Podgląd nie jest gotową stroną.",
  ].join("\n");
  const quoteUrl = "/kontakt?pakiet=" + encodeURIComponent("Projekt WWW z ZM Studio");

  return <div className="zm-creator" id="zm-studio-builder">
    <div className="zm-creator-top">
      <div className="zm-creator-config" aria-label="Konfiguracja strony i wyceny">
        <span className="section-no">01 / TWOJA FIRMA</span>
        <h3>Najpierw określ, co pokazujemy.</h3>
        <div className="zm-creator-pair">
          <label>Branża
            <select value={industry} onChange={(event) => changeIndustry(event.target.value)}>
              {industries.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </label>
          <label>Nazwa firmy
            <input value={brand} onChange={(event) => setBrand(event.target.value.slice(0, 56))} maxLength={56} placeholder="Nazwa Twojej firmy" />
          </label>
        </div>
        <label>Miasto lub obszar działania
          <input value={place} onChange={(event) => setPlace(event.target.value.slice(0, 65))} maxLength={65} placeholder="Np. Warszawa i okolice" />
        </label>
        <fieldset className="zm-creator-layouts" aria-label="Wybierz układ i wygląd strony">
          <legend>Układ gotowej strony, wybierz kompozycję</legend>
          <p>Warianty różnią się proporcjami nagłówka, układem oferty, sekcji i ścieżką kontaktu; nie tylko kolorami.</p>
          <div className="zm-creator-layout-grid">
            {siteLayouts.map((item) => <button type="button" key={item.id}
              aria-pressed={siteLayout === item.id} className={siteLayout === item.id ? "selected" : ""}
              onClick={() => setSiteLayout(item.id)}>
              <span className={"zm-creator-layout-icon layout-icon-" + item.id} aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="zm-creator-layout-label">{item.label}</span>
              <small>{item.description}</small>
            </button>)}
          </div>
        </fieldset>
        <div className="zm-creator-pair">
          <label>Kolorystyka, niezależna od układu
            <select value={palette} onChange={(event) => setPalette(event.target.value)}>
              {palettes.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </label>
          <label>Zakres wykonania
            <select value={plan} onChange={(event) => changePlan(event.target.value)}>
              {plans.map((x) => <option key={x.id} value={x.id}>{x.label}: od {pln(x.amount)}</option>)}
            </select>
          </label>
        </div>
        {plan !== "wizytowka" && <>
          <span className="section-no">02 / CO MA SIĘ ZNALEŹĆ NA STRONIE</span>
          <fieldset className="zm-creator-checks"><legend>Sekcje strony głównej</legend>
            {[["services", "Oferta usług"], ["about", "O firmie"], ["process", "Przebieg współpracy"], ["faq", "Pytania klientów"], ["contact", "Kontakt"]].map(([id, label]) =>
              <label key={id}><input type="checkbox" checked={sections.includes(id)}
                onChange={() => toggle(setSections, id)} /> {label}</label>)}
          </fieldset>
        </>}
        <fieldset className="zm-creator-checks"><legend>Funkcje i dodatki</legend>
          {features.map((x) => <label key={x.id}>
            <input type="checkbox" checked={extras.includes(x.id)}
              onChange={() => toggle(setExtras, x.id)} />
            <span>{x.label} <small>({x.hint})</small></span>
          </label>)}
        </fieldset>
        <p className="zm-creator-scope-note">{plan === "wizytowka" ? "Wizytówka: 3 sekcje na materiałach klienta. Formularz i teksty to dodatki. Rezerwacje i CRM wyceniamy indywidualnie." : "Formularz kontaktowy jest w cenie pakietu. Rezerwacje i CRM wyceniamy indywidualnie."}</p>
        <div className="zm-creator-pair">
          <label>Dodatkowe podstrony
            <select value={extraPages} onChange={(e) => setExtraPages(Number(e.target.value))}>
              {[0, 1, 2, 3, 5].map((n) => <option key={n} value={n}>{n === 0 ? "Nie potrzebuję" : n + " podstr."}{n && (plan === "firmowa" || plan === "rozbudowana") ? ", +349 zł każda" : n ? ", wycena indywidualna" : ""}</option>)}
            </select>
          </label>
          <div className="zm-creator-extra">
            {plan === "wizytowka" && <label><input type="checkbox" checked={copywriting} onChange={(e) => setCopywriting(e.target.checked)} /> Teksty po rozmowie +249 zł</label>}
            {(plan === "wizytowka" || plan === "jednostronicowa") && <label><input type="checkbox" checked={googleProfile} onChange={(e) => setGoogleProfile(e.target.checked)} /> Powiązanie z Profilem Firmy Google +149 zł</label>}
            <label><input type="checkbox" checked={gbpSetup} onChange={(e) => setGbpSetup(e.target.checked)} /> Założenie lub uporządkowanie Profilu Google od 390 zł</label>
          </div>
        </div>
        <span className="section-no">03 / PO PUBLIKACJI</span>
        <label>Usługa miesięczna (opcjonalnie)
          <select value={care} onChange={(e) => setCare(e.target.value)}>
            {careOptions.map((x) => <option key={x.id} value={x.id}>{x.amount ? x.label + ", od " + pln(x.amount) + " netto/mies." : x.label}</option>)}
          </select>
        </label>
        <p className="zm-creator-note">Hosting i certyfikat SSL są w cenie pakietu, bez opłat miesięcznych. Domena jest rejestrowana na Ciebie, a jej koszt płacisz rejestratorowi. Opieka obejmuje monitoring, a zmiany wyceniamy osobno.</p>
      </div>
      <aside className="zm-creator-quote" aria-live="polite" aria-label="Orientacyjna wycena projektu i utrzymania">
        <span className="section-no">TWÓJ BUDŻET / NA BIEŻĄCO</span>
        <h3>{selectedPlan.label}</h3>
        <div className="zm-creator-quote-main"><span>Jednorazowo</span><strong>od {pln(quote.project)} netto</strong></div>
        <dl>
          <div><dt>Brutto z 23% VAT</dt><dd>{new Intl.NumberFormat("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(quote.gross)} zł</dd></div>
          <div><dt>Miesięcznie (opcjonalnie)</dt><dd>{quote.monthly ? "od " + pln(quote.monthly) + " netto" : "0 zł"}</dd></div>
        </dl>
        {quote.manualItems.length > 0 &&
          <div className="zm-creator-manual"><strong>Do indywidualnej wyceny:</strong>
            <span>{quote.manualItems.join(", ")}</span></div>}
        <p>Kwoty są orientacyjne. Dokładny zakres i cenę potwierdzamy w ofercie po rozmowie, a płatność rozliczamy w układzie 30/70.</p>
        <a href={quoteUrl} className="button" onClick={() => { saveQuoteTransfer("Projekt WWW z ZM Studio", summary); trackAnalyticsEvent("website_creator_lead", { industry, palette, plan, extras: extras.length }); }}>Wyślij projekt i wycenę ↗</a>
        <a className="zm-creator-secondary-link" href="/oferta#pakiety">Szczegóły pakietów i dodatków ↗</a>
      </aside>
    </div>

    <section className="zm-creator-preview-wrap" aria-label="Cały podgląd przykładowej strony internetowej">
      <div className="zm-creator-preview-heading">
        <div>
          <span className="section-no">04 / PEŁNY PODGLĄD STRONY</span>
          <h3>Cała przykładowa strona: od menu po stopkę.</h3>
          <p>Wybierz jeden z pięciu prawdziwie różnych układów, niezależnie od kolorystyki. Przewiń podgląd od menu po stopkę. To projekt demonstracyjny; dodatkowe podstrony wymagają osobnego ustalenia zakresu.</p>
        </div>
        <div className="zm-creator-preview-modes" role="group" aria-label="Szerokość podglądu strony">
          <button type="button" aria-pressed={view === "desktop"} className={view === "desktop" ? "active" : ""} onClick={() => setView("desktop")}>Komputer</button>
          <button type="button" aria-pressed={view === "mobile"} className={view === "mobile" ? "active" : ""} onClick={() => setView("mobile")}>Telefon</button>
        </div>
      </div>
      <div className={"zm-creator-preview-frame " + (view === "mobile" ? "mobile" : "desktop")}>
        <div className={"zm-demo-page zm-demo-layout-" + siteLayout} style={{ "--demo-bg": theme.bg, "--demo-ink": theme.ink,
          "--demo-accent": theme.accent, "--demo-on-accent": palette === "dark" ? "#14291b" : "#fff", "--demo-text": theme.text, "--demo-panel": theme.panel, "--demo-hero": theme.hero }}>
          <header className="zm-demo-nav">
            <strong>{businessName}</strong>
            <div aria-hidden="true"><span>Oferta</span><span>O firmie</span><span>Kontakt</span></div>
            <span className="zm-demo-nav-cta" style={{ color: palette === "dark" ? "#112515" : "#fff" }}>Zapytaj ↗</span>
          </header>
          <div className="zm-demo-content">
            <section className="zm-demo-hero">
              <div className="zm-demo-hero-inner">
                <span className="zm-demo-overline">{concept.kicker.replace("TWOJE MIASTO",locationName.toUpperCase("pl-PL"))}</span>
                <h2>{concept.title}</h2>
                <p>{concept.lead}</p>
                <span className="zm-demo-hero-cta">{siteLayout === "contact" ? "Zadzwoń lub wyślij zapytanie ↗" : siteLayout === "showcase" ? "Zobacz nasze realizacje ↗" : "Poznaj ofertę ↗"}</span>
                <span className="zm-demo-hero-location">OBSZAR DZIAŁANIA · {locationName.toUpperCase("pl-PL")}</span>
              </div>
              <div className="zm-demo-art" aria-hidden="true"><span>{businessName.split(" ").slice(0,2).map((w)=>w.slice(0,1)).join("")}</span></div>
            </section>
            {sectionsForPreview.includes("services") && <section className="zm-demo-section">
              <span className="zm-demo-kicker">01 / NASZA OFERTA</span>
              <h3>{siteLayout === "showcase" ? "Wybrane realizacje i usługi." : siteLayout === "minimal" ? "Prosto o tym, co ważne." : "W czym możemy pomóc?"}</h3>
              <p>Przykładowa prezentacja usług z czytelną hierarchią i możliwością przejścia do kontaktu.</p>
              <div className="zm-demo-services">{concept.services.map((name, index) =>
                <article key={name}><span>0{index + 1}</span><h4>{name}</h4><p>Zakres usługi i najważniejsze informacje przedstawione zrozumiałym językiem.</p><b>Zapytaj o usługę ↗</b></article>)}</div>
            </section>}
            {sectionsForPreview.includes("about") && <section className="zm-demo-section zm-demo-about">
              <div><span className="zm-demo-kicker">02 / O FIRMIE</span><h3>Poznaj nas bliżej.</h3><p>{concept.about}</p></div>
              <div className="zm-demo-about-visual" aria-hidden="true"><span>Twoja firma. Twoja historia.</span></div>
            </section>}
            {sectionsForPreview.includes("process") && <section className="zm-demo-section">
              <span className="zm-demo-kicker">03 / JAK DZIAŁAMY</span>
              <h3>Od pierwszego kontaktu do realizacji.</h3>
              <div className="zm-demo-steps">
                {["Opisz potrzebę", "Ustalmy szczegóły", "Przystępujemy do pracy"].map((value,i)=>
                  <div key={value}><span>0{i+1}</span><h4>{value}</h4><p>Przejrzysty krok współpracy, bez niejasnych procedur.</p></div>)}
              </div>
            </section>}
            {sectionsForPreview.includes("faq") && <section className="zm-demo-section zm-demo-faq">
              <span className="zm-demo-kicker">04 / PYTANIA KLIENTÓW</span>
              <h3>Warto wiedzieć przed kontaktem.</h3>
              <div className="zm-demo-faq-item"><strong>{concept.question}</strong><p>{concept.answer}</p></div>
              <div className="zm-demo-faq-item"><strong>Jak uzyskać wycenę?</strong><p>Prześlij opis potrzeb i zakresu. Otrzymasz informację o kolejnych krokach.</p></div>
            </section>}
            {sectionsForPreview.includes("contact") && <section className="zm-demo-section zm-demo-contact">
              <span className="zm-demo-kicker">KONTAKT / {locationName.toUpperCase("pl-PL")}</span>
              <h3>Porozmawiajmy o Twojej potrzebie.</h3>
              <p>Na gotowej stronie w tym miejscu pojawi się właściwy telefon, e-mail i adres firmy.</p>
              {extras.includes("contact") && <div className="zm-demo-form" aria-label="Nieaktywny podgląd formularza">
                <span>Imię i nazwisko</span><span>Adres e-mail</span><span>W czym możemy pomóc?</span>
                <b>Wyślij zapytanie ↗</b>
              </div>}
              {extras.includes("booking") && <div className="zm-demo-inline-feature">Kalendarz rezerwacji, funkcja do indywidualnej wyceny</div>}
              {extras.includes("crm") && <div className="zm-demo-inline-feature">CRM działałby na zapleczu, nie jako publiczny element strony</div>}
            </section>}
          </div>
          <footer className="zm-demo-footer"><strong>{businessName}</strong><span>Oferta · O firmie · Kontakt</span>
            <small>Przykładowa stopka. Informacje i politykę prywatności uzupełnimy podczas realizacji.</small></footer>
        </div>
      </div>
    </section>
  </div>;
}
