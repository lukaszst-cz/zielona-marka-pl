"use client";

import { useMemo, useState } from "react";

const homes = [
  { code: "A.01", rooms: 3, size: "61,8 m²", extra: "ogród 84 m²", status: "Dostępny", price: "689 000 zł" },
  { code: "A.04", rooms: 4, size: "78,2 m²", extra: "taras 18 m²", status: "Rezerwacja", price: "829 000 zł" },
  { code: "B.02", rooms: 3, size: "66,4 m²", extra: "ogród 56 m²", status: "Dostępny", price: "724 000 zł" },
];

export default function DomAvailabilityDemo() {
  const [rooms, setRooms] = useState<"all" | "3" | "4">("all");
  const [selected, setSelected] = useState("A.01");
  const visible = useMemo(() => homes.filter(home => rooms === "all" || home.rooms === Number(rooms)), [rooms]);
  const current = homes.find(home => home.code === selected) ?? visible[0];

  return <>
    <div className="dom-filters" role="group" aria-label="Filtr liczby pokoi">
      {[["all", "Wszystkie"], ["3", "3 pokoje"], ["4", "4 pokoje"]].map(([value, label]) => <button key={value} type="button" className={rooms === value ? "active" : ""} onClick={() => { setRooms(value as "all" | "3" | "4"); const first = homes.find(home => value === "all" || home.rooms === Number(value)); if (first) setSelected(first.code); }}>{label}</button>)}
    </div>
    <div className="dom-table"><div className="dom-table-head"><span>LOKAL</span><span>UKŁAD</span><span>METRAŻ</span><span>DODATKOWO</span><span>STATUS</span><span /></div>{visible.map(home => <article key={home.code} className={selected === home.code ? "selected" : ""}><span>{home.code}</span><span>{home.rooms} pokoje</span><span>{home.size}</span><span>{home.extra}</span><span className={home.status === "Dostępny" ? "status" : "status reserved"}>{home.status}</span><button type="button" onClick={() => setSelected(home.code)}>Zobacz kartę ↗</button></article>)}</div>
    <aside className="dom-unit-card" aria-live="polite"><span>KARTA LOKALU · DEMO</span><h3>{current.code} · {current.rooms} pokoje</h3><p>{current.size} · {current.extra}</p><b>{current.price}</b><small>{current.status === "Dostępny" ? "Można zapytać o rozmowę ze sprzedażą." : "Lokal jest chwilowo zarezerwowany."}</small><a href="#kontakt">Zapytaj o podobny lokal ↗</a></aside>
  </>;
}
