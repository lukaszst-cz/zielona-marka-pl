import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ??
      "https://zielona-marka.pl",
  ),
  title: {
    default: "Zielona Marka — strony internetowe dla firm",
    template: "%s | Zielona Marka",
  },
  description:
    "Strony internetowe, SEO lokalne, automatyzacje procesów, dashboardy KPI i panele klienta dla małych firm. Realne ceny i jasny proces.",
  keywords: [
    "strony internetowe",
    "projektowanie stron",
    "landing page",
    "portfolio",
    "strony firmowe",
    "automatyzacja procesów",
    "dashboard KPI",
    "panel klienta",
    "wizytówka Google",
    "Zielona Marka",
  ],
  authors: [{ name: "Zielona Marka" }],
  creator: "Zielona Marka",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Zielona Marka — strony, w których marki rosną",
    description:
      "Strony internetowe, automatyzacje, KPI i panele klienta dla małych firm.",
    siteName: "Zielona Marka",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "Zielona Marka — strony, w których marki rosną",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zielona Marka — strony, w których marki rosną",
    description:
      "Strony internetowe, automatyzacje, KPI i panele klienta dla małych firm.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Zielona Marka",
    description: "Projektowanie i wdrażanie stron internetowych dla firm.",
    url: "https://zielona-marka.pl",
    email: "kontakt@zielona-marka.pl",
    telephone: "+48 450 458 466",
    sameAs: ["https://github.com/lukaszst-cz"],
    areaServed: [
      "Ząbki",
      "Marki",
      "Warszawa",
      "Kobyłka",
      "Zielonka",
      "Radzymin",
      "Wołomin",
      "Nieporęt",
      "Legionowo",
      "Jabłonna",
      "Wieliszew",
      "Serock",
      "Sulejówek",
      "Halinów",
      "Dąbrówka",
      "Polska",
    ],
    priceRange: "1900–15000 PLN",
    serviceType: [
      "Projektowanie stron internetowych",
      "Landing page",
      "Portfolio",
      "SEO techniczne",
      "Prototypy PWA",
      "Automatyzacja procesów biznesowych",
      "Dashboardy KPI",
      "Panele klienta",
      "Optymalizacja Profilu Firmy Google",
    ],
  };
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
