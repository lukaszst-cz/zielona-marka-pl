# Przykład dowodu: własna witryna Zielonej Marki (15.10.2026)

**Rodzaj zapisu:** rzeczywiste wyniki automatycznej kontroli własnej strony, nie dokument klienta i nie audyt certyfikacyjny.

- Projekt: witryna https://zielona-marka.pl
- Wydanie sprawdzone: commit 06c0d1cfd83ebaf494f9b935a5c3799181ef0817
- Test produkcyjny: https://github.com/lukaszst-cz/zielona-marka-pl/actions/runs/38710693844
- Raport z GitHub Actions: 44/44 kontroli przeglądarkowych PASS; 0 nieoczekiwanych ostrzeżeń.
- Testy zostały przeprowadzone dla wskazanego uruchomienia, nie dowodzą dostępności 24/7 ani jakości przyszłych wydań.
- Przykładowe metryki laboratoryjne LCP/CLS z tego uruchomienia znajdują się w logach GitHub Actions; nie przedstawiać ich jako danych Core Web Vitals z prawdziwego ruchu.
- **Zakres:** automatyczna kontrola ścieżek wskazanych w skrypcie testowym. Nie zastępuje ręcznej oceny UX, przeglądu pełnej dostępności, testów prywatnego panelu czy certyfikacji ISO.
- Dowód podpisanej akceptacji klienta: N/D — to własny serwis.
- Decyzja dla przyszłego projektu klienta: NIE SPRAWDZONO, wymaga osobnego raportu i odbioru.

**Wniosek procesowy:** zautomatyzowany wynik można linkować do wersji i daty, ale nie wolno przypisywać go dowolnemu późniejszemu wydaniu. To punkt odniesienia do tworzenia kompletnych raportów.
