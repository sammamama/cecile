import Link from "next/link";
import { CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import {
  formatShowDate,
  formatShowTime,
  formatShowYear,
  type Show,
} from "./format";
import type { ShowsResult } from "./shows";

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-neutral-50 px-6 py-14 text-center">
      <CalendarDays
        aria-hidden
        className="mx-auto size-6 text-neutral-400"
        strokeWidth={1.5}
      />
      <p className="mt-4 text-sm font-light text-neutral-600 sm:text-base">
        {message}
      </p>
      <Link
        href="/#contact"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-orange-900/20 bg-orange-950 px-5 py-2 text-sm italic text-orange-50 shadow-[0_4px_16px_rgba(120,53,15,0.35)] transition-transform duration-200 hover:scale-[1.03]"
      >
        Book a Gig
      </Link>
    </div>
  );
}

function ShowRow({ show }: { show: Show }) {
  const time = formatShowTime(show);

  return (
    <li className="group border-t border-black/10 py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="[font-family:var(--font-libertinus)] text-lg italic text-neutral-800 sm:text-xl">
            {formatShowDate(show)}
            <span className="text-neutral-400"> · {formatShowYear(show)}</span>
          </p>

          <h2 className="mt-1 text-base text-neutral-900 sm:text-lg">
            {show.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-light text-neutral-500">
            {show.venue && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden className="size-4" strokeWidth={1.5} />
                {show.venue}
              </span>
            )}
            {time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="size-4" strokeWidth={1.5} />
                {time}
              </span>
            )}
          </div>

          {show.details && (
            <p className="mt-3 max-w-prose text-sm font-light leading-relaxed whitespace-pre-line text-neutral-600">
              {show.details}
            </p>
          )}
        </div>

        {show.ticketUrl && (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-orange-900/20 bg-orange-950 px-4 py-2 text-sm italic text-orange-50 shadow-[0_4px_16px_rgba(120,53,15,0.35)] transition-transform duration-200 hover:scale-[1.03]"
          >
            <Ticket aria-hidden className="size-4" strokeWidth={1.5} />
            Tickets
          </a>
        )}
      </div>
    </li>
  );
}

export default function ShowsList({ result }: { result: ShowsResult }) {
  // `unconfigured` and `error` read the same to a visitor — the calendar just
  // isn't answering — so neither leaks setup state onto the public page.
  if (result.status !== "ok") {
    return (
      <EmptyState message="The shows calendar isn't loading right now. Get in touch for current dates." />
    );
  }

  if (result.shows.length === 0) {
    return (
      <EmptyState message="No shows announced just yet — new dates land here as soon as they're booked." />
    );
  }

  return (
    <ul className="mt-10">
      {result.shows.map((show) => (
        <ShowRow key={show.id} show={show} />
      ))}
    </ul>
  );
}
