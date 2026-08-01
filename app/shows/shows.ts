import ICAL from "ical.js";
import type { Show } from "./format";

// Shows come from a *dedicated* published calendar (iCloud "Gigs"), never a
// personal one — the feed URL only ever exposes that one calendar.

export type { Show };

export type ShowsResult =
  | { status: "ok"; shows: Show[] }
  | { status: "unconfigured" }
  | { status: "error" };

const REVALIDATE_SECONDS = 1800;
const FALLBACK_TIME_ZONE = "Australia/Melbourne";
/** How far ahead recurring gigs (e.g. a weekly residency) are expanded. */
const EXPAND_WINDOW_MS = 365 * 24 * 60 * 60 * 1000;
const MAX_SHOWS = 50;

function extractUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s<>"']+/i);
  return match ? match[0].replace(/[.,)]+$/, "") : null;
}

/** ICS escaping: `\n`, `\,`, `\;` and `\\` are literal two-char sequences. */
function unescapeIcsText(text: string): string {
  return text
    .replace(/\\n/gi, "\n")
    .replace(/\\([,;\\])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function serializeTime(time: ICAL.Time): string {
  return time.isDate ? time.toString().slice(0, 10) : time.toJSDate().toISOString();
}

function endsAtMs(end: ICAL.Time | null, start: ICAL.Time): number {
  const time = end ?? start;
  return time.isDate
    ? Date.parse(`${time.toString().slice(0, 10)}T00:00:00Z`)
    : time.toJSDate().getTime();
}

function zoneOf(time: ICAL.Time): string {
  const tzid = time.zone?.tzid;
  if (!tzid || tzid === "floating" || tzid === "UTC" || tzid === "Z" || time.isDate) {
    return FALLBACK_TIME_ZONE;
  }
  return tzid;
}

function toShow(
  event: ICAL.Event,
  start: ICAL.Time,
  end: ICAL.Time | null,
  id: string,
): Show {
  const description = event.description ? unescapeIcsText(event.description) : "";
  const url = event.component.getFirstPropertyValue("url");
  const ticketUrl =
    (typeof url === "string" && url) || (description ? extractUrl(description) : null);

  return {
    id,
    title: event.summary ? unescapeIcsText(event.summary) : "Live show",
    start: serializeTime(start),
    end: end ? serializeTime(end) : null,
    allDay: start.isDate,
    timeZone: zoneOf(start),
    venue: event.location ? unescapeIcsText(event.location) : null,
    details: description || null,
    ticketUrl: ticketUrl || null,
  };
}

export async function getUpcomingShows(): Promise<ShowsResult> {
  const feedUrl = process.env.SHOWS_ICS_URL;
  if (!feedUrl) return { status: "unconfigured" };

  const url = feedUrl.replace(/^webcal:\/\//i, "https://");

  let text: string;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return { status: "error" };
    text = await res.text();
  } catch {
    return { status: "error" };
  }

  const now = Date.now();
  const horizon = now + EXPAND_WINDOW_MS;
  const shows: Show[] = [];

  try {
    const calendar = new ICAL.Component(ICAL.parse(text));

    for (const vtimezone of calendar.getAllSubcomponents("vtimezone")) {
      const zone = new ICAL.Timezone(vtimezone);
      if (!ICAL.TimezoneService.has(zone.tzid)) {
        ICAL.TimezoneService.register(zone);
      }
    }

    const vevents = calendar.getAllSubcomponents("vevent");
    const masters: ICAL.Event[] = [];
    const overrides: ICAL.Event[] = [];

    for (const vevent of vevents) {
      const event = new ICAL.Event(vevent);
      (event.isRecurrenceException() ? overrides : masters).push(event);
    }

    for (const master of masters) {
      for (const override of overrides) {
        if (override.uid === master.uid) master.relateException(override);
      }

      if (!master.isRecurring()) {
        if (endsAtMs(master.endDate, master.startDate) >= now) {
          shows.push(toShow(master, master.startDate, master.endDate, master.uid));
        }
        continue;
      }

      const iterator = master.iterator();
      for (let next = iterator.next(); next; next = iterator.next()) {
        const details = master.getOccurrenceDetails(next);
        if (details.startDate.toJSDate().getTime() > horizon) break;
        if (endsAtMs(details.endDate, details.startDate) < now) continue;

        shows.push(
          toShow(
            new ICAL.Event(details.item.component),
            details.startDate,
            details.endDate,
            `${master.uid}-${details.recurrenceId.toString()}`,
          ),
        );
        if (shows.length >= MAX_SHOWS * 2) break;
      }
    }
  } catch {
    return { status: "error" };
  }

  shows.sort((a, b) => startMs(a) - startMs(b));
  return { status: "ok", shows: shows.slice(0, MAX_SHOWS) };
}

function startMs(show: Show): number {
  return Date.parse(show.allDay ? `${show.start}T00:00:00Z` : show.start);
}

/** The soonest gig, for the hero strip. `null` when nothing is booked. */
export async function getNextShow(): Promise<Show | null> {
  const result = await getUpcomingShows();
  return result.status === "ok" ? (result.shows[0] ?? null) : null;
}
