"use client";

import { useState } from "react";
import Image from "next/image";
import { content, type Language } from "./content";

export default function AboutContent() {
  const [lang, setLang] = useState<Language>("en");
  const copy = content[lang];

  return (
    <section className="flex h-screen w-full overflow-hidden bg-white px-6 pt-24 pb-10 md:px-16 md:pt-28 md:pb-14">
      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-14">
        <div className="w-full shrink-0 lg:max-w-[420px]">
          <div className="relative aspect-[4/5] max-h-[30vh] w-full overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 lg:max-h-none lg:h-full">
            <Image
              src="/about.webp"
              alt="Cécile Gardens performing with her guitar"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* `lang` flips with the toggle so assistive tech reads the right voice. */}
        <article lang={copy.htmlLang} className="flex min-h-0 w-full flex-col">
          {/* Mobile: toggle sits beside the heading. Desktop: it detaches to
              the top-right corner of the container (the nearest `relative`). */}
          <div className="flex shrink-0 items-center justify-between gap-3">
            <h1 className="[font-family:var(--font-libertinus)] text-3xl italic text-neutral-800 sm:text-4xl md:text-5xl lg:pr-24">
              {copy.heading}
            </h1>

            <div
              role="group"
              aria-label="Language"
              className="flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1 backdrop-blur-sm lg:absolute lg:top-0 lg:right-0 lg:z-20"
            >
              {(Object.keys(content) as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs tracking-[0.15em] transition-colors ${
                    lang === code
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {content[code].label}
                </button>
              ))}
            </div>
          </div>

          {/* Only this scrolls — data-lenis-prevent stops Lenis from hijacking
              the wheel and scrolling the page instead. */}
          <div
            data-lenis-prevent
            className="mt-6 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-3 [scrollbar-width:thin]"
          >
            {copy.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm font-light leading-relaxed text-neutral-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            <p className="[font-family:var(--font-instrument-serif)] text-lg italic text-neutral-800 sm:text-xl">
              {copy.signoff}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
