"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const skippedTags = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);
const shortWord = /(^|[\s([{'„])([AaIiOoUuWwZz]) (?=[\p{L}\d])/gu;

export default function PolishTypography() {
  const pathname = usePathname();

  useEffect(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let current = walker.nextNode();

    while (current) {
      const parent = current.parentElement;
      if (parent && !skippedTags.has(parent.tagName) && current.nodeValue?.match(shortWord)) textNodes.push(current as Text);
      current = walker.nextNode();
    }

    textNodes.forEach((node) => { node.nodeValue = node.nodeValue?.replace(shortWord, "$1$2\u00A0") ?? null; });
  }, [pathname]);

  return null;
}
