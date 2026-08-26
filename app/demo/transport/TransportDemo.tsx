"use client";
import type { AnchorHTMLAttributes } from "react";
import { useMemo, useState } from "react";
import BrandSignature from "../../BrandSignature";

const Link = ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props} />;

const stages = ["Nowe", "Wycena", "Przypisane", "W trasie", "Dostarczone", "Faktura"];
const initial = [
  { id:"ZT-1048", route:"Poznań → Berlin", client:"Nord-Bud", status:4, value:4800, onTime:true },
  { id:"ZT-1049", route:"Wrocław → Praga", client:"Forma Meble", status:3, value:3600, onTime:true },
  { id:"ZT-1050", route:"Łódź → Gdańsk", client:"Dobry Dom", status:2, value:2850, onTime:true },
  { id:"ZT-1051", route:"Katowice → Brno", client:"Natura Lab", status:1, value:4200, onTime:false },
];

export default function TransportDemo(){
  const [orders,setOrders]=useState(initial); const [log,setLog]=useState(["08:42 · Dokument dostawy ZT-1048 zapisany", "08:35 · Klient otrzymał wiadomość o dostawie", "08:10 · Kierowca potwierdził rozpoczęcie trasy"]);
  const kpi=useMemo(()=>({active:orders.filter(x=>x.status<4).length,revenue:orders.reduce((s,x)=>s+x.value,0),onTime:Math.round(orders.filter(x=>x.onTime).length/orders.length*100),documents:orders.filter(x=>x.status>=4).length}),[orders]);
  function advance(id:string){setOrders(rows=>rows.map(x=>x.id===id?{...x,status:Math.min(5,x.status+1)}:x));const item=orders.find(x=>x.id===id);if(item)setLog(rows=>[`${new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"})} · ${id}: ${stages[Math.min(5,item.status+1)]}. Klient i zespół otrzymali aktualizację`,...rows].slice(0,6))}
  function addOrder(){const id=`ZT-${1052+orders.length}`;setOrders(rows=>[...rows,{id,route:"Warszawa → Kraków",client:"Nowe zapytanie",status:0,value:3200,onTime:true}]);setLog(rows=>[`${new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"})} · ${id}: formularz utworzył zlecenie i zadanie wyceny`,...rows].slice(0,6))}
  return <main className="transport-demo">
    <header><a className="brand" href="/"><BrandSignature compact /></a><span className="demo-badge">INTERAKTYWNE DEMO · DANE PRZYKŁADOWE</span><div className="demo-return-links"><a href="/#realizacje">Portfolio</a><a href="/">Strona główna</a><a href="/#kontakt">Zapytaj o wdrożenie ↗</a></div></header>
    <div className="transport-shell"><section className="transport-title"><div><span className="section-no">ZIELONY TRANSPORT / CENTRUM OPERACYJNE</span><h1>Dzień dobry, zespole.</h1><p>Jeden widok zleceń, terminów, dokumentów i automatyzacji.</p></div><button onClick={addOrder}>+ Zasymuluj nowe zlecenie</button></section>
    <section className="transport-kpis"><article><span>Aktywne zlecenia</span><b>{kpi.active}</b><small>aktualizowane automatycznie</small></article><article><span>Wartość zleceń</span><b>{kpi.revenue.toLocaleString("pl-PL")} zł</b><small>bieżący zestaw demonstracyjny</small></article><article><span>Terminowość</span><b>{kpi.onTime}%</b><small>cel: minimum 95%</small></article><article><span>Dokumenty dostawy</span><b>{kpi.documents}/{orders.length}</b><small>gotowe do rozliczenia</small></article></section>
    <section className="transport-grid"><div className="transport-card"><div className="transport-head"><div><span className="section-no">ZLECENIA</span><h2>Praca w toku</h2></div><small>Kliknij „następny etap”</small></div>{orders.map(order=><article className="order-row" key={order.id}><div><b>{order.id}</b><small>{order.client}</small></div><div><strong>{order.route}</strong><small>{order.value.toLocaleString("pl-PL")} zł</small></div><span className={`order-status s${order.status}`}>{stages[order.status]}</span><div className="order-progress"><i style={{width:`${(order.status+1)/6*100}%`}}/></div><button disabled={order.status===5} onClick={()=>advance(order.id)}>{order.status===5?"Zakończone":"Następny etap →"}</button></article>)}</div>
    <aside className="transport-card"><div className="transport-head"><div><span className="section-no">AUTOMATYZACJE</span><h2>Co zrobił system</h2></div></div><div className="automation-log">{log.map((item,index)=><p key={`${item}-${index}`}><i/> {item}</p>)}</div><div className="automation-note"><b>Przykładowy efekt</b><span>Jedna zmiana statusu może uruchomić wiadomość do klienta, zadanie dla pracownika i aktualizację KPI. Wartości w demo są ilustracyjne.</span></div></aside></section>
    <section className="client-preview"><div><span className="section-no">WIDOK KLIENTA</span><h2>Klient też wie, co się dzieje.</h2><p>Po wpisaniu indywidualnego kodu widzi etap, termin, następny krok oraz umowę bez dostępu do danych innych klientów.</p></div><div className="phone-preview"><small>ZLECENIE ZT-1049</small><b>Transport jest w trasie</b><div><i style={{width:"68%"}}/></div><span>Następny krok: potwierdzenie dostawy</span><button>Umowa i dokumenty ↓</button></div></section></div>
  </main>;
}
