"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type AboutButtonProps = {
  variants?: Variants;
  label?: string;
  href?: string;
};

const MotionLink = motion.create(Link);

// Secondary CTA next to StreamButton: same pill geometry, but glass instead of
// solid so it reads as the quieter of the two actions.
export default function AboutButton({
  variants,
  label = "About Me",
  href = "/about",
}: AboutButtonProps) {
  return (
    <MotionLink
      variants={variants}
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[40px] bg-white/25 px-4 py-3 text-sm text-orange-950 shadow-[0_8px_24px_rgba(120,53,15,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white/40 sm:px-6 sm:py-4 sm:text-base"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[40px] bg-linear-to-b from-white/50 to-transparent"
      />
      {/* Light sweep on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/60 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
      />
      <span className="z-10 font-medium tracking-tight">{label}</span>
      <ArrowUpRight className="z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </MotionLink>
  );
}
