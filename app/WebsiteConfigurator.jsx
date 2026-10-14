"use client";
import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";

const industries = [
  { id: "services", label: "Firma usługowa", brand: "Solidna Usługa", title: "Dobra usługa zaczyna się od zaufania.", sub: "Uczciwa wycena i wygodny kontakt. Sprawdź, jak możemy Ci pomóc.", action: "Poproś o wycenę" },
  { id: "beauty", label: "Beauty i wellness", brand: "Natura Studio", title: "Czas na chwilę dla siebie.", sub: "Zabiegi i pielęgnacja w przyjaznej atmosferze. Umów dogodny termin.", action: "Umów wizytę" },
  { id: "auto", label: "Warsztat", brand: "Auto Expert", title: "Twój samochód w dobrych rękach.", sub: "Przeglądy, naprawy i szybki kontakt z serwisem.", action: "Zapytaj o termin" },
  { id: "food", label: "Gastronomia", brand: "Bistro Forma", title: "Smak, po który chce się wracać.", sub: "Poznaj menu, godziny otwarcia i nasze miejsce.", action: "Zobacz menu" },
];
const palettes = [
  { id: "forest", label: "Botaniczny", bg: "#eef1e6", ink: "#17442f", accent: "#23754e", card: "#fff" },
  { id: "ocean", label: "Nowoczesny", bg: "#eaf1f9", ink: "#203b56", accent: "#2269aa", card: "#fff" },
  { id: "dark", label: "Premium", bg: "#161d1e", ink: "#f6f4eb", accent: "#b4d17e", card: "#26302d" },
];
const addOns = [
  { id: "contact", label: "Formularz zapytań" }, { id: "booking", label: "Rezerwacje" },
  { id: "seo", label: "SEO lokalne" }, { id: "crm", label: "Mały CRM" },
];

export default function WebsiteConfigurator() {
  const [industry, setIndustry] = useState("services");
  const [palette, setPalette] = useState("forest");
  const [chosen, setChosen] = useState(["contact"]);
  const [length, setLength] = useState("start");
  const selected = useMemo(() => industries.find((x) => x.id === industry) ?? industries[0], [industry]);
  const theme = palettes.find((x) => x.id === palette) ?? palettes[0];
  const currentAddOns = addOns.filter((x) => chosen.includes(x.id));
  const previewCopy = [
    "Prośba o wycenę z konfiguratora ZM Studio",
    "Branża: " + selected.label, "Styl: " + theme.label,
    "Wariant: " + (length === "mini" ? "Wizytówka ZM Mini" : "Kompletna strona"),
    "Funkcje: " + (currentAddOns.map((x) => x.label).join(", ") || "bez dodatkowych funkcji"),
    "Proszę o indywidualną ofertę na podstawie wybranej koncepcji.",
  ].join("\n");
  const quoteUrl = "/kontakt?pakiet=" + encodeURIComponent("Projekt WWW z ZM Studio")
    + "&wycena=" + encodeURIComponent(previewCopy);
  function toggle(id) {
    setChosen((list) => list.includes(id) ? list.filter((v) => v !== id) : [...list, id]);
  }
  return <div className="zm-web-creator">
    <div className="zm-total-fields">
      <span className="section-no">DOPASUJ WYGLĄD I FUNKCJE</span>
      <div className="zm-field"><label htmlFor="zm-web-industry">Dla jakiej firmy powstaje strona?</label>
        <select id="zm-web-industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          {industries.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </div>
      <div className="zm-field"><label htmlFor="zm-web-style">Styl graficzny</label>
        <select id="zm-web-style" value={palette} onChange={(e) => setPalette(e.target.value)}>
          {palettes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </div>
      <div className="zm-field"><label htmlFor="zm-web-type">Rodzaj strony</label>
        <select id="zm-web-type" value={length} onChange={(e) => setLength(e.target.value)}>
          <option value="mini">ZM Mini – prosta wizytówka</option>
          <option value="start">Pełna strona firmowa</option>
        </select>
      </div>
      <fieldset className="zm-cost-extras"><legend>Wybierz opcjonalne funkcje</legend>
        {addOns.map((item) => <label key={item.id}><input type="checkbox" checked={chosen.includes(item.id)}
          onChange={() => toggle(item.id)} />{item.label}</label>)}
      </fieldset>
      <p className="zm-dtp-hint">Podgląd jest demonstracją układu i kolorów. Funkcje są elementem zapytania, a nie aktywną rezerwacją lub CRM. Cena zależy od ostatecznego zakresu.</p>
      <a href={quoteUrl} className="button" onClick={() => trackAnalyticsEvent("website_creator_lead", { industry, palette, extras: chosen.length })}>
        Wyślij projekt do wyceny ↗
      </a>
      <a href="/oferta#kalkulator-pelnego-kosztu" className="zm-web-estimate-link">Sprawdź koszt wykonania i utrzymania strony ↗</a>
    </div>
    <div className="zm-web-preview-shell"><div className="zm-web-preview" style={{ background: theme.bg, color: theme.ink }}>
      <div className="zm-web-preview-nav"><b>{selected.brand}</b><span>Oferta · O nas · Kontakt</span></div>
      <section className="zm-web-preview-hero"><small>PRZYKŁADOWA STRONA / DEMONSTRACJA</small>
        <h3>{selected.title}</h3><p>{selected.sub}</p>
        <span className="zm-web-preview-button" style={{ background: theme.accent, color: palette === "dark" ? "#102116" : "#fff" }}>{selected.action} ↗</span>
      </section>
      <div className="zm-web-preview-blocks">
        <div style={{ background: theme.card, color: theme.ink }}><strong>01 / Oferta</strong><p>Przejrzysty opis usług i najważniejszych informacji.</p></div>
        <div style={{ background: theme.card, color: theme.ink }}><strong>02 / Kontakt</strong><p>{currentAddOns.some((x) => x.id === "booking") ? "Rezerwacje i kontakt z firmą." : "Telefon, adres i dogodny sposób zapytania."}</p></div>
        {length !== "mini" && <div style={{ background: theme.card, color: theme.ink }}><strong>03 / Więcej możliwości</strong><p>{currentAddOns.map((x) => x.label).join(" · ") || "Dodatkowe treści i realizacje."}</p></div>}
      </div>
      <div className="zm-web-preview-bottom">Projekt demonstracyjny Zielonej Marki</div>
    </div></div>
  </div>;
}
