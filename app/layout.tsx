import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./botanical-brand.css";
import "./brand-system.css";
import "./fern-public.css";
import "./site-refinements.css";
import "./total-cost.css";
import "./blog.css";
import "./full-site-builder.css";
import "./navigation-refresh.css";
import "./premium-polish.css";
import "./process-standard.css";
import "./premium-clarity.css";
import "./premium-final-review.css";
import "./qa-integrated.css";
import "./blog-layout-unification.css";
import "./navigation-glass.css";
import "./guide-article-layout.css";
import "./blog-contrast-polish.css";
import "./ui-consistency-202610.css";
import "./site-design-system.css";
import "./legal-information.css";
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
  authors: [{ name: "Łukasz Staniewicz", url: "/jak-pracuje" }],
  creator: "Łukasz Staniewicz",
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
        "@type": "ProfessionalService",
    "@id": "https://zielona-marka.pl/#business",
    name: "Zielona Marka",
    description: "Tworzymy nowoczesne i szybkie strony internetowe dla firm usługowych oraz wdrażamy automatyzacje biznesowe, proste systemy CRM, formularze wyceny i czatboty AI. Pomagamy lokalnym przedsiębiorcom zdobywać więcej klientów z sieci na terenie Marek, Warszawy, Nowego Dworu Mazowieckiego oraz całego województwa mazowieckiego.",
    url: "https://zielona-marka.pl",
    logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.webp",
    image: "https://zielona-marka.pl/og.jpg",
    email: "kontakt@zielona-marka.pl",
    telephone: "+48450458466",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marki",
      postalCode: "05-270",
      addressRegion: "Mazowieckie",
      addressCountry: "PL",
    },
    hasMap: "https://www.google.com/maps?cid=2599974986214970387",
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
      "Nowy Dwór Mazowiecki",
      "Łomianki",
      "Otwock",
      "Pruszków",
      "Piaseczno",
      "Grodzisk Mazowiecki",
      { "@type": "AdministrativeArea", name: "Województwo mazowieckie" },
    ],
    priceRange: "od 899 PLN netto",
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
      "DTP i przygotowanie plików do druku",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tworzenie stron WWW dla firm usługowych" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modernizacja i odświeżanie stron internetowych" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formularze wyceny i zbierania zapytań online" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wdrożenia prostego systemu CRM dla małych firm" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatyzacja procesów biznesowych i powiadomień" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wirtualny asystent i chatboty AI na stronę WWW" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Optymalizacja wizytówek Google i lokalne SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gazetki promocyjne online i katalogi ofertowe PDF" } },
    ],
    founder: { "@id": "https://zielona-marka.pl/#lukasz-st-cz" },
      },
      {
        "@type": "WebSite",
        "@id": "https://zielona-marka.pl/#website",
        name: "Zielona Marka",
        url: "https://zielona-marka.pl",
        inLanguage: ["pl-PL", "en"],
        publisher: { "@id": "https://zielona-marka.pl/#business" },
      },
      {
        "@type": "Person",
        "@id": "https://zielona-marka.pl/#lukasz-st-cz",
        name: "Łukasz Staniewicz",
        url: "https://zielona-marka.pl/jak-pracuje",
        worksFor: { "@id": "https://zielona-marka.pl/#business" },
      },
      {
        "@type": "Service",
        "@id": "https://zielona-marka.pl/#web-services",
        name: "Strony internetowe, projektowanie DTP i systemy obsługi klientów",
        provider: { "@id": "https://zielona-marka.pl/#business" },
        areaServed: { "@type": "Country", name: "Polska" },
        serviceType: ["Projektowanie stron internetowych", "Modernizacja stron WWW", "DTP i prepress", "Formularze wyceny", "Mały CRM", "Asystent zapytań"],
        url: "https://zielona-marka.pl/oferta",
      },
    ],

  };
  return (
    <html lang={language}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "window['ga-disable-G-B3QJ910M2Q']=true;window['ga-disable-G-CYFQ326JRF']=true;",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <PolishTypography />
        <CookieConsent />
        <SiteTracking />
      </body>
    </html>
  );
}
