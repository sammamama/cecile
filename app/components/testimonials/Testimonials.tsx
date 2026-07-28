"use client";

import type { CSSProperties } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials, type Testimonial } from "./data";

// Three vertical marquee columns, each fed a slice of the list.
const columns: Testimonial[][] = [
  testimonials.filter((_, i) => i % 3 === 0),
  testimonials.filter((_, i) => i % 3 === 1),
  testimonials.filter((_, i) => i % 3 === 2),
];

const durations = ["34s", "42s", "38s"];

function MarqueeColumn({
  items,
  reverse,
  duration,
  className = "",
}: {
  items: Testimonial[];
  reverse: boolean;
  duration: string;
  className?: string;
}) {
  return (
    <div className={`group h-full overflow-hidden ${className}`}>
      <div
        className={`flex flex-col gap-4 group-hover:[animation-play-state:paused] ${
          reverse
            ? "animate-marquee-vertical-reverse"
            : "animate-marquee-vertical"
        }`}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="flex flex-col gap-4" aria-hidden={pass === 1 || undefined}>
            {items.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-16 md:py-20">
      <h2 className="[font-family:var(--font-instrument-serif)] text-2xl sm:text-3xl md:text-4xl font-light italic text-neutral-800">
        What people say
      </h2>
      <div className="mx-auto mt-10 flex w-full flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-14">
        <div className="relative order-1 w-full">
          <div className="grid h-[420px] sm:h-[560px] grid-cols-1 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] sm:grid-cols-2 lg:h-[640px] lg:grid-cols-3">
            {columns.map((items, i) => (
              <MarqueeColumn
                key={i}
                items={items}
                reverse={i === 1}
                duration={durations[i]}
                className={
                  i === 2 ? "hidden lg:block" : i === 1 ? "hidden sm:block" : ""
                }
              />
            ))}
          </div>
        </div>

        {/* 9:16 video */}
        <div className="order-2 hidden w-full max-w-[360px] shrink-0 lg:block lg:max-w-[380px]">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-sm ring-1 ring-black/[0.02]">
            <video
              src="/horse-run.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
