"use client";

import { useRef } from "react";
import SongCard from "./SongCard";
import StreamButton from "../ui/button/StreamButton";
import { songs } from "./songs";

export default function SongsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white px-6 py-12 md:px-16 md:py-20">
      <div className="overflow-hidden rounded-3xl bg-[url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2wz19UwQVw85l2M9dxCWfoUPw1S%2Fhf_20260726_005039_d9bc6c11-f4c1-4a02-9957-71a6cefe413f.png&w=1280&q=85')] bg-cover bg-center bg-no-repeat px-4 py-10 md:px-12 md:py-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-2">
        <h2 className="[font-family:var(--font-instrument-serif)] text-2xl sm:text-3xl md:text-4xl font-light italic text-neutral-900">
          My Songs
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-lenis-prevent
        className="mx-auto mt-8 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {songs.map((song) => (
          <div key={song.id} className="w-full shrink-0 snap-start md:w-[calc(50%-12px)]">
            <SongCard song={song} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <StreamButton label="Explore All Songs" showIcon={true} />
      </div>
      </div>
    </section>
  );
}
