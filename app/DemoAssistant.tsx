"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "./SafeLink";

const goals = ["Nowa strona", "Modernizacja strony", "Formularz wyceny", "Mały CRM", "Asystent zapytań", "Ceny i terminy"];
const industries = ["Warsztat / detailing", "Remonty / instalacje", "Beauty / wizyty", "Inna firma usługowa"];

export default function DemoAssistant() {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [industry, setIndustry] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  useEffect(() => {
    const openAssistant = () => setOpen(true);
    document.querySelectorAll("[data-open-demo-assistant]").forEach(element => element.addEventListener("click", openAssistant));
    return () => document.querySelectorAll("[data-open-demo-assistant]").forEach(element => element.removeEventListener("click", openAssistant));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consent: values.consent,
        website_check: values.website_check,
        name: values.name,
        email: values.email,
        company: values.company,
        message: `Asystent zapytań demonstracyjny\nCel: ${goal}\nBranża: ${industry}\nTelefon: ${values.phone || "nie podano"}\n\n${values.message || "Prośba o kontakt."}`,
      }),
    });
    if (response.ok) {
      setSent(true);
      form.reset();
    } else setError("Nie udało się zapisać zgłoszenia. Napisz na kontakt@zielona-marka.pl.");
    } catch { setError("Brak połączenia. Spróbuj ponownie lub zadzwoń: +48 450 458 466."); }
    finally { setSending(false); }
  }

  function reset() {
    setGoal("");
    setIndustry("");
    setSent(false);
    setError("");
  }

  return <div className={`demo-assistant ${open ? "is-open" : ""}`}>
    <button ref={trigger} className="demo-assistant-trigger" type="button" onClick={() => setOpen(value => !value)} aria-label="Wypróbuj asystenta" aria-expanded={open} aria-controls="demo-assistant-panel">
      <span aria-hidden="true">✦</span><b>Wypróbuj asystenta</b><small>demonstracja ZM</small>
    </button>
    {open && <section className="demo-assistant-panel" id="demo-assistant-panel" role="dialog" aria-label="Demonstracyjny asystent zapytań Zielonej Marki">
      <header><div><span>DEMO · ZIELONA MARKA</span><b>Asystent zapytań</b></div><button ref={closeButton} type="button" onClick={() => { setOpen(false); trigger.current?.focus(); }} aria-label="Zamknij asystenta">×</button></header>
      <div className="demo-assistant-body" aria-live="polite">
        <div className="bot-message"><b>Cześć!</b><p>Jestem demonstracyjnym asystentem działającym według przygotowanego scenariusza. Pomogę określić, czego potrzebuje Twoja firma.</p><small>Nie udaję człowieka i nie podaję wiążącej wyceny.</small></div>
        {!goal && <div className="assistant-step"><p>Co chcesz poprawić?</p><div className="assistant-options">{goals.map(item => <button key={item} type="button" onClick={() => setGoal(item)}>{item}</button>)}</div></div>}
        {goal && !industry && <div className="assistant-step"><div className="user-message">{goal}</div><p>W jakiej branży działasz?</p><div className="assistant-options">{industries.map(item => <button key={item} type="button" onClick={() => setIndustry(item)}>{item}</button>)}</div><button className="assistant-back" type="button" onClick={() => setGoal("")}>← Wróć</button></div>}
        {goal && industry && !sent && <div className="assistant-step"><div className="user-message">{industry}</div>
          {goal === "Ceny i terminy" && <div className="bot-message"><p><b>Orientacyjnie:</b> Mała, podstawowa strona ZM Start od 1 449 zł netto / od 72 godzin do 14 dni od otrzymania kompletu materiałów i ustalenia zakresu. LeadFlow od 4 490 zł netto / 10–14 dni roboczych, ZM Flow od 6 900 zł netto / 14–21 dni roboczych.</p><small>30% na start, 70% po odbiorze i kontroli jakości (QA), przed publikacją na serwerze klienta.</small></div>}
          <p>Zostaw kontakt. Zgłoszenie trafi do panelu Zielonej Marki.</p>
          <form className="assistant-lead-form" method="post" action="/api/inquiries" onSubmit={submit}>
            <input className="form-trap" name="website_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label>Imię<input name="name" required autoComplete="name" /></label>
            <label>E-mail<input name="email" required type="email" autoComplete="email" /></label>
            <label>Firma <span>(opcjonalnie)</span><input name="company" autoComplete="organization" /></label>
            <label>Telefon <span>(opcjonalnie)</span><input name="phone" type="tel" autoComplete="tel" /></label>
            <label className="assistant-form-wide">Co jest dziś największym problemem?<textarea name="message" rows={3} /></label>
            <label className="assistant-consent assistant-form-wide"><input type="checkbox" required name="consent" value="yes" /> <span>Akceptuję <Link href="/polityka-prywatnosci">politykę prywatności</Link> i proszę o kontakt.</span></label>
            <button className="button assistant-form-wide" type="submit" disabled={sending}>{sending ? "Wysyłam…" : "Wyślij zgłoszenie"}<span>↗</span></button>
            {error && <small role="alert" className="form-error assistant-form-wide">{error}</small>}
          </form>
          <button className="assistant-back" type="button" onClick={() => setIndustry("")}>← Zmień branżę</button>
        </div>}
        {sent && <div className="bot-message assistant-success"><b>Gotowe, zgłoszenie zostało zapisane.</b><p>Odpowiem najpóźniej w następnym dniu roboczym.</p><button type="button" onClick={reset}>Rozpocznij ponownie</button></div>}
        <div className="assistant-demo-links"><Link href="/strony-dla-warsztatow">Demo dla warsztatu</Link><Link href="/strony-dla-firm-uslugowych">Demo dla wykonawcy</Link><Link href="/strony-dla-beauty">Demo beauty</Link></div>
      </div>
      <footer>To demonstracja scenariusza. Wdrożenie wymaga zatwierdzonej bazy wiedzy i kontaktu z człowiekiem.</footer>
    </section>}
  </div>;
}
