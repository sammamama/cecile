"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  COWGIRLS_TRACK_URL,
  getSocial,
} from "@/app/components/contact/socials";
import { itemVariants } from "@/app/components/motion/fadeUp";
import { featureCardClass, featureIconClass, featureRowClass } from "./styles";

const spotifyIcon = getSocial("Spotify").icon;

// Featured link for the new single: the stream link with the cover photo
// under it. The whole card opens the track, so the photo is a tap target too.
export default function StreamCard() {
  return (
    <motion.a
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={COWGIRLS_TRACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${featureCardClass}`}
    >
      <span className={featureRowClass}>
        <span className={featureIconClass}>{spotifyIcon}</span>
        Stream &lsquo;cowgirls ride away&rsquo;
      </span>
      <span className="relative mx-2 mb-2 block aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src="/qr/cowgirl.jpeg"
          alt="Cécile Gardens in a cowboy hat and fringed suede jacket"
          fill
          sizes="(min-width: 640px) 480px, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
    </motion.a>
  );
}
