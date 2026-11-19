/** Szczegóły projektów z kategorii Strony WWW.
 * Stan SOLIDOM zweryfikowany w opublikowanym kodzie HTML/CSS/JS.
 * Pozostałe opisy powstały z katalogu i zweryfikowanych stron, bez dopisywania wdrożeń.
 */
export type WebsiteCaseStudy = {
  visual: string;
  flow: string;
  technical: string;
  scope: string;
  version?: string;
  sources?: { label: string; url: string }[];
  /** Uczciwie o tej pracy: co w niej dziala, a czego nie zastepuje. */
  honest?: string;
  /** Czym rozni sie od blizniaczej wersji, jesli taka istnieje. */
  variant?: string;
};
export const websiteCaseStudies: Record<string, WebsiteCaseStudy> = {
  "budrivo": {
    "visual": "Fotografie materiałów, elewacji i mieszalni kolorów. Kategorie odpowiadają rzeczywistym pytaniom osoby remontującej dom.",
    "flow": "Od poznania materiałów przez kalkulator powierzchni elewacji do listy i zapytania. Gazetka uzupełnia ofertę.",
    "technical": "W działającej publikacji potwierdzono sekcje katalogu, mieszalni, dostawy i kalkulatora elewacji. Nie potwierdzono integracji z magazynem.",
    "scope": "Opublikowana, interaktywna koncepcja hurtowni budowlanej.",
    "honest": "To koncepcja fikcyjnej hurtowni, nie wdrożenie dla klienta. Kalkulator elewacji i katalog działają naprawdę i można je kliknąć, ale strona nie jest połączona z żadnym magazynem ani systemem sprzedaży. U realnego klienta trzeba by podpiąć jego asortyment i ustalić, skąd biorą się ceny.",
    "variant": "Strona i gazetka BUDRIVO stoją pod jednym adresem. Gazetka jest częścią serwisu, nie osobnym projektem."
  },
  "phu-marecki": {
    "visual": "Granat i czerwień centrum budowlanego, duże zdjęcia placu, tartaku i transportu. Gazetka wygląda jak rozkładówka papierowej ulotki, tylko że da się z niej dodawać produkty.",
    "flow": "Od gazetki lub katalogu przez listę do wyceny z ilościami do jednej gotowej wiadomości e-mail. Osobna ścieżka prowadzi do zapytania o transport na budowę.",
    "technical": "W działającej publikacji potwierdzono gazetkę z filtrami działów, katalog 18 pozycji z wyszukiwarką, listę zapisywaną w przeglądarce, formularz transportu i formularz kontaktu. Nie ma płatności ani połączenia z magazynem.",
    "scope": "Opublikowana koncepcja centrum budowlanego razem z aplikacją na telefon.",
    "honest": "To nasz własny projekt pokazowy, nie wdrożenie dla firmy o tej nazwie. Produkty, ceny i promocje są przykładowe, a formularze nie wysyłają niczego same: otwierają gotową wiadomość w poczcie, którą wysyła się ręcznie. U realnego klienta trzeba podpiąć jego asortyment, ustalić źródło cen i zdecydować, czy zapytania mają trafiać do skrzynki, czy do systemu.",
    "variant": "Ta praca ma dwie części. Strona WWW jest dla kogoś, kto szuka materiałów na komputerze i chce obejrzeć gazetkę na dużym ekranie. Aplikacja na telefon to ten sam asortyment w formie instalowanej na ekranie głównym, z pięcioma ekranami i listą, która zostaje w telefonie. Obie korzystają z tej samej listy produktów."
  },
  "navoro-hurt": {
    "visual": "Silne fotografie produktów i kolorystyka promocji, połączone z czytelną nawigacją B2B.",
    "flow": "Klient przegląda 17 produktów i otwiera lub pobiera ośmiostronicową gazetkę. Oferta jest połączona z przygotowaniem zapytania.",
    "technical": "Witryna prezentuje kampanię produktową, katalog, gazetkę i sekcję współpracy hurtowej. Dane produktowe nie są potwierdzonym stanem magazynowym.",
    "scope": "Opublikowana koncepcja B2B z katalogiem i gazetką PDF.",
    "honest": "Marka jest wymyślona, produkty i ceny są przykładowe. Działa to, co najważniejsze w hurtowni: przeglądanie asortymentu i pobranie gazetki bez proszenia handlowca o plik. Przy prawdziwym wdrożeniu dochodzi import oferty i ustalenie, kto i jak często ją aktualizuje."
  },
  "nexio-elektro": {
    "visual": "Techniczny układ, fotografie osprzętu, czytelne kategorie i wyraźne wejście do gazetki.",
    "flow": "Instalator przegląda kategorie, wyszukuje materiały, korzysta z własnej listy i przechodzi do gazetki.",
    "technical": "Zweryfikowano działającą witrynę z wyszukiwaniem, strefą wykonawcy i listą. Gazetka produktowa ma 16 stron. Nie potwierdzono integracji ERP.",
    "scope": "Opublikowana koncepcja elektrotechnicznego katalogu i gazetki.",
    "honest": "Fikcyjna marka elektrotechniczna zrobiona po to, żeby pokazać drogę instalatora od kategorii do gazetki. Wyszukiwanie i lista działają, integracji z systemem magazynowym nie ma i nie udaję, że jest.",
    "variant": "Strona i gazetka NEXIO to jedno wdrożenie. Serwis prowadzi do szesnastostronicowej gazetki pod adresem z końcówką gazetka, a nie do osobnej strony."
  },
  "materivo": {
    "visual": "Porównanie estetyki premium i ekonomicznej dla podobnej oferty. Duże fotografie, kategorie i oferta materiałowa.",
    "flow": "Klient przechodzi przez produkty, katalog, listę materiałów i ofertę promocyjną. Dwa warianty pokazują różne sposoby prezentacji.",
    "technical": "Zweryfikowano działającą wersję premium z kategoriami, galerią produktów i gazetką. Wariant ekonomiczny jest odrębną koncepcją.",
    "scope": "Dwa kierunki prezentacji hurtowni budowlanej, premium i ekonomiczny.",
    "honest": "Koncepcja hurtowni materiałów w wersji rozbudowanej. Pokazuje układ i nawigację, nie jest sklepem: nie ma koszyka, płatności ani stanów magazynowych.",
    "variant": "MATERIVO ma dwa warianty pod jednym adresem, z przełącznikiem u góry. Ekonomiczny to jedna przewijana strona: hero, cztery działy asortymentu, galeria kategorii, pięciostronicowa gazetka otwierana w miejscu i krótki formularz zapytania. Pro to sześć osobnych ekranów z własną nawigacją: strona główna, katalog dwunastu produktów z filtrami, sortowaniem i wyszukiwarką, gazetka w rozkładówkach z przewracaniem stron i miniaturami, koszyk zapytań z ilościami i sumą orientacyjną, strona o firmie oraz kontakt. W wersji Pro produkt dodaje się do koszyka prosto z gazetki, a formularz zbiera dodatkowo firmę, miejscowość i termin. Żadna z wersji nie jest sklepem: nie ma płatności ani stanów magazynowych, a zapytanie kończy się szkicem wiadomości, którą klient wysyła sam."
  },
  "materivo-eko": {
    "visual": "Ta sama identyfikacja co w wersji Pro, ale układ jest prostszy: jedna przewijana strona z wyraźnym hero i czterema działami asortymentu.",
    "flow": "Klient przewija stronę, przegląda kategorie, otwiera pięciostronicową gazetkę w miejscu i wypełnia krótki formularz zapytania.",
    "technical": "Gazetka działa na stronie, bez pobierania pliku. Formularz przygotowuje szkic wiadomości i nie wysyła danych automatycznie. Nie ma koszyka, wyszukiwarki ani katalogu z filtrami.",
    "scope": "Opublikowana koncepcja tańszego wariantu strony hurtowni budowlanej.",
    "honest": "To tańszy wariant tej samej marki pokazowej. Dobrze pokazuje, ile da się zrobić bez rozbudowanego katalogu: jest oferta, gazetka i droga do zapytania. Nie ma koszyka, wyszukiwarki ani stanów magazynowych, bo przy tym budżecie ich nie ma sensu obiecywać.",
    "variant": "Wersja ekonomiczna to jedna strona z gazetką w środku. Wersja Pro to sześć ekranów z katalogiem, wyszukiwarką, rozkładówkową gazetką i koszykiem zapytań. Obie stoją pod jednym adresem, z przełącznikiem u góry."
  },
  "aurea-smile": {
    "visual": "Stonowane, ciemne tło i złote detale. Ostre zdjęcia medyczne, duże odstępy i sześć czytelnych specjalizacji.",
    "flow": "Pacjent wybiera potrzebę, poznaje zakres zabiegów, etapy pierwszej wizyty i informacje o gabinecie.",
    "technical": "Potwierdzono opublikowane sekcje specjalizacji, zespołu i pierwszej wizyty. Kalendarz wskazany w dokumentacji jest demonstracją, a nie systemem przyjęć.",
    "scope": "Wersja v7 koncepcyjnej witryny stomatologicznej, opublikowana na Vercel.",
    "honest": "Fikcyjna klinika stomatologiczna. Strona pokazuje, jak układać ofertę zabiegów i prowadzić pacjenta do kontaktu. Nie ma rezerwacji terminów online ani połączenia z systemem gabinetu, bo to osobny, płatny etap."
  },
  "solidom": {
    "visual": "Duże fotografie budowy i wnętrz, granatowa kolorystyka, pomarańczowe akcenty i mocna typografia Manrope. Responsywny układ, cztery etapy współpracy ze zdjęciami oraz pełnowymiarowa galeria.",
    "flow": "Użytkownik poznaje ofertę, filtruje realizacje, powiększa zdjęcia, przegląda etapy prac i FAQ, a następnie sprawdza formularz. Nagłówek i karty wchodzą płynnie, zdjęcie otwierające porusza się przy przewijaniu. Pasek postępu i aktywne etapy ułatwiają orientację.",
    "technical": "HTML, CSS i JavaScript bez frameworka. Pięć liczników animowanych przez requestAnimationFrame; IntersectionObserver uruchamia wejścia kart. Galeria ma filtry i okna dialogowe, opinie karuzelę sterowaną przyciskami, a PWA manifest, ikony i service-worker. Uwzględniono prefers-reduced-motion. Formularz sprawdza walidację, nie wysyła ani nie zapisuje danych.",
    "scope": "Finalna, zaakceptowana wersja z 14 listopada 2026 r. działająca na Vercel. Marka SOLIDOM i dane o realizacjach mają charakter poglądowy.",
    "version": "Ostateczna wersja, 14 listopada 2026",
    "sources": [
      {
        "label": "Kod na GitHubie",
        "url": "https://github.com/lukaszst-cz/zielona-marka-public-portfolio/tree/main/demos/solidom"
      },
      {
        "label": "Archiwum na Dysku Google",
        "url": "https://drive.google.com/drive/folders/1dgsa9MAx-I0d5mk6-1rtQ-u153QvVkDT"
      }
    ],
    "honest": "Fikcyjna firma budowlana. Zdjęcia i realizacje są poglądowe, ale układ strony jest zrobiony tak, jak robiłbym go dla prawdziwego wykonawcy: najpierw dowód z realizacji, potem droga do wyceny."
  },
  "solident": {
    "visual": "Jasny, ciepły projekt gabinetu: fotografie, karty usług, zrozumiałe komunikaty dla pacjenta.",
    "flow": "Od wyboru usługi i informacji o pierwszej wizycie do planowania konsultacji. Osobne sekcje pomagają przygotować się do zabiegu.",
    "technical": "Potwierdzono działający układ usług i ścieżkę pierwszej wizyty. Rejestracja z zaliczką jest elementem koncepcji, nie potwierdzonym systemem płatności.",
    "scope": "Opublikowana koncepcja gabinetu stomatologicznego.",
    "honest": "Druga koncepcja dla stomatologii, pokazująca inny, spokojniejszy kierunek niż AUREA. Ta sama uwaga: brak rezerwacji online i połączenia z systemem gabinetu."
  },
  "black-harbor": {
    "visual": "Fotograficzna strona studia auto detailingu utrzymana w ciemnej oprawie i złotych akcentach. Duże kadry pojazdów i oszczędne podpisy skupiają uwagę na efektach usług.",
    "flow": "Klient przechodzi od pakietów i przykładowych efektów do wyceny oraz kontaktu. Przejścia na stronie prowadzą do konkretnych usług zamiast rozpraszać dodatkowymi funkcjami.",
    "technical": "Opublikowana, responsywna strona prezentacyjna z formularzami i elementami interaktywnymi. Oddzielna aplikacja PWA jest dodatkiem do projektu; zapisuje dane lokalnie w przeglądarce. Workflow PDF i Excel są niezależnymi materiałami do pobrania.",
    "scope": "Główny projekt to strona WWW studia detailingu. Dodatkowo przygotowano CRM PWA z programem lojalnościowym oraz materiały Workflow 360 i Excel.",
    "honest": "Koncepcyjny projekt marki Zielona Marka, nie system przyjęty przez rzeczywiste studio. CRM nie ma centralnej bazy, prawdziwych kont, systemu rezerwacji ani fakturowania. Role służą do prezentacji planowanych uprawnień. Dane powinny być wyłącznie testowe."
  },
  "eltravia": {
    "visual": "Wyrazista identyfikacja elektrotechniczna, czytelny katalog kategorii, gazetka i układ B2B. Kolorystyka i typografia odpowiadają profesjonalnemu odbiorcy technicznemu.",
    "flow": "Instalator poznaje kategorie produktów, przechodzi do katalogu i narzędzi B2B oraz może przygotować zapytanie o materiały. Odpowiednio wydzielono nawigację i grupy asortymentu.",
    "technical": "Głównym elementem jest responsywna witryna z katalogiem, gazetką i narzędziami branżowymi. Dodatkowa aplikacja PWA pozwala sprawdzić przykładową pracę CRM, zamówień i magazynu, bez rzeczywistej integracji ERP. Workflow PDF i Excel są osobnymi plikami.",
    "scope": "Rozbudowana koncepcja strony WWW hurtowni elektrotechnicznej, uzupełniona opcjonalnym podglądem PWA oraz Workflow 360 i modelem finansowym Excel.",
    "honest": "Nieoficjalna koncepcja marki Zielona Marka. PWA nie ma rzeczywistego logowania, wspólnego magazynu między pracownikami, KSeF ani integracji z ERP. Role są demonstracyjne, stany i ceny przykładowe, a arkusz nie jest połączony z bazą danych."
  },
  "natura-studio": {
    "visual": "Spokojna typografia, jasne tło i fotografia usług wellness. Układ ułatwia zapoznanie się z zabiegami.",
    "flow": "Klientka wybiera usługę i przechodzi do ścieżki rezerwacji, a właścicielka może zobaczyć pokaz zaplecza.",
    "technical": "W katalogu potwierdzono ofertę, ścieżkę rezerwacji i demonstracyjny terminarz. Nie zweryfikowano rzeczywistego kalendarza ani płatności.",
    "scope": "Interaktywna prezentacja branży beauty w serwisie marki Zielona Marka.",
    "honest": "Wczesna koncepcja demonstracyjna, starsza od obecnego portfolio. Zostawiam ją, bo pokazuje kierunek dla małej firmy usługowej, ale nowsze prace są bliżej tego, co robię dziś."
  },
  "bistro-forma": {
    "visual": "Układ restauracyjny: fotografie dań, czytelna karta i podstawowe informacje o lokalu.",
    "flow": "Gość poznaje menu i godziny, sprawdza dojazd i wybiera kontakt lub ścieżkę rezerwacji.",
    "technical": "Katalog potwierdza menu i pokaz zaplecza. Brak potwierdzonej integracji z systemem rezerwacji stolików.",
    "scope": "Interaktywna demonstracja strony gastronomicznej.",
    "honest": "Wczesna koncepcja lokalu gastronomicznego. Menu i rezerwacja są poglądowe, nie obsługują realnych zamówień."
  },
  "dom-dobry": {
    "visual": "Karty mieszkań z naciskiem na metraż, piętro, cenę i czytelną dostępność.",
    "flow": "Kupujący porównuje lokale i przygotowuje zapytanie dotyczące wybranego mieszkania.",
    "technical": "Katalog potwierdza karty mieszkań, przykładowe statusy i zapytanie. Nie zweryfikowano połączenia z ofertą dewelopera.",
    "scope": "Interaktywna koncepcja prezentacji inwestycji mieszkaniowej.",
    "honest": "Wczesna koncepcja z początku portfolio. Dobrze pokazuje układ treści, ale wizualnie odstaje od nowszych prac."
  },
  "styk": {
    "visual": "Jedna silna fotografia, prosta typografia i telefon w najbardziej widocznym miejscu.",
    "flow": "Projekt prowadzi użytkownika od zakresu usług elektrycznych do szybkiego kontaktu.",
    "technical": "Dostępne wizualizacje na laptop i telefon. Brak potwierdzonej publikacji działającej strony.",
    "scope": "Koncepcja graficzna desktop i mobile.",
    "honest": "Koncepcja wizualna, nie wdrożona strona. Pokazuje pomysł na prowadzenie użytkownika, bez działającego zaplecza."
  },
  "glina": {
    "visual": "Minimalistyczny kierunek ceramiczny: dużo przestrzeni, spokojne liternictwo i fotografie naczyń.",
    "flow": "Oglądający poznaje wyroby pracowni, a zdjęcia stają się główną osią układu.",
    "technical": "Widoki desktop i mobile. Nie potwierdzono wdrożenia sklepu, koszyka ani płatności.",
    "scope": "Koncepcja graficzna desktop i mobile.",
    "honest": "Koncepcja wizualna fikcyjnej marki, przygotowana jako ćwiczenie kierunku, nie jako gotowy serwis."
  },
  "trop": {
    "visual": "Przejrzysta witryna weterynaryjna, w której telefon, dyżur i godziny otwarcia są na pierwszym planie.",
    "flow": "Opiekun zwierzęcia szybko znajduje pomoc, kontakt i podstawowy zakres usług.",
    "technical": "Dostępne makiety desktop i mobile. Brak potwierdzenia wdrożonej strony lub rejestracji.",
    "scope": "Koncepcja graficzna desktop i mobile.",
    "honest": "Koncepcja wizualna. Pokazuje sposób układania treści, nie jest opublikowanym wdrożeniem."
  }
};
