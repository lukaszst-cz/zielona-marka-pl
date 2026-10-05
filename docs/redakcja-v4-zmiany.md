# Zielona Marka: zmiany po zatwierdzeniu audytu

14.09.2026. Kierunek zaakceptowany przez właściciela: naturalność, zaufanie, opieka i delikatne nawiązania do natury.

## Nowy podgląd

`http://127.0.0.1:4190/brand-review-v4/`

Pliki: `public/brand-review-v4/index.html` i `refinement.css`. Grafika i biały logotyp pochodzą z v3. Poprzednia wersja v3 pozostaje dostępna pod własnym adresem. Żadnego wdrożenia produkcyjnego.

## Najważniejsze decyzje

| Przed | Po | Cel |
|---|---|---|
| „Robisz dobrą robotę. Twoja strona też powinna” | „Masz dobrą firmę. Pokażmy ją z dobrej strony” | Wyeksponowanie lubianego przez właściciela hasła, z uznaniem pracy klienta. |
| Drobny wiersz wszystkich usług | Czytelne „Strony WWW i systemy dla firm”, opis odbiorcy i osobny wiersz narzędzi | Rozpoznanie oferty na pierwszym ekranie. |
| Zasady współpracy dopiero pod portfolio | Bezpośrednia współpraca i akceptacja przed publikacją także w hero | Konkretny powód do zaufania już na początku. |
| „Twój klient nie powinien się domyślać” | „Strona, na której łatwo Cię zrozumieć” | Pokazanie pozytywnego efektu zamiast punktowania problemu. |
| Zbliżony rytm nagłówków | Zachowane dwa mocne hasła, pozostałe zróżnicowane | Spokojniejsza, mniej mechaniczna opowieść. |
| „Mały CRM” bez wprowadzenia | CRM wyjaśniony jako system kontaktów, wycen, terminów i zleceń | Zrozumienie usługi bez znajomości technologii. |
| Rozwój strony między usługami a portfolio | Opieka po publikacji umieszczona po sposobie współpracy | Czytelne przejście od biznesu klienta do pracy nad jego stroną. |
| Ogólne opisy klimatu portfolio | Konkretna potrzeba odwiedzającego i sposób jej obsługi | Wyjaśnienie decyzji projektowych bez fikcyjnych wyników. |
| Rozbudowany zakres formularza w dokumencie | Trzy podstawowe pola i opcjonalne rozwinięcie w podglądzie | Łatwiejsze rozpoczęcie rozmowy. |

Nawiązania do natury: „Dobry grunt dla Twoich pomysłów”, „Więcej miejsca na dobrą rozmowę”, „Dobre relacje warto pielęgnować”, „Rozwój w rytmie Twojej firmy”, „Zróbmy miejsce na dobrą zmianę”. Opisy usług pozostają konkretne. Nie wprowadzono gwarancji wzrostu sprzedaży, bezpłatnej analizy, nowych cen ani terminów odpowiedzi.

## Czytelność i weryfikacja

Wiersz głównej oferty: 14 px na komputerze i 13 px na telefonie, wcześniej 11/9 px. Główny opis: 20/18 px. Ważne odnośniki: 15 px. Dodano spokojniejsze przyciemnienie miejsc pod tekstem.

Kontrola przeglądarki obejmuje szerokości 1440, 390 i 360 px, obrazy, kotwice, jeden H1, telefon w CTA, układ rozwiniętego formularza, brak błędów JavaScript oraz odpowiedzi lokalnych odnośników. Dodatkowo sprawdzane są próbki kontrastu tła pod głównymi tekstami. To konserwatywny pomiar prostokątów tekstu z tymczasowo ukrytymi literami, nie pełny audyt WCAG ani badanie skuteczności sprzedażowej.

Aktualny wynik: `outputs/brand-review-v4/report.json`. Zrzuty w tym samym katalogu. Teksty wyeksportowane z podglądu: `docs/strona-glowna-teksty-v4.md`.

## Zakres pozostały do wdrożenia

Nowy formularz jest oznaczonym podglądem z wyłączoną wysyłką; nie wysyła i nie zapisuje danych. Jego integracja z działającym formularzem/CRM oraz zastosowanie nowej szaty do aplikacji i wszystkich podstron to kolejny etap. Odnośniki usług i demonstracji nadal otwierają wcześniejszy lokalny prototyp na porcie 4180. Kopii chmurowej i produkcyjnego SEO nie weryfikowano w tej redakcji.
