# Zielona Marka: naprawa wysyłki i odzyskanie wcześniejszych zgłoszeń

## Zakres i ważne ustalenia

- Wszystkie publiczne formularze prowadzą do `POST /api/inquiries` i zapisują dane w tabeli `inquiries` w Cloudflare D1.
- W historii kodu od 25.08.2026 istniał zapis do CRM bez automatycznej wysyłki wiadomości. Próba powiadomień e-mail przez Resend została dodana 05.10.2026.
- Dotychczas nie zapisywano do D1 niezależnego statusu doręczenia ani identyfikatora każdej wysłanej wiadomości. Z samej tabeli `inquiries` **nie można rozstrzygnąć**, które maile dotarły, a które nie.
- Konta e-mail nie należy mylić z usługą wysyłkową. Działający Gmail odbiera pocztę, ale nie potwierdza integracji formularzy.

## Docelowa konfiguracja (Cloudflare Email Service zamiast zależności od Resend)

1. Wejdź do konta Cloudflare obsługującego produkcyjnego Workera `zielona-marka`, wybierz **Email Service > Email Sending** i sprawdź, czy domena `zielona-marka.pl` jest **onboarded / verified** jako domena nadawcza. Zastosuj wymagane rekordy autoryzacji z panelu Cloudflare, bez nadpisywania działających rekordów MX Gmail / Google Workspace.
2. Zweryfikuj odbiorcę `kontakt@zielona-marka.pl` jako **destination address** w Email Routing/Email Service (jeżeli wymaga tego panel).
3. W Workerze ma istnieć wiązanie `INQUIRY_EMAIL` typu `send_email`, ograniczone do `destination_address: kontakt@zielona-marka.pl`. Jest zapisane w `wrangler.jsonc`; skrypt `scripts/prepare-vinext-wrangler-config.mjs` kopiuje je również do faktycznego wygenerowanego pliku `dist/server/wrangler.json` używanego przy wdrażaniu.
4. Do czasu potwierdzenia działania Cloudflare można pozostawić bezpiecznie istniejący `RESEND_API_KEY` jako **awaryjny** fallback; błędne ustawienie Resend nie zmienia odbiorcy, który na stałe jest `kontakt@zielona-marka.pl`. Po działającym teście natywnej wysyłki można wyłączyć fallback.
5. Uruchom pełną weryfikację CI, wdroż Worker i wykonaj po jednym kontrolowanym wysłaniu z czterech formularzy: strona główna, `/kontakt`, `/bezplatna-koncepcja-strony`, asystent.
6. W logach Cloudflare sprawdź **accepted / sent**, a w Gmailu rzeczywiste dostarczenie. Sam kod `201` z API oznacza przyjęcie przez dostawcę, nie że Gmail umieścił wiadomość w Inbox. Kod `202` i `notificationSent: false` oznacza zapis do CRM bez przyjętego e-maila.

**Uwaga:** Cloudflare Email Service może wymagać aktywacji i dostępnego planu w Twoim koncie. Nie wdrażaj wiązania produkcyjnego w ciemno, jeżeli domena/odbiorca nie są jeszcze zweryfikowane.

## Ustalenie liczby zgłoszeń, które mogły nie dotrzeć

Właściciel widzi ich liczbę w **Studio > Zapytania**. To liczba zapisów w D1, a nie udokumentowanych nieudanych wysyłek. Obejrzyj wszystkie pozycje, nie tylko status `Nowe`.

Możesz też wykonać poniższe wyłącznie odczytowe zapytania w **Cloudflare > D1 > zielona-marka-db > Console**. Wybierz **produkcyjną** bazę danych, nie lokalną/preview.

```sql
-- Łącznie zapisanych zapytań
SELECT COUNT(*) AS wszystkie_zgloszenia FROM inquiries;

-- Zgłoszenia przed wprowadzeniem obsługi wysyłki Resend
SELECT COUNT(*) AS sprzed_powiadomien
FROM inquiries WHERE created_at < '2026-10-05';

-- Potencjalnie objęte awarią konfiguracji Resend (górny limit,
-- nie liczba udowodnionych niedostarczonych wiadomości)
SELECT COUNT(*) AS od_5_pazdziernika
FROM inquiries WHERE created_at >= '2026-10-05';

-- Liczba zgłoszeń według dni
SELECT substr(created_at, 1, 10) AS dzien, COUNT(*) AS liczba
FROM inquiries
GROUP BY substr(created_at, 1, 10)
ORDER BY dzien DESC;
```

Aby ustalić **rzeczywistą** liczbę niedostarczonych powiadomień, trzeba porównać powyższe zgłoszenia (czas, temat, odbiorca) z historią Email Logs w Resend i Cloudflare oraz odbiorczą skrzynką `kontakt@zielona-marka.pl`. Dotychczasowa tabela nie zawiera identyfikatorów wiadomości, więc nie należy podawać fałszywie precyzyjnej liczby ani automatycznie wysyłać ponownie wszystkich historycznych zgłoszeń.

Każdą potencjalnie przeoczoną sprawę najlepiej sprawdzić w Studio i skontaktować się z klientem bezpośrednio za pośrednictwem adresu podanego w zgłoszeniu, upewniwszy się wcześniej, czy kontakt nie został już obsłużony.

## Kontrola bezpieczeństwa

Nie zapisuj tokenów Cloudflare, Resend, haseł Gmail ani danych klientów w repozytorium. Nie udostępniaj tabeli zgłoszeń publicznym endpointem i nie uruchamiaj zbiorczego ponawiania wiadomości bez kontroli duplikatów.
