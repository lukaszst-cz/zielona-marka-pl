# Odbiór zabezpieczeń v1.1.1, 29.10.2026

Punkt wyjścia produkcji: v1.1.0, dc12d925ad39695e36185b78ae8334f01854a05b. Nie przywracać starszych źródeł ani grafik.

## Wykonane i sprawdzone

- Wysyłka SMTP home.pl została przywrócona i aktywowana. Odbiór testu 31 potwierdzono w Gmailu 28.10.2026. To dowód konkretnego testu, nie gwarancja wszystkich przyszłych wysyłek.
- Nocne kontrole wersji produkcyjnej przeszły. Nieudany szkic SEO #158 nie został scalony.
- Publiczny punkt portfolio wymaga ścisłej listy pól: identyfikator, tytuł, typ, opis, grafika, publiczny adres i data aktualizacji. Samo opublikowanie projektu nie upublicznia kodu dostępu do statusu, umowy ani danych klienta. Produkcyjny punkt zwracał w czasie kontroli pustą listę. Nie stwierdzono na tej podstawie ujawnienia istniejących rekordów.
- Przygotowano dodatkową kontrolę źródła żądań do panelu oraz jawny zakaz buforowania odpowiedzi prywatnych.

## Zabezpieczenie GitHuba

Plik main-ruleset.json jest przygotowaną konfiguracją, NIE potwierdzeniem aktywacji. Wymusza PR i zaliczony test, aktualną bazę oraz rozwiązanie dyskusji. Blokuje usunięcie main i wymuszone nadpisanie historii. Nie wymaga zatwierdzenia przez drugą osobę, aby właściciel pracujący sam mógł scalać własne PR. Nie wymaga kontroli uruchamianych dopiero po wdrożeniu, co blokowałoby każde scalenie.

Do zastosowania potrzebne jest zalogowanie właściciela do ustawień repozytorium. Podłączone narzędzie nie ma operacji zapisu ustawień administracyjnych. Sprawdzić wynik ponownie przez API po aktywacji. Nie oznaczać zadania jako zakończonego na podstawie samego przygotowanego pliku.

## Nadal do wykonania

- Eksport danych produkcyjnej D1 i próbne odtworzenie danych w oddzielnej bazie, po uzyskaniu dostępu do Cloudflare. Nie tworzyć publicznego endpointu eksportu i nie umieszczać danych klientów w publicznych artefaktach GitHuba.
- Trwały rejestr i kolejka powiadomień, z uwzględnieniem niejednoznacznych wyników SMTP i podwójnej wysyłki. Nie ponawiać automatycznie historycznych zapytań klientów.
- Limit logowania egzekwowany po stronie infrastruktury lub trwałego magazynu; lokalna mapa w pamięci Workera nie zastępuje ochrony rozproszonej.
- Przegląd uprawnień kont, 2FA, reguł Cloudflare i zakresów tokenów z właścicielem. Bez zmiany haseł i sekretów w ciemno.
- Wyjaśnienie wcześniejszych sporadycznych 503 na podstawie logów Cloudflare oraz pomiar wydajności mobilnej.
- Dokończenie SEO, treści i danych usługodawcy bez publikowania niepotwierdzonych opinii, wyników lub certyfikatów.

Reguła wymaganego testu jest przypięta do aplikacji GitHub Actions (integration_id 15368 odczytane z prawdziwej kontroli CI), aby nie wystarczał status o tej samej nazwie z innego źródła. Potwierdzono też, że kontrola Cloudflare dla gałęzi roboczej prowadzi do ścieżki previews/hardening-2026-10-29, a nie jest dowodem publikacji tej gałęzi jako produkcji.
