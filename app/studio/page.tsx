import Link from "next/link";
import { requireStudioOwner } from "./auth";
import StudioClient from "./StudioClient";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const user = await requireStudioOwner();
  if (!user) return <main className="studio-denied"><div><span className="section-no">PRYWATNE ZAPLECZE</span><h1>Zaloguj się do Zielonej Marki.</h1><p>Panel klientów, projektów, zapytań i zadań jest dostępny wyłącznie dla właściciela.</p><form className="studio-login-form" method="post" action="/api/studio/session"><label>E-mail<input name="email" type="email" defaultValue="lukasz.staniewicz@gmail.com" required autoComplete="username" /></label><label>Hasło<input name="password" type="password" required autoComplete="current-password" /></label><button className="button" type="submit">Zaloguj się <span>↗</span></button></form><Link href="/">Wróć na stronę</Link></div></main>;
  return <StudioClient ownerEmail={user.email} />;
}
