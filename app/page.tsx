import type { Metadata } from "next";
import { OrganicHome } from "./OrganicHome";
export const metadata: Metadata = {title: "Strony internetowe i modernizacja dla firm", description: "Tworzenie i modernizacja stron internetowych dla firm z Marek, Ząbek i okolic. Strony firmowe, formularze wyceny, opieka i prosty kontakt z klientem.", alternates:{canonical:"/",languages:{pl:"/",en:"/en","x-default":"/"}}};
export default function Home() {return <OrganicHome inspirationPreview />;}
