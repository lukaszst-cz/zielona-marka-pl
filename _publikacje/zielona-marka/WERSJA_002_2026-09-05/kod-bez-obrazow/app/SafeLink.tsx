"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type SafeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Zwykły link dokumentu. Pozostawia nawigację niezawodną także wtedy,
 * gdy przeglądarka nie obsługuje przejść po stronie klienta.
 */
export default function SafeLink({ href, children, ...props }: SafeLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
