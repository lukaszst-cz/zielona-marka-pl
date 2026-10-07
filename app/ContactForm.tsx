"use client";

import Link from "./SafeLink";
import { FormEvent, useState } from "react";
import { trackAnalyticsEvent } from "./CookieConsent";

export default function ContactForm({ audit = false }: { audit?: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackAnalyticsEvent("form_submit_attempt", { form_name: audit ? "miniocena" : "brief", page_path: window.location.pathname });
    setSending(true); setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, message: `${audit ? "Miniocena strony\n" : ""}Usługa: ${values.projectType || "do ustalenia"}\nFirma: ${values.company || "do ustalenia"}\nAdres strony: ${values.website || "brak / nowa strona"}\nCel: ${values.goal || "do ustalenia"}\nSprzedaż lub płatności: ${values.sales || "nie dotyczy / do ustalenia"}\nBudżet: ${values.budget || "do ustalenia"}\n\n${values.message || ""}` }) });

    if (response.ok) { trackAnalyticsEvent("generate_lead", { form_name: audit ? "miniocena" : "brief", page_path: window.location.pathname }); setSent(true); form.reset(); }
    else { trackAnalyticsEvent("form_submit_error", { form_name: audit ? "miniocena" : "brief", error_type: "server_response" }); setError("Nie udało się wysłać wiadomości. Napisz bezpośrednio na kontakt@zielona-marka.pl."); }
    } catch { trackAnalyticsEvent("form_submit_error", { form_name: audit ? "miniocena" : "brief", error_type: "connection" }); setError("Brak połączenia. Spróbuj ponownie lub zadzwoń: +48 450 458 466."); } finally { setSending(false); }
  }
  if (sent) return <div className="form-success" role="status"><b>Dziękuję, wiadomość została wysłana.</b><p>Wrócę z propozycją kolejnego kroku i wstępną wyceną.</p></div>;
  return <form className="contact-form" data-analytics-form={audit ? "miniocena" : "brief"} method="post" action="/api/inquiries" onSubmit={submit}>
    <input className="form-trap" name="website_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label>Imię<input required name="name" maxLength={120} placeholder="Jak masz na imię?" autoComplete="name" /></label>
    <label>E-mail<input required type="email" name="email" maxLength={254} placeholder="twoj@email.pl" autoComplete="email" /></label>
    <label>Firma <span>(opcjonalnie)</span><input name="company" maxLength={200} placeholder="Nazwa firmy" autoComplete="organization" /></label>
    <label>Adres obecnej strony <span>(opcjonalnie)</span><input name="website" maxLength={500} type="url" placeholder="https://twoja-strona.pl" /></label>
    <label>Czego potrzebujesz?<select required name="projectType" defaultValue=""><option value="" disabled>Wybierz najbliższą odpowiedź</option><option>Strona WWW szyta na miarę</option><option>Formularz wyceny lub zgłoszenia</option><option>System dla firmy: procesy i automatyzacje</option><option>Mały CRM do klientów i zleceń</option><option>Sprzedaż produktów, vouchery lub płatności online</option><option>Strona dla warsztatu lub detailingu</option><option>Strona dla firmy remontowej lub instalatora</option><option>Strona dla beauty lub usług na termin</option><option>Modernizacja obecnej strony</option><option>Potrzebuję krótkiej konsultacji</option></select></label>
    <label>Najważniejszy efekt<select name="goal" defaultValue=""><option value="">Wybierz, jeśli wiesz</option><option>Więcej konkretnych zapytań</option><option>Lepsza prezentacja firmy i oferty</option><option>Porządek w obsłudze klientów</option><option>Sprzedaż produktów lub voucherów</option><option>Mniej ręcznej pracy i powtarzalnych pytań</option></select></label>
    <label>Sprzedaż lub płatności <span>(opcjonalnie)</span><select name="sales" defaultValue=""><option value="">Nie dotyczy / jeszcze nie wiem</option><option>Produkty lub vouchery online</option><option>Rezerwacje usług</option><option>Płatność za usługę lub zaliczka</option></select></label>
    <label>Orientacyjny budżet <span>(opcjonalnie)</span><select name="budget" defaultValue=""><option value="">Wolę najpierw poznać zakres</option><option>do 3 000 zł</option><option>3 000–6 000 zł</option><option>6 000–12 000 zł</option><option>powyżej 12 000 zł</option></select></label>
    <label className="form-wide">Co dziś nie działa albo jaki efekt chcesz osiągnąć?<textarea required name="message" maxLength={8000} rows={5} placeholder="Np. mam starą stronę, klienci nie dzwonią, chcę sprzedawać kilka produktów…" /></label>
    <label className="form-consent form-wide"><input required type="checkbox" name="consent" value="yes" /> <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o kontakt.</span></label>
    <button className="button form-wide" disabled={sending} type="submit">{sending ? "Wysyłam…" : audit ? "Poproś o miniocenę" : "Wyślij brief"}<span>↗</span></button>
    {error && <p role="alert" className="form-error form-wide">{error}</p>}
  </form>;
}
