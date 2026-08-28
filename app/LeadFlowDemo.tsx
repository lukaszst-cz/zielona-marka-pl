"use client";

import { FormEvent, useState } from "react";

type Variant = "auto" | "home" | "beauty";

const config = {
  auto: {
    title: "Zgłoszenie do warsztatu",
    serviceLabel: "Czego dotyczy zgłoszenie?",
    services: ["Diagnostyka", "Mechanika", "Klimatyzacja", "Detailing"],
    detailLabel: "Marka, model i objawy",
    detailPlaceholder: "Np. Ford Focus 2018, stuki przy hamowaniu",
    dateLabel: "Preferowany termin",
  },
  home: {
    title: "Zapytanie do wykonawcy",
    serviceLabel: "Jakiej usługi potrzebujesz?",
    services: ["Hydraulika", "Elektryka", "Remont", "Klimatyzacja"],
    detailLabel: "Lokalizacja i opis prac",
    detailPlaceholder: "Np. Marki, wymiana instalacji w łazience",
    dateLabel: "Kiedy prace mają się rozpocząć?",
  },
  beauty: {
    title: "Wybór usługi i terminu",
    serviceLabel: "Jaką usługę wybierasz?",
    services: ["Konsultacja", "Pielęgnacja twarzy", "Stylizacja", "Masaż"],
    detailLabel: "Ważne informacje przed wizytą",
    detailPlaceholder: "Np. pierwsza wizyta, preferowane godziny popołudniowe",
    dateLabel: "Preferowany termin (demo — docelowo Booksy, inny system lub formularz)",
  },
} as const;

export default function LeadFlowDemo({ variant }: { variant: Variant }) {
  const c = config[variant];
  const [summary, setSummary] = useState<Record<string, string> | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSummary(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)])));
  }

  return <div className="leadflow-demo">
    <header><span>INTERAKTYWNE DEMO · NIC NIE WYSYŁAMY</span><h2>{c.title}</h2><p>Tak klient może przekazać dane potrzebne do odpowiedzi, wyceny lub rezerwacji.</p></header>
    {variant === "beauty" && <div className="booksy-note"><b>REZERWACJA DOBRANA DO SALONU</b><span>Ten etap może otworzyć Booksy, inny system, formularz, telefon lub WhatsApp. Booksy nie jest obowiązkowe.</span></div>}
    {!summary ? <form onSubmit={submit}>
      <label>{c.serviceLabel}<select name="service" required defaultValue=""><option value="" disabled>Wybierz usługę</option>{c.services.map(service => <option key={service}>{service}</option>)}</select></label>
      <label>{c.detailLabel}<textarea name="details" required rows={4} placeholder={c.detailPlaceholder} /></label>
      <label>{c.dateLabel}<input name="date" type="date" required /></label>
      {variant !== "beauty" && <label>Zdjęcia <span>(w prawdziwym wdrożeniu)</span><input type="file" disabled /></label>}
      <label>Telefon lub e-mail<input name="contact" required placeholder="Jak firma ma odpowiedzieć?" /></label>
      <button className="button" type="submit">Zasymuluj zgłoszenie <span>↗</span></button>
    </form> : <div className="leadflow-result"><span>GOTOWE ZGŁOSZENIE</span><h3>{summary.service}</h3><p>{summary.details}</p><dl><div><dt>Termin</dt><dd>{summary.date}</dd></div><div><dt>Kontakt</dt><dd>{summary.contact}</dd></div></dl><small>W prawdziwym wdrożeniu firma otrzymuje takie podsumowanie w panelu lub e-mailu.</small><button type="button" onClick={() => setSummary(null)}>← Spróbuj ponownie</button></div>}
  </div>;
}
