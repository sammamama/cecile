export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  /** Venue, publication or title. Omit when we only have a name. */
  role?: string;
  /** Only set for reviews that were actually left as a star rating. */
  rating?: number;
  /** BCP 47 tag for quotes left in their original language. Defaults to English. */
  lang?: string;
};

// Real press and venue quotes. Long reviews are split across several cards so
// each one reads on its own in the marquee.
export const testimonials: Testimonial[] = [
  {
    id: "cassy-1",
    quote:
      "An absolute powerhouse of country music. From the moment she takes the stage she has the audience completely captivated — warm vocals, genuine presence, infectious energy.",
    author: "Cassy",
    role: "Rhythm & Tonic Bar, Sandringham",
    rating: 5,
  },
  {
    id: "dekens-2024",
    quote:
      "Mooi helder stemgeluid, die je doet denken aan Ilse DeLange in haar jonge jaren. Ze begeleidt zichzelf op gitaar.",
    author: "Gerard Dekens",
    role: "Theater vanBeresteyn, Veendam",
    lang: "nl",
  },
  {
    id: "winsum-2019",
    // Original: "Moesten we één echte topper-talent aanwijzen, dan zou het Cécile
    // zijn geweest. 'Home coming queen' van Kelsea Ballerini, uitgevoerd met eigen
    // begeleiding op gitaar."
    quote:
      "If we had to name one real standout talent, it would have been Cécile. 'Homecoming Queen' with her own guitar accompaniment — a young folk singer with the charm to stand on a one-square-metre stage and play a cover authentically.",
    author: "Winsum Nieuws",
    role: "Hogeland Got Talent, 2019",
  },
  {
    id: "van-dijken",
    quote:
      "Because of Cécile Gardens it was a successful evening in the always bustling town of Bedum.",
    author: "Piet van Dijken",
  },
  {
    id: "cassy-2",
    quote:
      "Her voice is powerful and effortlessly authentic, bringing every song to life with real heart. Upbeat country anthems or heartfelt original ballads — she connects in a way that makes the show feel personal.",
    author: "Cassy",
    role: "Rhythm & Tonic Bar, Sandringham",
    rating: 5,
  },
  {
    id: "park-hotel",
    quote: "One of the Park's most popular performers.",
    author: "Park Hotel",
    role: "Maryborough",
  },
  {
    id: "robyn",
    quote: "Keep an eye out on this one.",
    author: "Robyn",
  },
  {
    id: "cassy-3",
    quote:
      "She engages effortlessly with the audience and creates an atmosphere where everyone feels part of the experience.",
    author: "Cassy",
    role: "Rhythm & Tonic Bar, Sandringham",
    rating: 5,
  },
  {
    id: "cassy-4",
    quote:
      "Solo or backed by her full band, it's a polished performance — every song delivered with professionalism and passion. A true country music superstar.",
    author: "Cassy",
    role: "Rhythm & Tonic Bar, Sandringham",
    rating: 5,
  },
];
