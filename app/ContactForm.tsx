"use client";

import Link from "./SafeLink";
import { FormEvent, useState } from "react";

export default function ContactForm({ audit = false }: { audit?: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, message: `${audit ? "Miniocena strony\n" : ""}Usługa: ${values.projectType || "do ustalenia"}\nFirma: ${values.company || "do ustalenia"}\nAdres strony: ${values.website || "brak / nowa strona"}\n\n${values.message || ""}` }) });
    setSending(false);
    if (response.ok) { setSent(true); form.reset(); }
    else setError("Nie udało się wysłać wiadomości. Napisz bezpośrednio na kontakt@zielona-marka.pl.");
  }
  if (sent) return <div className="form-success"><b>Dziękuję — wiadomość została wysłana.</b><p>Wrócę z propozycją kolejnego kroku i wstępną wyceną.</p></div>;
  return <form className="contact-form" onSubmit={submit}>
    <label>Imię<input required name="name" placeholder="Jak masz na imię?" autoComplete="name" /></label>
    <label>E-mail<input required type="email" name="email" placeholder="twoj@email.pl" autoComplete="email" /></label>
    <label>Firma <span>(opcjonalnie)</span><input name="company" placeholder="Nazwa firmy" autoComplete="organization" /></label>
    {audit && <label>Adres obecnej strony <span>(opcjonalnie)</span><input name="website" type="url" placeholder="https://twoja-strona.pl" /></label>}
    <label>Czego potrzebujesz?<select required name="projectType" defaultValue=""><option value="" disabled>Wybierz najbliższą odpowiedź</option><option>Strona dla warsztatu lub detailingu</option><option>Strona dla firmy remontowej lub instalatora</option><option>Strona dla beauty lub usług na termin</option><option>Nowa strona dla innej firmy usługowej</option><option>Modernizacja obecnej strony</option><option>Formularz wyceny lub zgłoszenia</option><option>Mały CRM do klientów i zleceń</option><option>Chatbot dla firmy</option><option>Potrzebuję krótkiej konsultacji</option></select></label>
    <label className="form-wide">Co dziś nie działa albo jaki efekt chcesz osiągnąć?<textarea required name="message" rows={5} placeholder="Np. mam starą stronę, klienci nie dzwonią, chcę sprzedawać kilka produktów…" /></label>
    <label className="form-consent form-wide"><input required type="checkbox" /> <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o kontakt.</span></label>
    <button className="button form-wide" disabled={sending} type="submit">{sending ? "Wysyłam…" : audit ? "Poproś o miniocenę" : "Wyślij brief"}<span>↗</span></button>
    {error && <p className="form-error form-wide">{error}</p>}
  </form>;
}
