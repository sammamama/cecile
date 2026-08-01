import { songs } from "../music/songs";
import { CONTACT_EMAIL, socials, SPOTIFY_ARTIST_URL } from "../contact/socials";
import { REGIONS, SITE_NAME, SITE_URL, absoluteUrl } from "@/app/lib/site";

/**
 * Entity markup for the whole site, emitted once from the root layout.
 *
 * Three graphs, each doing a different job:
 *   Person/MusicGroup — tells Google *who* this is, that she is a country
 *     artist, and that she performs in Australia and the Netherlands. This is
 *     what a "country singer Melbourne" query resolves against.
 *   WebSite          — claims the domain for the name "Cécile Gardens".
 *   MusicRecording[] — links the released tracks to the artist entity, with
 *     the Spotify URLs as `sameAs` so the two records reconcile.
 *
 * `@id` values are stable URIs, not just URLs, so the nodes can reference each
 * other instead of repeating themselves.
 */

const ARTIST_ID = `${SITE_URL}/#artist`;
const SITE_ID = `${SITE_URL}/#website`;

const sameAs = [...socials.map((social) => social.href), SPOTIFY_ARTIST_URL].filter(
  (href, i, all) => all.indexOf(href) === i,
);

export default function ArtistSchema() {
  const artist = {
    "@type": ["Person", "MusicGroup"],
    "@id": ARTIST_ID,
    name: SITE_NAME,
    alternateName: "Cecile Gardens",
    url: SITE_URL,
    image: absoluteUrl("/cecile_busking.jpg"),
    email: `mailto:${CONTACT_EMAIL}`,
    jobTitle: "Country singer-songwriter",
    description:
      "Country singer-songwriter from Bedum in the Netherlands, based in Melbourne, Australia. Performs original country songs and covers at venues and festivals across Australia and the Netherlands.",
    genre: ["Country", "Country pop", "Americana", "Folk"],
    knowsLanguage: ["en", "nl"],
    nationality: { "@type": "Country", name: "Netherlands" },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "Victoria",
        addressCountry: "AU",
      },
    },
    // Both markets, so the entity surfaces for either country's searches.
    areaServed: REGIONS.map((region) => ({
      "@type": "Country",
      name: region.name,
    })),
    sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": ARTIST_ID },
  };

  const recordings = songs.map((song) => ({
    "@type": "MusicRecording",
    "@id": `${SITE_URL}/#song-${song.id}`,
    name: song.title,
    byArtist: { "@id": ARTIST_ID },
    genre: "Country",
    image: absoluteUrl(song.cover),
    url: song.spotifyUrl,
    sameAs: song.spotifyUrl,
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [artist, website, ...recordings],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
