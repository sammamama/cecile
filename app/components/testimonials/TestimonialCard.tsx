import type { Testimonial } from "./data";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm ring-1 ring-black/[0.02] transition-shadow duration-300 hover:shadow-md">
      {/* Press quotes carry no rating — only show stars where one was given. */}
      {testimonial.rating ? (
        <div
          className="mb-3 flex gap-0.5"
          aria-label={`Rated ${testimonial.rating} out of 5`}
        >
          {Array.from({ length: testimonial.rating }, (_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className="h-4 w-4 fill-orange-900/80"
              aria-hidden="true"
            >
              <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L10 1.5z" />
            </svg>
          ))}
        </div>
      ) : null}
      <blockquote
        lang={testimonial.lang}
        className="[font-family:var(--font-instrument-serif)] text-sm sm:text-base leading-relaxed font-light text-neutral-800 italic"
      >
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4">
        <p className="text-sm text-neutral-900">{testimonial.author}</p>
        {testimonial.role ? (
          <p className="mt-1 text-xs font-light tracking-[0.15em] text-neutral-500 uppercase">
            {testimonial.role}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
