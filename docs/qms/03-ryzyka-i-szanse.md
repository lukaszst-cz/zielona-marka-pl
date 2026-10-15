# ZM-QMS-RSK-01 — rejestr ryzyk i szans

**Wersja:** 0.1 | **Stan:** wzór działania. **Prowadzenie:** prywatny rejestr, weryfikacja przy briefie, zmianie zakresu, przed wydaniem i w przeglądzie miesięcznym.

Każda pozycja: ID, identyfikator projektu, data, źródło, opis, typ (ryzyko/szansa), prawdopodobieństwo 1–3, skutek 1–3, ocena P×S, właściciel, działanie, termin, pozostałe ryzyko, status, dowód. Ocena to narzędzie priorytetyzacji, nie dowód zgodności ISO.

| Przykładowe ryzyko (hipotetyczne) | Skutek | Działanie | Weryfikacja |
| --- | --- | --- | --- |
| Publikacja bez przetestowania formularza | utrata zapytań | G2 wymaga testu formularza i bezpiecznego potwierdzenia | QA + odnośnik do testu |
| Niewłaściwy profil ICC w PDF | niezgodny kolor | wymagania drukarni i kontrola preflight | raport/akceptacja proofa |
| Nieuprawniony dostęp do panelu CRM | naruszenie danych | kontrola ról, uwierzytelnienia i ograniczenia uprawnień | test autoryzacji |
| Zmiana klienta po zatwierdzeniu | koszt i opóźnienie | pisemna zmiana zakresu i nowa akceptacja | historia wersji |

**Szanse:** automatyzacja powtarzalnych testów, lepsza dokumentacja odbioru, poprawa dostępności, ograniczenie liczby niejasnych briefów. Każda szansa wymaga działania, właściciela i oceny wyniku.

Wynik 6–9 = priorytetowe działanie przed G2 albo uzasadniona decyzja o ryzyku; 3–4 = plan kontrolny; 1–2 = obserwacja. To reguła wewnętrzna, którą można dostosować po realnych danych. Żaden wynik liczbowy nie legalizuje pominięcia krytycznej kontroli bezpieczeństwa lub prywatności.
