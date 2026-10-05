# Zielona Marka: audyt tekstów i kierunek dalszej redakcji

Data: 14.09.2026. Status: AUDYT ZATWIERDZONY PRZEZ UŻYTKOWNIKA. Użytkownik zaakceptował kierunek i dodał delikatną grę słów dotyczącą natury, spokoju, zieleni i rozwoju. Redakcja v4 powstaje w osobnym podglądzie `public/brand-review-v4/`; teksty i kod v3 pozostają zachowane.

## Wniosek

Obecna wersja jasno porządkuje zakres usług, ale jeszcze nie tworzy dostatecznie mocnego poczucia indywidualnej opieki. Ma dobre pojedyncze hasła, natomiast za często opiera się na podobnych konstrukcjach i opisie kolejnych narzędzi. Potrzebuje wyraźniejszego powodu, żeby zaufać właśnie Zielonej Marce.

Kierunek wskazany przez właściciela: pozytywne zaskoczenie, spokój, oddech, bycie zrozumianym i zaopiekowanym. Rekomenduję, żeby te odczucia wynikały z trafnego opisu codzienności klienta, konkretnych zasad współpracy i prostego następnego kroku. Sama zielona fotografia nie zastąpi tych informacji.

To ocena redakcyjna i przegląd czytelności projektu. Wpływ zmian na liczbę wartościowych zapytań jest hipotezą do późniejszego sprawdzenia, nie wynikiem pomiaru ani gwarancją.

## Co sprawdziłem

- Pełne teksty w `docs/strona-glowna-teksty-v3.md`.
- Faktyczny skład treści w `public/brand-review-v3/index.html` i reguły typografii w `review.css`.
- Zapisane widoki podglądu: pierwszy ekran komputera i telefonu oraz końcowy kontakt na telefonie, z `outputs/brand-review-v3/`.
- Pomocniczo deklarowany zakres współpracy w `app/jak-pracuje/page.tsx` oraz opisy CRM w `app/maly-crm-dla-firm/page.tsx`. To lokalne materiały oferty, nie niezależne potwierdzenie wyników realizacji.

Audyt nie obejmuje badań z klientami, analityki produkcyjnej, pełnej dostępności, weryfikacji prawnej ani ponownej oceny SEO wszystkich podstron.

## Co warto zachować

- „Masz dobrą firmę. Pokażmy ją z dobrej strony”: ciepłe uznanie pracy właściciela i naturalne nawiązanie do usługi.
- „Mniej dopytywania. Więcej konkretów”: zwięzła, zrozumiała korzyść.
- „Zapytanie przyszło. Wiadomo, co dalej”: konkretna sytuacja i poczucie porządku.
- Pokazanie związku strony, formularza, sprzedaży i CRM.
- Osobisty głos Łukasza, telefon pod przyciskiem „Porozmawiajmy”, możliwość napisania.
- Jasne oznaczenie demonstracji oraz akceptację projektu przed publikacją.
- Długi zielony układ, biały znak i spokojne przejścia między fotografiami.

## Ustalenia, według ważności

P1 oznacza element konieczny do poprawienia przed zatwierdzeniem nowej redakcji. P2 oznacza dopracowanie jakości i rytmu.

| Priorytet / miejsce | Co obecnie przeszkadza | Rekomendowana zmiana po akceptacji |
|---|---|---|
| P1 / pierwszy ekran | Hasło jest zauważalne, ale usługę opisuje przede wszystkim drobny wiersz nad nagłówkiem. „Pokazuję, czym zajmuje się Twoja firma” nie mówi wprost, co klient zamawia. | Zachować charakter otwarcia, dodać czytelny opis tworzenia stron i porządkowania obsługi. Od razu określić, komu pomagasz. |
| P1 / skojarzenie z marką | Paprocie, nazwa i kilkukrotne Natura Studio mogą sugerować ofertę ogrodniczą albo beauty. To ryzyko interpretacyjne, nie wynik badania odbiorców. | Mocno zakotwiczyć usługę cyfrową w głównym tekście. Pokazać, że Natura jest przykładem dla jednej z branż. |
| P1 / poczucie opieki | Informacje o bezpośrednim kontakcie, ustaleniu zakresu i obejrzeniu projektu przed publikacją pojawiają się dopiero pod portfolio. | Wcześniej wprowadzić krótki konkret o sposobie współpracy, a później go rozwinąć. Wskazać odpowiedzialność wykonawcy i decyzje klienta. |
| P1 / jedna opowieść | Strona przechodzi od obsługi klientów odbiorcy do „Publikacja to początek”, czyli opieki Łukasza nad stroną. Zmienia się bohater i rodzaj relacji. | Oddzielić historię działania firmy klienta od historii współpracy z Zieloną Marką. Powiązać je czytelnym przejściem. |
| P1 / emocja | „Nie powinien się domyślać”, „mniej dopytywania”, „co dziś utrudnia Ci pracę” budują głównie perspektywę problemów. | Zachować rozpoznawalną sytuację, ale szybciej pokazać porządek, wygodę i wsparcie. Ograniczyć nagromadzenie negacji i obowiązków. |
| P1 / decyzja o kontakcie | „Porozmawiajmy” podaje działanie, ale nie wyjaśnia dostatecznie, jak zacząć bez znajomości technologii i czego spodziewać się po rozmowie. | Dopisać spokojne wprowadzenie do kontaktu: co wystarczy opowiedzieć i jaki ma być następny krok. Nie dopisywać niepotwierdzonej bezpłatnej analizy, terminu odpowiedzi ani gwarancji. |
| P1 / czytelność | Wiersz usług ma 11 px na komputerze i 9 px na telefonie. Ważne odnośniki mają 13 px. Zdjęcie bywa jasne bezpośrednio pod tekstem. | Przenieść podstawowe informacje do czytelnej warstwy tekstowej, skorygować rozmiary i przyciemnienie miejsc pod tekstem. Sprawdzić kontrast po zmianach; obecny audyt nie potwierdza zgodności WCAG. |
| P2 / sposób pisania | Wiele nagłówków ma ten sam rytm dwóch krótkich zdań. „Dobre rzeczy rozwijają lokalny świat” i „Inny charakter, inny klient, inny sposób działania” tworzą nastrój, ale mało wyjaśniają. | Zróżnicować rytm. Pozostawić tylko metafory, które pomagają zrozumieć usługę. Każdy opis powinien wnosić nowy konkret. |
| P2 / oferta | Sześć podobnie wyeksponowanych sekcji może wyglądać jak obowiązkowy pakiet. „Mały CRM” i „mały sklep” mogą też niepotrzebnie pomniejszać wartość. | Pokazać możliwość wyboru potrzebnego zakresu. Wyjaśnić CRM przez codzienną pracę, a wielkość rozwiązania przez dopasowanie do firmy. |
| P2 / portfolio | Karty głównie opisują klimat i branżę. Argumenty świadczące o przemyśleniu projektu są słabo widoczne. | Przy każdym przykładzie pokazać potrzebę odbiorcy i konkretne rozwiązanie. Nie przypisywać demonstracjom wyników sprzedaży ani opinii klientów. |
| P2 / kierowanie uwagą | Niemal każda sekcja zaprasza do przejścia na kolejną podstronę. Samo „poznaj” nie zawsze wyjaśnia wartość kliknięcia. | Ustalić hierarchię: poznanie możliwości, obejrzenie przykładu, rozmowa. Odnośniki do szczegółów pozostawić pomocnicze, z trafnymi opisami. |
| P2 / formularz | Dokument zawiera szeroki zestaw pól, ale przeglądowa strona główna pokazuje tylko ilustrację formularza i link do wcześniejszego kontaktu. Nie można uznać docelowej ścieżki za wdrożoną. | W nowej redakcji określić krótki pierwszy kontakt i opcjonalne szczegóły. Rozdzielić przykład formularza klienta od prawdziwego formularza Zielonej Marki. |

## Proponowana architektura przekazu

To zakres do zatwierdzenia, nie gotowe nowe teksty do wklejenia.

1. **Zauważenie i rozpoznanie.** Pierwszy ekran łączy silną fotografię z czytelną usługą. Klient rozpoznaje, że oferta dotyczy jego firmy.
2. **Uznanie jego pracy.** Pokazujemy wartość tego, co już robi. Strona ma pomóc to lepiej przedstawić i ułatwić klientom wybór.
3. **Ulga w codziennej pracy.** Formularz, sprzedaż i CRM pojawiają się jako odpowiedzi na konkretne sytuacje. Odbiorca nie musi znać nazw narzędzi, żeby zrozumieć sens rozwiązania.
4. **Ciągłość relacji.** Po realizacji zlecenia pozostaje kontakt z klientem. Ta część nadal dotyczy firmy odbiorcy.
5. **Możliwość sprawdzenia.** Demonstracje pozwalają obejrzeć konkretne rozwiązania i zrozumieć ich dobór.
6. **Przewidywalna współpraca.** Osobista odpowiedzialność Łukasza, ustalony zakres, projekt do obejrzenia, akceptacja oraz zasady dalszej opieki. Tutaj należy ulokować rozwój strony po publikacji.
7. **Spokojny następny krok.** Rozmowa albo krótka wiadomość, z wyjaśnieniem czego potrzeba, aby zacząć.

Długi charakter strony zostaje. Więcej oddechu powstanie przez lepszą hierarchię i mniej powtórzeń, bez dodawania kolejnych ogólnych sloganów.

## Jak uzyskać pozytywne zaskoczenie i spokój

**Zaskoczenie:** celne spostrzeżenie z życia firmy, trafne połączenie usługi z wygodą klienta albo pokazanie prostego rozwiązania czegoś, co dotąd wymagało ręcznego pilnowania. W tekście wybierzemy kilka takich momentów, zamiast próbować zaskakiwać w każdym zdaniu.

**Spokój:** prosty język, przewidywalny przebieg współpracy, widoczny człowiek po drugiej stronie, jasno opisany zakres oraz możliwość zobaczenia projektu przed publikacją. To konkretne podstawy poczucia opieki.

**Charakter premium:** staranna selekcja słów, szacunek dla czasu odbiorcy, dopasowanie do jego sytuacji oraz wiarygodne szczegóły. Słowa „wyjątkowy”, „kompleksowy” i „najwyższa jakość” same nie pokażą jakości pracy.

**Działanie:** tekst powinien ułatwiać decyzję i wyjaśniać kolejny krok. Bez sztucznej pilności, wywoływania poczucia winy ani obietnicy, że wszystkie problemy znikną. Zachowujemy agencyjność klienta.

**Naturalność, doprecyzowanie właściciela:** kontakt ma być naturalnym następstwem zaufania. Fotografia przyrody, zieleń, tempo przewijania i język mają wspólnie budować ten przekaz. Nawiązanie do natury opieramy na ciągłości, opiece i rozwoju dopasowanym do etapu firmy. Botaniczne metafory stosujemy oszczędnie, tak żeby odbiorca nadal od razu rozumiał ofertę stron i systemów. Nie wywodzimy z roślinnych zdjęć obietnic ekologicznych ani gwarancji wzrostu biznesu.

Przykładowe oczekiwane odczucie odbiorcy, nie propozycja hasła reklamowego: rozumiem ofertę, widzę sens dla mojej firmy, wiem kto się tym zajmie i mogę spokojnie rozpocząć rozmowę.

## Kryteria odbioru po zatwierdzeniu i redakcji

- Już na pierwszym ekranie wiadomo: dla kogo jest oferta, czego dotyczy i gdzie zacząć.
- Bez znajomości skrótu CRM można zrozumieć korzyść z tej usługi.
- Każda sekcja wnosi jeden nowy argument i prowadzi do następnej.
- Motyw natury pozostaje zgodny z tonem rozmowy. Rozwój oznacza dobór kolejnego potrzebnego rozwiązania, bez presji na zakup całego pakietu.
- Osoba czytająca same nagłówki rozumie opowieść; akapity dostarczają konkretnych szczegółów.
- Mocne, wcześniej wskazane przez właściciela hasła pozostają zachowane lub mają wyraźnie uzasadniony wariant do wyboru. Nie znikają przypadkiem.
- Każda obietnica opieki ma określony zakres. Warunki oferty nie są poszerzane przez samą redakcję.
- Jest jasne, co wykonuje Łukasz, co zatwierdza klient i kiedy projekt może zostać opublikowany.
- Przyciski dokładnie opisują działanie i prowadzą do zgodnego miejsca. Telefon pozostaje telefonem.
- Na telefonie główne informacje nie są zapisane drobnym tekstem na fotografii. Sprawdzimy skład, kontrast i zawijanie przy 360 i 390 px oraz na komputerze.
- Przykłady pozostają podpisane jako demonstracje. Nie pojawiają się fikcyjne wyniki, opinie ani terminy odpowiedzi.
- Później można sprawdzić, czy odbiorcy poprawnie rozumieją ofertę i wykonują zamierzony krok. Na dziś nie ma podstaw do deklarowania procentowego wzrostu zapytań.

## Zakres zatwierdzenia

Proponuję zatwierdzić: spokojny, osobisty i konkretny ton; wcześniejsze pokazanie opieki; uporządkowanie dwóch historii (firma klienta i współpraca z Zieloną Marką); wyraźniejszą ofertę; poprawę czytelności i hierarchii przycisków. Zielony charakter, logo, telefon i uczciwe oznaczenia demonstracji pozostają.

Po zatwierdzeniu przygotuję kompletną redakcję v4, zestawienie najważniejszych zmian oraz lokalny podgląd z tekstami w układzie strony. Ceny, umowy, terminy i zakres świadczeń wymagają zachowania zgodności z uzgodnioną ofertą. Publikacja pozostaje osobną decyzją.

Historia: przed zatwierdzeniem utworzono tylko audyt. Wyraźna akceptacja użytkownika w kolejnym kroku otworzyła etap redakcji v4. Publikacja nie została zatwierdzona.
