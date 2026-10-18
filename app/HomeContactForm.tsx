"use client";

import Link from "./SafeLink";
import { trackAnalyticsEvent } from "./CookieConsent";

export default function HomeContactForm() {
  return <form data-analytics-form="homepage_v5" method="post" action="https://formsubmit.co/kontakt@zielona-marka.pl" onSubmit={() => trackAnalyticsEvent("form_submit_attempt", { form_name: "homepage_v5", page_path: window.location.pathname })}>
    <input className="form-trap" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <input type="hidden" name="_subject" value="Zielona Marka - Formularz ze strony głównej" />
    <input type="hidden" name="_next" value="https://zielona-marka.pl/kontakt?wyslano=1" />
    <input type="hidden" name="_url" value="https://zielona-marka.pl/" />
    <div className="zmh-field-grid">
      <label>Imię<input required name="name" maxLength={120} autoComplete="name" placeholder="Jak masz na imię?" /></label>
      <label>E-mail<input required name="email" maxLength={254} type="email" autoComplete="email" placeholder="twoj@email.pl" /></label>
    </div>
    <label>Co dziś chciałbyś usprawnić w firmie?<textarea required name="message" maxLength={8000} rows={5} placeholder="Np. klienci pytają o cenę, ale nie piszą, o jaką usługę chodzi. Chcę im to ułatwić." /></label>
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
    <button className="zmh-pill" type="submit">Wyślij wiadomość ↗</button>
  </form>;
}
