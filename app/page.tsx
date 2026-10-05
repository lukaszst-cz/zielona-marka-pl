import type { Metadata } from "next";
import { OrganicHome } from "./OrganicHome";
export const metadata: Metadata = {title: "Strony internetowe Warszawa Targówek", description: "Strony WWW, formularze, systemy dla firm i CRM. Płatności za produkty i vouchery, obsługa zapytań i wsparcie firm z Targówka, Warszawy oraz okolic.", alternates:{canonical:"/",languages:{pl:"/",en:"/en"}}};
export default function Home() {return <OrganicHome />;}
