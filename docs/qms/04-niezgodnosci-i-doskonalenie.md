# ZM-QMS-NC-01 — postępowanie z niezgodnością i korektą

**Wersja:** 0.1 | **Cel:** nie mylić rozwiązania objawu z usunięciem przyczyny.

1. **Zidentyfikuj:** numer NC, datę, projekt, wersję, wymaganie, opis i odtwarzalne kroki. Dołącz dowód prywatnie.
2. **Sklasyfikuj:** blokująca / istotna / drobna; ustal wpływ na wydanie oraz inne projekty.
3. **Zabezpiecz:** HOLD lub wycofanie wydania, jeśli ryzyko dotyczy danych, płatności, funkcji krytycznej czy podstawowych wymagań.
4. **Wykonaj korektę:** wskaż osobę, commit/wersję, datę i efekt.
5. **Oceń przyczynę:** dopiero na podstawie sprawdzonych faktów; „nieustalona” jest dopuszczalne.
6. **Sprawdź skuteczność:** powtórz test tej samej funkcji na właściwym wydaniu i zapisz niezależnie wynik.
7. **Zamknij albo eskaluj:** zamknięcie wyłącznie po retest PASS i decyzji; w przeciwnym razie pozostaw otwarte.
8. **Zapobiegaj powtórzeniu:** test regresji, zmiana szablonu briefu lub przegląd procesu, jeśli uzasadnione.

Wymagane rozróżnienie: **korekta** usuwa znaleziony problem; **działanie korygujące** odnosi się do jego przyczyny i powinno być ocenione pod kątem skuteczności. Nigdy nie nadpisuj historii wcześniejszych wyników, nawet gdy aktualny build jest już zielony.

Użyj [szablonu niezgodności](szablony/niezgodnosc.md). Nie publikuj rzeczywistych danych klienta w GitHub Issues.
