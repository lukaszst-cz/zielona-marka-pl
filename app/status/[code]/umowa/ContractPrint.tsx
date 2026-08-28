"use client";

type Project = { title: string; clientName: string; clientCompany: string; clientAddress: string; clientNip: string; clientEmail: string; scope: string; description: string; price: number; deadline: string | null; startDate: string | null; contractNumber: string; providerName: string; providerAddress: string; providerNip: string; publicCode: string };
const value = (text: string, fallback = "DO UZUPEŁNIENIA") => text || fallback;

export default function ContractPrint({ project: p }: { project: Project }) {
  return <main className="contract-page">
    <div className="contract-actions"><button onClick={() => window.print()}>Pobierz / zapisz jako PDF</button><a href={`/status/${p.publicCode}`}>Wróć do statusu</a></div>
    <article>
      <header><img src="/logo.png" alt="Zielona Marka" /><div><small>WZÓR UMOWY DO WERYFIKACJI</small><h1>Umowa o wykonanie projektu</h1><p>nr {value(p.contractNumber)}</p></div></header>
      <p className="contract-warning">Przed podpisaniem sprawdź wszystkie dane. Dokument stanowi roboczy wzór i powinien zostać dostosowany do konkretnego zlecenia oraz, w razie potrzeby, zweryfikowany prawnie.</p>
      <section><h2>§ 1. Strony umowy</h2><p><b>Wykonawca:</b> {value(p.providerName)}, adres: {value(p.providerAddress)}, NIP: {value(p.providerNip)}, e-mail: kontakt@zielona-marka.pl.</p><p><b>Zamawiający:</b> {value(p.clientCompany || p.clientName)}, reprezentowany przez: {value(p.clientName)}, adres: {value(p.clientAddress)}, NIP: {value(p.clientNip)}, e-mail: {value(p.clientEmail)}.</p></section>
      <section><h2>§ 2. Przedmiot i zakres</h2><p>Wykonawca zobowiązuje się wykonać projekt „{p.title}”. Zakres: {value(p.scope || p.description)}.</p></section>
      <section><h2>§ 3. Termin i współpraca</h2><p>Planowane rozpoczęcie: {p.startDate ? new Date(p.startDate).toLocaleDateString("pl-PL") : "DO UZUPEŁNIENIA"}. Planowane zakończenie: {p.deadline ? new Date(p.deadline).toLocaleDateString("pl-PL") : "DO UZUPEŁNIENIA"}. Terminy mogą ulec zmianie, jeśli Zamawiający nie przekaże na czas materiałów lub akceptacji.</p></section>
      <section><h2>§ 4. Wynagrodzenie</h2><p>Łączne wynagrodzenie za uzgodniony zakres wynosi <b>{p.price ? p.price.toLocaleString("pl-PL") + " zł netto" : "DO UZUPEŁNIENIA"}</b>. 30% zaliczki jest płatne po akceptacji zakresu i umowy. Pozostałe 70% jest płatne po odbiorze gotowej wersji i testach QA, przed publikacją na domenie lub serwerze Klienta. Płatność może nastąpić bezpośrednio albo przez uzgodnionego partnera rozliczeniowego, np. Useme. Partner, jego prowizje i dodatkowe koszty wymagają wcześniejszej akceptacji, a zapłata jest skuteczna po jej zaksięgowaniu lub potwierdzeniu przez partnera. Koszty zewnętrzne wymagają wcześniejszej akceptacji.</p></section>
      <section><h2>§ 5. Odbiór i poprawki</h2><p>Projekt zostanie przekazany do odbioru po zakończeniu uzgodnionego zakresu i testów jakości (QA). Liczba tur poprawek, sposób zgłaszania uwag oraz termin na odbiór: ............................................................</p></section>
      <section><h2>§ 6. Prawa i odpowiedzialność</h2><p>Zakres przeniesienia praw lub licencji, zasady wykorzystania materiałów powierzonych przez Zamawiającego, odpowiedzialność za usługi zewnętrzne oraz utrzymanie rozwiązania należy uzgodnić przed podpisaniem: ............................................................</p></section>
      <section><h2>§ 7. Postanowienia końcowe</h2><p>Zmiany umowy wymagają uzgodnienia przez obie Strony. W sprawach nieuregulowanych zastosowanie mają właściwe przepisy prawa polskiego. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach.</p></section>
      <div className="signatures"><div><span>........................................</span><b>Wykonawca</b><small>data i podpis</small></div><div><span>........................................</span><b>Zamawiający</b><small>data i podpis</small></div></div>
    </article>
  </main>;
}
