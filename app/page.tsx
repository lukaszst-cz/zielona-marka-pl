import type { Metadata } from "next";
import { OrganicHome } from "./OrganicHome";
export const metadata: Metadata = {title: "Strony internetowe Marki i Warszawa", description: "Projektuję strony internetowe i modernizuję istniejące witryny dla firm z Marek, Ząbek, Targówka i Warszawy. Strony WWW, formularze, sklepy i opieka.", alternates:{canonical:"/",languages:{pl:"/",en:"/en","x-default":"/"}}};
export default function Home() {return <OrganicHome inspirationPreview />;}
