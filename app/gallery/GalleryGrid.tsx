"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { galleryItems, type GalleryItem } from "./galleryItems";

function PlayBadge() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      </span>
    </span>
  );
}

function Tile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={
        item.kind === "clip" ? `Play video — ${item.alt}` : `View photo — ${item.alt}`
      }
      className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 break-inside-avoid shadow-sm ring-1 ring-black/[0.02] transition-shadow duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-900/50"
    >
      {item.kind === "photo" ? (
        <Image
          src={item.src}
          alt={item.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        // Poster only — the webm is never fetched until the lightbox opens.
        <div className="relative w-full" style={{ aspectRatio: item.aspect }}>
          <Image
            src={item.poster}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <PlayBadge />
        </div>
      )}

      {item.caption ? (
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4 pt-10 text-left text-sm font-light tracking-wide text-white">
          {item.caption}
        </span>
      ) : null}
    </button>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const item = active === null ? null : galleryItems[active];

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((i) =>
        i === null ? i : (i + delta + galleryItems.length) % galleryItems.length,
      ),
    [],
  );

  // Arrow/Escape navigation, plus a scroll lock so the page behind stays put.
  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((galleryItem, index) => (
          <Tile
            key={galleryItem.id}
            item={galleryItem}
            index={index}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {item ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.7 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[86vh] w-full max-w-5xl items-center justify-center"
            >
              {item.kind === "photo" ? (
                <div className="relative h-[86vh] w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    className="object-contain"
                  />
                </div>
              ) : (
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  aria-label={item.alt}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[86vh] w-auto rounded-2xl"
                />
              )}
            </motion.div>

            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
