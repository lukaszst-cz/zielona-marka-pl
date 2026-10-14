"use client";

import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";

const base: Record<string, number> = { "ZM Start, kompletna strona One Page": 1449, "ZM LeadFlow, strona i formularz": 4490, "ZM Flow, strona, formularz i asystent": 6900, "ZM Bot FAQ, asystent do istniejącej strony": 2500, "Prosty panel zleceń (mały CRM)": 4900 };

export default function EstimateCalculator() {
  const [type, setType] = useState("ZM LeadFlow, strona i formularz");
  const [copy, setCopy] = useState(false);
  const [google, setGoogle] = useState(false);
  const estimate = useMemo(() => base[type] + (copy ? 650 : 0) + (google ? 490 : 0), [type, copy, google]);
  const trackChange = (nextType: string, nextCopy: boolean, nextGoogle: boolean) => {
    trackAnalyticsEvent("estimate_calculator_change", {
      project_type: nextType,
      copy_help: nextCopy,
      google_profile: nextGoogle,
      estimate_net: base[nextType] + (nextCopy ? 650 : 0) + (nextGoogle ? 490 : 0),
      page_path: window.location.pathname,
    });
  };
  return <div className="estimate-calculator">
    <span>ORIENTACYJNY BUDŻET</span><h3>Sprawdź punkt startu projektu.</h3>
    <label>Rodzaj projektu<select value={type} onChange={(event) => { const next = event.target.value; setType(next); trackChange(next, copy, google); }}>{Object.keys(base).map((entry) => <option key={entry}>{entry}</option>)}</select></label>
    <label><input type="checkbox" checked={copy} onChange={(event) => { const next = event.target.checked; setCopy(next); trackChange(type, next, google); }} /> Pomoc w przygotowaniu tekstów</label>
    <label><input type="checkbox" checked={google} onChange={(event) => { const next = event.target.checked; setGoogle(next); trackChange(type, copy, next); }} /> Uporządkowanie wizytówki Google</label>
    <div><small>ORIENTACYJNIE OD</small><b>{estimate.toLocaleString("pl-PL")} zł netto</b><p>Dokładną cenę ustalam po krótkim briefie i zakresie prac.</p><a className="text-link" href="/kontakt">Omów ten wariant ↗</a></div>
  </div>;
}
