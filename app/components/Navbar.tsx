"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Upcoming Gigs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
];

const CTA_HREF = "/#contact";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation — covers browser back/forward, which never fires the
  // links' onClick. Adjusted during render rather than in an effect so it
  // doesn't cost a second render pass.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4 font-instrument">
      <div className="relative flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 sm:gap-4 sm:px-5 sm:py-2.5 md:py-1.5 shadow-[0_8px_32px_rgba(120,53,15,0.12),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/30 to-transparent"
        />
        <Link
          href="/"
          className="relative z-10 shrink-0 text-base tracking-tight italic text-neutral-900 sm:text-xl md:text-lg"
        >
          Cécile Gardens
        </Link>

        {/* Inline links only once there is room for all five; below md the
            hamburger owns them. */}
        <ul className="relative z-10 hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-full px-2.5 py-1.5 text-sm italic lg:px-3 lg:text-base text-neutral-900/80 transition-colors duration-200 hover:bg-white/40 hover:text-neutral-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <Link
            href={CTA_HREF}
            onClick={() => setOpen(false)}
            className="group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-xl border border-orange-950 bg-transparent px-4 py-2 text-sm italic text-orange-950 transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-orange-950/5 md:px-4 md:py-1.5 md:text-base"
          >
            {/* Sweep tinted to the border colour — the old white sheen only
                read against the solid fill. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-orange-950/15 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
            />
            <span className="relative z-10 whitespace-nowrap">Book a Gig</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/25 text-neutral-900 transition-colors duration-200 hover:bg-white/45 md:hidden"
          >
            {open ? (
              <X aria-hidden className="size-4.5" />
            ) : (
              <Menu aria-hidden className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative mt-2 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/40 bg-white/20 p-2 shadow-[0_8px_32px_rgba(120,53,15,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 to-transparent"
            />
            <ul className="relative z-10 flex flex-col">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-2.5 text-lg italic text-neutral-900/80 transition-colors duration-200 hover:bg-white/40 hover:text-neutral-900"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Solid closer to the menu — the pill in the bar is outline-only,
                so this is the one filled target on the panel. */}
            <Link
              href={CTA_HREF}
              onClick={() => setOpen(false)}
              className="relative z-10 mt-2 block rounded-2xl bg-orange-950 px-4 py-3 text-center text-lg italic text-orange-50 transition-colors duration-200 hover:bg-orange-900"
            >
              Book a Gig
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
