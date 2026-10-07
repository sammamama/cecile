import type { Metadata } from "next";
import QrContent from "./QrContent";
import { SITE_NAME } from "@/app/lib/site";

const description = `Book ${SITE_NAME} for a gig, stream her latest single, and follow along on Instagram and Facebook.`;

export const metadata: Metadata = {
  title: "Links",
  description,
  alternates: { canonical: "/qr" },
  // Landing page for the printed QR code — a thin list of links that would
  // only compete with the real pages in search, so keep it out of the index.
  robots: { index: false, follow: true },
};

export default function QrPage() {
  return <QrContent />;
}
