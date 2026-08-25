import Link from "next/link";
import { requireStudioOwner } from "./auth";
import StudioClient from "./StudioClient";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const user = await requireStudioOwner();
  if (!user) return <main className="studio-denied"><div><span className="section-no">BRAK DOSTĘPU</span><h1>To zaplecze jest tylko dla właściciela.</h1><p>Zaloguj się kontem ChatGPT przypisanym do adresu właściciela.</p><a className="button" href="/signout-with-chatgpt?return_to=/studio">Zmień konto <span>↗</span></a><Link href="/">Wróć na stronę</Link></div></main>;
  return <StudioClient ownerEmail={user.email} />;
}
