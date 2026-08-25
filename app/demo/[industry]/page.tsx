import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryDemo from "./IndustryDemo";

const valid=["natura","bistro","dom"];
export const metadata:Metadata={title:"Demo zaplecza procesowego",description:"Interaktywne zaplecze pokazujące obieg pracy, automatyzacje i KPI.",robots:{index:false,follow:false},openGraph:{images:[]},twitter:{images:[]}};
export default async function Demo({params}:{params:Promise<{industry:string}>}){const {industry}=await params;if(!valid.includes(industry))notFound();return <IndustryDemo industry={industry as "natura"|"bistro"|"dom"}/>}
