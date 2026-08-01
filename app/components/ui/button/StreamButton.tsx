import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import GradientBackground from "../GradientBackground";
import { SPOTIFY_ARTIST_URL } from "../../contact/socials";

type StreamButtonProps = {
  variants?: Variants;
  label?: string;
  showIcon?: boolean;
  href?: string;
};

export default function StreamButton({
  variants,
  label = "Stream on Spotify",
  showIcon = true,
  href = SPOTIFY_ARTIST_URL,
}: StreamButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Renders as an anchor, not a button — it navigates somewhere, so it needs
  // to be middle-clickable and readable as a link by assistive tech.
  return (
    <motion.a
      variants={variants}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
      className="relative flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-[40px] border border-white/5 bg-neutral-800 px-4 py-3 text-sm text-white transition-colors duration-150 sm:px-6 sm:py-4 sm:text-base"
    >
      <GradientBackground
        gradientOrigin="left-middle"
        colors={[
          { color: "rgba(26,18,11,1)", stop: "0%" },
          { color: "rgba(62,39,20,1)", stop: "25%" },
          { color: "rgba(109,68,35,1)", stop: "50%" },
          { color: "rgba(160,110,66,1)", stop: "75%" },
          { color: "rgba(214,180,140,1)", stop: "100%" },
        ]}
        noiseIntensity={1.2}
        noisePatternSize={80}
        noisePatternRefreshInterval={2}
        className="z-10 rounded-[40px] bg-neutral-800 opacity-40"
      />
      <AnimatePresence mode="popLayout">
        {showIcon && !isHovered && (
          <motion.div
            key="icon1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.7 }}
            className="flex items-center shrink-0 mr-2.5"
          >
            <svg
              className="z-20 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="24"
              height="24"
              style={{opacity:1}}
            >
              <path
                fill="#1ED760"
                d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128c70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644c-30.053-18.357-67.885-22.515-112.44-12.335a7.98 7.98 0 0 1-9.552-6.007a7.97 7.97 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276c3.76 2.308 4.952 7.215 2.644 10.975m15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289c-34.406-21.148-86.853-27.273-127.548-14.92c-5.278 1.594-10.852-1.38-12.454-6.649c-1.59-5.278 1.386-10.842 6.655-12.446c46.485-14.106 104.275-7.273 143.787 17.007c4.692 2.89 6.175 9.034 3.286 13.72zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978c-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405c-3.362 5.69-10.73 7.565-16.4 4.187z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="font-medium tracking-tight z-20">
        {label}
      </span>
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            key="icon2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.7 }}
            className="flex items-center shrink-0 ml-2.5"
          >
            <ArrowRight className="w-4 h-4 z-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
