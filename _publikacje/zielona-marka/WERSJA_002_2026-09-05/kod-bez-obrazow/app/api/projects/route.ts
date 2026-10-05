import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(projects).where(eq(projects.published, true)).orderBy(desc(projects.updatedAt));
    return Response.json({ projects: rows });
  } catch {
    return Response.json({ projects: [] });
  }
}
