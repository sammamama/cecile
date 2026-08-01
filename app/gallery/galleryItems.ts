import type { StaticImageData } from "next/image";

import gallery1 from "@/public/gallery/gallery-1.webp";
import gallery2 from "@/public/gallery/gallery-2.webp";
import gallery3 from "@/public/gallery/gallery-3.webp";
import gallery4 from "@/public/gallery/gallery-4.webp";

export type GalleryPhoto = {
  kind: "photo";
  id: string;
  /** Static import so Next infers width/height/blurDataURL at build time. */
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type GalleryClip = {
  kind: "clip";
  id: string;
  src: string;
  /** Poster frame extracted from the clip — keeps the webm off the initial load. */
  poster: string;
  alt: string;
  caption?: string;
  /** Intrinsic ratio, so the grid reserves space before metadata loads. */
  aspect: string;
};

export type GalleryItem = GalleryPhoto | GalleryClip;

// Order drives the masonry flow — photos and clips alternate so neither
// clusters in one column.
export const galleryItems: GalleryItem[] = [
  {
    kind: "photo",
    id: "photo-1",
    src: gallery1,
    alt: "Cécile Gardens performing live with her guitar.",
  },
  {
    kind: "photo",
    id: "photo-2",
    src: gallery2,
    alt: "Cécile Gardens on stage during a live performance.",
  },
  {
    kind: "clip",
    id: "clip-jolene",
    src: "/gallery/jolene.webm",
    poster: "/gallery/jolene-poster.webp",
    alt: "Cécile Gardens covering Jolene.",
    caption: "Jolene",
    aspect: "9/16",
  },
  {
    kind: "photo",
    id: "photo-3",
    src: gallery3,
    alt: "Cécile Gardens singing into the microphone.",
  },
  {
    kind: "clip",
    id: "clip-2",
    src: "/gallery/gallery-2.webm",
    poster: "/gallery/gallery-2-poster.webp",
    alt: "Cécile Gardens performing an original song.",
    aspect: "9/16",
  },
  {
    kind: "photo",
    id: "photo-4",
    src: gallery4,
    alt: "Cécile Gardens with her guitar at a live show.",
  },
  {
    kind: "clip",
    id: "clip-3",
    src: "/gallery/gallery-3.webm",
    poster: "/gallery/gallery-3-poster.webp",
    alt: "Cécile Gardens playing to a live crowd.",
    aspect: "9/16",
  },
];
