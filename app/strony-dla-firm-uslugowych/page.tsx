import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

const title = "Strony dla firm remontowych i instalatorów";
const description = "Strona i formularz wyceny dla ekip remontowych, hydraulików, elektryków, instalatorów i lokalnych wykonawców.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/strony-dla-firm-uslugowych" },
  openGraph: {
    title: "Strony dla firm remontowych i instalatorów | Zielona Marka",
    description,
    url: "/strony-dla-firm-uslugowych",
    images: [{ url: "/concept-dom.jpg", alt: "Przykład strony internetowej dla firmy remontowej i instalacyjnej" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony dla firm remontowych i instalatorów | Zielona Marka",
    description,
    images: ["/concept-dom.jpg"],
  },
};

export default function Page() { return <IndustryLanding variant="home" />; }
