import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./botanical-brand.css";
import "./brand-system.css";
import "./fern-public.css";
import "./site-refinements.css";
import PolishTypography from "./PolishTypography";
import CookieConsent from "./CookieConsent";
import SiteTracking from "./SiteTracking";

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
    default: "Strony internetowe dla firm usługowych | Zielona Marka",
    template: "%s | Zielona Marka",
  },
    description:
      "Strony, formularze wyceny i automatyczny asystent dla warsztatów, ekip remontowych, instalatorów i lokalnych firm usługowych z Warszawy, Targówka i okolic.",
  keywords: [
    "strony internetowe",
    "projektowanie stron",
    "strony internetowe Targówek",
    "strony internetowe Warszawa",
    "strony internetowe Marki",
    "strony dla warsztatów",
    "strony dla firm remontowych",
    "formularz wyceny online",
    "asystent zapytań dla firmy",
    "SEO lokalne Warszawa",
    "Zielona Marka",
  ],
  authors: [{ name: "Zielona Marka" }],
  creator: "Zielona Marka",
  openGraph: {
    type: "website",
    url: "/",
    locale: "pl_PL",
    title: "Zielona Marka | strony i systemy zapytań dla firm usługowych",
    description:
      "Strony, formularze wyceny i proste systemy dla lokalnych firm usługowych.",
    siteName: "Zielona Marka",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Zielona Marka, strony, w których marki rosną",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zielona Marka | strony i systemy zapytań dla firm usługowych",
    description:
      "Strony, formularze wyceny i proste systemy dla lokalnych firm usługowych.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-zielona-marka.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    shortcut: "/favicon-zielona-marka.png",
    apple: "/logo-zielona-marka-transparent-v1.webp",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://zielona-marka.pl/#business",
    name: "Zielona Marka",
    description: "Strony internetowe, formularze wyceny i proste systemy dla lokalnych firm usługowych.",
    url: "https://zielona-marka.pl",
    logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.webp",
    image: "https://zielona-marka.pl/og.jpg",
    email: "kontakt@zielona-marka.pl",
    telephone: "+48 450 458 466",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/zielonamarka",
      "https://www.instagram.com/zielona.marka.pl/",
      "https://github.com/lukaszst-cz",
    ],
    areaServed: [
      "Ząbki",
      "Marki",
      "Warszawa",
      "Targówek",
      "Białołęka",
      "Bródno",
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
    ],
    priceRange: "1449–15000 PLN",
    serviceType: [
      "Projektowanie stron internetowych",
      "Strony dla warsztatów i detailingu",
      "Strony dla firm remontowych i instalatorów",
      "Formularze wyceny online",
      "Automatyczni asystenci dla firm usługowych",
      "SEO techniczne",
      "Optymalizacja Profilu Firmy Google",
      "Modernizacja stron internetowych",
      "Opieka nad stronami internetowymi",
    ],
    founder: { "@type": "Person", "@id": "https://zielona-marka.pl/#lukasz-staniewicz", name: "Łukasz Staniewicz", url: "https://zielona-marka.pl/jak-pracuje" },
  };
  return (
    <html lang={(await headers()).get("x-zm-language") === "en" ? "en" : "pl"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <PolishTypography />
        <CookieConsent />
        <SiteTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
