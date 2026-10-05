> AKTUALIZACJA: właściciel wznowił pracę i autoryzował publikację. Aktualny punkt zapisu: docs/STAN-PRAC-2026-09-19.md. Poniższy zapis jest historyczny.

# Wstrzymanie na polecenie właściciela, 19.09.2026

STATUS: WSTRZYMANE, NIEUKOŃCZONE. Wznowić dopiero gdy właściciel napisze „kontynuuj”. Nie publikować ani pushować. Nie uruchamiać automatu. Zmiany pozostają lokalnie, bez nowego commita.

## Stan zapisanej pracy

- Kontakt: zdjęcie nr 5 skopiowane jako public/lukasz-zielona-marka-kontakt-20260919.png i WebP (100844 B, 900x1125). Poprzednie zdjęcia zachowane. UWAGA: właściciel następnie odrzucił przesadną stylizację AI i nadmiar tematycznych rekwizytów. Aktualny wybór wymaga korekty według listy poniżej.
- Główna: czterozdaniowy opis Łukasza, bez rozbudowanej biografii. Pozostałe zatwierdzone teksty v4 zachowane.
- Build po zmianie zdjęcia i opisu OK; 4 testy rendered-html OK.
- Lokalny podgląd działa na http://127.0.0.1:4180 przez wrangler.preview.jsonc, lokalna D1 .wrangler/design-test. Start wymagał eskalacji odczytu folderów. Nie używano produkcyjnej bazy.
- Dodano scripts/audit-public-html.mjs. Raport outputs/home-v5-qa/seo-20260919.json: 27 stron sitemap, 65 linków wewnętrznych, brak wykrytych błędów statusu, tytułu, opisu, canonical, liczby H1 i kotwic. To nie oznacza pełnego audytu SEO ani ukończonego odbioru wizualnego.
- Wizualnie odczytano kontakt desktop i mobile390. Powiększenie zdjęcia i zamknięcie Escape działały, ale teraz właściciel żąda usunięcia powiększania zdjęć.
- Live prefers-reduced-motion: enhanced false przy reduce, true po przywróceniu no-preference. Emulację przywrócono. Test błędu HomeContactForm NIE dokończony: fill przerwał się zanim włączono offline. Sieć nie została przełączona w offline.
- Ostatnie zmiany źródłowe NIE są jeszcze w buildzie: ukrywanie pływających przycisków przy formularzu/stopce rozszerzone także na desktop (app/brand-system.css); pomijanie polskiej typografii na /en (app/PolishTypography.tsx). Wymagają builda i weryfikacji.
- Higgsfield: wygenerowano JEDEN film 6 s, veo3_1_lite, 16:9, bez dźwięku. Potwierdzony koszt przed generacją 6 kredytów. Job b2803923-6bde-4cf9-9bb8-48a4a72568d3 ukończony. Pobrany do public/brand-review-v5/fern-moss-stream-20260919.mp4. NIE osadzony ani obejrzany w układzie strony. Nie generować ponownie bez sprawdzenia tego pliku. Saldo po generacji nieodczytane. Plan etapu do 30 ze 110 kredytów nadal obowiązuje.
- Właściciel zniósł rezerwę 15% limitu Codex, ale następnie wyraźnie WSTRZYMAŁ pracę. Wstrzymanie ma pierwszeństwo.

## Najnowsze poprawki właściciela, do wykonania po „kontynuuj”

1. Zdjęcie ma wyglądać luźno, profesjonalnie i wiarygodnie, mniej jak AI. Za dużo książek tematycznych, obrazu/brandingu; kubek może zostać. Bliższy kadr twarzy i mniej tła w kontakcie. Rozważyć inne dostarczone zdjęcie lub delikatną edycję, zachować rysy. Nie wykonywano jeszcze tej poprawki.
2. Wszystkie zdjęcia mają przestać być klikalne i powiększalne, także kontakt. Sprawdzić wszystkie użycia ExpandableImage.
3. Użytkownik wspomniał, że zdjęcie pierwotnie miało być „też na logo”. Znaczenie niejasne, nie przerabiać samowolnie logo na portret. Wyjaśnić przy wznowieniu, czy chodzi o stronę główną/sekcję z logo.
4. Czas wykonania: mała/typowa strona „od 72 do 14 dni”, prawdopodobnie 72 godziny do 14 dni. Potwierdzić jednostkę przed wprowadzeniem publicznej obietnicy. Ograniczyć ją do typowej strony, bez rozszerzania na CRM/integracje.
5. Wyraźnie oznaczyć ceny jako netto, sprawdzić istniejące opisy i konsekwencję we wszystkich cennikach.
6. QA: biały okrąg z delikatnym zielonym znakiem jest nieczytelny. Zlokalizować i naprawić kontrast.
7. Naprawić WSZYSTKIE stany hover, w których jasny tekst/cyfry znikają na jasnym podświetleniu. Zgłoszone: FORMULARZ → NOWY KONTAKT → WYCENA → ZLECENIE → ROZLICZENIE; Zapytanie → Wycena → Realizacja → Dokumenty → Wyniki; automatyzacje/panele/integracje; Co zyskuje firma (numeracja 01+); interaktywna ścieżka obsługi na wszystkich podstronach, w tym firm usługowych; Google + strona + kontakt; obszar działania (Żoliborz, Kobyłka, Radzymin itd.).
8. Preferowany hover: lekka przezroczystość powierzchni, kafelek subtelnie unosi się z tła, zachowując czytelność. Nie stosować białego podświetlenia pod jasnym tekstem.
9. Element automatyzacje/panele/integracje nie musi być dynamiczny. Demonstracja transportu również nie musi być dynamiczna. Nie usuwać działających funkcji demonstracyjnych bez potrzeby, chodzi o efekt ruchu.
10. Trzy kafelki pod „Automatyzacja jest opcją, nie obowiązkiem” mają być dynamiczne, subtelne uniesienie i czytelny stan hover.
11. Zmiana akcentu lokalnego: Targówek jako główny obszar, Warszawa jako szerszy kontekst, Marki jako jedna z podstron. Zaktualizować nazewnictwo/menu i powiązania SEO spójnie, zachować dotychczasowe URL lub przekierowania; nie usuwać lokalnych podstron. Właściciel mówił najpierw Warszawa, następnie „Targówek najlepiej, Targówek jako głównie ustawiony”. Nie wymyślać adresu firmy.
12. Pierwszy ekran ma być bardziej designerski, brakuje efektu. Ocenić gotowy film paproć/mech/strumień i zintegrować oszczędnie z tekstem, statycznym fallbackiem oraz ograniczeniem ruchu. Opowiedzieć konkretnie, jakie efekty Higgsfield możemy wykorzystać (użytkownik zapytał), w ramach budżetu.
13. Użytkownik wspomniał „reszta w załączniku”, ale w tej wiadomości nie ma nowego załącznika. Nie twierdzić, że go sprawdzono. Dostępne jest wcześniejszych 7 zdjęć w Downloads/Photos-1-001.

## Dalej po poprawkach

Wykonać końcowe wizualne testy desktop/mobile wszystkich tras i hover, menu/klawiatury, no-JS, błąd formularza głównego, spójność metadanych po zmianie obszaru działania, aktualny build i testy. Nie nazywać całości gotową przed zakończeniem odbioru. Szczegóły wcześniejszych testów i lokalnej bazy: docs/naprawy-odbior-2026-09-15.md.
