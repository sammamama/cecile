export type LyricLine = {
  /** start time in seconds within the snippet */
  time: number;
  text: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  audio: string;
  cover: string;
  spotifyUrl: string;
  lyrics: LyricLine[];
};

// Evenly-spaced mock timings. Swap the text; adjust times to match the vocals.
const mock = (lines: string[], step = 3.5): LyricLine[] =>
  lines.map((text, i) => ({ time: i * step, text }));

export const songs: Song[] = [
  {
    id: "called-country",
    title: "Called Country",
    artist: "Cécile Gardens",
    audio: "/song_snippet/called_country.mp3",
    cover: "/song_snippet/called_country.jpg",
    spotifyUrl: "https://open.spotify.com/track/5898EASr9XwnbgZYn8KyjD?autoplay_ok=1",
    lyrics: mock([
      "As long as people",
      "Still call me a cowgirl",
      "And I can keep wearing these boots",
      "It doesn't matter who and what surrounds us.",
      "I have learned that I've never",
      "Been called country this much",
    ], 5),
  },
  {
    id: "man-on-the-tram",
    title: "Man on the Tram",
    artist: "Cécile Gardens",
    audio: "/song_snippet/man_on_the_tram.mp3",
    cover: "/song_snippet/man_on_the_tram.jpg",
    spotifyUrl: "https://open.spotify.com/track/0pnGOpNX0C59eUjLjdTNGO?autoplay_ok=1",
    lyrics: mock([
      "The world needs more happiness",
      "And people should argue less",
      "While he himself holds the world on his shoulders",
      "Since he lost the",
      "Mother of his kids",
    ], 4),
  },
  {
    id: "northern-lights",
    title: "Northern Lights",
    artist: "Cécile Gardens",
    audio: "/song_snippet/northern_lights.mp3",
    cover: "/song_snippet/norhtern_lights.jpg",
    spotifyUrl: "https://open.spotify.com/track/3s4bvWWqjGh968Lk8I1lpj?autoplay_ok=1",
    lyrics: mock([
      "In the twinkling of your eyes",
      "I see the starry night sky",
      "And the perfect blur of blue and green",
      "It just seems",
      "Like the northern lights",
    ], 4.2),
  },
  {
    id: "well-be-alright",
    title: "We'll Be Alright",
    artist: "Cécile Gardens",
    audio: "/song_snippet/well_be_alright.mp3",
    cover: "/song_snippet/_well_be_alright.jpg",
    spotifyUrl: "https://open.spotify.com/track/5i6OAG1gF3vHUemeoh89dB?autoplay_ok=1",
    lyrics: mock([
      "But I like it that you know that",
      "You say it's wrong, I'm not so sure yet",
      "Hmmmm.",
      "I love it that you listen ",
      "And want to protect me",
      "But please don't worry",
      "Hmmmm.",
      "You're fine, I'm fine.",
      "We'll be alright, at least",
      "For tonight",
    ],3),
  },
];
