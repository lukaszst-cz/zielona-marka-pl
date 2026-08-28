import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

export const metadata: Metadata = { title: "Strony dla firm remontowych i instalatorów", description: "Strona i formularz wyceny dla ekip remontowych, hydraulików, elektryków, instalatorów i lokalnych wykonawców.", alternates: { canonical: "/strony-dla-firm-uslugowych" } };
export default function Page() { return <IndustryLanding variant="home" />; }
