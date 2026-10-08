import Link from "../SafeLink";
import { SiteHeader, SiteFooter } from "../SiteChrome";
import { CookieSettingsLink } from "../CookieConsent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych z formularzy Zielonej Marki, plikach cookie i kontakcie w sprawie prywatności.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <><SiteHeader /><main className="zm-public legal shell">
      <span className="section-no">INFORMACJE PRAWNE · AKTUALIZACJA 08.10.2026</span>
      <h1>Polityka prywatności</h1>
      <p className="legal-lead">
        Krótko i konkretnie: zbieramy tylko dane potrzebne do odpowiedzi na
        zapytanie lub realizacji projektu. Nie sprzedajemy danych i nie używamy
        reklamowych plików cookie.
      </p>
      <section>
        <h2>1. Kto administruje danymi</h2>
        <p>
          Administratorem danych osobowych jest Łukasz Staniewicz, działający pod
          marką Zielona Marka. W sprawach związanych z danymi osobowymi napisz na
          <a href="mailto:kontakt@zielona-marka.pl"> kontakt@zielona-marka.pl</a>
          {" lub zadzwoń pod "}
          <a href="tel:+48450458466">+48 450 458 466</a>.
        </p>
        <h2>2. Jakie dane zbieramy</h2>
        <p>
          Formularze mogą zawierać imię, adres e-mail oraz wiadomość. Opcjonalnie
          możesz podać także numer telefonu, nazwę firmy, adres obecnej strony,
          rodzaj projektu lub usługi, oczekiwany efekt, planowany termin,
          informacje o sprzedaży lub płatnościach oraz orientacyjny budżet.
          W Strefie Klienta kod projektu służy wyłącznie do wyświetlenia
          informacji przypisanych do konkretnego zlecenia.
        </p>
        <h2>3. Po co i na jakiej podstawie</h2>
        <p>
          Dane z formularza przetwarzamy, aby odpowiedzieć na zapytanie i
          przygotować ofertę na podstawie działań przed zawarciem umowy
          podejmowanych na Twoje żądanie. Jeżeli dojdzie do współpracy, dane są
          wykorzystywane także do realizacji umowy i rozliczeń. Ograniczony zakres
          danych może być zachowany również dla obrony przed roszczeniami.
        </p>
        <h2>4. Gdzie dane trafiają</h2>
        <p>
          Dane z formularza są zapisywane w bazie danych używanej przez stronę,
          działającą w infrastrukturze Cloudflare. Dostęp do Studio pracy ma
          wyłącznie właściciel marki po zalogowaniu. Jeżeli włączone są
          powiadomienia e-mail o nowych zapytaniach, dane potrzebne do takiego
          powiadomienia mogą być przekazane do usługi Resend obsługującej wysyłkę
          wiadomości. Dane nie są sprzedawane ani przekazywane do systemów
          reklamowych.
        </p>
        <h2>5. Czas przechowywania</h2>
        <p>
          Zapytanie bez zawartej umowy przechowujemy maksymalnie przez 12 miesięcy
          od zakończenia korespondencji, chyba że wcześniej poprosisz o usunięcie
          danych. Dane związane z umową lub rozliczeniami mogą być przechowywane
          dłużej, jeśli wymagają tego przepisy lub jest to potrzebne do ochrony
          roszczeń.
        </p>
        <h2>6. Twoje prawa</h2>
        <p>
          Możesz zażądać dostępu do danych, ich sprostowania, usunięcia,
          ograniczenia przetwarzania, przeniesienia danych lub wnieść sprzeciw.
          zależnie od podstawy przetwarzania. Masz też prawo złożyć skargę do
          Prezesa Urzędu Ochrony Danych Osobowych.
        </p>
        <h2>7. Cookie, analityka i bezpieczeństwo</h2>
        <p>
          Po wyrażeniu zgody strona korzysta z Google Analytics 4, aby mierzyć
          odwiedziny, źródła ruchu, oglądane podstrony i zdarzenia prowadzące do
          kontaktu, na przykład kliknięcie telefonu lub wysłanie formularza.
          Nie przekazujemy do Google Analytics treści pól formularza, adresu
          e-mail, imienia ani wiadomości. Pomiar nie służy do reklam ani
          profilowania użytkowników. Zgoda jest dobrowolna i można ją zmienić
          w każdej chwili.
        </p>
        <p>
          Decyzja o zgodzie na analitykę jest zapisywana lokalnie w przeglądarce.
          Po zgodzie Google Analytics może ustawić własne pliki cookie analityczne;
          po wycofaniu zgody strona próbuje usunąć pliki analityczne zaczynające
          się od „_ga”. Studio pracy używa technicznej sesji potrzebnej do
          logowania. Cloudflare może przetwarzać podstawowe dane techniczne
          niezbędne do działania i ochrony strony, takie jak logi żądań.
        </p>
        <p><CookieSettingsLink /></p>
        <h2>8. Zmiany dokumentu</h2>
        <p>
          Polityka będzie aktualizowana przed uruchomieniem nowych funkcji, które
          wpływają na przetwarzanie danych, na przykład newslettera, płatności
          lub reklam.
        </p>
      </section>
      <p className="legal-note">
        Dokument opisuje obecne działanie strony. W przypadku rozpoczęcia
        działalności gospodarczej, obsługi większej liczby klientów lub wdrożenia
        dodatkowych usług warto poddać go indywidualnej weryfikacji prawnej.
      </p>
      <Link className="button" href="/">Wróć na stronę <span>←</span></Link>
    </main><SiteFooter /></>
  );
}
