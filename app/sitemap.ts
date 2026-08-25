import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://zielona-marka-portfolio.l-st-cz.chatgpt.site"; return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/polityka-prywatnosci`, changeFrequency: "yearly", priority: .2 }]; }
