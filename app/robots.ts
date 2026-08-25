import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/status", "/demo"] }], sitemap: "https://zielona-marka.pl/sitemap.xml" }; }
