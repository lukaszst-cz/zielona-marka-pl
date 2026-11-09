import { permanentRedirect } from "next/navigation";

/**
 * Dawny adres galerii zostaje zachowany dla linków zewnętrznych i SEO.
 * Karty projektów pod /realizacje/[slug] nadal działają jako oddzielne opisy.
 */
export default function LegacyRealizationsPage() {
  permanentRedirect("/portfolio");
}
