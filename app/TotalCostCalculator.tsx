"use client";

import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";
import { saveQuoteTransfer } from "./QuoteTransfer";

const siteOptions = [
  { id: "mini", name: "ZM Mini – 3 sekcje, bez formularza", price: 899 },
  { id: "start", name: "ZM Start – kompletna strona", price: 1449 },
  { id: "leadflow", name: "ZM LeadFlow – strona z formularzem", price: 4490 },
  { id: "flow", name: "ZM Flow – strona i automatyzacja", price: 6900 },
] as const;

const careOptions = [
  { id: "none", name: "Bez opieki – rozliczenie na zgłoszenie", monthly: 0 },
  { id: "mini", name: "Opieka Mini – monitoring strony statycznej", monthly: 79 },
  { id: "standard", name: "Opieka Standard – kontrola i zmiany", monthly: 249 },
  { id: "plus", name: "Opieka Plus – szersze wsparcie", monthly: 490 },
] as const;

const hostingOptions = [
  { id: "own", name: "Mam już hosting", first: 0, next: 0 },
  { id: "static", name: "Statyczna witryna – wariant bezpłatny, jeśli wystarczy", first: 0, next: 0 },
  { id: "basic", name: "Hosting podstawowy – budżet orientacyjny", first: 200, next: 300 },
  { id: "wordpress", name: "Hosting WordPress – budżet orientacyjny", first: 350, next: 500 },
] as const;

const pln = (value: number) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(value) + " zł";
const cap = (value: number) => Number.isFinite(value) ? Math.min(100000, Math.max(0, value)) : 0;

export default function TotalCostCalculator() {
  const [site, setSite] = useState<(typeof siteOptions)[number]["id"]>("start");
  const [care, setCare] = useState<(typeof careOptions)[number]["id"]>("none");
  const [hosting, setHosting] = useState<(typeof hostingOptions)[number]["id"]>("basic");
  const [domainType, setDomainType] = useState("new");
  const [domainFirst, setDomainFirst] = useState(20);
  const [domainNext, setDomainNext] = useState(90);
  const [ownHostingFirst, setOwnHostingFirst] = useState(0);
  const [ownHostingNext, setOwnHostingNext] = useState(0);
  const [copywriting, setCopywriting] = useState(false);
  const [googleProfile, setGoogleProfile] = useState(false);

  const result = useMemo(() => {
    const selectedSite = siteOptions.find((item) => item.id === site) ?? siteOptions[1];
    const selectedCare = careOptions.find((item) => item.id === care) ?? careOptions[0];
    const selectedHost = hostingOptions.find((item) => item.id === hosting) ?? hostingOptions[2];
    const production = selectedSite.price + (copywriting ? 350 : 0) + (googleProfile ? 390 : 0);
    const domainYear1 = domainType === "new" ? cap(domainFirst) : cap(domainNext);
    const domainRenewal = cap(domainNext);
    const hostYear1 = hosting === "own" ? cap(ownHostingFirst) : selectedHost.first;
    const hostYearNext = hosting === "own" ? cap(ownHostingNext) : selectedHost.next;
    const providerYear1 = domainYear1 + hostYear1;
    const providerYearNext = domainRenewal + hostYearNext;
    const careYear = selectedCare.monthly * 12;
    const firstYear = production + providerYear1 + careYear;
    const nextYear = providerYearNext + careYear;
    return { selectedSite, selectedCare, selectedHost, production, providerYear1, providerYearNext, careYear, firstYear, nextYear, threeYears: firstYear + 2 * nextYear };
  }, [site, care, hosting, domainType, domainFirst, domainNext, ownHostingFirst, ownHostingNext, copywriting, googleProfile]);

  const summary = [
    result.selectedSite.name,
    "Wykonanie i wybrane dodatki: " + pln(result.production) + " netto",
    "Domena i hosting (rok 1): " + pln(result.providerYear1) + " netto, szacunek dostawcy",
    "Opieka: " + result.selectedCare.name + ", " + pln(result.selectedCare.monthly) + " netto/mies.",
    "Łączny szacunek roku 1: " + pln(result.firstYear) + " netto",
    "Koszt kolejnego roku: " + pln(result.nextYear) + " netto",
    "3 lata: " + pln(result.threeYears) + " netto",
    "Dostawca hostingu: " + result.selectedHost.name,
  ].join("\n");

  const url = "/kontakt?pakiet=" + encodeURIComponent(result.selectedSite.name);

  return <div className="zm-total-builder" id="kalkulator-pelnego-kosztu">
    <div className="zm-total-fields">
      <div className="zm-field"><label htmlFor="zm-cost-site">1. Wykonanie strony</label>
        <select id="zm-cost-site" value={site} onChange={(event) => setSite(event.target.value as typeof site)}>
          {siteOptions.map((item) => <option value={item.id} key={item.id}>{item.name} – od {pln(item.price)} netto</option>)}
        </select>
      </div>
      <div className="zm-field"><label htmlFor="zm-cost-domain">2. Domena</label>
        <select id="zm-cost-domain" value={domainType} onChange={(event) => setDomainType(event.target.value)}>
          <option value="new">Nowa domena .pl – wprowadź szacunkowe opłaty</option>
          <option value="own">Mam już domenę – podam cenę jej odnowienia</option>
        </select>
      </div>
      <div className="zm-cost-pair">
        {domainType === "new" && <div className="zm-field"><label htmlFor="zm-domain-first">Rejestracja (rok 1), zł netto</label><input id="zm-domain-first" type="number" min={0} max={100000} value={domainFirst} onChange={(e) => setDomainFirst(cap(Number(e.target.value)))} /></div>}
        <div className="zm-field"><label htmlFor="zm-domain-renew">Odnowienie domeny, zł netto/rok</label><input id="zm-domain-renew" type="number" min={0} max={100000} value={domainNext} onChange={(e) => setDomainNext(cap(Number(e.target.value)))} /></div>
      </div>
      <div className="zm-field"><label htmlFor="zm-cost-host">3. Hosting i serwer</label>
        <select id="zm-cost-host" value={hosting} onChange={(event) => setHosting(event.target.value as typeof hosting)}>
          {hostingOptions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
        </select>
        <small>Kwoty dostawcy są przykładowymi budżetami, nie ofertą konkretnego operatora. Hosting 0 zł może wymagać spełnienia warunków planu bezpłatnego. SSL często bywa bezpłatny.</small>
      </div>
      {hosting === "own" && <div className="zm-cost-pair"><div className="zm-field"><label htmlFor="zm-host-own-first">Hosting na pierwszy rok, zł netto</label><input id="zm-host-own-first" type="number" min={0} max={100000} value={ownHostingFirst} onChange={(e) => setOwnHostingFirst(cap(Number(e.target.value)))} /></div><div className="zm-field"><label htmlFor="zm-host-own-next">Hosting – roczne odnowienie, zł netto</label><input id="zm-host-own-next" type="number" min={0} max={100000} value={ownHostingNext} onChange={(e) => setOwnHostingNext(cap(Number(e.target.value)))} /></div></div>}
      <div className="zm-field"><label htmlFor="zm-cost-care">4. Opcjonalna opieka</label>
        <select id="zm-cost-care" value={care} onChange={(event) => setCare(event.target.value as typeof care)}>
          {careOptions.map((item) => <option value={item.id} key={item.id}>{item.name} – {pln(item.monthly)} netto/mies.</option>)}
        </select>
        <small>Opieka Mini przeznaczona jest wyłącznie dla prostych stron statycznych. Dla WordPressa lub sklepu zakres ustalany jest osobno.</small>
      </div>
      <fieldset className="zm-cost-extras"><legend>5. Dodatki jednorazowe</legend>
        <label><input type="checkbox" checked={copywriting} onChange={(e) => setCopywriting(e.target.checked)} /> Pomoc w tekstach – od 350 zł netto</label>
        <label><input type="checkbox" checked={googleProfile} onChange={(e) => setGoogleProfile(e.target.checked)} /> Uporządkowanie Profilu Firmy Google – od 390 zł netto</label>
      </fieldset>
    </div>
    <div className="zm-total-results" aria-live="polite">
      <span className="section-no">TWÓJ ORIENTACYJNY BUDŻET</span>
      <h3>Pełny koszt, bez ukrywania odnowień.</h3>
      <dl>
        <div><dt>Wykonanie + dodatki (jednorazowo)</dt><dd>{pln(result.production)}</dd></div>
        <div><dt>Domena + hosting w 1. roku (zewnętrzne)</dt><dd>{pln(result.providerYear1)}</dd></div>
        <div><dt>Opieka w 1. roku ({pln(result.selectedCare.monthly)}/mies.)</dt><dd>{pln(result.careYear)}</dd></div>
      </dl>
      <div className="zm-cost-total"><span>Razem pierwszy rok</span><strong>{pln(result.firstYear)}</strong></div>
      <div className="zm-cost-next"><span>Kolejny rok (odnowienia + opieka)</span><strong>{pln(result.nextYear)}</strong></div>
      <div className="zm-cost-next"><span>Łącznie 3 lata</span><strong>{pln(result.threeYears)}</strong></div>
      <p>Wszystkie kwoty netto, orientacyjne i nie stanowią wiążącej oferty. Ceny domeny i hostingu zależą od operatora; konto i faktura powinny należeć do klienta. Dla posiadanych już usług wprowadź ich rzeczywiste koszty roczne. Zakładamy 12 miesięcy opieki w każdym porównywanym roku. Ostateczną wycenę potwierdzamy przed zamówieniem.</p>
      <a className="button" href={url} onClick={() => { saveQuoteTransfer(result.selectedSite.name, summary); trackAnalyticsEvent("website_quote_to_contact", { package_id: site, care_plan: care, hosting_type: hosting }); }}>Wyślij konfigurację do wyceny <span aria-hidden="true">↗</span></a>
      <a className="zm-cost-link" href="/opieka-nad-strona">Porównaj zakres opieki ↗</a>
    </div>
  </div>;
}
