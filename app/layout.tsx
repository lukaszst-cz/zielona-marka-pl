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
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-zm-language") === "en" ? "en" : "pl";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zielona-marka.pl/#business",
        name: "Zielona Marka",
        description: "Strony internetowe, formularze wyceny i proste systemy dla lokalnych firm usługowych.",
        url: "https://zielona-marka.pl",
        logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.webp",
        image: "https://zielona-marka.pl/og.jpg",
        email: "kontakt@zielona-marka.pl",
        telephone: "+48 450 458 466",
        sameAs: [
          "https://www.facebook.com/zielonamarka",
          "https://www.instagram.com/zielona.marka.pl/",
          "https://github.com/lukaszst-cz",
        ],
        founder: { "@id": "https://zielona-marka.pl/#lukasz-st-cz" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "kontakt@zielona-marka.pl",
          telephone: "+48 450 458 466",
          availableLanguage: "pl",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://zielona-marka.pl/#website",
        url: "https://zielona-marka.pl",
        name: "Zielona Marka",
        inLanguage: ["pl-PL", "en"],
        publisher: { "@id": "https://zielona-marka.pl/#business" },
      },
      {
        "@type": "Person",
        "@id": "https://zielona-marka.pl/#lukasz-st-cz",
        name: "Łukasz St-cz",
        url: "https://zielona-marka.pl/jak-pracuje",
        worksFor: { "@id": "https://zielona-marka.pl/#business" },
      },
      {
        "@type": "Service",
        "@id": "https://zielona-marka.pl/#web-services",
        name: "Strony internetowe i systemy zapytań dla firm usługowych",
        provider: { "@id": "https://zielona-marka.pl/#business" },
        areaServed: { "@type": "Country", name: "Polska" },
        serviceType: [
          "Projektowanie stron internetowych",
          "Modernizacja stron internetowych",
          "Formularze wyceny online",
          "Mały CRM dla firm",
          "Asystent zapytań",
          "SEO techniczne",
          "Opieka nad stroną internetową",
        ],
        url: "https://zielona-marka.pl/oferta",
      },
    ],
  };
  return (
    <html lang={language}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "window['ga-disable-G-B3QJ910M2Q']=true;",
          }}
        />
      </head>
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
