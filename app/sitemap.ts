import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://zielona-marka.sites.openai.com"; return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/polityka-prywatnosci`, changeFrequency: "yearly", priority: .2 }]; }
