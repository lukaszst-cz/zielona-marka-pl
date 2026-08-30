import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";

const attempts = new Map<string, { count: number; startedAt: number }>();
const maxBodySize = 12_000;

function rateLimited(request: Request) {
  const key = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now - current.startedAt > 60_000) {
    attempts.set(key, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maxBodySize) return Response.json({ error: "Wiadomość jest zbyt długa." }, { status: 413 });
    if (rateLimited(request)) return Response.json({ error: "Spróbuj ponownie za chwilę." }, { status: 429 });
    const payload = (await request.json()) as Record<string, unknown>;
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const company = String(payload.company ?? "").trim();
    const message = String(payload.message ?? "").trim();
    const honeypot = String(payload.companyWebsite ?? "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (honeypot) return Response.json({ error: "Nie udało się wysłać wiadomości." }, { status: 400 });
    if (payload.consent !== true || !name || !emailPattern.test(email) || !message) return Response.json({ error: "Uzupełnij wymagane pola i potwierdź zgodę na kontakt." }, { status: 400 });
    if (name.length > 100 || email.length > 254 || company.length > 150 || message.length > 5_000) return Response.json({ error: "Jedno z pól jest zbyt długie." }, { status: 400 });
    await getDb().insert(inquiries).values({ name, email, company, budget: String(payload.budget ?? "").trim().slice(0, 100), message, status: "Nowe", createdAt: new Date().toISOString() });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Nie udało się zapisać wiadomości. Napisz bezpośrednio na e-mail." }, { status: 500 });
  }
}
