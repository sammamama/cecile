"use client";

import Image from "next/image";

const logos = [
  { slug: "country_weekend", name: "Country Weekend", location: "Oirschot, NL" },
  { slug: "drunken_poet", name: "The Drunken Poet", location: "Melbourne, AUS" },
  { slug: "espy", name: "The Espy", location: "Melbourne, AUS" },
  { slug: "jongens", name: "De Jongens uit de Buurt", location: "Winsum, NL" },
  { slug: "nevs", name: "Nev's Bar", location: "Melbourne, AUS" },
  { slug: "park_hotel", name: "Park Hotel", location: "Maryborough, AUS" },
  { slug: "pause_bar", name: "Pause Bar", location: "Melbourne, AUS" },
  { slug: "phyllis", name: "Phyllis Musical Inn", location: "Chicago, US" },
  { slug: "singelier", name: "Singelier", location: "Groningen, NL" },
  { slug: "tamworth", name: "Tamworth Country Music Festival", location: "Tamworth, AUS" },
  { slug: "thornbury_local", name: "Thornbury Local", location: "Melbourne, AUS" },
  { slug: "uraban_trail", name: "Urban Trail", location: "Melbourne, AUS" },
  { slug: "warf", name: "The Wharf", location: "Melbourne, AUS" },
  { slug: "welcome_to_thornbury", name: "Welcome to Thornbury", location: "Melbourne, AUS" },
  { slug: "workers", name: "The Workers Club", location: "Melbourne, AUS" },
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-start gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((venue) => (
        <li key={venue.slug} className="w-40 shrink-0">
          <div className="relative h-24 w-40 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:shadow-md">
            <Image
              src={`/venue_logos/${venue.slug}.webp`}
              alt={venue.name}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="[font-family:var(--font-instrument-serif)] text-sm leading-snug text-neutral-900">
              {venue.name}
            </p>
            <p className="mt-1 text-xs font-light uppercase tracking-[0.15em] text-neutral-500">
              {venue.location}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function LogoCarousel() {
  return (
    <section className="w-full bg-white py-10">
      <h2 className="text-center [font-family:var(--font-instrument-serif)] text-sm font-light uppercase tracking-[0.4em] text-neutral-900/80">
        Performed At
      </h2>

      <div className="group relative mt-6 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-marquee items-center group-hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
