"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Song } from "./songs";
import { claimPlayback, releasePlayback } from "./audioBus";

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function SongCard({ song }: { song: Song }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lyricsBoxRef = useRef<HTMLDivElement>(null);

  // Index of the active lyric line for the current playback time.
  const activeLine = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < song.lyrics.length; i++) {
      if (time >= song.lyrics[i].time) idx = i;
      else break;
    }
    return idx;
  }, [time, song]);

  // Autoscroll the active line into the middle of the lyrics box.
  useEffect(() => {
    const el = lineRefs.current[activeLine];
    const box = lyricsBoxRef.current;
    if (!el || !box) return;
    // Scroll only the lyrics box — scrollIntoView would also scroll the page.
    box.scrollTo({
      top: el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2,
      behavior: "smooth",
    });
  }, [activeLine]);

  // Playing state is driven by the element's own play/pause events, so it stays
  // correct even when another card pauses this one through the bus.
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      claimPlayback(a);
      a.play().catch(() => {});
    }
  };

  // Stop this card's audio from lingering as the bus's active element.
  useEffect(() => {
    const a = audioRef.current;
    // The <audio> is server-rendered, so the browser can load its metadata
    // before hydration and loadedmetadata fires with no listener attached —
    // the card would then show 0:00 until played. Pick it up here instead.
    if (a && a.readyState >= HTMLMediaElement.HAVE_METADATA) {
      setDuration(a.duration);
    }
    return () => {
      if (a) releasePlayback(a);
    };
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * duration;
    setTime(a.currentTime);
  };

  const playButton = (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause" : "Play"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-neutral-800 cursor-pointer text-white transition-colors hover:bg-white hover:text-black"
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* ---------- Lyrics ---------- */}
        <div className="relative order-2 bg-neutral-200 p-4 sm:p-6">
          <p className="mb-2 sm:mb-4 text-xs font-medium uppercase tracking-[0.3em] text-black/40">
            Lyrics
          </p>
          <div ref={lyricsBoxRef} data-lenis-prevent className="relative h-44 overflow-y-auto sm:h-72 pr-2 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex flex-col gap-2 py-6 sm:gap-3 sm:py-16">
              {song.lyrics.map((line, i) => (
                <li
                  key={i}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  onClick={() => {
                    const a = audioRef.current;
                    if (a) {
                      a.currentTime = line.time;
                      setTime(line.time);
                    }
                  }}
                  className={`cursor-pointer break-words text-base sm:text-lg font-bold leading-snug transition-all duration-300 ${
                    i === activeLine
                      ? "text-black"
                      : i < activeLine
                      ? "text-black/25"
                      : "text-black/40 hover:text-black/60"
                  }`}
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Player ---------- */}
        <div className="order-1 flex flex-col items-center border-b border-white/10 bg-neutral-700 justify-center gap-3 p-4 sm:gap-5 sm:border-r sm:border-b-0 sm:p-6">
          {/* Mobile: cover + meta + play sit on one row. Desktop: stacked column. */}
          <div className="flex w-full max-w-xs items-center gap-3 sm:flex-col sm:gap-5">
            <div className="relative aspect-square w-16 shrink-0 sm:w-full sm:max-w-[180px] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ring-1 ring-white/10">
              <Image
                src={song.cover}
                alt={song.title}
                fill
                sizes="(min-width: 640px) 180px, 64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1 text-left sm:w-full sm:flex-none sm:text-center">
              <h3 className="truncate text-base sm:text-2xl font-bold text-white sm:whitespace-normal">
                {song.title}
              </h3>
              <p className="truncate text-xs sm:text-sm text-white/50">{song.artist}</p>
            </div>

            {playButton}
          </div>

          {/* progress */}
          <div className="w-full max-w-xs">
            <div
              onClick={seek}
              className="group relative h-1.5 cursor-pointer rounded-full bg-white/15"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] group-hover:bg-[#1DB954]"
                style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/40">
              <span>{fmt(time)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-xs rounded-full bg-[#1DB954] px-4 py-2.5 text-center text-xs sm:px-5 sm:text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-[98%]"
          >
            Stream on Spotify
          </a>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        // Fires for our own pause AND when another card pauses us via the bus,
        // so the play/pause icon stays in sync either way.
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onEnded={(e) => {
          setPlaying(false);
          releasePlayback(e.currentTarget);
        }}
      />
    </div>
  );
}
