import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { projects } from "../../../../db/schema";
import ContractPrint from "./ContractPrint";

export const metadata: Metadata = { title: "Umowa projektu — wzór", robots: { index: false, follow: false }, openGraph: { images: [] }, twitter: { images: [] } };
export default async function Contract({params}:{params:Promise<{code:string}>}){const {code}=await params;const [p]=await getDb().select().from(projects).where(eq(projects.publicCode,decodeURIComponent(code).toUpperCase())).limit(1);if(!p)notFound();return <ContractPrint project={p}/>}
