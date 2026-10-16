import Link from "./SafeLink";

type Variant = "home" | "offer" | "web" | "dtp" | "crm" | "qa";

const content: Record<Variant, {
  eyebrow: string;
  title: string;
  intro: string;
  steps: readonly [string, string, string][];
  note: string;
  href: string;
  cta: string;
}> = {
  home: {
    eyebrow: "STANDARD REALIZACJI / ZIELONA MARKA",
    title: "Dobra strona to także dobrze poprowadzony projekt.",
    intro: "Od pierwszych ustaleń wiesz, co przygotowuję, kiedy zobaczysz projekt i co sprawdzę przed publikacją.",
    steps: [
      ["01", "Najpierw cel", "Ustalamy zakres, treści i najważniejszą drogę klienta do kontaktu."],
      ["02", "Potem realizacja", "Pokazuję projekt do akceptacji i przygotowuję uzgodnione funkcje."],
      ["03", "Na końcu kontrola", "Sprawdzam działanie, wygodę i gotowość strony do publikacji."],
    ],
    note: "Nawet niewielka strona przechodzi kontrolę, oczywiście w zakresie uzgodnionych funkcji.",
    href: "/jak-pracuje", cta: "Poznaj cały proces",
  },
  offer: {
    eyebrow: "CO OZNACZA STANDARD W KAŻDYM PAKIECIE",
    title: "Różny zakres. Ta sama staranność.",
    intro: "Wizytówka, rozbudowana strona i sklep nie wymagają tej samej liczby funkcji, ale każdy projekt ma jasne warunki wykonania i odbioru.",
    steps: [
      ["01", "Ustalenie zakresu", "Przed startem określamy zawartość, funkcje, terminy i sposób akceptacji."],
      ["02", "Sprawdzenie przed startem", "Sprawdzam elementy przewidziane w pakiecie, zamiast dopisywać testy, których nie wykonano."],
      ["03", "Przekazanie", "Po odbiorze otrzymujesz uzgodnione dostępy i wskazówki do dalszego korzystania."],
    ],
    note: "Dodatkowe integracje, obsługa treści i opieka podlegają osobnym ustaleniom.",
    href: "/jak-pracuje", cta: "Zobacz zasady współpracy",
  },
  web: {
    eyebrow: "STANDARD STRON INTERNETOWYCH",
    title: "Sprawdzam stronę z punktu widzenia Twojego klienta.",
    intro: "Sama publikacja to za mało. Strona musi być czytelna i prowadzić do kontaktu także na telefonie.",
    steps: [
      ["01", "Widok mobilny", "Kontroluję teksty, przyciski, układ i łatwość znalezienia informacji."],
      ["02", "Kontakt i funkcje", "Testuję rzeczywiste linki, formularze i uzgodnione ścieżki użytkownika."],
      ["03", "Podstawy techniczne", "Sprawdzam szybkość, metadane SEO, indeksowanie i bezpieczeństwo połączenia."],
    ],
    note: "Techniczne przygotowanie do Google nie jest gwarancją konkretnej pozycji w wynikach wyszukiwania.",
    href: "/raport-qa", cta: "Zobacz przykładowy raport jakości",
  },
  dtp: {
    eyebrow: "STANDARD DTP I PREPRESS",
    title: "Od projektu do pliku, który można bezpiecznie przekazać do druku.",
    intro: "Plik do drukarni sprawdza się inaczej niż stronę WWW, dlatego stosuję osobne kryteria odbioru.",
    steps: [
      ["01", "Specyfikacja drukarni", "Sprawdzam format, liczbę stron, spady, marginesy i wymagania produkcyjne."],
      ["02", "Kontrola techniczna", "Weryfikuję obrazy, fonty, kolory i ustawienia PDF w zakresie zlecenia."],
      ["03", "Plik i akceptacja", "Przygotowuję uzgodnioną wersję, a przed wysyłką do druku potwierdzamy treść i zakres."],
    ],
    note: "Ostateczne parametry zależą od technologii i specyfikacji wybranej drukarni; projekt nie zastępuje proofa kolorystycznego.",
    href: "/jak-pracuje", cta: "Jak przebiega współpraca",
  },
  crm: {
    eyebrow: "STANDARD WDROŻEŃ CRM I AUTOMATYZACJI",
    title: "Najpierw proces firmy. Dopiero potem system.",
    intro: "W narzędziach wewnętrznych ważne są nie tylko ekrany, ale też porządek danych i przewidywalne działanie.",
    steps: [
      ["01", "Mapa procesu", "Opisujemy zgłoszenia, statusy, role użytkowników i najważniejsze zadania."],
      ["02", "Wdrożenie etapami", "Pokazuję działającą wersję i weryfikujemy ją na uzgodnionych przypadkach."],
      ["03", "Testy i przekazanie", "Sprawdzamy dostęp, uprawnienia, przepływ informacji i obsługę błędów."],
    ],
    note: "Przechowywanie danych, integracje, kopie zapasowe i bezpieczeństwo są dobierane do wymagań konkretnego systemu.",
    href: "/jak-pracuje", cta: "Poznaj standard realizacji",
  },
  qa: {
    eyebrow: "JAK POWSTAJE RAPORT JAKOŚCI",
    title: "Podsumowanie odnosi się do wykonanych testów, nie do obietnic.",
    intro: "Przykładowy raport pokazuje układ dokumentu. Przy konkretnej realizacji wpisuję rzeczywiste wyniki testów.",
    steps: [
      ["01", "Zakres testu", "Wybieram kontrole odpowiednie dla rodzaju projektu i jego funkcji."],
      ["02", "Weryfikacja", "Oznaczam wykonane sprawdzenia, wykryte problemy i poprawki."],
      ["03", "Odbiór", "Przekazuję podsumowanie wraz z ewentualnymi ograniczeniami i kolejnymi krokami."],
    ],
    note: "Przykład nie stanowi certyfikatu ISO, audytu zewnętrznego ani dowodu przebadania strony konkretnego klienta.",
    href: "/jak-pracuje", cta: "Poznaj cały proces",
  },
};

export default function ProcessStandard({ variant, id }: { variant: Variant; id?: string }) {
  const item = content[variant];
  return (
    <section className={`zm-process-standard zm-process-standard--${variant}`} id={id} aria-label={item.eyebrow}>
      <div className="zm-process-standard__wrap">
        <div className="zm-process-standard__head">
          <div>
            <span className="zm-process-standard__eyebrow">{item.eyebrow}</span>
            <h2>{item.title}</h2>
          </div>
          <p>{item.intro}</p>
        </div>
        <div className="zm-process-standard__grid">
          {item.steps.map(([number, title, desc]) => (
            <article key={number}>
              <span className="zm-process-standard__number">{number}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <div className="zm-process-standard__foot">
          <p>{item.note}</p>
          <Link href={item.href}>{item.cta} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
