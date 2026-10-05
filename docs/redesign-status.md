# Zielona Marka: stan prac nocnych

Aktualizacja: 14 września 2026, podsumowanie po nocnych pracach.

## Najnowszy stan, przeczytać przed starszą kolejką

- AUDYT TEKSTÓW ZATWIERDZONY. Powstała redakcja v4 z delikatnym motywem natury, wcześniejszą informacją o opiece, wyraźniejszą ofertą i czytelniejszymi napisami. Lokalny podgląd: `http://127.0.0.1:4190/brand-review-v4/`. Pełne teksty: `docs/strona-glowna-teksty-v4.md`, zestawienie zmian: `docs/redakcja-v4-zmiany.md`. V3 zachowana. Formularz v4 jest oznaczonym podglądem bez wysyłki, nie integracją z CRM. Wyniki kontroli: `outputs/brand-review-v4/report.json`.

- NOWA KOREKTA WIZUALNA użytkownika: długi, w całości ciemnozielony fotograficzny układ zgodny z załącznikami astra_v1/v2. Poprzedni wygląd nie jest zaakceptowaną bazą nowego wdrożenia. Patrz aktualne ustalenia w `docs/brand-direction.md`.
- Przygotowano pełne copy strony głównej (`docs/strona-glowna-teksty-v3.md`), nowy biały znak SVG/PNG i ciągłe tło z paprociami WebP. Osobny lokalny podgląd `http://127.0.0.1:4190/brand-review-v3/` służy ocenie tych elementów. Nie przebudowano jeszcze w tym stylu aplikacji i wszystkich podstron. Ilustracje formularza i zakupu są demonstracjami.
- Kontrola v3: szerokości 1440/390/360, brak poziomego przepełnienia, brak uszkodzonych obrazów i brakujących kotwic, jeden H1, noindex. Obejrzano logo, pierwszy ekran oraz środkowe i końcowe fragmenty desktop/mobile. 12 odnośników do istniejącego lokalnego prototypu odpowiada HTTP 200. Raport i zrzuty: `outputs/brand-review-v3/`. To weryfikacja podglądu graficznego, nie odbiór funkcji całej aplikacji.

- Zmiany bazowe są zapisane w commicie 399dd9d. Późniejsze poprawki poniżej istnieją w plikach, ale nie zostały jeszcze zapisane w kolejnym commicie.
- Odchudzono oryginalne logo (WebP 28454 B) i zatwierdzone zdjęcia kontaktu/procesu, z zachowaniem oryginałów PNG. Lokalny pomiar pierwszego ładowania: główna około 0,63 MB (wcześniej 1,11 MB), kontakt około 0,52 MB (wcześniej 3 MB). To pomiar zasobów, nie wynik Lighthouse ani pomiar produkcji.
- Ustabilizowano nagłówek kontaktu: ostatni pomiar przesunięć wyniósł 0. Przyczyną była korekta typografii po załadowaniu, nie samo zdjęcie.
- Dodano ukrywanie pływających przycisków przy formularzu na telefonie, czytelniejsze opisy i kontrasty w demo/CRM, odzyskiwanie działania asystenta po błędzie sieci, Escape i powrót fokusu.
- Build i 5 testów przeszły. Ostatni raport accessibility-report.json: 22 z 23 kontroli przeszły. Niezamknięta kontrola: photo-dialog-trap (Tab w powiększeniu zdjęcia); sprawdzić zachowanie i ewentualnie poprawić. Nie określać pełnej dostępności jako zamkniętej.
- Obejrzano mobilne arkusze środkowych/dolnych sekcji oferty, CRM i trzech demonstracji. Po poprawkach potrzebna końcowa kontrola wizualna oraz dokument odbioru.
- Google Drive: świeżo otwarty folder w przeglądarce pokazywał instrukcję i raport, bez ZIP-a. ZIP istnieje w lokalnym G:, ale log DriveFS zawiera timeouty przesyłania. Kopia chmurowa pozostaje NIEPOTWIERDZONA.
- Notion: dokumentacja istnieje; próby przesłania części archiwum 19 MB i 4 MB zakończyły się timeoutem, sprawdzone uploady mają status pending. Żadna część nie została dołączona do strony. Lokalnie przygotowane części nie są kopią w chmurze. Pełny eksport DNS/reguł Cloudflare nadal brak (wcześniej 403).
- Termin pracy nocnej minął; automatyzacja została wstrzymana podczas podsumowania. Dalsza praca w tym zadaniu pozostaje lokalna, bez publikacji.
Gałąź: `codex/organic-home-prototype`.
Projekt: `C:\Users\User\OneDrive\Documents\ChatGPT\PRACA\zielona-marka-full-fix`.

## Granice pracy

Użytkownik zatwierdził wykonanie nowej wersji lokalnie i pracę przez noc. NIE PUBLIKOWAĆ. Nie używać produkcyjnej bazy, nie wdrażać Cloudflare, nie nadpisywać archiwum starej strony. Oryginalne jabłuszko i zdjęcia właściciela zachowane. Nie zaczynać projektu od nowa, pracować na obecnej gałęzi i przeczytać ten stan przed zmianami.

## Wykonane

- Nowa strona główna: paprocie, oryginalne jabłuszko z dekoracją roślinną, menu połączone z pierwszym ekranem, zachowany slogan, jasna oferta WWW/formularze/systemy/CRM/płatności.
- Przebieg od dobrej firmy przez zapytanie i CRM po opiekę. Sekcja właściciela. Odnośniki do odrębnych demonstracji. Telefon +48 450 458 466.
- Animowane ujawnianie sekcji podczas przewijania oraz 6-etapowa prezentacja procesu (27 s), ręczne odtwarzanie/pauza/wybór etapu, obsługa ograniczenia ruchu.
- Wspólny wygląd podstron usługowych i lokalnych; wersja angielska również otrzymała zielony pierwszy ekran. Odrębne layouty demonstracji Natura/Bistro/Dom/Transport.
- Rozszerzony formularz: potrzeba, efekt, sprzedaż/płatności, budżet i opis. Obsługa błędu sieci odblokowuje wysyłkę.
- Izolowana lokalna baza D1 i konfiguracja `wrangler.preview.jsonc`, bez tras produkcyjnych. Migracje zastosowane lokalnie.
- Lżejsze grafiki WebP: paprocie 202368 B, las 145082 B, właściciel 71678 B, panel 30002 B. Oryginalne pliki pozostają.
- Naprawione kanoniczne adresy kart realizacji i metadane polityki prywatności. Przekierowanie starego adresu transportflow. Prototyp ma noindex. Sitemap i trasy lokalne zachowane.
- Notion: wpis o ostatniej działającej stronie jest obecny, ponownie odczytany. Doprecyzowano rzeczywisty zakres kopii i brakujące potwierdzenia.

## Dowody testów

- Build przechodzi (ostatni po optymalizacji zdjęć i ruchu).
- 5 istniejących testów renderowania i odmiany miast przeszło również po zmianie metadanych, zdjęć i animacji.
- `outputs/design-review/report.json`: 33 adresy x 3 szerokości (1440/390/360), 99 widoków, zero wykrytych problemów po poprawkach mobilnych. Pojedynczy h1, brak błędów JS, działające obrazy, poprawny JSON-LD i brak poziomego przewijania.
- Formularz z przeglądarki: HTTP 201, odczyt syntetycznych rekordów w lokalnej D1 potwierdzony. Puste zgłoszenie: 400. Nie wysyłano testów do produkcji.
- `outputs/design-review/seo-report.json`: 27 stron z sitemap i 66 lokalnych odnośników, menu telefonu, formularz offline, filtr mieszkań. Wszystkie kontrole przeszły, zero problemów po poprawce metadanych.
- `outputs/design-review/final-checks.json`: wszystkie 15 kontroli przeszło. Zmienione trasy /, /en i prywatności sprawdzone w trzech szerokościach; odtwarzanie procesu, przewijanie i ograniczenie ruchu działają. Wykryty brak nagłówka noindex na /status naprawiono przez dodanie dokładnej trasy w next.config.ts, przebudowano i ponownie odczytano nagłówek (noindex, nofollow). Ta powtórna kontrola zaktualizowała jeden wynik w raporcie.
- Obejrzane obrazy: pierwszy ekran desktop/mobile strony głównej, arkusze pierwszych ekranów wszystkich 27 stron. Wcześniej również pełne zrzuty oferty i strony głównej. Nie utożsamiać tego z ręcznym obejrzeniem całej długości każdej strony.

## Kolejka nocna, kontynuować od pierwszego niezamkniętego punktu

1. ZAMKNIĘTE: ostatnie audyty odczytane, wykryte błędy poprawione i ponownie sprawdzone. Nie powtarzać pełnych testów bez nowej zmiany.
2. Dokończyć wizualne oglądanie środkowych i dolnych sekcji na telefonie, zwłaszcza podstron oferty/CRM, galerii i trzech pełnych demonstracji. Sprawdzić kontrast małych opisów i czy stałe przyciski nie zasłaniają formularzy. Stosować docelowe małe poprawki, nie zmieniać zatwierdzonego kierunku.
3. Sprawdzić rozmiar faktycznie pobieranych zasobów i przesunięcia layoutu przy pierwszym wejściu; optymalizować tylko wykryte ciężkie elementy, zachowując oryginały.
4. Dokończyć podstawowy przegląd dostępności klawiaturą, semantyki formularza, przejść demo do realnego kontaktu; nie wykonywać prawdziwych rezerwacji ani płatności.
5. Przygotować końcowy raport odbioru i podgląd z jasnym podziałem: gotowe, wymaga decyzji, wymaga dostępu. Zaktualizować ten dokument i zapisać zmiany w lokalnym Git. Bez push i deploy.
6. Kopia zapasowa: potwierdzić synchronizację całego ZIP-a poprzez odczyt/pobranie z Google Drive, jeśli istnieje dostęp. Pełny eksport DNS/reguł Cloudflare nadal brak (poprzedni odczyt 403). Nie oznaczać całej kopii jako w pełni zweryfikowanej bez tych dowodów. Notion zawiera dokumentację i załączniki, nie cały ZIP. Jeśli brak dostępu, opisać precyzyjnie i kontynuować inne prace.

## Lokalne uruchamianie

Podgląd: http://127.0.0.1:4180. Sesja serwera może nie przetrwać do następnego uruchomienia.

Node: `C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`.

Zatrzymaj proces podglądu PRZED buildem (blokada plików dist na Windows powoduje EPERM). Nie ubijaj wszystkich procesów Node, tylko własną sesję podglądu. Wywołania w katalogu projektu:

```text
node node_modules/vinext/dist/cli.js build
node node_modules/wrangler/bin/wrangler.js dev --local --config wrangler.preview.jsonc --persist-to .wrangler/design-test --port 4180 --ip 127.0.0.1 --log-level error
node --test tests/rendered-html.test.mjs tests/local-city-grammar.test.mjs
```

Skrypty QA wymagają lokalnego Chrome i ścieżki do Playwright z runtime Codex. `review-local.mjs` tworzy syntetyczny rekord w lokalnej D1 za każdym uruchomieniem; nie uruchamiać przeciwko produkcji.

## Archiwum i dokumentacja

Notion: https://app.notion.com/p/3da72bf39ceb8171aa4dccba013faf90?pvs=204

Google Drive: https://drive.google.com/drive/folders/1gmBnkBfrd2yw01bJriv73elHqNGMiufK

Lokalne archiwum starej wersji: `C:\Users\User\Documents\Codex\backups\zielona-marka`, ZIP 130203373 B, SHA-256 `14690B140927429CBCBC7E78A1DA6B09E625A81584C1057B5603B9C9FE20BAAB`. Synchronizowana kopia lokalna miała tę samą sumę; pobranie z chmury niepotwierdzone.

## Automatyzacja

ID: `zielona-marka-nocne-doko-czenie-prototypu`. Heartbeat co godzinę, maksymalnie 10 wywołań. Wstrzymać po zakończeniu pracy lub o 09:00 dnia 14.09.2026 Europe/Warsaw. Brak zmian i brak działania: bez powtarzania powiadomień. Zgłosić ukończenie albo rzeczywistą przeszkodę. Wykonanie zależy od dostępnego komputera, aplikacji, internetu i limitów konta.
