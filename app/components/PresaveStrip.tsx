import Link from "next/link";

const PRESAVE_HREF =
  "https://distrokid.com/hyperfollow/ccilegardens/cowgirls-ride-away-2?utm_campaign=website&utm_medium=Email+&utm_source=SendGrid";

/**
 * Fixed presave banner that sits just under the navbar on the home page.
 * The top offsets track the navbar's own height at each breakpoint (top-4 plus
 * the pill), so the two never overlap.
 */
export default function PresaveStrip() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[4.5rem] sm:top-20 md:top-[4.5rem] z-40 flex justify-center px-4 font-instrument">
      <Link
        href={PRESAVE_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto relative flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-orange-100/20 bg-orange-950/90 px-4 py-2 text-sm italic text-orange-50 shadow-[0_8px_32px_rgba(120,53,15,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200 hover:bg-orange-950 sm:px-5 sm:text-base"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/10 to-transparent"
        />
        <span className="relative z-10 shrink-0">Presave my new song</span>
        <span className="relative z-10 min-w-0 truncate underline underline-offset-4 decoration-orange-50/60 transition-colors duration-200 group-hover:decoration-orange-50">
          cowgirls ride away
        </span>
      </Link>
    </div>
  );
}
