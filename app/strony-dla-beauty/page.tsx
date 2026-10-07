import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

const title = "Strony internetowe dla branży beauty";
const description = "Strony, rezerwacje i automatyczny asystent dla salonów kosmetycznych, fryzjerów, barberów, masażu i usług umawianych na termin.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/strony-dla-beauty" },
  openGraph: {
    title: "Strony internetowe dla branży beauty | Zielona Marka",
    description,
    url: "/strony-dla-beauty",
    images: [{ url: "/concept-natura.jpg", alt: "Przykład strony internetowej dla salonu beauty" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony internetowe dla branży beauty | Zielona Marka",
    description,
    images: ["/concept-natura.jpg"],
  },
};

export default function Page() { return <IndustryLanding variant="beauty" />; }
