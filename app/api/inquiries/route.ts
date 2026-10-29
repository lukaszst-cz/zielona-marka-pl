import { checkEdgeRateLimit } from "../../edge-rate-limit.mjs";
import { isSameSiteMutation, limitedRequestBody } from "../../request-security.mjs";
import { deliverInquiryOnce, saveInquiryOnce } from "../../inquiry-journal.mjs";
import { and, count, eq, gte } from "drizzle-orm";
import { inquiries } from "../../../db/schema";
import { sendSmtpInquiry } from "../../inquiry-smtp";
import { inquiryFormEnabled } from "../../inquiry-config.mjs";
import { sendInquiryNotification } from "../../inquiry-notification.mjs";

type Payload = Record<string, unknown>;
type NotificationEnv = {
  SMTP_PASSWORD?: string;
  RESEND_API_KEY?: string;
  INQUIRY_NOTIFICATION_TO?: string;
  INQUIRY_NOTIFICATION_FROM?: string;
  INQUIRY_FORM_ENABLED?: string;
  DB?: unknown;
};

function plain(value: unknown) {
  return String(value ?? "").trim();
}

export async function GET() {
  try {
    const { env } = await import("cloudflare:workers");
    const runtime = env as unknown as NotificationEnv;
    return Response.json({
      enabled: inquiryFormEnabled(runtime),
      databaseConfigured: Boolean(runtime.DB),
      notificationConfigured: Boolean(runtime.SMTP_PASSWORD || (runtime.RESEND_API_KEY && runtime.INQUIRY_NOTIFICATION_FROM && runtime.INQUIRY_NOTIFICATION_TO)),
      smtpConfigured: Boolean(runtime.SMTP_PASSWORD),
      activationConfigured: runtime.INQUIRY_FORM_ENABLED === "1",
    }, { headers: { "Cache-Control": "no-store, max-age=0", "X-Robots-Tag": "noindex" } });
  } catch {
    return Response.json({ enabled: false, databaseConfigured: false, notificationConfigured: false, activationConfigured: false }, { headers: { "Cache-Control": "no-store, max-age=0", "X-Robots-Tag": "noindex" } });
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json") || (request.headers.get("accept") ?? "").includes("application/json");
  const isJsonBody = contentType.includes("application/json");
  const reply = (message: string, status: number) => wantsJson
    ? Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } })
    : new Response(message, { status, headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" } });

  try {
    if (!isSameSiteMutation(request)) return reply("Niedozwolone źródło formularza.", 403);

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > 20000) return reply("Wiadomość jest zbyt długa.", 413);

    let limitedBody: Response;
    try { limitedBody = await limitedRequestBody(request, 20000); }
    catch (error) { return reply(error instanceof RangeError ? "Wiadomość jest zbyt długa." : "Nieprawidłowe dane.", error instanceof RangeError ? 413 : 400); }
    let payload: Payload;
    if (isJsonBody) {
      const raw = await limitedBody.text();
      if (raw.length > 20000) return reply("Wiadomość jest zbyt długa.", 413);
      try { payload = JSON.parse(raw) as Payload; }
      catch { return reply("Nieprawidłowe dane.", 400); }
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      payload = Object.fromEntries(await limitedBody.formData());
    } else {
      return reply("Nieobsługiwany format formularza.", 415);
    }

    if (!payload || Array.isArray(payload) || typeof payload !== "object") return reply("Nieprawidłowe dane.", 400);
    if (payload.website_check || payload._honey) {
      return wantsJson
        ? Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } })
        : Response.redirect(new URL("/kontakt?wyslano=1", request.url), 303);
    }

    const name = plain(payload.name);
    const email = plain(payload.email).toLowerCase();
    const company = plain(payload.company);
    const budget = plain(payload.budget);
    let message = plain(payload.message);
    const additionalFields = [payload.phone, payload.website, payload.projectType, payload.timeline, payload.goal, payload.purpose, payload.sales, payload.cel, payload.branza].map(plain);

    if (!isJsonBody) {
      // Accept the landing page's native form submission if client JS fails.
      if (typeof payload.mode === "string" && typeof payload.details === "string") {
        const labels: Record<string, string> = {
          existing: "Nowy wygląd obecnej strony WWW",
          new: "Koncepcja strony dla nowej firmy",
          logo: "Koncepcja nowego lub odświeżonego logo",
          promo: "Koncepcja gazetki reklamowej",
          sales: "Koncepcja gazetki sprzedażowej",
        };
        const label = Object.prototype.hasOwnProperty.call(labels, payload.mode)
          ? labels[payload.mode] : undefined;
        const conceptDetails = plain(payload.details);
        if (!label || conceptDetails.length < 10 || conceptDetails.length > 4000) {
          return reply("Uzupełnij firmę, rodzaj projektu i opis (10–4000 znaków).", 400);
        }
        message = [
          "ZGŁOSZENIE: BEZPŁATNA KONCEPCJA WIZUALNA",
          "Źródło: /bezplatna-koncepcja-strony",
          "Typ: " + label,
          "",
          conceptDetails,
          "",
          "Odpowiedź na zamówioną koncepcję: e-mail z formularza. Brak zgody na odrębny marketing.",
        ].join("\n");
      }
      const details = [
        ["Telefon", plain(payload.phone)],
        ["Cel asystenta", plain(payload.cel)],
        ["Branża", plain(payload.branza)],
        ["Firma", company],
        ["Obecna strona", plain(payload.website)],
        ["Usługa lub obszar", plain(payload.projectType)],
        ["Termin", plain(payload.timeline)],
        ["Cel", plain(payload.goal) || plain(payload.purpose)],
        ["Sprzedaż lub płatności", plain(payload.sales)],
        ["Budżet", budget],
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
      if (details.length) message = `${details.join("\n")}\n\n${message}`;
    }

    const fieldsTooLong = additionalFields.some(value => value.length > 500);
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 10000 || payload.consent !== "yes" || company.length > 200 || budget.length > 200 || fieldsTooLong) {
      return reply("Sprawdź pola formularza i zgodę na kontakt.", 400);
    }

    const { env } = await import("cloudflare:workers");
    const runtime = env as unknown as NotificationEnv;
    if (!inquiryFormEnabled(runtime)) return reply("Wysyłka formularza nie jest jeszcze dostępna. Napisz na kontakt@zielona-marka.pl.", 503);
    const rate = await checkEdgeRateLimit(runtime, "ZM_INQUIRY_RATE_LIMITER", request);
    if (!rate.available) return reply("Wysyłka jest chwilowo niedostępna. Treść pozostaje w formularzu. Spróbuj ponownie za minutę.", 503);
    if (!rate.allowed) {
      const response = reply("Zbyt wiele wiadomości. Spróbuj ponownie za minutę.", 429);
      response.headers.set("Retry-After", "60");
      return response;
    }
    if (plain(payload.formTitle)) message = `Formularz: ${plain(payload.formTitle).slice(0,120)}\n\n${message}`;

    const { getDb } = await import("../../../db");
    const db = getDb();
    const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    // A repeated request after a lost response must not create another identical lead.
    const [duplicate] = await db.select({ id: inquiries.id }).from(inquiries)
      .where(and(eq(inquiries.email, email), eq(inquiries.name, name), eq(inquiries.company, company), eq(inquiries.budget, budget), eq(inquiries.message, message), gte(inquiries.createdAt, cutoff))).limit(1);
    const [recent] = await db.select({ total: count() }).from(inquiries).where(and(eq(inquiries.email, email), gte(inquiries.createdAt, cutoff)));
    if (!duplicate && Number(recent?.total ?? 0) >= 3) {
      const response = reply("Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za kilka minut.", 429);
      response.headers.set("Retry-After", "600");
      return response;
    }

    const inserted = await saveInquiryOnce(runtime.DB, {name,email,company,budget,message}, cutoff);
    try {
      const delivery = await deliverInquiryOnce(runtime.DB, inserted.id, async () => {
        if (runtime.SMTP_PASSWORD) return sendSmtpInquiry({ id: inserted.id, name, email, company, message, title: plain(payload.formTitle).replace(/[\r\n]/g, " ").slice(0, 120) }, runtime);
        return sendInquiryNotification({ id: inserted.id, name, email, company, message }, runtime);
      }, { duplicate: inserted.duplicate });
      if (!delivery.confirmed) throw new Error("Provider acknowledgement requires owner review.");
    } catch {
      console.error("Inquiry saved; provider acknowledgement unavailable.", { inquiryId: inserted.id });
      const error = `Zgłoszenie nr ${inserted.id} zostało zapisane. Nie udało się potwierdzić powiadomienia e-mail. Jeśli sprawa jest pilna, zadzwoń pod +48 450 458 466.`;
      return wantsJson
        ? Response.json({ error, saved: true, reference: inserted.id }, {status:503,headers:{"Cache-Control":"no-store"}})
        : reply(error, 503);
    }
    return wantsJson
      ? Response.json({ ok: true, reference: inserted.id }, { status: 201, headers: { "Cache-Control": "no-store" } })
      : Response.redirect(new URL("/kontakt?wyslano=1", request.url), 303);
  } catch {
    return reply("Nie udało się zapisać wiadomości. Napisz bezpośrednio na kontakt@zielona-marka.pl.", 500);
  }
}
