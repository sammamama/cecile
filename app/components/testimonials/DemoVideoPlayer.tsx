"use client";

import { useEffect, useRef, useState } from "react";
import { demoVideos } from "./demoVideos";

export default function DemoVideoPlayer() {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = demoVideos[index];

  // Swapping `src` on a mounted <video> needs an explicit load()/play() —
  // React updating the attribute alone will not restart playback.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {});
  }, [index]);

  // React does not reliably reflect `muted` as an attribute, and load() above
  // resets it — so drive the property directly on every render of a new clip.
  useEffect(() => {
    const el = videoRef.current;
    if (el) el.muted = muted;
  }, [muted, index]);

  const next = () => setIndex((i) => (i + 1) % demoVideos.length);
  const prev = () =>
    setIndex((i) => (i - 1 + demoVideos.length) % demoVideos.length);

  return (
    <figure className="relative aspect-square lg:aspect-[9/16] w-full overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-sm ring-1 ring-black/[0.02]">
      <video
        ref={videoRef}
        src={current.src}
        poster={current.poster}
        aria-label={`${current.name} — ${current.description}`}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={next}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="absolute top-4 left-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M22 9l-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>

      <button
        onClick={prev}
        aria-label="Previous video"
        className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next video"
        className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Venue name — real text for crawlers, orientation for viewers. */}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
        <p className="text-sm font-light tracking-wide text-white">
          {current.name}
        </p>
      </figcaption>

      <div className="absolute right-4 bottom-4 flex gap-1.5">
        {demoVideos.map((video, i) => (
          <button
            key={video.id}
            onClick={() => setIndex(i)}
            aria-label={`Play ${video.name}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
