"use client";

import { useMemo, useState } from "react";

const base: Record<string, number> = { "Wizytówka, 1 strona z 3 sekcjami": 899, "Strona jednostronicowa, 6–7 sekcji": 1449, "Strona firmowa, do 6 podstron": 2999, "Strona rozbudowana, do 12 podstron": 4499 };

export default function EstimateCalculator() {
  const [type, setType] = useState("Strona firmowa, do 6 podstron");
  const [copy, setCopy] = useState(false);
  const [google, setGoogle] = useState(false);
  const estimate = useMemo(() => base[type] + (copy ? 249 : 0) + (google ? 149 : 0), [type, copy, google]);
  return <div className="estimate-calculator">
    <span>ORIENTACYJNY BUDŻET</span><h3>Sprawdź punkt startu projektu.</h3>
    <label>Rodzaj projektu<select value={type} onChange={(event) => setType(event.target.value)}>{Object.keys(base).map((entry) => <option key={entry}>{entry}</option>)}</select></label>
    <label><input type="checkbox" checked={copy} onChange={(event) => setCopy(event.target.checked)} /> Pomoc w przygotowaniu tekstów</label>
    <label><input type="checkbox" checked={google} onChange={(event) => setGoogle(event.target.checked)} /> Uporządkowanie wizytówki Google</label>
    <div><small>ORIENTACYJNIE OD</small><b>{estimate.toLocaleString("pl-PL")} zł netto</b><p>Dokładną cenę ustalam po krótkim briefie i zakresie prac.</p></div>
  </div>;
}
