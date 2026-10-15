# ZM-QMS-P01 — proces realizacji, kontroli i wydania

**Wersja:** 0.1 | **Data:** 2026-10-15 | **Właściciel:** Zielona Marka | **Stosowanie:** nowe i modyfikowane projekty WWW, sklepów, CRM, automatyzacji i DTP.

## Osiem etapów i zapisy

| Etap | Czynność | Minimalny zapis |
| --- | --- | --- |
| 01 | Kwalifikacja zapytania | cel, klient w systemie prywatnym, typ usługi, odpowiedzialny |
| 02 | Wymagania | zaakceptowany brief, wersja, kryteria odbioru |
| 03 | Oferta | cena, zakres, terminy, wyłączenia, zasady zmian |
| 04 | Projekt | makieta/wizualizacja, data i osoba akceptująca |
| 05 | Realizacja | wersja materiałów/kodu, zmiany, zależności, ryzyka |
| 06 | QA | kontrole PASS / REWORK / HOLD / N/D, odnośnik do dowodu |
| 07 | Odbiór i wydanie | raport, lista otwartych wyjątków, decyzja, przekazanie |
| 08 | Opieka / wnioski | zgłoszenia, retesty, satysfakcja, usprawnienia |

## Bramki: nie przeskakiwać

**G0 — zgoda na rozpoczęcie:** cel i zakres spisane; odpowiedzialny i kryteria odbioru wyznaczone. Brak wymaganych materiałów = HOLD.

**G1 — gotowość do testów:** ustalona wersja produktu, komplet zależności i lista kontroli odpowiadająca ryzykom. Nie uruchamiać pozornych testów elementów, które nie istnieją.

**G2 — dopuszczenie do wydania:** wszystkie krytyczne kontrole PASS, brak niezamkniętych blokujących niezgodności, zmiany zakresu zaakceptowane. Wynik N/D ma wyjaśnienie. Każdy wynik REWORK musi mieć powtórzony test; HOLD blokuje wydanie. Pozytywny CI nie zastępuje akceptacji klienta.

**G3 — zamknięcie i przekazanie:** zgoda/akceptacja klienta albo uzgodniona podstawa wydania, dostęp i instrukcja przekazane, kopia/archiwum utworzone, start gwarancji/obsługi odnotowany.

## Minimalne kontrole według produktu

- **WWW:** RWD 320/390/768/1024/1440 px w uzasadnionym zakresie, nawigacja, odnośniki, formularze (bez wysłania danych realnego klienta w testach), SEO, dostępność, CSP/HTTPS, wydajność, test po publikacji.
- **Sklep:** warianty produktów, koszyk, proces płatności wyłącznie w trybie testowym, błędy integracji, e-mail transakcyjny, prawa dostępu; bez pozornych zakupów na produkcji.
- **CRM/system:** role i uprawnienia, walidacja, integralność i retencja danych, eksport, kopie, scenariusze błędów i testy odbiorowe.
- **DTP:** specyfikacja drukarni, treść, spady/boxy, rozdzielczość, osadzenie fontów, ICC/separacje, overprint, PDF/X, proof odpowiedni do procesu, retest eksportu.

Zakres może być mniejszy dla ZM Mini; **nie wolno jednak pomijać kontroli funkcji faktycznie przekazywanych klientowi**. Każde odstępstwo uzasadnić.

## Zmiana zakresu i wersjonowanie

Zmiana wymaga numeru wersji, opisu wpływu na cenę, termin i testy oraz potwierdzenia uprawnionej osoby. Raport QA wskazuje dokładnie tę wersję, która jest wydawana. Automatyczny test środowiska roboczego nie może być przedstawiany jako test innej wersji produkcyjnej.
