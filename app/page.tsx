"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import StreamButton from "./components/ui/button/StreamButton";
import LogoCarousel from "./components/LogoCarousel";
import SongsCarousel from "./components/music/SongsCarousel";
import Testimonials from "./components/testimonials/Testimonials";
import ContactForm from "./components/contact/ContactForm";

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

export default function Home() {
  return (
    <>
    <div className="relative flex justify-center items-center w-full h-screen overflow-hidden">
      <div className="relative inset-0 w-full h-full ">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(0deg,_rgba(26,113,161,0.3)_0%,_rgba(255,255,255,0)_80%)] -z-10"></div>
        <Image
          src="/hero-5.png"
          alt="Hero"
          width={600}
          height={1080}
          priority
          className="pointer-events-none absolute right-0 bottom-0 h-[52%] sm:h-[60%] md:h-[75%] lg:h-[90%] w-auto z-30"
        />
        <Image
          src="/bg-5.png"
          fill
          alt="Soft background texture"
          className="object-cover object-[50%_25%]"
        />
      </div>
      <motion.div
        className="absolute flex flex-col md:ml-20 justify-center items-center md:items-start inset-0 w-full md:w-[60%] lg:w-[50%] h-screen px-6 pb-32 md:pb-0 md:pl-12 md:px-0 z-20 leading-tight text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="relative group [font-family:var(--font-geist-sans)] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light tracking-tighter italic text-orange-900"
        >
          Cécile Gardens
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="[font-family:var(--font-instrument-serif)] text-lg pl-3 sm:text-xl md:text-2xl lg:text-3xl font-extralight text-black italic tracking-wide sm:tracking-widest sm:[word-spacing:1rem]"
        >
          Country Singer /Songwriter
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 font-extralight mt-5 w-auto"
        >
          <StreamButton variants={itemVariants} />
          <motion.button
            className="text-sm sm:text-lg md:text-xl text-black border px-4 py-3 sm:p-3 whitespace-nowrap backdrop-blur-lg cursor-pointer hover:scale-[1.05] transition-all w-auto"
            variants={itemVariants}
          >
            About Me
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
    <LogoCarousel />
    <SongsCarousel />
    <Testimonials />
    <ContactForm />
    </>
  );
}

