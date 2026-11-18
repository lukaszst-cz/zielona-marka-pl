"use client";

import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";
import { saveQuoteTransfer } from "./QuoteTransfer";

type PackageId = "wizytowka" | "jednostronicowa" | "firmowa" | "rozbudowana";

const packages: { id: PackageId; name: string; price: number }[] = [
  { id: "wizytowka", name: "Wizytówka, 1 strona z 3 sekcjami", price: 899 },
  { id: "jednostronicowa", name: "Strona jednostronicowa, 6–7 sekcji", price: 1449 },
  { id: "firmowa", name: "Strona firmowa, do 6 podstron", price: 2999 },
  { id: "rozbudowana", name: "Strona rozbudowana, do 12 podstron", price: 4499 },
];

const seoOptions = [
  { id: "none", name: "Bez miesięcznej obsługi Google", monthly: 0 },
  { id: "profile", name: "Profil Google, 2 wpisy miesięcznie", monthly: 299 },
  { id: "local", name: "Lokalna widoczność, 4 wpisy i tekst na stronę", monthly: 499 },
] as const;

type Extra = { id: string; name: string; price: number; only?: PackageId[] };

const extras: Extra[] = [
  { id: "texts", name: "Teksty po rozmowie lub mailu: +249 zł", price: 249, only: ["wizytowka"] },
  { id: "form", name: "Formularz kontaktowy: +149 zł", price: 149, only: ["wizytowka"] },
  { id: "section", name: "Dodatkowa sekcja: +149 zł", price: 149, only: ["wizytowka", "jednostronicowa"] },
  { id: "seotexts", name: "Teksty pod Google i asystentów AI: +290 zł", price: 290, only: ["wizytowka", "jednostronicowa"] },
  { id: "gbp-link", name: "Powiązanie z Profilem Firmy Google: +149 zł", price: 149, only: ["wizytowka", "jednostronicowa"] },
  { id: "page", name: "Dodatkowa podstrona z tekstem: +349 zł", price: 349, only: ["firmowa", "rozbudowana"] },
  { id: "gbp-setup", name: "Założenie lub uporządkowanie Profilu Firmy Google: od 390 zł", price: 390 },
];

const group = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
const pln = (value: number) => group(String(Math.round(value))) + " zł";
const plnGross = (value: number) => { const [whole, cents] = (value * 1.23).toFixed(2).split("."); return group(whole) + "," + cents + " zł"; };

export default function TotalCostCalculator() {
  const [pack, setPack] = useState<PackageId>("firmowa");
  const [care, setCare] = useState(false);
  const [seo, setSeo] = useState<(typeof seoOptions)[number]["id"]>("none");
  const [chosen, setChosen] = useState<string[]>([]);
  const [wish, setWish] = useState("");

  const available = extras.filter((item) => !item.only || item.only.includes(pack));
  const selectedPack = packages.find((item) => item.id === pack) ?? packages[2];
  const selectedSeo = seoOptions.find((item) => item.id === seo) ?? seoOptions[0];

  const result = useMemo(() => {
    const active = extras.filter((item) => chosen.includes(item.id) && (!item.only || item.only.includes(pack)));
    const oneTime = selectedPack.price + active.reduce((sum, item) => sum + item.price, 0);
    const monthly = (care ? 79 : 0) + selectedSeo.monthly;
    return { active, oneTime, monthly };
  }, [chosen, pack, care, selectedPack, selectedSeo]);

  const toggle = (id: string) => setChosen((list) => list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const cleanWish = wish.replace(/[<>]/g, "").trim().slice(0, 400);

  const summary = [
    "Pakiet: " + selectedPack.name,
    "Dodatki: " + (result.active.length ? result.active.map((item) => item.name.split(":")[0]).join(", ") : "brak"),
    "Opieka nad stroną: " + (care ? "tak, od 79 zł netto/mies." : "nie"),
    "Obsługa Google: " + selectedSeo.name + (selectedSeo.monthly ? ", od " + pln(selectedSeo.monthly) + " netto/mies." : ""),
    "Kwota jednorazowa: od " + pln(result.oneTime) + " netto",
    "Miesięcznie: " + (result.monthly ? "od " + pln(result.monthly) + " netto" : "0 zł"),
    cleanWish ? "Potrzebuję też: " + cleanWish : "",
  ].filter(Boolean).join("\n");

  const url = "/kontakt?pakiet=" + encodeURIComponent(selectedPack.name.split(",")[0]);

  return <div className="zm-total-builder" id="kalkulator-pelnego-kosztu">
    <div className="zm-total-fields">
      <div className="zm-field"><label htmlFor="zm-cost-site">1. Wybierz pakiet</label>
        <select id="zm-cost-site" value={pack} onChange={(event) => setPack(event.target.value as PackageId)}>
          {packages.map((item) => <option value={item.id} key={item.id}>{item.name}: od {pln(item.price)} netto</option>)}
        </select>
        <small>Hosting i certyfikat SSL są w cenie pakietu. Domena jest rejestrowana na Ciebie, a jej koszt płacisz rejestratorowi.</small>
      </div>
      <fieldset className="zm-cost-extras"><legend>2. Opcje po publikacji</legend>
        <label><input type="checkbox" checked={care} onChange={(e) => setCare(e.target.checked)} /> Opieka nad stroną: od 79 zł netto/mies.</label>
        {seoOptions.slice(1).map((item) => <label key={item.id}><input type="radio" name="zm-seo" checked={seo === item.id} onChange={() => setSeo(item.id)} onClick={() => seo === item.id && setSeo("none")} /> {item.name}: od {pln(item.monthly)} netto/mies.</label>)}
      </fieldset>
      <fieldset className="zm-cost-extras"><legend>Dodatki jednorazowe do wybranego pakietu</legend>
        {available.map((item) => <label key={item.id}><input type="checkbox" checked={chosen.includes(item.id)} onChange={() => toggle(item.id)} /> {item.name}</label>)}
      </fieldset>
      <div className="zm-field"><label htmlFor="zm-cost-wish">Potrzebuję też (sklep, rezerwacje, panel klientów, inne)</label>
        <textarea id="zm-cost-wish" rows={3} maxLength={400} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Na przykład: rezerwacje terminów online" />
        <small>Takie funkcje wyceniamy indywidualnie, więc nie wliczamy ich do kwoty obok.</small>
      </div>
    </div>
    <div className="zm-total-results" aria-live="polite">
      <span className="section-no">3. TWÓJ ORIENTACYJNY BUDŻET</span>
      <h3>Wyliczenie dla wybranego pakietu.</h3>
      <div className="zm-cost-total"><span>Jednorazowo</span><strong>od {pln(result.oneTime)} netto</strong></div>
      <div className="zm-cost-next"><span>Brutto z 23% VAT</span><strong>{plnGross(result.oneTime)}</strong></div>
      <div className="zm-cost-next"><span>Miesięcznie (opcjonalnie)</span><strong>{result.monthly ? "od " + pln(result.monthly) + " netto" : "0 zł"}</strong></div>
      <p>Kwoty są orientacyjne i nie stanowią wiążącej oferty. Dokładny zakres, termin i cenę potwierdzamy w ofercie po rozmowie. Płatność jest rozliczana w układzie 30/70. Domena jest rejestrowana na Ciebie, a jej koszt płacisz rejestratorowi.</p>
      <a className="button" href={url} onClick={() => { saveQuoteTransfer(selectedPack.name, summary); trackAnalyticsEvent("website_quote_to_contact", { package_id: pack, care_plan: care ? "yes" : "no", seo_plan: seo }); }}>Wyślij zapytanie <span aria-hidden="true">↗</span></a>
      <a className="zm-cost-link" href="/cennik-dodatkow">Zobacz pełny cennik dodatków ↗</a>
    </div>
  </div>;
}
