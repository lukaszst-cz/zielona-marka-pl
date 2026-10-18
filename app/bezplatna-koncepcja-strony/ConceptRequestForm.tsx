"use client";

import { useEffect, useState } from "react";
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
  return <form className="zm-concept-form" data-analytics-form="bezplatna_koncepcja" method="post" action="https://formsubmit.co/kontakt@zielona-marka.pl" onSubmit={() => trackAnalyticsEvent("form_submit_attempt", { form_name: "bezplatna_koncepcja", page_path: window.location.pathname })}>
    <input className="zm-concept-trap" type="text" name="_honey" autoComplete="off" tabIndex={-1} aria-hidden="true" />
    <input type="hidden" name="_subject" value="Zielona Marka - Bezpłatna koncepcja wizualna" />
    <input type="hidden" name="_next" value="https://zielona-marka.pl/kontakt?wyslano=1" />
    <input type="hidden" name="_url" value="https://zielona-marka.pl/bezplatna-koncepcja-strony" />
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
    <p className="zm-concept-fields-intro">Kilka informacji, żebym mógł przygotować propozycję dla właściwej firmy.</p>
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
    <button type="submit" >Wyślij prośbę o bezpłatną koncepcję ↗</button>
    <p className="zm-concept-form-foot">Nie pytam o budżet na tym etapie. Formularz służy do zgłoszenia jednej bezpłatnej, poglądowej koncepcji; nie zamawia pełnego projektu ani gotowych plików do druku.</p>
  </form>;
}
