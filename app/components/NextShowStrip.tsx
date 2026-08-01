"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { formatShowDateShort, type Show } from "@/app/shows/format";

const MotionLink = motion.create(Link);

type NextShowStripProps = {
  /** `null` whenever nothing is booked — see the early return below. */
  show: Show | null;
  variants?: Variants;
};

/**
 * One-line teaser for the soonest gig, sitting between the hero copy and the
 * CTAs. Deliberately not a carousel: the hero already competes for attention,
 * and arrows to reveal gig two would lose to the /shows page anyway.
 */
export default function NextShowStrip({ show, variants }: NextShowStripProps) {
  // Renders nothing when the calendar is empty rather than a "no shows" state —
  // an empty slot reads as a quiet season, an empty *message* reads as inactive.
  if (!show) return null;

  return (
    <MotionLink
      variants={variants}
      href="/shows"
      aria-label={`Upcoming show: ${show.title}, ${formatShowDateShort(show)}${
        show.venue ? ` at ${show.venue}` : ""
      }. See all shows.`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group mt-4 flex max-w-full items-center gap-2 self-center rounded-full border border-orange-900/25 bg-white/25 py-1.5 pr-3 pl-1.5 text-xs text-orange-950 shadow-[0_8px_24px_rgba(120,53,15,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:border-orange-900/40 hover:bg-white/40 sm:gap-2.5 sm:py-2 sm:pr-4 sm:pl-2 sm:text-sm md:self-start">
      <span className="shrink-0 rounded-full bg-orange-950 px-2.5 py-1 text-[0.625rem] tracking-[0.12em] text-orange-50 uppercase sm:text-[0.6875rem]">
        Next show
      </span>

      {/* min-w-0 lets the venue truncate instead of pushing the pill wider than
          the viewport on a narrow phone. */}
      <span className="min-w-0 truncate font-medium tracking-tight">
        {formatShowDateShort(show)}
        {show.venue && (
          <span className="font-light text-orange-950/70"> · {show.venue}</span>
        )}
      </span>

      <ArrowUpRight
        aria-hidden
        className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4"
      />
    </MotionLink>
  );
}
