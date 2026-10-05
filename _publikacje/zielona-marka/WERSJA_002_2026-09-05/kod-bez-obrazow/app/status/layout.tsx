import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status projektu",
  robots: { index: false, follow: false },
};

export default function StatusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
