"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function StatusEntry(){const [code,setCode]=useState("");function submit(e:FormEvent){e.preventDefault();const clean=code.trim().toUpperCase();if(clean) window.location.href=`/status/${encodeURIComponent(clean)}`}
return <main className="status-entry"><nav className="nav shell"><Link className="brand" href="/"><img className="brand-logo" src="/logo.png" alt=""/><span>ZIELONA MARKA</span></Link><Link href="/">Strona główna</Link></nav><section><span className="section-no">STATUS PROJEKTU</span><h1>Sprawdź, co dzieje się z Twoim zleceniem.</h1><p>Wpisz indywidualny kod otrzymany po rejestracji projektu.</p><form onSubmit={submit}><label>Kod projektu<input value={code} onChange={e=>setCode(e.target.value)} placeholder="ZM-XXXX-XXXX-XXXX" autoComplete="off" required/></label><button className="button">Otwórz status <span>↗</span></button></form><small>Kod daje dostęp tylko do jednego projektu. Nie udostępniaj go osobom postronnym.</small></section></main>}
