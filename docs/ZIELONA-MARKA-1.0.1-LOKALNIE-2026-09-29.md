# Zielona Marka 1.0.1, stan lokalny do akceptacji

Data kontroli: 2026-09-29

Status: gotowe lokalnie, nieopublikowane.

## Wprowadzone zmiany

1. Dodano długie, bezpieczne cache dla plików technicznych `/_next/static/*`.
2. Zdjęcie drzewa nakładane na film pierwszego ekranu nie pobiera się przy samym wejściu. Ładuje się dopiero po uruchomieniu filmu.
3. Tło wodnego przejścia do sekcji „Wszystko zaczyna się łączyć” nie pobiera się przy samym wejściu. Ładuje się dopiero po wejściu sekcji w obszar ekranu.
4. Zachowano główne zdjęcie lasu jako natychmiastowy, stabilny obraz pierwszego ekranu. Dzięki temu wygląd nie zależy od szybkości filmu.
5. Na telefonie i tablecie powiększono aktywne pola dodatkowych linków oferty, linków stopki oraz całego wiersza zgody formularza.
6. Checkbox ma 24 x 24 px, natomiast jego klikalna etykieta ma co najmniej 44 px wysokości.
7. Uporządkowano skrypt restrykcyjnego audytu: usunięto dwie nieaktualne trasy demonstracyjne i wykluczono niewidoczne pole antyspamowe z oceny kontrolek.
8. Dodano testy regresji dla cache, opóźnionego ładowania mediów oraz pól dotykowych.

## Efekt techniczny

- Z początkowego pobierania odłożono dwa niekrytyczne obrazy o łącznym rozmiarze 368 556 bajtów, około 360 KB.
- Lekki film mobilny nadal ma około 498 KB i jest wybierany przy szerokości telefonu.
- Obraz lasu pierwszego ekranu pozostaje pobierany od razu, ponieważ pełni funkcję widocznego tła i zabezpieczenia przed pustym ekranem.

## Wyniki kontroli

- Build produkcyjny: zaliczony.
- TypeScript: zaliczony bez błędów.
- Testy automatyczne: 14 z 14 zaliczonych.
- Menu: 6 szerokości od 390 do 1440 px, brak zasłoniętych i nieklikalnych pozycji.
- Audyt responsywny i SEO: 40 tras, w tym 29 publicznych, 120 widoków telefon, tablet i komputer.
- Błędy audytu: 0.
- Ostrzeżenia audytu: 0.
- Przepełnienia poziome, uszkodzone obrazy, teksty przycięte, błędne dane JSON-LD: 0.

## Czego nie wykonano

- Nie opublikowano wersji 1.0.1 na produkcji. Publiczna strona nadal pozostaje wersją 1.0.
- Nie wysłano prawdziwego formularza do skrzynki e-mail, aby nie tworzyć zewnętrznej wiadomości testowej bez osobnej decyzji.
- Nie zgłoszono mapy strony w Google Search Console ani Bing Webmaster Tools, ponieważ wymaga to dostępu do kont właściciela.
- Oficjalny Lighthouse i CrUX nadal nie są częścią tej kontroli. Zastosowano bezpośredni audyt Chrome przez Playwright oraz testy kodu.

## Podgląd

Lokalny podgląd podczas bieżącej sesji: http://127.0.0.1:4191/?preview=v1.0.1

Po akceptacji kolejnym krokiem jest publikacja tej wersji, kontrola nagłówków cache na domenie i krótki audyt produkcyjny po wdrożeniu.
