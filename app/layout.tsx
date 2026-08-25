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
      "https://zielona-marka-portfolio.l-st-cz.chatgpt.site",
  ),
  title: {
    default: "Zielona Marka — strony internetowe dla firm",
    template: "%s | Zielona Marka",
  },
  description:
    "Projektuję responsywne strony firmowe, landing page, portfolio i proste narzędzia internetowe. Realne ceny i jasny proces.",
  keywords: [
    "strony internetowe",
    "projektowanie stron",
    "landing page",
    "portfolio",
    "strony firmowe",
    "Zielona Marka",
  ],
  authors: [{ name: "Zielona Marka" }],
  creator: "Zielona Marka",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Zielona Marka — strony, w których marki rosną",
    description:
      "Nowoczesne strony internetowe, portfolio i narzędzia dla małych firm.",
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
      "Nowoczesne strony internetowe, portfolio i narzędzia dla małych firm.",
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
    areaServed: "PL",
    priceRange: "1900–15000 PLN",
    serviceType: [
      "Projektowanie stron internetowych",
      "Landing page",
      "Portfolio",
      "SEO techniczne",
      "Prototypy PWA",
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
