import type { Metadata } from "next";
import ShowsList from "./ShowsList";
import ShowSchema from "./ShowSchema";
import { getUpcomingShows } from "./shows";

export const metadata: Metadata = {
  title: "Shows — Cécile Gardens",
  description:
    "Upcoming live dates for Cécile Gardens, country singer/songwriter — pubs, venues and festivals around Melbourne and beyond.",
};

// The page is prerendered and rebuilt on this cadence, which is also what
// re-runs the "is this gig still upcoming?" filter as dates pass.
export const revalidate = 1800;

export default async function ShowsPage() {
  const result = await getUpcomingShows();

  return (
    <section className="w-full bg-white px-6 pt-24 pb-16 md:px-16 md:pt-28 md:pb-24">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="[font-family:var(--font-libertinus)] text-3xl italic text-neutral-800 sm:text-4xl md:text-5xl">
          Upcoming Shows
        </h1>
        <p className="mt-3 max-w-prose text-sm font-light text-neutral-600 sm:text-base">
          Where to catch Cécile live next.
        </p>

        <ShowsList result={result} />
      </div>

      {result.status === "ok" && <ShowSchema shows={result.shows} />}
    </section>
  );
}
