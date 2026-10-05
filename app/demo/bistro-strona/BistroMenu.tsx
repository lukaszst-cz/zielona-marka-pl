"use client";
import { useState } from "react";
const dishes = [
  {category:"Na początek",name:"Pieczony kalafior",detail:"labneh · pistacje · mięta",price:29},
  {category:"Na początek",name:"Krem z pomidorów",detail:"bazylia · oliwa · grzanka",price:24},
  {category:"Dania główne",name:"Kurczak kukurydziany",detail:"młode ziemniaki · sos estragonowy",price:52},
  {category:"Dania główne",name:"Kaszotto z boczniakiem",detail:"szparagi · dojrzewający ser",price:44},
  {category:"Na słodko",name:"Sernik palony",detail:"rabarbar · wanilia · migdał",price:25},
  {category:"Na słodko",name:"Gruszka w przyprawach",detail:"krem waniliowy · orzechy",price:23},
];
export default function BistroMenu(){
 const [category,setCategory]=useState("Wszystko");
 const [selected,setSelected]=useState<string[]>([]);
 return <><div className="bf-filters" aria-label="Kategorie menu">{["Wszystko","Na początek","Dania główne","Na słodko"].map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
 <div className="bf-menu-grid">{dishes.filter(d=>category==="Wszystko"||d.category===category).map(d=><article key={d.name}><small>{d.category}</small><h3>{d.name}</h3><p>{d.detail}</p><button type="button" aria-pressed={selected.includes(d.name)} onClick={()=>setSelected(s=>s.includes(d.name)?s.filter(n=>n!==d.name):[...s,d.name])}><span>{d.price} zł</span><span>{selected.includes(d.name)?"Wybrano ✓":"Dodaj +"}</span></button></article>)}</div>
 <div className="bf-basket" role="status"><span>{selected.length?`Twój wybór: ${selected.length} ${selected.length===1?"danie":"dania"} · ${dishes.filter(d=>selected.includes(d.name)).reduce((s,d)=>s+d.price,0)} zł`:"Wybierz coś dla siebie z naszej karty."}</span><small>Demonstracja menu. Nie składasz zamówienia ani nie dokonujesz płatności.</small></div></>;
}
