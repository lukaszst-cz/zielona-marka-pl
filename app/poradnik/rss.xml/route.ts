const items = [
  {
    title: "Dlaczego strona firmy nie przynosi zapytań? 7 najczęstszych przyczyn",
    path: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan",
    description: "Siedem częstych przeszkód oraz kolejność poprawek przed inwestycją w reklamę.",
    date: "Wed, 30 Sep 2026 08:00:00 +0200",
  },
  {
    title: "Ile kosztuje strona internetowa dla małej firmy?",
    path: "/poradnik/ile-kosztuje-strona-dla-malej-firmy",
    description: "Trzy praktyczne warianty, czynniki wpływające na cenę oraz koszty płatne osobno.",
    date: "Wed, 30 Sep 2026 08:00:00 +0200",
  },
  {
    title: "Co powinna zawierać strona internetowa warsztatu?",
    path: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac",
    description: "Usługi, szybki telefon, lokalizacja, formularz z danymi auta, zdjęcia, opinie i lokalna widoczność — praktyczna lista dla warsztatu.",
    date: "Wed, 07 Oct 2026 19:40:00 +0200",
  },
  {
    title: "Co powinna zawierać strona internetowa salonu beauty?",
    path: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
    description: "Oferta, cennik, efekty zabiegów, rezerwacja, przygotowanie do wizyty, lokalna widoczność oraz vouchery i produkty.",
    date: "Wed, 07 Oct 2026 20:15:00 +0200",
  },
] as const;

function xml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character] ?? character);
}

export function GET() {
  const base = "https://zielona-marka.pl";
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Zielona Marka, poradniki dla małych firm</title>
<link>${base}/poradnik</link>
<description>Praktycznie o stronach internetowych, widoczności i obsłudze zapytań.</description>
<language>pl-PL</language>
${items.map(item => `<item><title>${xml(item.title)}</title><link>${base}${item.path}</link><guid isPermaLink="true">${base}${item.path}</guid><description>${xml(item.description)}</description><pubDate>${item.date}</pubDate></item>`).join("\n")}
</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
