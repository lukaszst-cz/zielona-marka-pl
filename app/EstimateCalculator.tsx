"use client";

import { useMemo, useState } from "react";

const base: Record<string, number> = { "ZM Start — strona One Page": 2900, "ZM LeadFlow — strona i formularz": 4900, "ZM Flow AI — strona, formularz i chatbot": 7900, "ZM Bot FAQ — chatbot do istniejącej strony": 2500, "Prosty panel zleceń (mały CRM)": 2900 };

export default function EstimateCalculator() {
  const [type, setType] = useState("ZM LeadFlow — strona i formularz");
  const [copy, setCopy] = useState(false);
  const [google, setGoogle] = useState(false);
  const estimate = useMemo(() => base[type] + (copy ? 650 : 0) + (google ? 490 : 0), [type, copy, google]);
  return <div className="estimate-calculator">
    <span>ORIENTACYJNY BUDŻET</span><h3>Sprawdź punkt startu projektu.</h3>
    <label>Rodzaj projektu<select value={type} onChange={(event) => setType(event.target.value)}>{Object.keys(base).map((entry) => <option key={entry}>{entry}</option>)}</select></label>
    <label><input type="checkbox" checked={copy} onChange={(event) => setCopy(event.target.checked)} /> Pomoc w przygotowaniu tekstów</label>
    <label><input type="checkbox" checked={google} onChange={(event) => setGoogle(event.target.checked)} /> Uporządkowanie wizytówki Google</label>
    <div><small>ORIENTACYJNIE OD</small><b>{estimate.toLocaleString("pl-PL")} zł</b><p>Dokładną cenę ustalam po krótkim briefie i zakresie prac.</p></div>
  </div>;
}
