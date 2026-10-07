import type { ReactNode } from "react";

export const CONTACT_EMAIL = "cecile.gardens@gmail.com";

export const SPOTIFY_ARTIST_URL =
  "https://open.spotify.com/artist/6GzHVjuX30LgNncT8Crl5c";

// Latest single — linked from the home banner and the /qr page.
export const COWGIRLS_TRACK_URL =
  "https://open.spotify.com/track/6mKijmr7qG3Am5mdRxpWl1";

type Social = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const socials: Social[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cecile.gardens/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Spotify",
    href: SPOTIFY_ARTIST_URL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M7.2 9.4c3.2-.8 6.6-.5 9.4 1" />
        <path d="M7.8 12.6c2.6-.6 5.3-.3 7.6.9" />
        <path d="M8.4 15.6c2-.5 4.1-.2 5.9.7" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cecile.gardens",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.5 8.5V7a1.5 1.5 0 0 1 1.5-1.5h1.5V3h-2.5A4 4 0 0 0 11 7v1.5H8.5V12H11v9h3.5v-9H17l.5-3.5h-3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@cecilegardens",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.5 9.5l5 2.5-5 2.5z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cecile.gardens",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M14 3v12a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c.4 2.6 2 4.2 4.6 4.4" />
      </svg>
    ),
  },
];

// Look up one social by label, for places that feature a single platform.
export function getSocial(label: string): Social {
  const match = socials.find((s) => s.label === label);
  if (!match) throw new Error(`Missing social: ${label}`);
  return match;
}
