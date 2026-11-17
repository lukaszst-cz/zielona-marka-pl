# Zielona Marka: strony i systemy dla firm

Repozytorium strony **Zielonej Marki** i jej publicznych materiałów projektowych. Witryna przedstawia ofertę tworzenia i modernizacji stron WWW, a także portfolio koncepcji, gazetek i praktycznych narzędzi. Towarzyszące jej demonstracje i wybrane moduły zaplecza pokazują przykładowy obieg zapytań i pracy projektowej. Nie są gotowym produktem SaaS.

**Strona:** [zielona-marka.pl](https://zielona-marka.pl)  
**Portfolio:** [zielona-marka.pl/portfolio](https://zielona-marka.pl/portfolio)  
**Kontakt:** [kontakt@zielona-marka.pl](mailto:kontakt@zielona-marka.pl)

![Podgląd Zielonej Marki](public/og.png)

## Dla jakich firm

Projekt jest przygotowany jako baza pod strony i usprawnienia dla lokalnych
firm usługowych, między innymi branży beauty, warsztatów, gastronomii,
transportu oraz usług dla domu. Każda branża może otrzymać własny język oferty,
formularz i prosty proces obsługi zapytań.

## Zobacz demonstracje

- [Strona główna](https://zielona-marka.pl)
- [Aktualne portfolio projektów](https://zielona-marka.pl/portfolio)
- [Modernizacja istniejących stron](https://zielona-marka.pl/modernizacja-strony)
- [Bezpłatna koncepcja strony](https://zielona-marka.pl/bezplatna-koncepcja-strony)
- [Mały CRM dla firm](https://zielona-marka.pl/maly-crm-dla-firm)
- [Usprawnienia firmy](https://zielona-marka.pl/usprawnienia-firmy)
- [Strony dla branży beauty](https://zielona-marka.pl/strony-dla-beauty)
- [Strony dla warsztatów](https://zielona-marka.pl/strony-dla-warsztatow)
- [Demo dla firmy usługowej](https://zielona-marka.pl/demo/dom-strona)
- [Demo dla gastronomii](https://zielona-marka.pl/demo/bistro-strona)
- [Demo dla transportu](https://zielona-marka.pl/demo/transport)

## Co pokazuje ten projekt

- responsywną stronę ofertową z kalkulatorem orientacyjnej wyceny,
- interaktywne prezentacje technologii i demonstracje procesów branżowych,
- formularz zapytania zapisujący leady w bazie danych,
- prywatne Studio pracy do prowadzenia sprzedaży, projektów i zadań,
- indywidualny kod statusu dla klienta,
- roboczy widok umowy do wydruku lub zapisania jako PDF,
- checklistę QA przed publikacją projektu,
- podstawy SEO: meta dane, mapa strony, robots.txt i dane strukturalne.

## Proces, który pokazuje projekt

```text
strona / demo branżowe
          ↓
formularz zapytania
          ↓
Studio: lead → projekt → zadania
          ↓
status klienta pod indywidualnym kodem
          ↓
checklista QA → publikacja → portfolio za zgodą klienta
```

To nie jest gotowy produkt SaaS do samodzielnego zakupu. To demonstracja
podejścia, które można dopasować do sposobu pracy konkretnej firmy.

## Jak działa workflow

1. Klient wysyła brief przez formularz.
2. Zapytanie pojawia się w Studio pracy.
3. Po akceptacji tworzony jest projekt z zakresem, terminem i kodem klienta.
4. Klient obserwuje tylko własny projekt pod adresem `/status/[kod]`.
5. Przed publikacją w Studio można utworzyć standardową checklistę QA.
6. Po przekazaniu projektu realizację można pokazać w portfolio wyłącznie za zgodą klienta.

## Technologia

| Obszar | Rozwiązanie |
| --- | --- |
| Frontend | React, Vinext, TypeScript |
| Hosting i API | Cloudflare Workers |
| Dane | Cloudflare D1 + Drizzle ORM |
| Publikacja | Git, GitHub, Cloudflare |
| Bezpieczeństwo | HTTPS, sesja właściciela Studio, indywidualne kody projektów |

## Lokalne uruchomienie

Wymagany jest Node.js 22.13 lub nowszy.

```bash
npm install
npm run dev
```

Weryfikacja produkcyjnej wersji:

```bash
npm run build
```

## Dane i bezpieczeństwo

- Nie dodawaj do repozytorium haseł, tokenów, kluczy API ani plików `.env`.
- Nie publikuj danych klientów, umów, kodów statusu ani materiałów roboczych.
- Realizacja może trafić do portfolio dopiero po uzyskaniu zgody klienta.
- Dla każdego projektu sprawdź mobilność, formularze, linki, podstawowe SEO i przekazanie materiałów. Do tego służy checklista QA w Studio.

## Jak rozwijać portfolio

Portfolio obejmuje projekty demonstracyjne, koncepcje i materiały do pokazania możliwości. Dla każdego projektu zaznaczaj jego rzeczywisty status. Akceptacja projektu przez autora i opublikowanie demonstracji nie potwierdzają realizacji dla klienta.

Po zakończeniu rzeczywistego zlecenia dodaj w Studio projekt, zaznacz opcję „Pokaż w portfolio” i uzupełnij opis, adres wdrożenia oraz zgodę klienta. W publicznym repozytorium pokazuj przede wszystkim opis rozwiązania, wykorzystane technologie i wynik biznesowy, bez prywatnych danych.

## Automatyczna kontrola jakości

Przy każdym pushu do gałęzi `main` GitHub Actions instaluje zależności,
uruchamia build oraz test renderowanego HTML. Dzięki temu zmiany są sprawdzane
przed kolejnym wdrożeniem.

---

Projekt jest rozwijany przez Zieloną Markę dla firm z Ząbek, Marek, Warszawy,
Kobyłki, Zielonki, Radzymina, Wołomina i okolic. Zobacz
[profil GitHub](https://github.com/lukaszst-cz).
