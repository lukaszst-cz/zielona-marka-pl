import { and, count, eq, gte } from "drizzle-orm";
import { inquiries } from "../../../db/schema";

type Payload = Record<string, unknown>;
type NotificationEnv = {
  RESEND_API_KEY?: string;
  INQUIRY_NOTIFICATION_TO?: string;
  INQUIRY_NOTIFICATION_FROM?: string;
};

function plain(value: unknown) {
  return String(value ?? "").trim();
}

async function notifyOwner(data: { name: string; email: string; company: string; message: string }) {
  const { env } = await import("cloudflare:workers");
  const runtime = env as unknown as NotificationEnv;
  if (!runtime.RESEND_API_KEY || !runtime.INQUIRY_NOTIFICATION_TO || !runtime.INQUIRY_NOTIFICATION_FROM) return;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${runtime.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: runtime.INQUIRY_NOTIFICATION_FROM,
      to: [runtime.INQUIRY_NOTIFICATION_TO],
      reply_to: data.email,
      subject: `Nowe zapytanie ze strony: ${data.name}`,
      text: `Imię: ${data.name}\nE-mail: ${data.email}\nFirma: ${data.company || "nie podano"}\n\n${data.message}`,
    }),
  });
  if (!response.ok) throw new Error("Notification provider rejected the message.");
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");
  const reply = (message: string, status: number) => wantsJson
    ? Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } })
    : new Response(message, { status, headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" } });

  try {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");
    if (origin && new URL(origin).host !== requestUrl.host) return reply("Niedozwolone źródło formularza.", 403);
    if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return reply("Niedozwolone źródło formularza.", 403);

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > 20000) return reply("Wiadomość jest zbyt długa.", 413);

    let payload: Payload;
    if (wantsJson) {
      const raw = await request.text();
      if (raw.length > 20000) return reply("Wiadomość jest zbyt długa.", 413);
      try { payload = JSON.parse(raw) as Payload; }
      catch { return reply("Nieprawidłowe dane.", 400); }
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      payload = Object.fromEntries(await request.formData());
    } else {
      return reply("Nieobsługiwany format formularza.", 415);
    }

    if (!payload || Array.isArray(payload) || typeof payload !== "object") return reply("Nieprawidłowe dane.", 400);
    if (payload.website_check) {
      return wantsJson
        ? Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } })
        : Response.redirect(new URL("/kontakt?wyslano=1", request.url), 303);
    }

    const name = plain(payload.name);
    const email = plain(payload.email).toLowerCase();
    const company = plain(payload.company);
    const budget = plain(payload.budget);
    let message = plain(payload.message);
    const additionalFields = [payload.phone, payload.website, payload.projectType, payload.timeline, payload.goal, payload.sales].map(plain);

    if (!wantsJson) {
      const details = [
        ["Telefon", plain(payload.phone)],
        ["Firma", company],
        ["Obecna strona", plain(payload.website)],
        ["Usługa lub obszar", plain(payload.projectType)],
        ["Termin", plain(payload.timeline)],
        ["Cel", plain(payload.goal)],
        ["Sprzedaż lub płatności", plain(payload.sales)],
        ["Budżet", budget],
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
      if (details.length) message = `${details.join("\n")}\n\n${message}`;
    }

    const fieldsTooLong = additionalFields.some(value => value.length > 500);
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 10000 || payload.consent !== "yes" || company.length > 200 || budget.length > 200 || fieldsTooLong) {
      return reply("Sprawdź pola formularza i zgodę na kontakt.", 400);
    }

    const { getDb } = await import("../../../db");
    const db = getDb();
    const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const [recent] = await db.select({ total: count() }).from(inquiries).where(and(eq(inquiries.email, email), gte(inquiries.createdAt, cutoff)));
    if (Number(recent?.total ?? 0) >= 3) {
      const response = reply("Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za kilka minut.", 429);
      response.headers.set("Retry-After", "600");
      return response;
    }

    await db.insert(inquiries).values({ name, email, company, budget, message, status: "Nowe", createdAt: new Date().toISOString() });
    await notifyOwner({ name, email, company, message }).catch(() => undefined);

    return wantsJson
      ? Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } })
      : Response.redirect(new URL("/kontakt?wyslano=1", request.url), 303);
  } catch {
    return reply("Nie udało się zapisać wiadomości. Napisz bezpośrednio na kontakt@zielona-marka.pl.", 500);
  }
}
