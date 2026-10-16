# Zielona Marka UI 1.0

## Cel

Jeden spokojny, czytelny interfejs premium dla wszystkich podstron. Stosujemy projekt odblokowujący pierwsze zgłoszenie klienta, nie dekoracje dla samych efektów.

## Zasady wizualne

- Szerokość treści: 1180 px maksymalnie, na telefonie 16 px marginesu z każdej strony.
- Typografia: nagłówki redakcyjne Georgia lub odpowiednik, tekst treści zgodny z globalnym krojem witryny.
- Papierowa jasna baza, ciemna zieleń dla głównych akcji, zgaszona szałwia w sekcjach, jedna ciemnozielona sekcja rytmiczna.
- Karty mają cienką ramkę, delikatny cień tylko gdy potrzebny, promień 12 px. Nie używamy rozmycia czy zmiany przezroczystości całych kart po najechaniu.
- W obrębie jednej podstrony jeden H1, potem H2 i H3 w logicznym porządku.
- Tekst minimum 16 px w akapitach i polach formularza, zachowany czytelny kontrast.
- Nie stosujemy znaku U+2014 w treściach.
- Obsługa telefonu, klawiatury i prefers-reduced-motion jest wymagana.

## Źródło tokenów

`app/site-design-system.css` ma nazwy `--zm-ds-*`, klasy `zm-ui-*`. Nowe strony używają tych zmiennych zamiast lokalnych, przypadkowych barw i marginesów.

## Bezpłatna koncepcja

`app/bezplatna-koncepcja-strony/concept-unified-ui.css` jest jedynym końcowym źródłem rozmieszczenia, tła, typografii i kontrastu tej podstrony. Zachowujemy tylko niezbędne style bazowe, grafiki v5 i interakcje.

Nie podłączamy ponownie `shared-hero.css`, `concept-gallery.css` ani `production-contrast.css`, ponieważ reprezentują starsze, wzajemnie niezgodne kompozycje. Oryginalne pliki pozostają w repozytorium do porównania, ale nie są aktywne.

## Kolejność migracji całej witryny

1. Bezpłatna koncepcja: hero, galeria, opis procesu, formularz, FAQ.
2. Oferta i strony usługowe: włączyć te same tokeny oraz wzorce kart i sekcji bez zmiany cen.
3. Poradnik i realizacje: wyrównać nagłówki, szerokości i układ kart.
4. Strony lokalne i narzędzia: przejść przez formularze, kalkulatory oraz widoki mobilne.
5. Strona główna: zachować przywrócony układ i strumyk, ograniczając zmiany wyłącznie do spójnych elementów wspólnych.

## Warunek odbioru

Weryfikacja 1440 px, 768 px, 390 px i 320 px. Bez poziomego przewijania, nakładania elementów, niewidocznego tekstu, pustych sekcji i niefunkcjonalnych przycisków. Każda zmiana wymaga testów projektu oraz testów Chromium na publicznym wdrożeniu.

Uwaga: ukończenie pierwszego kroku nie oznacza automatycznie zakończenia migracji wszystkich pozostałych podstron.
