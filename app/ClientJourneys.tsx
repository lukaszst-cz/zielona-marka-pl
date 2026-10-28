import Link from "./SafeLink";

export default function ClientJourneys() {
  return <section className="client-journeys shell" aria-labelledby="client-journeys-title">
    <h2 id="client-journeys-title">Od czego chcesz zacząć?</h2>
    <p>Wybierz swoją sytuację. Pokażę Ci zakres, przykłady i następny krok.</p>
    <div className="client-journey-grid">
      <Link href="/oferta#zm-mini"><strong>Potrzebuję strony</strong><span>Pierwsza wizytówka albo pełna strona z ofertą i kontaktem.</span><b>Porównaj możliwości ↗</b></Link>
      <Link href="/modernizacja-strony#miniaudyt"><strong>Chcę poprawić obecną</strong><span>Sprawdźmy, co utrudnia klientom poznanie oferty i wysłanie zapytania.</span><b>Zacznij od minioceny ↗</b></Link>
      <Link href="/dtp"><strong>Potrzebuję materiałów do druku</strong><span>Wizytówki, ulotki i gazetki spójne z Twoją firmą.</span><b>Zobacz zakres i ceny ↗</b></Link>
    </div>
  </section>;
}
