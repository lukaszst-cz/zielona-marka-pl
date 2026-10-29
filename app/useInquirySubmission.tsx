"use client";

import { useRef, useState, type FormEvent } from "react";
import { buildContactEmailDraft, type ContactEmailDraft } from "./EmailContact";

type ApiResult = { enabled?: boolean; ok?: boolean; saved?: boolean; reference?: number; error?: string };
function resultObject(value: unknown): ApiResult {
  return value && typeof value === "object" && !Array.isArray(value) ? value as ApiResult : {};
}

type Submission = { kind: "idle" | "sending" | "saved" | "error"; message: string };

export function useInquirySubmission(title: string) {
  const [draft, setDraft] = useState<ContactEmailDraft | null>(null);
  const [state, setState] = useState<Submission>({ kind: "idle", message: "" });
  const pending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || state.kind === "saved") return;
    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("formTitle", title);
    const copy = buildContactEmailDraft(form, title);
    pending.current = true;
    setDraft(null);
    setState({ kind: "sending", message: "Wysyłam zgłoszenie…" });
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST", headers: { Accept: "application/json" }, body,
        signal: AbortSignal.timeout(60000),
      });
      const result = resultObject(await response.json());
      if (result.saved === true || (response.ok && result.ok === true && Number.isInteger(result.reference))) {
        setState({ kind: "saved", message: result.error || `Zgłoszenie nr ${result.reference} zostało zapisane. Odpowiem na podany adres e-mail.` });
        return;
      }
      throw new Error(typeof result.error === "string" ? result.error : "Nie udało się potwierdzić odbioru zgłoszenia.");
    } catch (error) {
      setDraft(copy);
      setState({ kind: "error", message: (error instanceof Error && error.name !== "TimeoutError") ? error.message : "Nie udało się potwierdzić odbioru. Treść została zachowana. Możesz skontaktować się bezpośrednio przez e-mail lub telefon." });
    } finally { pending.current = false; }
  }
  return {
    draft, state, submit,
    action: "/api/inquiries",
    encType: "multipart/form-data",
    disabled: state.kind === "sending" || state.kind === "saved",
    label: state.kind === "sending" ? "Wysyłam…" : state.kind === "saved" ? "Zgłoszenie zapisane" : "Wyślij zgłoszenie",
  };
}

export function InquirySubmissionStatus({ state }: { state: Submission }) {
  if (state.kind === "idle") return null;
  return <div className="form-email-instructions form-wide" role={state.kind === "error" ? "alert" : "status"} aria-live="polite"><p>{state.message}</p></div>;
}
