import type { Metadata } from "next";
import GalleryGrid from "./GalleryGrid";

const description =
  "Photos and live clips of country singer-songwriter Cécile Gardens on stage across Melbourne and Australia, busking, and performing originals and covers.";

export const metadata: Metadata = {
  title: "Gallery — Live Country Music Photos & Clips",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "article",
    url: "/gallery",
    title: "Gallery — Cécile Gardens live",
    description,
  },
};

export default function GalleryPage() {
  return (
    <section className="w-full bg-white px-6 pt-24 pb-16 md:px-16 md:pt-28 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="[font-family:var(--font-libertinus)] text-3xl italic text-neutral-800 sm:text-4xl md:text-5xl">
          Gallery
        </h1>
        <div className="mt-10">
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}
