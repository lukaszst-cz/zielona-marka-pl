import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select({
      id: projects.id,
      title: projects.title,
      type: projects.type,
      description: projects.description,
      imageUrl: projects.imageUrl,
      websiteUrl: projects.websiteUrl,
      updatedAt: projects.updatedAt,
    }).from(projects).where(eq(projects.published, true)).orderBy(desc(projects.updatedAt));
    return Response.json({ projects: rows });
  } catch {
    return Response.json({ projects: [] });
  }
}
