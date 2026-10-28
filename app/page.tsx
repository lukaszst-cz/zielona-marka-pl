import type { Metadata } from "next";
import { OrganicHome } from "./OrganicHome";
export const metadata: Metadata = {title: "Strony internetowe i wizytówki dla firm – Warszawa", description: "Strony wizytówki od 899 zł netto, strony firmowe, formularze i CRM. Projekt, hosting, opieka i DTP dla firm z Warszawy, Marek i okolic.", alternates:{canonical:"/",languages:{pl:"/",en:"/en","x-default":"/"}}};
export default function Home() {return <OrganicHome inspirationPreview />;}
