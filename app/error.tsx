"use client";

/** A readable recovery path for temporary page/runtime errors. */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="zm-public">
      <section className="page-hero shell" role="alert">
        <span className="eyebrow">CHWILOWY PROBLEM</span>
        <h1>Nie udało się wyświetlić strony. <em>Spróbujmy ponownie.</em></h1>
        <p>Podczas aktualizacji niektóre pliki strony mogą wymagać ponownego wczytania. Odśwież widok lub spróbuj ponownie. Pamiętaj, że odświeżenie może usunąć niewysłane dane formularza.</p>
        <div className="hero-actions">
          <button type="button" className="button" onClick={() => window.location.reload()}>Odśwież stronę ↻</button>
          <button type="button" className="text-link" onClick={reset}>Spróbuj ponownie</button>
          <a className="text-link" href="/oferta">Zobacz ofertę ↗</a>
        </div>
        <p>Jeżeli problem się powtarza, napisz na <a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a>.</p>
      </section>
    </main>
  );
}
