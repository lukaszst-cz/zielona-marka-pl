"use client";

import type { FormEvent } from "react";

export const CONTACT_EMAIL = "kontakt@zielona-marka.pl";

export type ContactEmailDraft = {
  href: string;
  body: string;
  subject: string;
};

const fieldLabels: Record<string, string> = {
  name: "Imię",
  email: "E-mail nadawcy",
  company: "Firma",
  website: "Strona internetowa",
  projectType: "Rodzaj projektu",
  goal: "Cel",
  purpose: "Cel koncepcji",
  sales: "Sprzedaż/płatności",
  budget: "Budżet",
  phone: "Telefon",
  timeline: "Termin",
  message: "Treść wiadomości",
  details: "Opis projektu",
  mode: "Kod rodzaju koncepcji",
  wybranyRodzajKoncepcji: "Wybrana koncepcja",
  cel: "Cel w asystencie",
  branza: "Branża",
};

export function buildContactEmailDraft(form: HTMLFormElement, formTitle: string): ContactEmailDraft {
  const fields = new FormData(form);
  const message: string[] = [
    "Zgłoszenie przez formularz na stronie zielona-marka.pl",
    "Formularz: " + formTitle,
    "",
  ];

  for (const [name, raw] of fields.entries()) {
    if (name.startsWith("_") || name === "consent" || name === "website_check") continue;
    if (typeof raw !== "string" || !raw.trim()) continue;
    message.push((fieldLabels[name] ?? name) + ": " + raw.trim());
  }
  message.push("", "Odpowiedz na adres e-mail podany przez nadawcę w formularzu.");
  const subject = "Zielona Marka - " + formTitle;
  const body = message.join("\n");
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { href, body, subject };
}

export function startContactEmail(event: FormEvent<HTMLFormElement>, title: string, onDraft: (draft: ContactEmailDraft) => void) {
  event.preventDefault();
  const draft = buildContactEmailDraft(event.currentTarget, title);
  onDraft(draft);
  // A web page cannot directly send email from the owner's Gmail without an
  // authenticated mail provider. The visitor must click Send in their mail app.
  window.location.href = draft.href;
}

export function ContactEmailHelp({ draft }: { draft: ContactEmailDraft | null }) {
  if (!draft) return null;
  return (
    <div role="status" aria-live="polite" className="form-email-instructions">
      <p><strong>Sprawdź aplikację pocztową i kliknij „Wyślij”.</strong> Samo naciśnięcie przycisku w formularzu nie wysyła wiadomości.</p>
      <p>Nie otworzył się program pocztowy? <a href={draft.href}>Otwórz przygotowany e-mail ponownie</a> lub skopiuj treść poniżej i wyślij ją na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      <details><summary>Pokaż treść do skopiowania</summary>
        <textarea readOnly value={draft.body} rows={8} aria-label="Treść zgłoszenia do skopiowania" style={{width: "100%", maxWidth: "100%"}} />
      </details>
    </div>
  );
}
