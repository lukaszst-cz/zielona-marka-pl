import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

export const metadata: Metadata = { title: "Strony internetowe dla warsztatów i detailingu", description: "Strona warsztatu z formularzem: auto, usterka, zdjęcia i termin. Rozwiązania dla warsztatów i detailingu z Marek i okolic.", alternates: { canonical: "/strony-dla-warsztatow" } };
export default function Page() { return <IndustryLanding variant="auto" />; }
