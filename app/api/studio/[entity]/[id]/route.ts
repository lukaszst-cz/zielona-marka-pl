import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { inquiries, leads, projects, tasks } from "../../../../../db/schema";
import { getStudioOwner } from "../../../../studio/auth";

const tables = { lead: leads, project: projects, task: tasks, inquiry: inquiries } as const;
type Entity = keyof typeof tables;

export async function PATCH(request: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await getStudioOwner())) return Response.json({ error: "Brak dostępu" }, { status: 403 });
  const { entity, id } = await params;
  if (!(entity in tables)) return Response.json({ error: "Nieznany rekord" }, { status: 400 });
  const payload = (await request.json()) as Record<string, unknown>;
  const table = tables[entity as Entity];
  const allowed: Record<Entity, string[]> = {
    lead: ["stage", "nextAction", "dueDate", "value"],
    project: ["status", "progress", "published", "deadline", "websiteUrl", "imageUrl", "description", "clientEmail", "clientCompany", "clientAddress", "clientNip", "scope", "nextStep", "clientNote", "contractStatus", "contractNumber", "startDate", "providerName", "providerAddress", "providerNip"],
    task: ["status", "priority", "dueDate"],
    inquiry: ["status"],
  };
  const changes: Record<string, unknown> = {};
  for (const key of allowed[entity as Entity]) if (key in payload) changes[key] = payload[key];
  if (entity !== "inquiry") changes.updatedAt = new Date().toISOString();
  await getDb().update(table as typeof leads).set(changes).where(eq((table as typeof leads).id, Number(id)));
  return Response.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await getStudioOwner())) return Response.json({ error: "Brak dostępu" }, { status: 403 });
  const { entity, id } = await params;
  if (!(entity in tables)) return Response.json({ error: "Nieznany rekord" }, { status: 400 });
  const table = tables[entity as Entity];
  await getDb().delete(table as typeof leads).where(eq((table as typeof leads).id, Number(id)));
  return Response.json({ ok: true });
}
