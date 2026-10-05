import type { Metadata } from "next";
import IndustryLanding from "../IndustryLanding";

export const metadata: Metadata = { title: "Strony internetowe dla branży beauty", description: "Strony, rezerwacje i chatboty dla salonów kosmetycznych, fryzjerów, barberów, masażu i usług umawianych na termin.", alternates: { canonical: "/strony-dla-beauty" } };
export default function Page() { return <IndustryLanding variant="beauty" />; }
