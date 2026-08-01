import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Shows" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
];

const CTA_HREF = "/#contact";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 font-instrument">
      <div className="relative flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 sm:gap-6 sm:px-6 sm:py-3 shadow-[0_8px_32px_rgba(120,53,15,0.12),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/30 to-transparent"
        />
        <Link
          href="/"
          className="relative z-10 shrink-0 text-base tracking-tight italic text-neutral-900 sm:text-xl"
        >
          Cécile Gardens
        </Link>
        <ul className="relative z-10 flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-full px-2 py-1.5 text-xs italic sm:px-4 sm:py-2 sm:text-lg text-neutral-900/80 transition-colors duration-200 hover:bg-white/40 hover:text-neutral-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={CTA_HREF}
          className="group relative z-10 flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-orange-900/20 bg-orange-950 px-3 py-1.5 text-xs italic text-orange-50 shadow-[0_4px_16px_rgba(120,53,15,0.35)] transition-transform duration-200 hover:scale-[1.03] sm:px-5 sm:py-2 sm:text-lg"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/25 to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
          />
          <span className="relative z-10 whitespace-nowrap">Book a Gig</span>
        </Link>
      </div>
    </nav>
  );
}
