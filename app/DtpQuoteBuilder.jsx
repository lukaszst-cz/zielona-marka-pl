"use client";

import { useEffect, useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";
import { saveQuoteTransfer } from "./QuoteTransfer";
import { asMoney, dtpFormats, dtpKinds, periodOptions, priceDtp } from "./dtp-pricing.mjs";

const defaults = {
  kind: "folder", format: "a4", pages: 4, copies: 500,
  textFiles: 2, textStatus: "ready", imageFiles: 6, imageStatus: "ready",
  stockPhotos: 0, projectStatus: "reference", products: 0, versions: 1,
  frequency: "once", editions: 3, changeLevel: "medium", urgent: false,
  correctionRounds: 1, printSpec: "unknown", finish: "standard", description: "",
};
const stepNames = ["Rodzaj i format", "Materiały i projekt", "Terminy i współpraca", "Twoja wycena"];
const clamp = (value, min, max) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export default function DtpQuoteBuilder() {
  const [state, setState] = useState(defaults);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const quote = useMemo(() => priceDtp(state), [state]);
  const update = (key, value) => setState((prev) => ({ ...prev, [key]: value }));
  function updateKind(id) {
    const selected = dtpKinds.find((item) => item.id === id) ?? dtpKinds[0];
    setState((prev) => ({
      ...prev, kind: id, pages: selected.defaultPages,
      frequency: id === "preflight" ? "once" : prev.frequency,
      format: id === "wizytowka" ? "business" : prev.format === "business" ? "a4" : prev.format,
    }));
  }
  function navigate(next) {
    setStep(next);
    if (next === 3 && typeof window !== "undefined") {
      trackAnalyticsEvent("dtp_quote_complete", {
        product: state.kind, frequency: state.frequency, editions: quote.count,
      });
    }
  }
  const summary = [
    "Wycena DTP / Zielona Marka",
    "Produkt: " + quote.kind.name + ", format: " + quote.format.name + ", strony/panele: " + quote.pages,
    "Nakład do wyceny w drukarni: " + state.copies + " szt., wykończenie: " + state.finish,
    "Teksty: " + state.textFiles + " plików / " + state.textStatus,
    "Grafiki: " + state.imageFiles + " plików / " + state.imageStatus + ", dodatkowe zdjęcia: " + state.stockPhotos,
    "Projekt: " + state.projectStatus + ", pozycje produktowe: " + state.products + ", wersje: " + state.versions,
    "Specyfikacja drukarni: " + state.printSpec + ", rundy zmian: " + state.correctionRounds,
    "Tryb: " + state.frequency + ", liczba wydań: " + quote.count + ", zakres zmian: " + state.changeLevel + ", pilne: " + (state.urgent ? "tak" : "nie"),
    "Pierwsze wydanie: " + asMoney(quote.first) + " netto",
    ...(quote.recurring ? [
      "Wydanie 2: " + asMoney(quote.next) + " netto",
      "Cała seria: " + asMoney(quote.total) + " netto; oszczędność: " + asMoney(quote.saved),
      "Rabaty progresywne od pracy nad układem: " + quote.series.map((item) => item.number + ":" + item.discountPercent + "%").join(", "),
    ] : []),
    "Uwagi: " + (state.description.trim().slice(0, 250) || "brak"),
    "Druk/dostawa/licencje zdjęć poza wyceną. Potwierdzenie po obejrzeniu materiałów.",
  ].join("\n");
  const contactUrl = "/kontakt?pakiet=" + encodeURIComponent("DTP: " + quote.kind.name);

  const numeric = (id, label, key, max = 200, min = 0, disabled = false) =>
    <div className="zm-field"><label htmlFor={id}>{label}</label><input id={id} type="number" min={min} max={max} value={state[key]}
      disabled={disabled} onChange={(event) => update(key, clamp(Number(event.target.value), min, max))}/></div>;
  const select = (id, label, key, options, hint = "") =>
    <div className="zm-field"><label htmlFor={id}>{label}</label><select id={id} value={state[key]} onChange={(event) => update(key, event.target.value)}>
      {options.map(([value, name]) => <option key={value} value={value}>{name}</option>)}
    </select>{hint && <small>{hint}</small>}</div>;

  return <div className="zm-dtp-builder" id="kalkulator-dtp" data-ready={hydrated ? "true" : "false"}>
    <div className="zm-dtp-stepper" aria-label="Etapy konfiguratora DTP">
      {stepNames.map((name, index) => <button type="button" key={name} disabled={!hydrated} onClick={() => navigate(index)}
        className={index === step ? "selected" : ""} aria-current={index === step ? "step" : undefined}>
        <span>{String(index + 1).padStart(2, "0")}</span>{name}
      </button>)}
    </div>
    <div className="zm-dtp-wizard-grid">
      <div className="zm-total-fields">
        <span className="section-no">KROK {step + 1} Z 4</span>
        {step === 0 && <>
          <h3>Jaki materiał przygotowujemy?</h3>
          <div className="zm-field"><label htmlFor="dtp-kind-change">Zmiana rodzaju materiału</label><select id="dtp-kind-change" value={state.kind} onChange={(event) => updateKind(event.target.value)}>
            {dtpKinds.map((kind) => <option key={kind.id} value={kind.id}>{kind.name}</option>)}
          </select><small>Wybranie innego materiału ustawi typową liczbę stron. Dla niestandardowych układów potwierdzimy produkcję.</small></div>
          {select("dtp-format", "Format docelowy", "format", dtpFormats.map((item) => [item.id, item.name]))}
          <div className="zm-cost-pair">
            {numeric("dtp-pages", state.kind === "folder" ? "Panele / strony" : "Liczba stron", "pages", 64, (dtpKinds.find((item) => item.id === state.kind) ?? dtpKinds[0]).minPages, state.kind === "wizytowka")}
            {numeric("dtp-copies", "Planowany nakład (sztuk)", "copies", 100000)}
          </div>
          {select("dtp-finish", "Wykończenie / składanie", "finish", [
            ["standard", "Standardowe"], ["laminat", "Folia / laminat"], ["falzowanie", "Falzowanie / bigowanie"],
            ["zszywanie", "Zszywanie"], ["nietypowe", "Niestandardowe"],
          ], "Nakład i wykończenie służą zapytaniu do drukarni. Koszt druku jest liczony odrębnie.")}
          {select("dtp-spec", "Czy masz specyfikację drukarni?", "printSpec", [
            ["unknown", "Nie, potrzebuję pomocy"], ["yes", "Tak, mam wymagania PDF, spady i profil"], ["choose", "Proszę dobrać drukarnię"],
          ])}
        </>}
        {step === 1 && <>
          <h3>Jakie materiały już masz?</h3>
          <div className="zm-cost-pair">
            {numeric("dtp-text-files", "Liczba plików tekstowych", "textFiles")}
            {numeric("dtp-images", "Liczba grafik i zdjęć", "imageFiles")}
          </div>
          {select("dtp-texts", "Gotowość tekstów", "textStatus", [
            ["ready", "Teksty gotowe i zaakceptowane"], ["partial", "Teksty wymagają uporządkowania"], ["writing", "Teksty do napisania"],
          ])}
          {select("dtp-graphics", "Stan grafik", "imageStatus", [
            ["ready", "Grafiki gotowe do użycia"], ["retouch", "Wymagają obróbki i korekt"],
          ])}
          <div className="zm-cost-pair">
            {numeric("dtp-stock", "Ile dodatkowych zdjęć trzeba dobrać?", "stockPhotos", 20)}
            {numeric("dtp-products", "Pozycje produktowe (jeśli dotyczy)", "products", 1000)}
          </div>
          {select("dtp-project", "Czy istnieje projekt lub makieta?", "projectStatus", [
            ["ready", "Jest gotowa makieta / projekt"], ["reference", "Mam przykład lub inspiracje"], ["none", "Potrzebny projekt od zera"],
          ])}
          <div className="zm-cost-pair">
            {numeric("dtp-versions", "Wersje językowe lub warianty", "versions", 5, 1)}
            {numeric("dtp-rounds", "Rundy korekt", "correctionRounds", 3, 1)}
          </div>
          <p className="zm-dtp-hint">Sama liczba plików nie oznacza automatycznej dopłaty. Dopłata dotyczy ich rzeczywistej obróbki, pisania tekstów i przygotowania dodatkowych grafik.</p>
        </>}
        {step === 2 && <>
          <h3>Jednorazowo czy w stałej współpracy?</h3>
          {select("dtp-frequency", "Jak często będzie zamawiany materiał?", "frequency", (state.kind === "preflight" ? periodOptions.slice(0, 1) : periodOptions).map((item) => [item.id, item.name]),
            "Stały rabat dotyczy zamówionej serii z wykorzystaniem wcześniejszych materiałów i makiety.")}
          {state.frequency !== "once" && state.kind !== "preflight" && <>
            {numeric("dtp-editions", "Ile wydań planujesz zamówić?", "editions", 24, 2)}
            {select("dtp-changes", "Ile zmieni się przy kolejnej edycji?", "changeLevel", [
              ["minor", "Mało: głównie ceny, dane lub pojedyncze zdjęcia"],
              ["medium", "Średnio: część stron i produktów"],
              ["major", "Dużo: większość treści i układu"],
            ], "Największy rabat jest możliwy przy małych zmianach. Nowe strony, pisanie tekstów i dodatkowe materiały są wyceniane osobno.")}
          </>}
          <label className="zm-dtp-toggle"><input type="checkbox" checked={state.urgent} onChange={(e) => update("urgent", e.target.checked)}/> Wymagany pilny termin (+25% po potwierdzeniu dostępności)</label>
          <div className="zm-field"><label htmlFor="dtp-notes">Dodatkowe wymagania (opcjonalnie)</label>
            <textarea id="dtp-notes" rows={5} maxLength={1000} value={state.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Np. format 210 × 100 mm, określony papier, makieta z poprzedniej gazetki, dane z Excel, wymagane terminy…"/></div>
        </>}
        {step === 3 && <>
          <h3>Co składa się na wycenę?</h3>
          <div className="zm-dtp-line-items">
            {quote.lineItems.map((item) => <div key={item.name}><span>{item.name}</span><b>{asMoney(item.amount)}</b></div>)}
          </div>
          {quote.recurring && <div className="zm-dtp-schedule">
            <h4>Rabaty za kolejne wydania</h4>
            <table><thead><tr><th>Wydanie</th><th>Rabat na skład</th><th>Cena netto</th></tr></thead>
              <tbody>{quote.series.map((item) => <tr key={item.number}><td>{item.number}</td>
                <td>{item.discountPercent}%</td><td>{asMoney(item.amount)}</td></tr>)}</tbody></table>
          </div>}
          {quote.needsReview && <p className="zm-dtp-hint">W tym projekcie niezbędna jest indywidualna kontrola wymiarów, harmonogramu lub materiałów przed potwierdzeniem ceny.</p>}
          <p className="zm-dtp-hint">Orientacyjna wycena netto prac DTP. Bez kosztów druku, dostawy, licencji zdjęć i nieuzgodnionych poprawek. Zlecenie powstaje dopiero po indywidualnym potwierdzeniu zakresu.</p>
        </>}
        <div className="zm-dtp-actions">
          {step > 0 && <button type="button" className="zm-dtp-secondary" disabled={!hydrated} onClick={() => navigate(step - 1)}>← Wstecz</button>}
          {step < 3 ? <button type="button" className="button" disabled={!hydrated} onClick={() => navigate(step + 1)}>Dalej <span aria-hidden="true">↗</span></button>
            : <a className="button" href={contactUrl} onClick={() => { saveQuoteTransfer("DTP: " + quote.kind.name, summary); trackAnalyticsEvent("dtp_quote_to_contact", { product: state.kind, editions: quote.count }); }}>Wyślij konfigurację do wyceny ↗</a>}
        </div>
      </div>
      <aside className="zm-total-results zm-dtp-summary" aria-live="polite">
        <span className="section-no">BIEŻĄCA KALKULACJA</span><h3>{quote.kind.name}</h3>
        <p>{quote.format.name} · {quote.pages} str. / paneli · {quote.recurring ? quote.count + " wydań" : "jedno wydanie"}</p>
        <div className="zm-cost-total"><span>{quote.recurring ? "Pierwsze wydanie" : "Jednorazowe przygotowanie"}</span><strong>{asMoney(quote.first)}</strong></div>
        {quote.recurring && <>
          <div className="zm-cost-next"><span>Drugie wydanie</span><strong>{asMoney(quote.next)}</strong></div>
          <div className="zm-cost-next"><span>Cała zaplanowana seria</span><strong>{asMoney(quote.total)}</strong></div>
          <div className="zm-cost-next"><span>Oszczędność na serii</span><strong>{asMoney(quote.saved)}</strong></div>
          <p>Rabat rośnie w każdym wydaniu do {quote.maximumDiscountPercent}% na powtarzalne prace nad układem. W kolejnych etapach stawka pozostaje na ustalonym poziomie.</p>
        </>}
        <p>To ceny orientacyjne netto, nie gwarantowana oferta. Druk i koszty operatorów nie są wliczone.</p>
        <a href={contactUrl} className="zm-cost-link" onClick={() => saveQuoteTransfer("DTP: " + quote.kind.name, summary)}>Wyślij tę konfigurację ↗</a>
      </aside>
    </div>
  </div>;
}
