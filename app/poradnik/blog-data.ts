export type BlogCategory = "www" | "seo" | "dtp" | "procesy";

export type BlogArticle = {
  href: string;
  title: string;
  summary: string;
  category: BlogCategory;
  publishedAt: string;
  minutes: number;
  featured?: boolean;
};

export const blogCategories: { id: "all" | BlogCategory; label: string; description: string }[] = [
  { id: "all", label: "Wszystkie", description: "Cała biblioteka wiedzy" },
  { id: "www", label: "Strony WWW", description: "Budowa, modernizacja i koszty stron" },
  { id: "seo", label: "SEO i widoczność", description: "Google, zapytania i lokalni klienci" },
  { id: "dtp", label: "DTP i druk", description: "Pliki produkcyjne, katalogi i gazetki" },
  { id: "procesy", label: "Obsługa klientów", description: "Formularze, CRM i automatyzacje" },
];

export const blogArticles: BlogArticle[] = [
  {
    href: "/poradnik/ile-kosztuje-projekt-gazetki",
    title: "Ile kosztuje projekt gazetki reklamowej?",
    summary: "Dlaczego dwie gazetki o tej samej liczbie stron mogą kosztować inaczej? Wyjaśniam wpływ zdjęć, materiałów i kolejnych wydań.",
    category: "dtp",
    publishedAt: "2026-10-14T18:00:00+02:00",
    minutes: 7,
    featured: true,
  },
  {
    href: "/poradnik/jak-przygotowac-pdf-do-druku",
    title: "Jak przygotować PDF do drukarni? Spady, CMYK i PDF/X",
    summary: "Zanim wyślesz plik do drukarni, sprawdź spady, czcionki, zdjęcia i kolory — oto lista rzeczy, które łatwo przeoczyć.",
    category: "dtp",
    publishedAt: "2026-10-14T17:00:00+02:00",
    minutes: 6,
  },
  {
    href: "/poradnik/jak-uporzadkowac-zapytania-klientow",
    title: "Jak nie gubić zapytań od klientów?",
    summary: "Wiadomość w skrzynce, telefon i kartka na biurku? Zobacz, jak pilnować odpowiedzi bez dużego programu.",
    category: "procesy",
    publishedAt: "2026-10-14T16:00:00+02:00",
    minutes: 6,
  },
  {
    href: "/poradnik/co-powinna-miec-strona-firmy-uslugowej",
    title: "Co powinna mieć strona firmy usługowej?",
    summary: "Co klient powinien zobaczyć najpierw? Oferta, lokalizacja, przykłady pracy i łatwy kontakt — w dobrej kolejności.",
    category: "www",
    publishedAt: "2026-10-07T20:20:00+02:00",
    minutes: 9,
  },
  {
    href: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
    title: "Co powinna zawierać strona salonu beauty?",
    summary: "Zabiegi, ceny, rezerwacje i vouchery — co pomaga klientce lub klientowi spokojnie wybrać wizytę?",
    category: "www",
    publishedAt: "2026-10-07T20:15:00+02:00",
    minutes: 9,
  },
  {
    href: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac",
    title: "Co powinna zawierać strona warsztatu?",
    summary: "Kierowca szuka terminu i telefonu, nie skomplikowanego menu. Sprawdź, czego potrzebuje strona warsztatu.",
    category: "www",
    publishedAt: "2026-10-07T19:40:00+02:00",
    minutes: 9,
  },
  {
    href: "/poradnik/ile-kosztuje-strona-dla-malej-firmy",
    title: "Ile kosztuje strona internetowa dla małej firmy?",
    summary: "Cena projektu to nie wszystko. Porównuję prostą wizytówkę i pełną stronę — razem z kosztem utrzymania.",
    category: "www",
    publishedAt: "2026-09-30T08:00:00+02:00",
    minutes: 8,
  },
  {
    href: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan",
    title: "Dlaczego strona firmy nie przynosi zapytań?",
    summary: "Masz odwiedziny, ale mało wiadomości? Oto siedem miejsc, w których klient może zrezygnować z kontaktu.",
    category: "seo",
    publishedAt: "2026-09-30T08:00:00+02:00",
    minutes: 7,
  },
];

export function categoryName(id: BlogCategory): string {
  return blogCategories.find((c) => c.id === id)?.label ?? "Poradnik";
}
