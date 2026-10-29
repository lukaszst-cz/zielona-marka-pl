"use client";

import { useEffect, useState } from "react";
import { ContactEmailHelp } from "../EmailContact";
import { useInquirySubmission, InquirySubmissionStatus } from "../useInquirySubmission";
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
  const submission = useInquirySubmission("Bezpłatna koncepcja wizualna");
  const { draft } = submission;
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
  return <form className="zm-concept-form" data-analytics-form="bezplatna_koncepcja" method="post" action={submission.action} encType={submission.encType} onSubmit={(event) => { trackAnalyticsEvent("form_submit_attempt", { form_name: "bezplatna_koncepcja", page_path: window.location.pathname }); void submission.submit(event); }}>
    <input className="zm-concept-trap" type="text" name="_honey" autoComplete="off" tabIndex={-1} aria-hidden="true" />
    <input type="hidden" name="wybranyRodzajKoncepcji" value={modeLabels[mode]} />
    <div className="zm-concept-picked" aria-live="polite">
      <span>WYBRANA KONCEPCJA</span>
      <strong>{modeLabels[mode]}</strong>
      <p>Jedna bezpłatna propozycja poglądowa, przygotowana po potwierdzeniu zgłoszenia.</p>
    </div>
    <details className="zm-concept-change">
      <summary>Zmień rodzaj koncepcji <span aria-hidden="true">+</span></summary>
      <fieldset className="zm-concept-choice">
        <legend>Wybierz jeden rodzaj materiału</legend>
        {(Object.keys(modeLabels) as Mode[]).map((choice) => (
          <label key={choice} className={mode === choice ? "is-selected" : ""}>
            <input type="radio" name="mode" value={choice} checked={mode === choice} onChange={() => {
              setMode(choice);
              window.dispatchEvent(new CustomEvent("zm-concept-mode", { detail: choice }));
            }} />
            <span>{modeLabels[choice]}</span>
          </label>
        ))}
      </fieldset>
    </details>
    <input type="hidden" name="name" value="Zgłoszenie koncepcji" />
    <input type="hidden" name="purpose" value={modeLabels[mode]} />
    <p className="zm-concept-fields-intro">Dwa pola i gotowe. Resztę ustalimy w odpowiedzi.</p>
    <label>Gdzie przesłać propozycję?
      <input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="Twój adres e-mail" />
    </label>
    <label>{mode === "existing" ? "Wklej adres swojej strony" : "Napisz, czym zajmuje się Twoja firma"}
      <textarea name="details" required minLength={10} maxLength={4000} rows={3} placeholder={mode === "existing" ? "https://twojastrona.pl, możesz też dopisać, co chcesz zmienić" : "Np. kwiaciarnia w Markach, potrzebuję pomysłu na logo"} />
    </label>
    <label className="zm-concept-consent">
      <input name="consent" type="checkbox" required value="yes" />
      <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o e-mailową odpowiedź dotyczącą tego zgłoszenia. Zgłoszenie nie oznacza zgody na inne wiadomości marketingowe.</span>
    </label>
    <button type="submit" disabled={submission.disabled} >{submission.label}</button>
    <p className="zm-concept-form-foot">Nie pytam o budżet na tym etapie. Formularz służy do zgłoszenia jednej bezpłatnej, poglądowej koncepcji; nie zamawia pełnego projektu ani gotowych plików do druku.</p>
    <InquirySubmissionStatus state={submission.state} />
    <ContactEmailHelp draft={draft} />
  </form>;
}
