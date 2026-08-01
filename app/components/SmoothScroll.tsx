"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Clears the fixed navbar when landing on an anchored section.
const ANCHOR_OFFSET = -96;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect users who ask the OS for reduced motion — skip smoothing entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch devices already have native momentum; smoothing it fights the OS.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Lenis drives scrollTop itself, so a native hash jump gets overwritten on
    // the next frame. Anchor navigation has to go through lenis.scrollTo.
    const scrollToHash = (hash: string, immediate = false) => {
      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET, immediate });
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      // Only intercept same-page anchors; let Next handle real navigation.
      if (url.pathname !== window.location.pathname || !url.hash) return;

      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHash(url.hash);
    };

    document.addEventListener("click", onClick);

    // Arriving from another route (/about → /#contact) lands with the hash
    // already set, so replay it once the section has rendered.
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, true));
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
