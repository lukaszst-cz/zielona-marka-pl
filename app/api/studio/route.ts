import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { inquiries, leads, projects, tasks } from "../../../db/schema";
import { getStudioOwner } from "../../studio/auth";

function createPublicCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const part = (offset: number) => Array.from(bytes.slice(offset, offset + 4), (byte) => alphabet[byte % alphabet.length]).join("");
  return `ZM-${part(0)}-${part(4)}-${part(8)}`;
}

export async function GET() {
  if (!(await getStudioOwner())) return Response.json({ error: "Brak dostępu" }, { status: 403 });
  const db = getDb();
  const [leadRows, projectRows, taskRows, inquiryRows] = await Promise.all([
    db.select().from(leads).orderBy(desc(leads.updatedAt)),
    db.select().from(projects).orderBy(desc(projects.updatedAt)),
    db.select().from(tasks).orderBy(desc(tasks.updatedAt)),
    db.select().from(inquiries).orderBy(desc(inquiries.createdAt)),
  ]);
  return Response.json({ leads: leadRows, projects: projectRows, tasks: taskRows, inquiries: inquiryRows });
}

export async function POST(request: Request) {
  if (!(await getStudioOwner())) return Response.json({ error: "Brak dostępu" }, { status: 403 });
  const payload = (await request.json()) as Record<string, unknown>;
  const entity = String(payload.entity ?? "");
  const now = new Date().toISOString();
  const db = getDb();
  if (entity === "lead") {
    const [row] = await db.insert(leads).values({ name: String(payload.name ?? "").trim(), company: String(payload.company ?? "").trim(), email: String(payload.email ?? "").trim(), phone: String(payload.phone ?? "").trim(), value: Number(payload.value ?? 0), stage: "Nowy kontakt", nextAction: String(payload.nextAction ?? "Skontaktować się"), dueDate: String(payload.dueDate ?? "") || null, source: "Ręcznie", createdAt: now, updatedAt: now }).returning();
    return Response.json({ row }, { status: 201 });
  }
  if (entity === "project") {
    const publicCode = createPublicCode();
    const [row] = await db.insert(projects).values({ title: String(payload.title ?? "").trim(), clientName: String(payload.clientName ?? "").trim(), clientEmail: String(payload.clientEmail ?? "").trim(), clientCompany: String(payload.clientCompany ?? "").trim(), type: String(payload.type ?? "Strona firmowa"), description: String(payload.description ?? "").trim(), scope: String(payload.scope ?? "").trim(), nextStep: String(payload.nextStep ?? "Ustalenie kolejnego etapu").trim(), imageUrl: String(payload.imageUrl ?? "").trim(), status: "Planowanie", price: Number(payload.price ?? 0), deadline: String(payload.deadline ?? "") || null, startDate: String(payload.startDate ?? "") || null, progress: 0, published: Boolean(payload.published), websiteUrl: String(payload.websiteUrl ?? "").trim(), publicCode, contractStatus: "Szkic", providerName: "Zielona Marka — Łukasz Staniewicz", createdAt: now, updatedAt: now }).returning();
    const contractNumber = `ZM/${new Date().getFullYear()}/${String(row.id).padStart(3, "0")}`;
    await db.update(projects).set({ contractNumber }).where(eq(projects.id, row.id));
    return Response.json({ row: { ...row, contractNumber } }, { status: 201 });
  }
  if (entity === "task") {
    const [row] = await db.insert(tasks).values({ title: String(payload.title ?? "").trim(), projectId: payload.projectId ? Number(payload.projectId) : null, status: "Do zrobienia", priority: String(payload.priority ?? "Normalny"), dueDate: String(payload.dueDate ?? "") || null, createdAt: now, updatedAt: now }).returning();
    return Response.json({ row }, { status: 201 });
  }
  return Response.json({ error: "Nieznany typ rekordu" }, { status: 400 });
}
