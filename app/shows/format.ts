// Type + formatters live apart from `shows.ts` so client components can import
// them without dragging the ICS parser into the browser bundle.

export type Show = {
  id: string;
  title: string;
  /** ISO instant, or `YYYY-MM-DD` when `allDay`. */
  start: string;
  end: string | null;
  allDay: boolean;
  /** IANA zone the gig happens in — the server runs in UTC, so times are
      meaningless without it. */
  timeZone: string;
  venue: string | null;
  details: string | null;
  ticketUrl: string | null;
};

/** All-day values are bare dates; reading them as UTC keeps the day put. */
function toDate(show: Show): Date {
  return show.allDay ? new Date(`${show.start}T00:00:00Z`) : new Date(show.start);
}

function zoneFor(show: Show): string {
  return show.allDay ? "UTC" : show.timeZone;
}

export function formatShowDate(show: Show): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: zoneFor(show),
  }).format(toDate(show));
}

/** Compact form for tight spots like the hero strip — "Sat 8 Aug". */
export function formatShowDateShort(show: Show): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: zoneFor(show),
  }).format(toDate(show));
}

export function formatShowTime(show: Show): string | null {
  if (show.allDay) return null;
  const format = (iso: string) =>
    new Intl.DateTimeFormat("en-AU", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: show.timeZone,
    }).format(new Date(iso));

  const start = format(show.start);
  // Only append an end time when it's a real timed end, not an all-day date.
  return show.end?.includes("T") ? `${start} – ${format(show.end)}` : start;
}

export function formatShowYear(show: Show): string {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    timeZone: zoneFor(show),
  }).format(toDate(show));
}
