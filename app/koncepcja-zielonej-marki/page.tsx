import type { Metadata } from "next";
import { OrganicHome } from "../OrganicHome";
export const metadata: Metadata = { title: "Koncepcja nowej strony", robots: {index:false,follow:false}, alternates: {canonical:"/"} };
export default function Concept() {return <OrganicHome />;}
