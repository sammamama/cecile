import Link from "next/link";
import { COWGIRLS_TRACK_URL } from "./contact/socials";

/**
 * Fixed "new song" tab hanging off the bottom of the navbar on the home page.
 * The top offsets are exactly the navbar's bottom edge (70px below sm, 88px
 * from sm), so the two join with no gap. Re-measure if the navbar changes.
 * The side padding keeps the tab inside the flat part of the navbar pill,
 * clear of its rounded ends.
 */
export default function PresaveStrip() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[70px] sm:top-[88px] z-40 flex justify-center px-12 sm:px-14 font-instrument">
      <Link
        href={COWGIRLS_TRACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto relative flex w-full max-w-2xl items-center justify-between gap-3 rounded-t-none rounded-b-3xl border border-t-0 border-orange-100/20 bg-orange-950/90 px-4 pt-3 pb-2 text-sm italic text-orange-50 shadow-[0_8px_32px_rgba(120,53,15,0.25)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200 hover:bg-orange-950 sm:px-5 sm:text-base"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-b-3xl bg-linear-to-b from-white/10 to-transparent"
        />
        <span className="relative z-10 shrink-0">Stream my new song</span>
        <span className="relative z-10 min-w-0 truncate underline underline-offset-4 decoration-orange-50/60 transition-colors duration-200 group-hover:decoration-orange-50">
          cowgirls ride away
        </span>
      </Link>
    </div>
  );
}
