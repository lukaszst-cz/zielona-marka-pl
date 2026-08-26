"use client";

type Check = { title: string; status: string };

export default function QaReport({ project, checks }: { project: { title: string; publicCode: string; updatedAt: string }; checks: Check[] }) {
  const complete = checks.filter((check) => ["Gotowe", "Zrobione", "Zakończone"].includes(check.status)).length;

  return (
    <main className="qa-report-page">
      <div className="qa-report-actions">
        <button onClick={() => window.print()}>Drukuj / zapisz jako PDF</button>
        <a href={`/status/${project.publicCode}`}>Wróć do statusu</a>
      </div>
      <article>
        <header>
          <img src="/logo.png" alt="Zielona Marka" />
          <div><small>RAPORT ODBIOROWY</small><h1>Kontrola jakości (QA)</h1><p>{project.title}</p></div>
          <b>{complete}/{checks.length}</b>
        </header>
        <section className="qa-report-summary">
          <div><small>KOD PROJEKTU</small><strong>{project.publicCode}</strong></div>
          <div><small>OSTATNIA AKTUALIZACJA</small><strong>{new Date(project.updatedAt).toLocaleDateString("pl-PL")}</strong></div>
          <div><small>STATUS RAPORTU</small><strong>{complete === checks.length ? "GOTOWY" : "W TRAKCIE"}</strong></div>
        </section>
        <section className="qa-report-list">
          {checks.map((check, index) => {
            const done = ["Gotowe", "Zrobione", "Zakończone"].includes(check.status);
            return <div key={`${check.title}-${index}`} className={done ? "done" : "pending"}><b>{String(index + 1).padStart(2, "0")}</b><span>{check.title.replace(/^QA:\s*/i, "")}</span><i>{done ? "SPRAWDZONE ✓" : check.status.toUpperCase()}</i></div>;
          })}
        </section>
        <p className="qa-report-note">Raport pokazuje aktualny stan checklisty projektu. Pozycja oznaczona jako „sprawdzone” została zakończona w Studio Zielonej Marki. Pozostałe punkty wymagają jeszcze wykonania lub potwierdzenia.</p>
        <footer><span>ZIELONA MARKA</span><span>zielona-marka.pl</span><span>lukasz.staniewicz@gmail.com</span></footer>
      </article>
    </main>
  );
}
