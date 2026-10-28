"use client";

import Link from "./SafeLink";
import { useEffect, useRef } from "react";
import { ContactEmailHelp } from "./EmailContact";
import { useInquirySubmission, InquirySubmissionStatus } from "./useInquirySubmission";
import { takeQuoteTransfer } from "./QuoteTransfer";
import { trackAnalyticsEvent } from "./CookieConsent";

export default function ContactForm({ audit = false, initialPackage = "", initialEstimate = "" }: { audit?: boolean; initialPackage?: string; initialEstimate?: string }) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const submission = useInquirySubmission(audit ? "Miniocena strony" : "Kontakt i wycena");
  const { draft } = submission;

  useEffect(() => {
    const summary = takeQuoteTransfer(initialPackage);
    if (!summary || !messageRef.current) return;
    const current = messageRef.current.value;
    messageRef.current.value = [current, summary].filter(Boolean).join("\n\n").slice(0, 8000);
  }, [initialPackage]);
  return <form className="contact-form" data-analytics-form={audit ? "miniocena" : "brief"} method="post" action={submission.action} encType={submission.encType} onSubmit={(event) => { trackAnalyticsEvent("form_submit_attempt", { form_name: audit ? "miniocena" : "brief", page_path: window.location.pathname }); void submission.submit(event); }}>
    <input className="form-trap" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label>Imię<input required name="name" maxLength={120} placeholder="Jak masz na imię?" autoComplete="name" /></label>
    <label>E-mail<input required type="email" name="email" maxLength={254} placeholder="twoj@email.pl" autoComplete="email" /></label>
    <label>Firma <span>(opcjonalnie)</span><input name="company" maxLength={200} placeholder="Nazwa firmy" autoComplete="organization" /></label>
    <label>Adres obecnej strony <span>(opcjonalnie)</span><input name="website" maxLength={500} type="url" placeholder="https://twoja-strona.pl" /></label>
    <label>Czego potrzebujesz?<select required name="projectType" defaultValue={initialPackage.startsWith("DTP") ? "DTP i przygotowanie do druku" : initialPackage.includes("Mini") ? "Prosta strona wizytówka. ZM Mini" : initialPackage ? "Strona WWW szyta na miarę" : ""}><option value="" disabled>Wybierz najbliższą odpowiedź</option><option>Strona WWW szyta na miarę</option><option>Prosta strona wizytówka. ZM Mini</option><option>DTP i przygotowanie do druku</option><option>Formularz wyceny lub zgłoszenia</option><option>System dla firmy: procesy i automatyzacje</option><option>Mały CRM do klientów i zleceń</option><option>Sprzedaż produktów, vouchery lub płatności online</option><option>Strona dla warsztatu lub detailingu</option><option>Strona dla firmy remontowej lub instalatora</option><option>Strona dla beauty lub usług na termin</option><option>Modernizacja obecnej strony</option><option>Potrzebuję krótkiej konsultacji</option></select></label>
    <label>Najważniejszy efekt<select name="goal" defaultValue=""><option value="">Wybierz, jeśli wiesz</option><option>Więcej konkretnych zapytań</option><option>Lepsza prezentacja firmy i oferty</option><option>Porządek w obsłudze klientów</option><option>Sprzedaż produktów lub voucherów</option><option>Mniej ręcznej pracy i powtarzalnych pytań</option></select></label>
    <label>Sprzedaż lub płatności <span>(opcjonalnie)</span><select name="sales" defaultValue=""><option value="">Nie dotyczy / jeszcze nie wiem</option><option>Produkty lub vouchery online</option><option>Rezerwacje usług</option><option>Płatność za usługę lub zaliczka</option></select></label>
    <label>Orientacyjny budżet <span>(opcjonalnie)</span><select name="budget" defaultValue=""><option value="">Wolę najpierw poznać zakres</option><option>do 3 000 zł</option><option>3 000–6 000 zł</option><option>6 000–12 000 zł</option><option>powyżej 12 000 zł</option></select></label>
    <label className="form-wide">Co dziś nie działa albo jaki efekt chcesz osiągnąć?<textarea required name="message" ref={messageRef} maxLength={8000} rows={5} defaultValue={[initialPackage && "Wybrany pakiet: " + initialPackage, initialEstimate].filter(Boolean).join("\n\n")} placeholder="Np. mam obecną stronę, ale klienci rzadko piszą. Chcę lepiej pokazać usługi." /></label>
    <label className="form-consent form-wide"><input required type="checkbox" name="consent" value="yes" /> <span>Zapoznałem/-am się z <Link href="/polityka-prywatnosci">polityką prywatności</Link> i proszę o kontakt.</span></label>
    <button className="button form-wide" type="submit" disabled={submission.disabled}>{submission.enabled ? submission.label : audit ? "Przygotuj e-mail z minioceną" : "Przygotuj e-mail do wysłania"}<span>↗</span></button>
    {!submission.enabled && <p className="form-wide">Po kliknięciu otworzy się program pocztowy. Aby wysłać wiadomość, kliknij w nim „Wyślij”.</p>}
    <InquirySubmissionStatus state={submission.state} />
    <ContactEmailHelp draft={draft} />
  </form>;
}
