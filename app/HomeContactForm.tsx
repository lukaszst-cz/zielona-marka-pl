"use client";

import { FormEvent, useState } from "react";
import Link from "./SafeLink";
import { trackAnalyticsEvent } from "./CookieConsent";

export default function HomeContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    trackAnalyticsEvent("form_submit_attempt", { form_name: "homepage_v5", page_path: window.location.pathname });
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          projectType: values.projectType || "do ustalenia",
          message: [
            values.message,
            "",
            `Telefon: ${values.phone || "nie podano"}`,
            `Firma: ${values.company || "nie podano"}`,
            `Obecna strona: ${values.website || "nie podano"}`,
            `Obszar: ${values.projectType || "do ustalenia"}`,
            `Termin: ${values.timeline || "do ustalenia"}`,
            `Budżet: ${values.budget || "do ustalenia"}`,
          ].join("\n"),
        }),
      });
      if (!response.ok) throw new Error("request failed");
      trackAnalyticsEvent("generate_lead", { form_name: "homepage_v5", page_path: window.location.pathname });
      setSent(true);
      form.reset();
    } catch {
      trackAnalyticsEvent("form_submit_error", { form_name: "homepage_v5", error_type: "request_failed" });
      setError("Wiadomość nie została wysłana. Spróbuj ponownie albo zadzwoń: +48 450 458 466.");
    } finally {
      setSending(false);
    }
  }

  if (sent) return <div className="zmh-form-success" role="status"><b>Dziękuję, wiadomość dotarła.</b><p>Zapoznam się z Twoją sprawą i odezwę się w sprawie kolejnego kroku.</p></div>;

  return <form data-analytics-form="homepage_v5" method="post" action="/api/inquiries" onSubmit={submit}>
    <input className="form-trap" name="website_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="zmh-field-grid">
      <label>Imię<input required name="name" maxLength={120} autoComplete="name" placeholder="Jak masz na imię?" /></label>
      <label>E-mail<input required name="email" maxLength={254} type="email" autoComplete="email" placeholder="twoj@email.pl" /></label>
    </div>
    <label>Co chcesz ułatwić w swojej firmie?<textarea required name="message" maxLength={8000} rows={5} placeholder="Np. chcę lepiej pokazać usługi, sprzedawać vouchery albo uporządkować zapytania." /></label>
    <details className="zmh-extra-fields"><summary>Dodaj szczegóły, jeśli chcesz <span aria-hidden="true">+</span></summary>
      <div className="zmh-field-grid">
        <label>Telefon <span>(opcjonalnie)</span><input name="phone" maxLength={40} type="tel" autoComplete="tel" /></label>
        <label>Firma <span>(opcjonalnie)</span><input name="company" maxLength={200} autoComplete="organization" /></label>
        <label>Obecna strona <span>(opcjonalnie)</span><input name="website" maxLength={500} type="url" placeholder="https://" /></label>
        <label>Obszar <span>(opcjonalnie)</span><select name="projectType" defaultValue=""><option value="">Wybierz, jeśli wiesz</option><option>Strona WWW</option><option>Formularze i zapytania</option><option>CRM i obsługa klientów</option><option>Sklep i płatności</option><option>Kilka z tych rzeczy</option><option>Chcę najpierw porozmawiać</option></select></label>
        <label>Planowany termin <span>(opcjonalnie)</span><input name="timeline" maxLength={120} placeholder="Np. w ciągu 2 miesięcy" /></label>
        <label>Orientacyjny budżet <span>(opcjonalnie)</span><select name="budget" defaultValue=""><option value="">Wolę najpierw poznać zakres</option><option>do 3 000 zł</option><option>3 000-6 000 zł</option><option>6 000-12 000 zł</option><option>powyżej 12 000 zł</option></select></label>
      </div>
    </details>
    <label className="zmh-privacy-check"><input required type="checkbox" name="consent" value="yes" /><span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o kontakt.</span></label>
    <button className="zmh-pill" disabled={sending} type="submit">{sending ? "Wysyłam…" : "Wyślij wiadomość ↗"}</button>
    {error && <p role="alert" className="zmh-form-error">{error}</p>}
  </form>;
}
