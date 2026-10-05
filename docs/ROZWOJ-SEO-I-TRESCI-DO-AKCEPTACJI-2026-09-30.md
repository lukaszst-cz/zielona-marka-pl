# Zielona Marka: rozwój SEO i treści, etap lokalny do akceptacji

Data: 30.09.2026  
Status: OPUBLIKOWANE I SPRAWDZONE, WERSJA 1.1.0  
Punkt wyjścia: produkcyjna wersja 1.0.1

## Cel etapu

Rozbudowanie strony o treści, które pomagają klientowi podjąć decyzję i jednocześnie tworzą lepszą strukturę tematyczną dla Google. Zmiany zostały zaakceptowane, opublikowane i sprawdzone na produkcji 30.09.2026.

## Co wykonano

1. Dodano pierwszy poradnik: „Dlaczego strona firmy nie przynosi zapytań? 7 najczęstszych przyczyn”.
2. Poradnik otrzymał unikalny tytuł, opis, adres kanoniczny, dane strukturalne Article i BreadcrumbList oraz wezwanie do bezpłatnej mini oceny.
3. Dodano adres poradnika do mapy witryny.
4. Wzmocniono stronę „Strony dla firm usługowych” o praktyczny blok: oferta, zaufanie i kompletne zapytanie.
5. Dodano kontekstowe linkowanie wewnętrzne na stronach:
   - strony dla firm usługowych,
   - modernizacja strony,
   - mały CRM dla firm,
   - usprawnienia firmy,
   - nowy poradnik.
6. Dodano w portfolio miejsce na pierwsze prawdziwe case study: punkt wyjścia, decyzja, rozwiązanie, wynik i autoryzowany głos klienta.
7. Szablon case study jest jasno opisany jako nieuzupełniony. Nie przypisuje demonstracji do prawdziwych klientów i nie podaje fikcyjnych wyników.
8. Dodano responsywne style dla nowych sekcji, w tym układ mobilny i jawny kontrast tekstów.
9. Rozszerzono testy automatyczne o nową podstronę, dane strukturalne, linkowanie i uczciwe oznaczenie szablonu case study.
10. Po kontroli podglądu poradnik wizualnie ujednolicono z zatwierdzoną stroną główną i pozostałymi podstronami: zastosowano paprociowe tło pierwszego ekranu, ciemną zieleń, limonkowe akcenty, przezroczyste zielone karty oraz wspólne proporcje nagłówków i odstępów.
11. Dodano drugi poradnik: „Ile kosztuje strona internetowa dla małej firmy?”. Materiał wykorzystuje aktualne punkty startowe oferty Zielonej Marki, wyjaśnia czynniki wpływające na cenę i oddziela koszt wdrożenia od usług zewnętrznych.
12. Drugi poradnik otrzymał dane Article i BreadcrumbList, adres kanoniczny, wpis w lokalnej mapie witryny oraz linki z pierwszego poradnika i strony oferty.
13. Dodano wspólną stronę `/poradnik`, która porządkuje oba materiały i stanowi stały punkt wejścia z menu w stopce.
14. Strona poradników otrzymała dane strukturalne CollectionPage i ItemList, własny tytuł, opis, adres kanoniczny i obraz do udostępniania.
15. Oba poradniki otrzymały widoczną ścieżkę nawigacji, podpis autora, datę publikacji i aktualizacji oraz sekcję praktycznych pytań i odpowiedzi.
16. Rozszerzono dane strukturalne poradników o FAQPage oraz jednoznaczne identyfikatory autora i firmy.
17. Przygotowano trzy osobne grafiki Open Graph 1200 × 630 px: dla działu poradników oraz dla każdego z dwóch artykułów.
18. Rozszerzono anonimowy pomiar o wejścia do poradników, kliknięcia wezwania do działania i rozpoczęcie formularza. Treść pól formularza nie jest zbierana.
19. Poprawiono cztery starsze odnośniki do demonstracji warsztatu i RouteFlow, które przy pełnym przejściu strony prowadziły do adresów katalogowych zamiast rzeczywistych plików HTML.
20. Dodano daty aktualizacji nowych adresów do mapy witryny.
21. Poprawiono kontrast dolnej części kafelków poradników. Globalne style stopki nie wpływają już na akcję „Czytaj poradnik” i czas czytania.
22. Zwiększono bezpieczny margines boczny treści poradnikowych na telefonach, również przy szerokości 320–390 px.
23. Widoczny podpis autora ujednolicono jako „Łukasz Staniewicz | Zielona Marka”. Jest zgodny z pełną identyfikacją autora w danych strukturalnych.
24. Ekran prywatnego Studio otrzymał bezpieczne zachowanie awaryjne. Brak lokalnego środowiska Cloudflare pokazuje ekran logowania zamiast błędu 500.
25. Roboty wyszukiwarek nie odwiedzają endpointów `/api/`. Prywatne strony pozostają dostępne do odczytania znacznika `noindex, nofollow`, dzięki czemu nie powinny trafiać do wyników wyszukiwania.
26. Dodano pomocną stronę błędu 404 z drogą powrotu do strony głównej i poradników.
27. Dodano kanał RSS `/poradnik/rss.xml` oraz jego automatyczne wskazanie w metadanych działu poradników.

## Kontrola techniczna

- kompilacja produkcyjna: OK,
- TypeScript bez emisji: OK,
- testy automatyczne: 19 z 19 zaliczonych,
- kontrola TypeScript: bez błędów,
- pełna kontrola 38 tras przy szerokości 390 px i 1440 px: 76 widoków, 0 problemów,
- crawl HTML: 32 strony, 82 odnośniki, 0 błędnych odnośników,
- brak poziomego przewijania, błędnych obrazów, błędów JavaScript i niepoprawnych danych JSON-LD,
- kontrola wizualna działu poradników i obu poradników na telefonie i komputerze: wykonana,
- kontrola klikalnych elementów poradnika: brak zbyt małych widocznych odnośników,
- produkcja: wersja 1.1.0, Cloudflare `af2047b0-eae2-4f0a-8a83-90c39a248d49`.

## Gotowość na 1–3 miesiące

Po publikacji strona nie wymaga obowiązkowych zmian treści ani układu przez najbliższe 1–3 miesiące. Formularze mają walidację, ograniczenie powtarzanych wysyłek i zapasową drogę kontaktu. Prywatne obszary mają `noindex, nofollow`, zasoby statyczne mają długie cache, a publiczne podstrony są objęte mapą witryny i linkowaniem wewnętrznym.

W tym okresie warto jedynie obserwować zapytania oraz Google Search Console. Brak nowych publikacji przez kilka tygodni nie powoduje technicznego pogorszenia strony. Nowe poradniki należy dodawać wtedy, gdy odpowiadają na rzeczywiste pytania klientów, nie tylko dla zachowania częstotliwości publikacji.

## Pliki podglądu

- `outputs/seo-content-2026-09-30/poradnik-desktop.png`
- `outputs/seo-content-2026-09-30/poradnik-mobile.png`
- `outputs/seo-content-2026-09-30/uslugi-mobile.png`
- `outputs/seo-content-2026-09-30/realizacje-desktop.png`
- `outputs/seo-content-2026-09-30/poradniki-desktop.png`
- `outputs/seo-content-2026-09-30/poradniki-mobile.png`
- `outputs/seo-content-2026-09-30/poradnik-zapytania-desktop.png`
- `outputs/seo-content-2026-09-30/poradnik-zapytania-mobile.png`
- `outputs/seo-content-2026-09-30/poradnik-koszt-desktop.png`
- `outputs/seo-content-2026-09-30/poradnik-koszt-mobile.png`
- wynik pełnej kontroli technicznej: `outputs/local-site-audit.json`

## Do decyzji przed publikacją

1. Akceptacja działu poradników i obu artykułów.
2. Akceptacja bloku „Następny sensowny krok” na podstronach usług.
3. Akceptacja miejsca na przyszłe prawdziwe case study.
4. Po wyraźnej akceptacji: publikacja, ponowna kontrola publicznych adresów i zgłoszenie mapy witryny w Google Search Console.

## Następny etap po publikacji

- pozyskanie zgody pierwszego klienta na opis realizacji,
- przygotowanie kolejnego poradnika odpowiadającego na realne pytanie klienta,
- rozwój Profilu Firmy w Google i systematyczne zbieranie opinii,
- obserwacja indeksacji, zapytań i kliknięć przez 4–8 tygodni,
- korekta treści na podstawie danych, nie samej pozycji pojedynczego słowa.
