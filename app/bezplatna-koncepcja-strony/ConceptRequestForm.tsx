"use client";

import { FormEvent, useState } from "react";
import Link from "../SafeLink";
import { trackAnalyticsEvent } from "../CookieConsent";

type Mode = "existing" | "new";

export default function ConceptRequestForm() {
  const [mode, setMode] = useState<Mode>("existing");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const company = String(values.company || "").trim();
    const website = String(values.website || "").trim();
    const purpose = String(values.purpose || "").trim();
    const details = String(values.details || "").trim();

    if (!details || !company) {
      setError("Podaj nazwę firmy i krótki opis potrzeby.");
      return;
    }

    setSubmitting(true);
    setError("");
    trackAnalyticsEvent("form_submit_attempt", { form_name: "bezplatna_koncepcja", page_path: window.location.pathname });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company,
          website: mode === "existing" ? website : "",
          projectType: "Bezpłatna koncepcja wizualna",
          goal: purpose,
          consent: values.consent,
          website_check: values.website_check || "",
          message: [
            "ZGŁOSZENIE: BEZPŁATNA KONCEPCJA WIZUALNA",
            "Źródło: /bezplatna-koncepcja-strony",
            `Typ: ${mode === "existing" ? "Odświeżenie istniejącej strony" : "Strona dla nowej firmy"}`,
            `Firma: ${company}`,
            `Adres strony: ${mode === "existing" ? website || "nie podano" : "nowa firma / bez strony"}`,
            `Najważniejszy cel: ${purpose || "do ustalenia"}`,
            "",
            details,
            "",
            "Odpowiedź na zamówioną koncepcję: e-mail z formularza. Nie zgłoszono zgody na odrębny marketing."
          ].join("\n")
        })
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("Zbyt wiele zgłoszeń z tego adresu. Spróbuj ponownie za kilka minut.");
        throw new Error("Nie udało się przesłać zgłoszenia. Spróbuj ponownie lub napisz na kontakt@zielona-marka.pl.");
      }
      trackAnalyticsEvent("generate_lead", { form_name: "bezplatna_koncepcja", page_path: window.location.pathname });
      setSubmitted(true);
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nie udało się wysłać zgłoszenia.");
      trackAnalyticsEvent("form_submit_error", { form_name: "bezplatna_koncepcja", error_type: "request_failed" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <div className="zm-concept-success" role="status" aria-live="polite">
      <span aria-hidden="true">✓</span>
      <h3>Dziękuję za zgłoszenie.</h3>
      <p>Otrzymałem Twoją prośbę. Zapoznam się z materiałami i odezwę się na podany adres, by potwierdzić możliwość oraz zakres przygotowania koncepcji.</p>
      <Link href="/realizacje">W międzyczasie zobacz przykładowe projekty ↗</Link>
    </div>;
  }

  return <form className="zm-concept-form" data-analytics-form="bezplatna_koncepcja" method="post" action="/api/inquiries" onSubmit={submit}>
    <input className="zm-concept-trap" type="text" name="website_check" autoComplete="off" tabIndex={-1} aria-hidden="true" />
    <fieldset className="zm-concept-choice">
      <legend>Co chcesz zobaczyć?</legend>
      <label><input type="radio" name="mode" value="existing" checked={mode === "existing"} onChange={() => setMode("existing")} /> Nowy wygląd istniejącej strony</label>
      <label><input type="radio" name="mode" value="new" checked={mode === "new"} onChange={() => setMode("new")} /> Koncepcję strony dla nowej firmy</label>
    </fieldset>
    <div className="zm-concept-form-grid">
      <label>Twoje imię <input name="name" required maxLength={120} autoComplete="given-name" placeholder="Jak masz na imię?" /></label>
      <label>E-mail do odpowiedzi <input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="adres@firma.pl" /></label>
    </div>
    <label>Nazwa firmy <input name="company" required maxLength={200} autoComplete="organization" placeholder="Jak nazywa się firma?" /></label>
    {mode === "existing" && <label>Adres obecnej strony <span>(opcjonalnie)</span>
      <input type="url" name="website" maxLength={500} placeholder="https://twojastrona.pl" inputMode="url" />
    </label>}
    <label>Co ma przede wszystkim ułatwiać nowy układ?
      <select name="purpose" defaultValue="">
        <option value="">Wybierz główny cel (opcjonalnie)</option>
        <option>Lepsza prezentacja oferty</option>
        <option>Więcej zapytań od klientów</option>
        <option>Wygodniejsze zakupy online</option>
        <option>Nowoczesny wizerunek firmy</option>
        <option>Nie wiem — proszę o sugestię</option>
      </select>
    </label>
    <label>Opisz krótko swoją firmę i pomysł
      <textarea name="details" required minLength={10} maxLength={4000} rows={4} placeholder="Czym zajmuje się firma? Co warto pokazać na pierwszym ekranie? Możesz też napisać, co dziś utrudnia klientom znalezienie oferty." />
    </label>
    <label className="zm-concept-consent">
      <input name="consent" type="checkbox" required value="yes" />
      <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o e-mailową odpowiedź dotyczącą tego zgłoszenia. Zgłoszenie nie oznacza zgody na inne wiadomości marketingowe.</span>
    </label>
    <button type="submit" disabled={submitting}>{submitting ? "Przesyłam zgłoszenie…" : "Zamów bezpłatną koncepcję ↗"}</button>
    <p className="zm-concept-form-foot">Bez podawania budżetu i bez obowiązku zamawiania strony. Jedna poglądowa propozycja, nie kompletny projekt wdrożeniowy.</p>
    {error && <p className="zm-concept-error" role="alert">{error}</p>}
  </form>;
}
