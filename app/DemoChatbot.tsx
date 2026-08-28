"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "./SafeLink";

const goals = ["Nowa strona", "Modernizacja strony", "Formularz wyceny", "Mały CRM", "Chatbot", "Ceny i terminy"];
const industries = ["Warsztat / detailing", "Remonty / instalacje", "Beauty / wizyty", "Inna firma usługowa"];

export default function DemoChatbot() {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [industry, setIndustry] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const openChat = () => setOpen(true);
    document.querySelectorAll("[data-open-demo-chat]").forEach(element => element.addEventListener("click", openChat));
    return () => document.querySelectorAll("[data-open-demo-chat]").forEach(element => element.removeEventListener("click", openChat));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        company: values.company,
        message: `Chatbot demonstracyjny\nCel: ${goal}\nBranża: ${industry}\nTelefon: ${values.phone || "nie podano"}\n\n${values.message || "Prośba o kontakt."}`,
      }),
    });
    setSending(false);
    if (response.ok) {
      setSent(true);
      form.reset();
    } else setError("Nie udało się zapisać zgłoszenia. Napisz na kontakt@zielona-marka.pl.");
  }

  function reset() {
    setGoal("");
    setIndustry("");
    setSent(false);
    setError("");
  }

  return <div className={`demo-chat ${open ? "is-open" : ""}`}>
    <button className="demo-chat-trigger" type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="demo-chat-panel">
      <span aria-hidden="true">✦</span><b>Wypróbuj chatbota</b><small>demonstracja ZM</small>
    </button>
    {open && <section className="demo-chat-panel" id="demo-chat-panel" role="dialog" aria-label="Demonstracyjny chatbot Zielonej Marki">
      <header><div><span>DEMO · ZIELONA MARKA</span><b>Asystent zapytań</b></div><button type="button" onClick={() => setOpen(false)} aria-label="Zamknij chatbota">×</button></header>
      <div className="demo-chat-body" aria-live="polite">
        <div className="bot-message"><b>Cześć!</b><p>Jestem demonstracyjnym asystentem działającym według przygotowanego scenariusza. Pomogę określić, czego potrzebuje Twoja firma.</p><small>Nie udaję człowieka i nie podaję wiążącej wyceny.</small></div>
        {!goal && <div className="chat-step"><p>Co chcesz poprawić?</p><div className="chat-options">{goals.map(item => <button key={item} type="button" onClick={() => setGoal(item)}>{item}</button>)}</div></div>}
        {goal && !industry && <div className="chat-step"><div className="user-message">{goal}</div><p>W jakiej branży działasz?</p><div className="chat-options">{industries.map(item => <button key={item} type="button" onClick={() => setIndustry(item)}>{item}</button>)}</div><button className="chat-back" type="button" onClick={() => setGoal("")}>← Wróć</button></div>}
        {goal && industry && !sent && <div className="chat-step"><div className="user-message">{industry}</div>
          {goal === "Ceny i terminy" && <div className="bot-message"><p><b>Orientacyjnie:</b> ZM Start od 2 900 zł / 7 dni, LeadFlow od 4 900 zł / 10–14 dni, Flow AI od 7 900 zł / 14–21 dni.</p><small>30% na start, 70% po odbiorze i QA, przed publikacją na serwerze klienta.</small></div>}
          <p>Zostaw kontakt. Zgłoszenie trafi do panelu Zielonej Marki.</p>
          <form className="chat-lead-form" onSubmit={submit}>
            <label>Imię<input name="name" required autoComplete="name" /></label>
            <label>E-mail<input name="email" required type="email" autoComplete="email" /></label>
            <label>Firma <span>(opcjonalnie)</span><input name="company" autoComplete="organization" /></label>
            <label>Telefon <span>(opcjonalnie)</span><input name="phone" type="tel" autoComplete="tel" /></label>
            <label className="chat-form-wide">Co jest dziś największym problemem?<textarea name="message" rows={3} /></label>
            <label className="chat-consent chat-form-wide"><input type="checkbox" required /> <span>Akceptuję <Link href="/polityka-prywatnosci">politykę prywatności</Link> i proszę o kontakt.</span></label>
            <button className="button chat-form-wide" type="submit" disabled={sending}>{sending ? "Wysyłam…" : "Wyślij zgłoszenie"}<span>↗</span></button>
            {error && <small className="form-error chat-form-wide">{error}</small>}
          </form>
          <button className="chat-back" type="button" onClick={() => setIndustry("")}>← Zmień branżę</button>
        </div>}
        {sent && <div className="bot-message chat-success"><b>Gotowe — zgłoszenie zostało zapisane.</b><p>Odpowiem najpóźniej w następnym dniu roboczym.</p><button type="button" onClick={reset}>Rozpocznij ponownie</button></div>}
        <div className="chat-demo-links"><Link href="/strony-dla-warsztatow">Demo dla warsztatu</Link><Link href="/strony-dla-firm-uslugowych">Demo dla wykonawcy</Link><Link href="/strony-dla-beauty">Demo beauty</Link></div>
      </div>
      <footer>To demonstracja scenariusza. Wdrożenie AI wymaga zatwierdzonej bazy wiedzy i kontaktu z człowiekiem.</footer>
    </section>}
  </div>;
}
