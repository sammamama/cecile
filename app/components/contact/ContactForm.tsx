"use client";

import { useState } from "react";
import Image from "next/image";
import { socials, CONTACT_EMAIL } from "./socials";
import { motion } from "motion/react";
import { toast } from "sonner";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-light text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 disabled:opacity-60";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = payload.error ?? "Something went wrong. Please try again.";

        // 429 = rate limited. Surface the wait time from Retry-After.
        if (res.status === 429) {
          const retryAfter = Number(res.headers.get("Retry-After"));
          toast.error("Too many messages", {
            description: retryAfter
              ? `You can send 5 per hour. Try again in ${Math.ceil(retryAfter / 60)} min.`
              : "You can send up to 5 messages per hour.",
          });
        } else {
          toast.error(message);
        }

        setError(message);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
      toast.success("Message sent", {
        description: "Thanks — Cécile will get back to you.",
      });
    } catch {
      const message = "Network error. Please try again.";
      setError(message);
      setStatus("error");
      toast.error(message);
    }
  };

  return (
    <section id="contact" className="w-full bg-white px-6 py-12 md:px-16 md:py-20 scroll-mt-24">
      <div className="mx-auto flex w-full flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-14">
        {/* Portrait image — desktop only, mobile layout stays heading + form */}
        <div className="hidden w-full max-w-[360px] shrink-0 lg:block lg:max-w-[420px]">
          <div className="relative h-full aspect-square w-full overflow-hidden border border-black/5 bg-neutral-100">
            <Image
              src="/cecile_busking.jpg"
              alt="Cecile busking"
              fill
              sizes="420px"
              className="object-cover object-[30%_0%]"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          <div className="w-full">
            <h2 className="[font-family:var(--font-instrument-serif)] text-2xl sm:text-3xl md:text-4xl font-light italic text-neutral-800">
              Get in touch
            </h2>
            <p className="mt-4 max-w-sm text-sm font-light text-neutral-500">
              Bookings, collaborations, or just to say hello — send a note and
              I&apos;ll get back to you.
            </p>

            {/* Direct mailto for anyone who would rather use their own client —
                the form below delivers to the same address. */}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Hello Cécile",
              )}&body=${encodeURIComponent(
                "Hi Cécile,\n\nI'm getting in touch about ",
              )}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-light text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {CONTACT_EMAIL}
            </a>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition-colors hover:border-neutral-800 hover:bg-neutral-800 hover:text-white"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="w-full bg-neutral-100 rounded-lg p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <label className="w-full">
                <span className="sr-only">Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
              <label className="w-full">
                <span className="sr-only">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  placeholder="you@email.com"
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="w-full">
              <span className="sr-only">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                maxLength={5000}
                placeholder="Tell me a little about your inquiry…"
                disabled={status === "sending"}
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.96 }}
                className="cursor-pointer rounded-[40px] border border-white/5 bg-neutral-800 px-5 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm text-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </motion.button>

              <p aria-live="polite" className="text-sm font-light">
                {status === "sent" && (
                  <span className="text-neutral-500">
                    Thanks — your message is on its way.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-500">{error}</span>
                )}
              </p>
            </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
