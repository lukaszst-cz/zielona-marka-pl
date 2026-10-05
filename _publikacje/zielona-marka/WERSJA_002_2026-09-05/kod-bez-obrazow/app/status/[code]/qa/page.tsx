import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { projects, tasks } from "../../../../db/schema";
import QaReport from "./QaReport";

export const metadata: Metadata = {
  title: "Raport kontroli jakości",
  robots: { index: false, follow: false },
  openGraph: { images: [] },
  twitter: { images: [] },
};

const defaults = [
  "QA: sprawdź stronę na telefonie i komputerze",
  "QA: sprawdź formularze, e-mail i komunikaty błędów",
  "QA: sprawdź linki, meta dane i indeksowanie",
  "QA: sprawdź szybkość oraz podstawową dostępność",
];

export default async function QualityReportPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const db = getDb();
  const [project] = await db.select().from(projects).where(eq(projects.publicCode, decodeURIComponent(code).toUpperCase())).limit(1);
  if (!project) notFound();

  const taskRows = await db.select().from(tasks).where(eq(tasks.projectId, project.id));
  const qualityTasks = taskRows.filter((task) => task.title.toUpperCase().startsWith("QA:"));
  const checks = qualityTasks.length
    ? qualityTasks.map((task) => ({ title: task.title, status: task.status }))
    : defaults.map((title) => ({ title, status: "Do wykonania" }));

  return <QaReport project={{ title: project.title, publicCode: project.publicCode, updatedAt: project.updatedAt }} checks={checks} />;
}
