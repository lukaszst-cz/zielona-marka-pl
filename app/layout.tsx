import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PolishTypography from "./PolishTypography";
import DemoAsystent from "./DemoAssistant";

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
      "Strony, formularze wyceny i asystenty dla warsztatów, ekip remontowych, instalatorów i lokalnych firm usługowych z Marek i okolic.",
  keywords: [
    "strony internetowe",
    "projektowanie stron",
    "strony internetowe Marki",
    "strony dla warsztatów",
    "strony dla firm remontowych",
    "formularz wyceny online",
    "asystent dla firmy",
    "SEO lokalne Marki",
    "Zielona Marka",
  ],
  authors: [{ name: "Zielona Marka" }],
  creator: "Zielona Marka",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Zielona Marka | strony i systemy zapytań dla firm usługowych",
    description:
      "Strony, formularze wyceny i asystenty dla lokalnych firm usługowych.",
    siteName: "Zielona Marka",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "Zielona Marka, strony, w których marki rosną",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zielona Marka | strony i systemy zapytań dla firm usługowych",
    description:
      "Strony, formularze wyceny i asystenty dla lokalnych firm usługowych.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      {
        url: "/logo-zielona-marka-transparent-v1.png",
        type: "image/png",
      },
    ],
    shortcut: "/logo-zielona-marka-transparent-v1.png",
    apple: "/logo-zielona-marka-transparent-v1.png",
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
    description: "Strony internetowe, formularze wyceny i asystenty dla lokalnych firm usługowych.",
    url: "https://zielona-marka.pl",
    email: "kontakt@zielona-marka.pl",
    telephone: "+48 450 458 466",
    sameAs: [
      "https://www.facebook.com/StudioGraficzneZielonaMarka",
      "https://www.instagram.com/zielona.marka.pl/",
      "https://github.com/lukaszst-cz",
    ],
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
    ],
    priceRange: "2490–15000 PLN",
    serviceType: [
      "Projektowanie stron internetowych",
      "Strony dla warsztatów i detailingu",
      "Strony dla firm remontowych i instalatorów",
      "Formularze wyceny online",
      "Asystenty dla firm usługowych",
      "SEO techniczne",
      "Optymalizacja Profilu Firmy Google",
      "Modernizacja stron internetowych",
      "Opieka nad stronami internetowymi",
    ],
  };
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <PolishTypography />
        <DemoAsystent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
