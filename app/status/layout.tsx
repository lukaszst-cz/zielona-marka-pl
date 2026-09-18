import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function StatusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
