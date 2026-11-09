import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        // Nazwy plików routingu (app/.../page.tsx) wyciagane przez roboty z manifestow JS.
        // Nie sa to adresy stron; crawlowanie ich generuje wylacznie bledy 404.
        "/*/page$",
        "/*[",
        "/*]",
      ],
    }],
    sitemap: "https://zielona-marka.pl/sitemap.xml",
  };
}
