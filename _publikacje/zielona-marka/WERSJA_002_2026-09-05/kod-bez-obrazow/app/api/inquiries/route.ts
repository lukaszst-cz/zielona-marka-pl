import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const message = String(payload.message ?? "").trim();
    if (!name || !email.includes("@") || !message) return Response.json({ error: "Uzupełnij wymagane pola." }, { status: 400 });
    const [inquiry] = await getDb().insert(inquiries).values({ name, email, company: String(payload.company ?? "").trim(), budget: String(payload.budget ?? "").trim(), message, status: "Nowe", createdAt: new Date().toISOString() }).returning();
    return Response.json({ inquiry }, { status: 201 });
  } catch {
    return Response.json({ error: "Nie udało się zapisać wiadomości. Napisz bezpośrednio na e-mail." }, { status: 500 });
  }
}
