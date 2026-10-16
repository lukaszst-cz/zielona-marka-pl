"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "../SafeLink";
import { trackAnalyticsEvent } from "../CookieConsent";

type Mode = "existing" | "new" | "logo" | "promo" | "sales";

const modeLabels: Record<Mode, string> = {
  existing: "Nowy wygląd obecnej strony WWW",
  new: "Koncepcja strony dla nowej firmy",
  logo: "Koncepcja nowego lub odświeżonego logo",
  promo: "Koncepcja gazetki reklamowej",
  sales: "Koncepcja gazetki sprzedażowej",
};

export default function ConceptRequestForm() {
  const [mode, setMode] = useState<Mode>("existing");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("typ");
    if (requested && Object.prototype.hasOwnProperty.call(modeLabels, requested)) {
      window.requestAnimationFrame(() => setMode(requested as Mode));
    }
    const selectMode = (event: Event) => {
      const selected = (event as CustomEvent<string>).detail;
      if (Object.prototype.hasOwnProperty.call(modeLabels, selected)) {
        setMode(selected as Mode);
      }
    };
    window.addEventListener("zm-concept-mode", selectMode);
    return () => window.removeEventListener("zm-concept-mode", selectMode);
  }, []);
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
          website,
          projectType: `Bezpłatna koncepcja: ${modeLabels[mode]}`,
          goal: purpose,
          consent: values.consent,
          website_check: values.website_check || "",
          message: [
            "ZGŁOSZENIE: BEZPŁATNA KONCEPCJA WIZUALNA",
            "Źródło: /bezplatna-koncepcja-strony",
            `Typ: ${modeLabels[mode]}`,
            `Firma: ${company}`,
            `Adres strony lub materiałów: ${website || "nie podano"}`,
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
      <p>Dziękuję za wiadomość. Sprawdzę, czy mogę przygotować koncepcję dla Twojej firmy, i odpiszę na podany adres e-mail z dalszymi informacjami.</p>
      <Link href="/realizacje">W międzyczasie zobacz przykładowe projekty ↗</Link>
    </div>;
  }

  return <form className="zm-concept-form" data-analytics-form="bezplatna_koncepcja" method="post" action="/api/inquiries" onSubmit={submit}>
    <input className="zm-concept-trap" type="text" name="website_check" autoComplete="off" tabIndex={-1} aria-hidden="true" />
    <fieldset className="zm-concept-choice">
      <legend>Co mam dla Ciebie przygotować? Wybierz jeden rodzaj materiału.</legend>
      {(Object.keys(modeLabels) as Mode[]).map((choice) => (
        <label key={choice}>
          <input type="radio" name="mode" value={choice} checked={mode === choice} onChange={() => setMode(choice)} />
          <span>{modeLabels[choice]}</span>
        </label>
      ))}
    </fieldset>
    <div className="zm-concept-form-grid">
      <label>Twoje imię <input name="name" required maxLength={120} autoComplete="given-name" placeholder="Jak masz na imię?" /></label>
      <label>E-mail do odpowiedzi <input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="adres@firma.pl" /></label>
    </div>
    <label>Nazwa firmy <input name="company" required maxLength={200} autoComplete="organization" placeholder="Jak nazywa się firma?" /></label>
    {mode !== "new" && <label>{mode === "existing" ? "Adres obecnej strony" : "Link do obecnego logo lub materiałów"} (opcjonalnie)
      <input type="url" name="website" maxLength={500} placeholder="https://twojastrona.pl" inputMode="url" />
    </label>}

    <label>Co jest najważniejszym celem projektu?
      <select name="purpose" defaultValue="">
        <option value="">Wybierz główny cel (opcjonalnie)</option>
        <option>Lepsza prezentacja oferty</option>
        <option>Więcej zapytań od klientów</option>
        <option>Wygodniejsze zakupy online</option>
        <option>Nowoczesny wizerunek firmy</option>
        <option>Odświeżenie lub stworzenie znaku marki</option>
        <option>Lepsza prezentacja produktów i promocji</option>
        <option>Czytelna gazetka z ofertą i cenami</option>
        <option>Nie wiem, proszę o sugestię</option>
      </select>
    </label>
    <label>Opowiedz o firmie i o tym, co chcesz zmienić
      <textarea name="details" required minLength={10} maxLength={4000} rows={4} placeholder="Czym zajmuje się firma? Jakie usługi, produkty, kolory lub promocje warto uwzględnić? Co chcesz zmienić względem obecnych materiałów?" />
    </label>
    <label className="zm-concept-consent">
      <input name="consent" type="checkbox" required value="yes" />
      <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o e-mailową odpowiedź dotyczącą tego zgłoszenia. Zgłoszenie nie oznacza zgody na inne wiadomości marketingowe.</span>
    </label>
    <button type="submit" disabled={submitting}>{submitting ? "Przesyłam zgłoszenie…" : "Zamów bezpłatną koncepcję ↗"}</button>
    <p className="zm-concept-form-foot">Nie pytam o budżet na tym etapie. Formularz służy do zgłoszenia jednej bezpłatnej, poglądowej koncepcji; nie zamawia pełnego projektu ani gotowych plików do druku.</p>
    {error && <p className="zm-concept-error" role="alert">{error}</p>}
  </form>;
}
