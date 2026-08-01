"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import { MERCH } from "./merch";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-light text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 disabled:opacity-60";

export default function MerchContent() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [size, setSize] = useState<string>(MERCH.sizes[1]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/merch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          size,
          quantity: Number(formData.get("quantity")),
          message: formData.get("message"),
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = payload.error ?? "Something went wrong. Please try again.";

        if (res.status === 429) {
          const retryAfter = Number(res.headers.get("Retry-After"));
          toast.error("Too many enquiries", {
            description: retryAfter
              ? `You can send 5 per hour. Try again in ${Math.ceil(retryAfter / 60)} min.`
              : "You can send up to 5 enquiries per hour.",
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
      toast.success("Enquiry sent", {
        description: "Cécile will reply with payment and shipping details.",
      });
    } catch {
      const message = "Network error. Please try again.";
      setError(message);
      setStatus("error");
      toast.error(message);
    }
  };

  return (
    <section className="w-full bg-white px-6 pt-28 pb-16 md:px-16 md:pt-32 md:pb-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        <div className="grid w-full shrink-0 grid-cols-2 gap-3 lg:max-w-[520px]">
          {MERCH.images.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/5 bg-neutral-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        <div className="w-full">
          <h1 className="[font-family:var(--font-libertinus)] text-3xl italic text-neutral-800 sm:text-4xl md:text-5xl">
            {MERCH.name}
          </h1>

          <p className="mt-3 text-lg text-neutral-800">
            {MERCH.price} {MERCH.currency}{" "}
            <span className="text-sm font-light text-neutral-500">
              ({MERCH.priceNote})
            </span>
          </p>

          <p className="mt-6 max-w-prose text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
            {MERCH.story}
          </p>

          <div className="mt-8">
            <p className="mb-2 text-xs tracking-[0.2em] text-neutral-500 uppercase">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {MERCH.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={size === option}
                  className={`h-10 w-12 cursor-pointer rounded-full border text-sm transition-colors ${
                    size === option
                      ? "border-neutral-800 bg-neutral-800 text-white"
                      : "border-black/10 text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {!open && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8 cursor-pointer rounded-[40px] border border-white/5 bg-neutral-800 px-6 py-4 text-sm text-white"
            >
              Buy — {MERCH.price} {MERCH.currency}
            </motion.button>
          )}

          {open && (
            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl rounded-lg bg-neutral-100 p-5">
              <p className="mb-4 text-sm font-light text-neutral-600">
                Send Cécile an enquiry for a{" "}
                <strong className="font-medium text-neutral-800">size {size}</strong>{" "}
                shirt. She&apos;ll reply with payment and shipping details.
              </p>

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

                <label className="w-full sm:max-w-[140px]">
                  <span className="mb-1 block text-xs text-neutral-500">
                    Quantity
                  </span>
                  <input
                    name="quantity"
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={1}
                    disabled={status === "sending"}
                    className={fieldClass}
                  />
                </label>

                <label className="w-full">
                  <span className="sr-only">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={2000}
                    placeholder="Anything else? (optional)"
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
                    className="cursor-pointer rounded-[40px] border border-white/5 bg-neutral-800 px-5 py-3 text-xs text-white transition-colors sm:px-6 sm:py-4 sm:text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                  </motion.button>

                  <p aria-live="polite" className="text-sm font-light">
                    {status === "sent" && (
                      <span className="text-neutral-500">
                        Thanks — Cécile will be in touch.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-red-500">{error}</span>
                    )}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
