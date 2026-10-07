"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import BackButton from "./ui/button/BackButton";

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
      {/* Every page but home gets a back button. Below lg it sits beside the
          pill in this row; from lg there is room for it in the page's top-left
          corner, vertically centred on the 72px pill (16px + 36px - 20px). */}
      <div className="flex w-full max-w-3xl items-center gap-2">
        {pathname !== "/" && (
          <BackButton className="lg:fixed lg:top-8 lg:left-6" />
        )}
        <div className="relative flex w-full min-w-0 max-w-3xl items-center justify-between gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 sm:gap-6 sm:px-6 sm:py-3 shadow-[0_8px_32px_rgba(120,53,15,0.12),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/30 to-transparent"
          />
          <Link
            href="/"
            className="relative z-10 shrink-0 text-base tracking-tight italic text-neutral-900 sm:text-xl"
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
                  className="rounded-full px-3 py-2 text-base italic lg:px-4 lg:text-lg text-neutral-900/80 transition-colors duration-200 hover:bg-white/40 hover:text-neutral-900"
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
              className="group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-xl border border-orange-900/20 bg-orange-950 px-3 py-1.5 text-xs italic text-orange-50 shadow-[0_4px_16px_rgba(120,53,15,0.35)] transition-transform duration-200 hover:scale-[1.03] sm:px-5 sm:py-2 sm:text-lg"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/25 to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
              />
              <span className="relative z-10 whitespace-nowrap">
                Book a Gig
              </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
