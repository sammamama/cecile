import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Round icon-button styles, shared with other corner buttons (the /qr share
// button) so they stay the same size and feel.
export const iconButtonBase =
  "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200";

export const iconButtonTones = {
  // Matches the navbar's glass pill, for light pages.
  glass:
    "border-white/40 bg-white/25 text-neutral-900 shadow-[0_8px_32px_rgba(120,53,15,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 hover:bg-white/45",
  // For text over a dark photo, like the /qr page.
  photo:
    "border-white/60 bg-white/10 text-white backdrop-blur-md hover:bg-white/25",
};

type BackButtonProps = {
  tone?: keyof typeof iconButtonTones;
  // Positioning only — the look comes from the tone.
  className?: string;
};

// Always goes home rather than history-back: visitors often land on an inner
// page straight from a QR code or a search result, with no history to go to.
export default function BackButton({
  tone = "glass",
  className = "",
}: BackButtonProps) {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className={`${iconButtonBase} ${iconButtonTones[tone]} ${className}`}
    >
      <ArrowLeft aria-hidden className="size-5" />
    </Link>
  );
}
