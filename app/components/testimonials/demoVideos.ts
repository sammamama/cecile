export type DemoVideo = {
  id: string;
  /** Short venue/performance name — shown on the card and used as the SEO title. */
  name: string;
  /** One sentence describing the clip. Used for the JSON-LD description. */
  description: string;
  src: string;
  /**
   * Fill these in for Google video rich results — both are REQUIRED by Google
   * alongside name/description, and are intentionally left blank rather than
   * guessed. `poster` should be a still frame; `uploadDate` ISO-8601.
   */
  poster?: string;
  uploadDate?: string;
};

// Served straight from `public/` — Vercel's CDN edge-caches these, so there is
// no origin round trip and no third-party storage in the critical path.
const BUCKET = "/testimonial";

export const demoVideos: DemoVideo[] = [
  {
    id: "busking",
    name: "Busking",
    description:
      "Cécile Gardens performing an original country song live on the street.",
    src: `${BUCKET}/busking.webm`,
  },
  {
    id: "drunken-poet",
    name: "The Drunken Poet",
    description:
      "Cécile Gardens playing a live set at The Drunken Poet.",
    src: `${BUCKET}/drunken_poet.webm`,
  },
  {
    id: "nevs",
    name: "Nev's Bar",
    description: "Cécile Gardens performing live at Nev's Bar.",
    src: `${BUCKET}/nevs.webm`,
  },
];
