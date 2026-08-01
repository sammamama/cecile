import Link from "next/link";
import { socials, CONTACT_EMAIL } from "./contact/socials";
import { SITE_NAME } from "@/app/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Upcoming Gigs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
  { href: "/#contact", label: "Book a Gig" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-white px-6 pt-12 pb-8 md:px-16">
      <div className="mx-auto grid w-full max-w-5xl gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="[font-family:var(--font-instrument-serif)] text-2xl italic text-neutral-900">
            {SITE_NAME}
          </p>
          <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-neutral-600">
            Country singer-songwriter from the Netherlands, based in Melbourne.
            Available for gigs, festivals and private bookings.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-light text-neutral-600 transition-colors duration-150 hover:text-orange-950"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
            Get in touch
          </h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 block text-sm font-light break-all text-neutral-600 transition-colors duration-150 hover:text-orange-950"
          >
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition-colors duration-200 hover:border-orange-950/30 hover:text-orange-950"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col-reverse items-center gap-3 border-t border-black/5 pt-6 text-xs font-light text-neutral-500 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="transition-colors duration-150 hover:text-orange-950"
          >
            Privacy
          </Link>
          <span aria-hidden className="text-neutral-300">
            ·
          </span>
          <p>
            designed by{" "}
            <a
              href="https://www.instagram.com/sam.can.code/"
              target="_blank"
              rel="noopener noreferrer"
              className="italic underline underline-offset-2 transition-colors duration-150 hover:text-orange-950"
            >
              Samridh Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
