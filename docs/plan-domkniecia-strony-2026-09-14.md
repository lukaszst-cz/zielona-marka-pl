# Zielona Marka: ustalony zakres i kolejność dokończenia

14.09.2026. Praca lokalna, publikacja wymaga osobnej zgody. Szacunki dotyczą aktywnej pracy, bez oczekiwania na decyzje, dostępy i transfer kopii chmurowej.

## Ustalenia obowiązujące

- Teksty v4 zostały wyraźnie zatwierdzone przez użytkownika. Nie przeprowadzać kolejnego audytu ani nowej redakcji bez nowej prośby. Ostatnie powtórzenie prośby o audyt zostało następnie wyjaśnione przez użytkownika jako zbędne.
- Motyw: żywa natura, głęboka zieleń, spokój, zaufanie i rozwój. Obrazy mają odpowiadać załącznikom astra_v1/v2. Wizualizacja i animacja odgrywają znaczącą rolę, wyjaśniając ofertę.
- Nowe zamówienie na logo: dokładnie rozpoznawalna sylwetka oryginalnego jabłka, kontur zewnętrzny i wewnętrzny; oryginalne okno przeglądarki z węzłami automatyzacji i wychodzącymi liniami. Wszystko białe. Górny listek zastępuje stylizowana rozwijająca się paproć. Nazwa ZIELONA MARKA połączona kompozycyjnie z wychodzącym procesem. Najpierw pokazać sam znak, przed zastąpieniem logo w nagłówku.
- Źródło właściwego znaku: `public/logo-zielona-marka-transparent-v1.png`. Uproszczone SVG z v3 nie zawiera oryginalnego motywu automatyzacji. Nie przedstawiać go jako wiernej wersji starego logo.
- Nowy wygląd v4 jest nadal osobnym podglądem. Właściwa aplikacja oraz podstrony wymagają przeniesienia uzgodnionej szaty.

## Menu: zachowanie treści i dostępu

W dotychczasowym wspólnym nagłówku są Oferta, Dla branż, Modernizacja, Realizacje, Mały CRM, Usprawnienia, Jak pracuję, Strefa klienta, Kontakt oraz PL/EN. Wszystkie pozostają dostępne. Grupowanie ogranicza liczbę pozycji w głównej linii, nie usuwa podstron.

Docelowa główna linia: **Oferta / Projekty / Współpraca / Kontakt**, dodatkowo widoczny odnośnik **Strefa klienta** i przełącznik **PL/EN**. Oferta otwiera uporządkowany panel. Na telefonie jawny przycisk Menu otwiera pełną listę i kontakt.

| Dotychczas | Miejsce docelowe | Adres pozostaje |
|---|---|---|
| Oferta | Oferta: Strony WWW | /oferta |
| Dla branż | Oferta: rozwiązania dla branż, z pozycjami usługowe, beauty, warsztaty | /strony-dla-firm-uslugowych, /strony-dla-beauty, /strony-dla-warsztatow |
| Modernizacja | Oferta: Modernizacja strony | /modernizacja-strony |
| Realizacje | Projekty | /realizacje |
| Mały CRM | Oferta: CRM i obsługa klientów | /maly-crm-dla-firm |
| Usprawnienia | Oferta: Usprawnienia i automatyzacje | /usprawnienia-firmy |
| Jak pracuję | Współpraca | /jak-pracuje |
| Strefa klienta | Widoczny odnośnik dodatkowy, również w stopce | /status |
| Kontakt | Kontakt | /kontakt |
| PL / EN | Przełącznik języka | / oraz /en |

Pozostałe istniejące strony usługowe, takie jak asystent zapytań i chatbot, powinny mieć dostęp z odpowiednich sekcji oferty. Istniejące adresy lokalne pozostają w strukturze. Przy przenoszeniu strony głównej zachować sensowne cele dawnych kotwic, w tym `#dla-kogo` i `#realizacje`, zamiast tworzyć puste atrapy.

## Trzy różne działania

- Zatwierdzony przycisk **Zobacz możliwości** przewija do opowieści o pomocy. To funkcja odpowiadająca określeniu użytkownika „zobacz jak pomagam”.
- **Porozmawiajmy** prowadzi do `tel:+48450458466`.
- Osobne zaproszenie do napisania kieruje do formularza, docelowo `/kontakt#formularz`. Musi być widoczne również przed końcem długiej strony. Na etapie podglądu v4 jego rozwinięty formularz nadal nie wysyła wiadomości.

Te działania mają różne cele. Nie zamieniać telefonu pod istniejącym przyciskiem Porozmawiajmy na formularz. Zaproszenie do napisania ma być dostępne dla osoby, która nie chce od razu dzwonić. Nie dodawać trzech równorzędnych jaskrawych przycisków przy każdym akapicie.

## Opowieść ruchoma

Nie zmieniamy zatwierdzonych nagłówków ani opisów. Ruch wyjaśnia ich znaczenie.

1. **Pierwszy ekran:** żywa fotograficzna paproć, subtelna zmiana głębi i światła; czytelny, stabilny tekst.
2. **Strona WWW:** z uporządkowanych elementów treści powstaje konkretny podgląd strony. Odbiorca widzi rezultat pracy, nie kod programistyczny.
3. **Zapytanie:** element formularza przechodzi w kartę zapytania. Scena oznaczona jako demonstracja, bez rzeczywistej wysyłki.
4. **Sprzedaż:** produkt lub voucher przechodzi do koszyka i potwierdzenia przykładowego zakupu, bez prawdziwej płatności.
5. **CRM:** ta sama wizualna karta otrzymuje wycenę i status realizacji. Powiązania pokazują ciągłość, zamiast oddzielnych niepowiązanych animacji.
6. **Relacja:** po zakończeniu pojawia się kontakt po usłudze i kolejny termin.
7. **Portfolio:** czytelny podgląd różniących się branż. Obrazy pozostają spokojne podczas czytania.
8. **Współpraca z Łukaszem:** osobna sekwencja od poznania firmy przez projekt i sprawdzenie działania do akceptacji. Nie mieszać jej z obsługą zleceń klienta.
9. **Opieka:** dalsza rozbudowa strony dopasowana do potrzeb, z zachowanym wyjaśnieniem odrębnego zakresu.
10. **Kontakt:** zwolnienie rytmu, stabilny telefon i czytelna droga do napisania.

Forma: lekkie warstwy fotograficzne, SVG i animacje interfejsów w HTML/CSS. W wybranej scenie panel może pozostawać w widoku podczas naturalnego przewijania. Nie przejmować kółka myszy, nie wymuszać tempa ani blokować przejścia dalej. Animacje zatrzymują pracę poza widokiem. Ograniczenie ruchu w systemie daje pełną, statyczną wersję opowieści. Telefon otrzymuje układ dopasowany do pionowego ekranu.

## Kolejność i orientacyjny czas aktywnej pracy

| Etap | Zakres | Szacunek |
|---|---|---|
| 1 | Logo do obejrzenia, docelowe menu i plan scen | Obecny krok, około 10–15 min od ostatniej informacji o czasie, zależnie od generatora |
| 2 | Pierwsza działająca scena formularz → CRM → kolejny krok | 30–60 min, część czasu etapu 3 |
| 3 | Przeniesienie strony głównej v4 do aplikacji i główna choreografia | 3–5 h |
| 4 | Wspólne menu, stopka, style, podstrony usługowe i kontaktowe, wersja EN i strony lokalne | 4–6 h |
| 5 | Formularz z istniejącym zapleczem CRM, obsługa błędów, przejścia do demonstracji | 1–2 h |
| 6 | Kontrola portfolio, telefonów, dostępności, wydajności i zachowania SEO; poprawki i odbiór | 3–5 h |
| 7 | Weryfikacja punktu przywrócenia i instrukcji przed publikacją | 1–2 h aktywnej pracy, czas transferów i dostępów poza szacunkiem |

Łącznie na zasadniczą resztę: orientacyjnie **12–20 godzin aktywnej pracy**, bez sumowania etapu 2 drugi raz. Nie jest to obietnica automatycznej pracy w tle ani terminu kalendarzowego. Szacunek zakłada wykorzystanie istniejących podstron i demonstracji, bez rozpoczynania ich od nowa i bez dodawania nowych produkcyjnych sklepów klientów.

## Warunek zamknięcia całości

Właściwa aplikacja działa w nowym stylu, potrzebne podstrony mają spójny wygląd, formularz przechodzi test lokalnej wysyłki i odczytu, sceny działają także w ograniczonym ruchu, adresy i metadane są sprawdzone, istnieje potwierdzona kopia do odtworzenia, a właściciel widzi finalny podgląd. Dopiero po osobnej zgodzie następuje publikacja i kontrola produkcji.

Na podstawie ostatnich zapisanych raportów kopia pełnego archiwum na Dysku Google nadal nie jest potwierdzona, Notion zawiera dokumentację, a eksport części konfiguracji Cloudflare był zablokowany. W tym kroku nie sprawdzano tych usług na żywo. Nie oznaczać backupu jako zamkniętego.
