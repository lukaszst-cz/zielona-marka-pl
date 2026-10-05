import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Prywatne studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}
