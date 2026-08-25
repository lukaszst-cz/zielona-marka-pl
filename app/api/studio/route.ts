import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { inquiries, leads, projects, tasks } from "../../../db/schema";
import { getStudioOwner } from "../../studio/auth";

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
    const [row] = await db.insert(projects).values({ title: String(payload.title ?? "").trim(), clientName: String(payload.clientName ?? "").trim(), type: String(payload.type ?? "Strona firmowa"), description: String(payload.description ?? "").trim(), imageUrl: String(payload.imageUrl ?? "").trim(), status: "Planowanie", price: Number(payload.price ?? 0), deadline: String(payload.deadline ?? "") || null, progress: 0, published: Boolean(payload.published), websiteUrl: String(payload.websiteUrl ?? "").trim(), createdAt: now, updatedAt: now }).returning();
    return Response.json({ row }, { status: 201 });
  }
  if (entity === "task") {
    const [row] = await db.insert(tasks).values({ title: String(payload.title ?? "").trim(), projectId: payload.projectId ? Number(payload.projectId) : null, status: "Do zrobienia", priority: String(payload.priority ?? "Normalny"), dueDate: String(payload.dueDate ?? "") || null, createdAt: now, updatedAt: now }).returning();
    return Response.json({ row }, { status: 201 });
  }
  return Response.json({ error: "Nieznany typ rekordu" }, { status: 400 });
}
