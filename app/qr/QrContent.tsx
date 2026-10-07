"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarHeart, Globe } from "lucide-react";
import BackButton from "@/app/components/ui/button/BackButton";
import { socials } from "@/app/components/contact/socials";
import {
  containerVariants,
  itemVariants,
} from "@/app/components/motion/fadeUp";
import { BOOKING_HREF, SITE_NAME } from "@/app/lib/site";
import ShareMenu from "./ShareMenu";
import MerchCard from "./MerchCard";
import StreamCard from "./StreamCard";
import { featureIconClass, linkPillClass } from "./styles";

const MotionLink = motion.create(Link);

type LinkItem = { label: string; href: string; icon: ReactNode };

const links: LinkItem[] = [
  {
    label: "Book for a gig",
    href: BOOKING_HREF,
    icon: <CalendarHeart className="size-[18px]" strokeWidth={1.8} />,
  },
];

const websiteLink: LinkItem = {
  label: "Visit website",
  href: "/",
  icon: <Globe className="size-[18px]" strokeWidth={1.8} />,
};

function LinkButton({ label, href, icon }: LinkItem) {
  const inner = (
    <>
      <span className={featureIconClass}>{icon}</span>
      <span>{label}</span>
    </>
  );
  const motionProps = {
    variants: itemVariants,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: linkPillClass,
  };

  // Internal routes go through Link for client-side navigation; everything
  // else opens in a new tab so the link page stays put behind it.
  return href.startsWith("/") ? (
    <MotionLink href={href} {...motionProps}>
      {inner}
    </MotionLink>
  ) : (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
    >
      {inner}
    </motion.a>
  );
}

export default function QrContent() {
  return (
    // Plain white either side of the column, like the rest of the site.
    <main className="relative min-h-dvh w-full bg-white font-instrument">
      <div className="hidden lg:block">
        <BackButton className="fixed top-8 left-6" />
      </div>

      {/* Column: as wide as 3:4 of the screen height (never narrower than
          28rem), but as tall as the content needs so it scrolls.
          From sm it floats as a rounded card with space above and below; on
          phones it stays full-bleed. */}
      <div className="relative isolate mx-auto min-h-dvh w-full max-w-[max(28rem,calc(100dvh*3/4))] overflow-hidden px-4 pt-24 pb-12 sm:my-8 sm:min-h-[calc(100dvh-4rem)] sm:rounded-3xl sm:pt-28 sm:shadow-2xl">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src="/qr/nice-cecile.jpeg"
            alt=""
            fill
            sizes="(min-width: 640px) 520px, 100vw"
            preload
            className="object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/55 to-black/80" />
        </div>

        {/* Phones: the column is the whole screen, so the back button lives
            inside it. From lg it moves out to the page's far-left corner, the
            same spot the navbar puts it on every other page. */}
        <div className="lg:hidden">
          <BackButton
            tone="photo"
            className="absolute top-5 left-4 sm:top-6 sm:left-5"
          />
        </div>
        <ShareMenu className="absolute top-5 right-4 sm:top-6 sm:right-5" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full flex-col items-center text-center text-white"
        >
          <motion.div
            variants={itemVariants}
            className="relative size-24 overflow-hidden rounded-full border-2 border-white/80 shadow-lg sm:size-28"
          >
            <Image
              src="/about.webp"
              alt="Cécile Gardens smiling in a tulip field"
              fill
              sizes="112px"
              preload
              className="object-cover object-[30%_25%]"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-5 [font-family:var(--font-libertinus)] text-4xl font-normal tracking-tight italic drop-shadow-md sm:text-5xl"
          >
            {SITE_NAME}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-1 text-lg font-extralight tracking-wide text-white/85 italic drop-shadow sm:text-xl"
          >
            Country Singer/Songwriter
          </motion.p>

          <motion.ul
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-12 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/15 [&_svg]:size-6"
                >
                  {icon}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.ul
            variants={containerVariants}
            className="mt-8 flex w-4/5 flex-col gap-4"
          >
            {links.map((link) => (
              <li key={link.label}>
                <LinkButton {...link} />
              </li>
            ))}
            <li>
              <StreamCard />
            </li>
            <li>
              <MerchCard />
            </li>
            <li>
              <LinkButton {...websiteLink} />
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </main>
  );
}
