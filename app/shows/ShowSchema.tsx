import { SITE_URL } from "@/app/lib/site";
import type { Show } from "./format";

/**
 * schema.org MusicEvent markup so upcoming gigs are eligible for Google's
 * event rich results — the visible list alone tells a crawler nothing about
 * dates or venues.
 *
 * Only fields the calendar actually fills in are emitted, so the JSON-LD never
 * carries invented venue addresses or ticket URLs.
 */
export default function ShowSchema({ shows }: { shows: Show[] }) {
  if (shows.length === 0) return null;

  const data = shows.map((show) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title,
    startDate: show.start,
    ...(show.end ? { endDate: show.end } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: { "@id": `${SITE_URL}/#artist` },
    ...(show.details ? { description: show.details } : {}),
    ...(show.venue
      ? { location: { "@type": "Place", name: show.venue, address: show.venue } }
      : {}),
    ...(show.ticketUrl
      ? {
          offers: {
            "@type": "Offer",
            url: show.ticketUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
