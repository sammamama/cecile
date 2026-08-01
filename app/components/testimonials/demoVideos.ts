export type DemoVideo = {
  id: string;
  name: string;
  description: string;
  src: string;
  poster?: string;
  uploadDate?: string;
  classname?: string;
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
    classname: "object-center"
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
    classname: "object-top"
  },
];
