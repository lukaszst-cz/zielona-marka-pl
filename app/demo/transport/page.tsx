import type { Metadata } from "next";
import TransportDemo from "./TransportDemo";

export const metadata: Metadata = { title: "Demo automatyzacji firmy transportowej", description: "Interaktywna demonstracja obiegu zleceń, statusów, dokumentów i KPI.", robots: { index: false, follow: false }, openGraph: { images: [] }, twitter: { images: [] } };

export default function TransportPage() { return <TransportDemo/>; }
