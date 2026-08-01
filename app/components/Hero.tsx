"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import StreamButton from "./ui/button/StreamButton";
import AboutButton from "./ui/button/AboutButton";
import NextShowStrip from "./NextShowStrip";
import type { Show } from "@/app/shows/format";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

// Split out of page.tsx so the page itself can stay a Server Component and
// fetch the calendar; everything animated still needs to run on the client.
export default function Hero({ nextShow }: { nextShow: Show | null }) {
  return (
    <div className="relative flex justify-center items-center w-full h-screen overflow-hidden select-none">
      <div className="relative inset-0 w-full h-full ">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(0deg,_rgba(26,113,161,0.3)_0%,_rgba(255,255,255,0)_80%)] -z-10"></div>
        <Image
          src="/hero.png"
          alt="Cécile Gardens, country singer-songwriter, with her guitar"
          width={600}
          height={1080}
          priority
          className="pointer-events-none absolute right-0 sm:right-[5%] sm:h-[70%] bottom-0 h-[65%] md:h-[75%] lg:h-[110%] w-auto z-30"
        />
        <Image
          src="/bg-5.png"
          fill
          // Decorative only — an empty alt keeps it out of the accessibility
          // tree instead of adding noise to every screen reader pass.
          alt=""
          className="object-cover scale-125 translate-y-[10%] md:scale-100 md:translate-y-0 md:object-[50%_25%]"
        />
      </div>
      <motion.div
        className="absolute flex flex-col md:ml-20 justify-center items-center md:items-start inset-0 w-full md:w-[60%] lg:w-[50%] h-screen px-6 pb-32 md:pb-0 md:pl-12 md:px-0 z-20 leading-tight text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* h1/p rather than divs — the page had no heading at all, so crawlers
            had nothing to read the site's subject from. Purely semantic; the
            classes are unchanged so it renders identically. */}
        <motion.h1
          variants={itemVariants}
          className="relative group [font-family:var(--font-libertinus)] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-normal tracking-tight italic text-orange-900"
        >
          Cécile Gardens
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="[font-family:var(--font-instrument-serif)] text-lg pl-3 sm:text-xl md:text-2xl lg:text-3xl font-extralight text-black italic tracking-wide sm:tracking-widest sm:[word-spacing:1rem]"
        >
          Country Singer/Songwriter
        </motion.p>

        {/* Collapses to nothing when no gig is booked, leaving the hero exactly
            as it was before. */}
        <NextShowStrip show={nextShow} variants={itemVariants} />

        <motion.div
          variants={containerVariants}
          className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 font-extralight mt-5 w-auto"
        >
          <StreamButton variants={itemVariants} />
          <AboutButton variants={itemVariants} />
        </motion.div>
      </motion.div>
    </div>
  );
}
