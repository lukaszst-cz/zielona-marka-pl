import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zielona-marka.pl";
  const localCities = ["zabki", "zielonka", "kobylka", "wolomin", "radzymin", "targowek", "bialoleka", "warszawa"];
  return [
    { url: base, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/oferta`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .9 },
    { url: `${base}/opieka-nad-strona`, changeFrequency: "monthly", priority: .7 },
    { url: `${base}/przyklady-zaplecza`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .7 },
    { url: `${base}/modernizacja-strony`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/realizacje`, changeFrequency: "monthly", priority: .85 },
    { url: `${base}/realizacje/transportflow`, lastModified: new Date("2026-10-05"), changeFrequency: "monthly", priority: .72 },
    { url: `${base}/praktyczne-narzedzia`, lastModified: new Date("2026-10-05"), changeFrequency: "monthly", priority: .8 },
    { url: `${base}/projekty-flow`, lastModified: new Date("2026-10-08"), changeFrequency: "monthly", priority: .72 },
    { url: `${base}/poradnik`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .82 },
    { url: `${base}/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .8 },
    { url: `${base}/poradnik/ile-kosztuje-strona-dla-malej-firmy`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .8 },
    { url: `${base}/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .82 },
    { url: `${base}/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .82 },
    { url: `${base}/poradnik/co-powinna-miec-strona-firmy-uslugowej`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .82 },
    { url: `${base}/usprawnienia-firmy`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .8 },
    { url: `${base}/jak-pracuje`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .75 },
    { url: `${base}/kontakt`, changeFrequency: "monthly", priority: .75 },
    { url: `${base}/strony-internetowe`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .92 },
    { url: `${base}/strony-internetowe-marki`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .9 },
    { url: `${base}/strony-dla-warsztatow`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .85 },
    { url: `${base}/strony-dla-firm-uslugowych`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .85 },
    { url: `${base}/strony-dla-beauty`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .85 },
    { url: `${base}/asystent-zapytan`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .85 },
    { url: `${base}/maly-crm-dla-firm`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/en`, lastModified: new Date("2026-10-07"), changeFrequency: "weekly", priority: .7 },
    { url: `${base}/realizacje/natura-studio`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .6 },
    { url: `${base}/realizacje/bistro-forma`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .6 },
    { url: `${base}/realizacje/dom-dobry`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: .6 },
    ...localCities.map(city => ({ url: `${base}/strony-internetowe/${city}`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly" as const, priority: .82 })),
  ];
}
