import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zielona-marka.pl";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/oferta`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/modernizacja-strony`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/realizacje`, changeFrequency: "monthly", priority: .85 },
    { url: `${base}/usprawnienia-firmy`, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/jak-pracuje`, changeFrequency: "monthly", priority: .75 },
    { url: `${base}/kontakt`, changeFrequency: "monthly", priority: .75 },
    { url: `${base}/strony-internetowe-marki`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/strony-dla-warsztatow`, changeFrequency: "weekly", priority: .85 },
    { url: `${base}/strony-dla-firm-uslugowych`, changeFrequency: "weekly", priority: .85 },
    { url: `${base}/strony-dla-beauty`, changeFrequency: "weekly", priority: .85 },
    { url: `${base}/chatbot-dla-firm`, changeFrequency: "weekly", priority: .85 },
    { url: `${base}/maly-crm-dla-firm`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/en`, changeFrequency: "weekly", priority: .7 },
    { url: `${base}/realizacje/natura-studio`, changeFrequency: "monthly", priority: .6 },
    { url: `${base}/realizacje/bistro-forma`, changeFrequency: "monthly", priority: .6 },
    { url: `${base}/realizacje/dom-dobry`, changeFrequency: "monthly", priority: .6 },
    { url: `${base}/polityka-prywatnosci`, changeFrequency: "yearly", priority: .2 },
  ];
}
