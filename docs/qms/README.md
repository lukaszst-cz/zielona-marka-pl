# ZM-QMS — system operacyjny zapewniania jakości

**Status:** wdrażanie, wersja operacyjna 0.1 (15.10.2026). **Właściciel procesu:** Zielona Marka. **Przegląd:** co miesiąc i po istotnej niezgodności. **Klasyfikacja:** publiczny opis szablonów, bez danych klientów.

To wewnętrzne ramy pracy oparte na procesach, dowodach i doskonaleniu. Nie są certyfikatem ISO 9001, pełnym audytem zgodności ani deklaracją spełnienia wszystkich wymagań normy. Normami odniesienia są aktualnie ISO 9001:2026 (zarządzanie jakością) i ISO/IEC 25010:2023 (model jakości produktu cyfrowego). Dla DTP stosujemy normy techniczne adekwatne do druku i specyfikacji zamówienia.

## Źródła i priorytet dokumentów

1. **Kontrakt, zaakceptowany brief i specyfikacja klienta/drukarni** określają zakres i kryteria odbioru.
2. **Procedura ZM-QMS-P01** — [przebieg projektu i bramki](02-proces-i-bramki.md).
3. **Rejestry operacyjne:** [cele](01-polityka-i-cele.md), [ryzyka i szanse](03-ryzyka-i-szanse.md), [niezgodności](04-niezgodnosci-i-doskonalenie.md), [przeglądy](05-przeglady-i-audyt.md).
4. **Szablony:** [brief](szablony/brief.md), [raport QA](szablony/raport-qa.md), [niezgodność](szablony/niezgodnosc.md), [odbiór](szablony/odbior.md), [przegląd okresowy](szablony/przeglad.md).
5. [Mapa wdrożeniowa ISO 9001:2026](06-mapa-wdrozeniowa.md) — plan, nie certyfikat.
6. Publiczne materiały strony: /standardy-jakosci, /standard-jakosci, /standard-dtp; ich **PDF-y pozostają wydaniem 3.0**, dopóki nie zatwierdzimy nowego wydania.

## Jak używać przy każdym zleceniu

1. Nadaj niejawny identyfikator projektu i utwórz prywatny folder zlecenia.
2. Zapisz wymagania i kryteria odbioru w briefie, ustal ryzyka oraz kto zatwierdza.
3. Zapisuj każdą zmianę zakresu i nową akceptację.
4. Wykonaj kontrole zależne od produktu: WWW, sklep, CRM/automatyzacja, DTP/prepress.
5. Do każdej kontroli dopisz **datę, osobę, wersję produktu, metodę, wynik i dowód**.
6. Przy błędzie załóż niezgodność, popraw, powtórz test; nie oznaczaj poprawy bez retestu.
7. Decyzję o wydaniu podejmij dopiero po spełnieniu warunków bramki. Zapisz podpis/akceptację w bezpieczny sposób.
8. Przy zamknięciu zlecenia zbierz uwagi i wnioski do doskonalenia.

## Prywatność

To repozytorium GitHub jest **publiczne**. Nie zapisujemy tutaj rzeczywistych umów, danych kontaktowych klientów, korespondencji, tokenów, linków do prywatnych dokumentów, pełnych zrzutów paneli, faktur ani ich dowodów. Wypełnione rejestry przechowujemy wyłącznie w prywatnym systemie z ograniczonym dostępem. Foldery docs/qms/records i docs/qms/private są ignorowane przez Git, ale to nie zastępuje kontroli przed wysłaniem. Publiczny przykład testów własnej witryny może zawierać tylko niesensytywne dane i jawne odnośniki do GitHub Actions.

## Uruchomienie

- Etap 1: ustanowić wzory, uprawnienia, rejestry oraz jedną rzeczywistą próbę na własnej stronie.
- Etap 2: wypełniać raporty przy każdej nowej realizacji; raz w miesiącu przejrzeć metryki i odstępstwa.
- Etap 3: po zebraniu dowodów przeprowadzić audyt wewnętrzny, przegląd zarządzania i osobną analizę ewentualnej certyfikacji.

**Podstawa odniesień:** https://www.iso.org/standard/9001 i https://www.iso.org/standard/78176.html — wyłącznie opis i ramy zastosowania, bez kopiowania chronionej normy.
