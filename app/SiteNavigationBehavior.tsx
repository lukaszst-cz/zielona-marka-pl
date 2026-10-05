"use client";
import { useEffect } from "react";

export default function SiteNavigationBehavior() {
  useEffect(() => {
    const navigation = document.querySelector('.zm-nav');
    if (!navigation) return;
    const menus = Array.from(navigation.querySelectorAll<HTMLDetailsElement>('details'));
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      menus.forEach(menu => {
        if (!menu.contains(target) || target.closest('a')) menu.open = false;
      });
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const openMenu = menus.find(menu => menu.open);
      if (openMenu) {
        openMenu.open = false;
        openMenu.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  return null;
}
