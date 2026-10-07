import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

const title = "Strony dla warsztatów i detailingu";
const description = "Strona warsztatu z formularzem: auto, usterka, zdjęcia i termin. Rozwiązania dla warsztatów i detailingu z Marek i okolic.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/strony-dla-warsztatow" },
  openGraph: {
    title: "Strony dla warsztatów i detailingu | Zielona Marka",
    description,
    url: "/strony-dla-warsztatow",
    images: [{ url: "/demo/auto-naprawa/assets/workshop-hero.png", alt: "Przykład strony internetowej dla warsztatu samochodowego" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony dla warsztatów i detailingu | Zielona Marka",
    description,
    images: ["/demo/auto-naprawa/assets/workshop-hero.png"],
  },
};

export default function Page() { return <IndustryLanding variant="auto" />; }
