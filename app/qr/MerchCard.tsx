"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { itemVariants } from "@/app/components/motion/fadeUp";
import { MERCH } from "@/app/merch/merch";
import { featureCardClass, featureIconClass, featureRowClass } from "./styles";

// Featured link for the shirt: swipeable product photos with the "Buy merch"
// link underneath. Same transparent outline as the other link pills.
export default function MerchCard() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Slides are equal width, so the nearest index falls out of scrollLeft.
  const onScroll = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    setActive(Math.round(track.scrollLeft / first.offsetWidth));
  };

  // The dots double as controls for mouse users, who can't swipe.
  const goTo = (i: number) => {
    const slide = trackRef.current?.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <motion.div variants={itemVariants} className={featureCardClass}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {MERCH.images.map((image) => (
          <div
            key={image.src}
            // 60% wide so the next photo clearly peeks in and invites a swipe.
            className="relative aspect-square w-[60%] shrink-0 snap-center overflow-hidden rounded-2xl bg-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 340px, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1 pb-1">
        {MERCH.images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${image.alt}`}
            aria-current={i === active}
            className="group cursor-pointer rounded-full px-1 py-2"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      <Link
        href="/merch"
        className={`${featureRowClass} border-t border-white/30`}
      >
        <span className={featureIconClass}>
          <ShoppingBag aria-hidden className="size-[18px]" strokeWidth={1.8} />
        </span>
        Buy merch
      </Link>
    </motion.div>
  );
}
