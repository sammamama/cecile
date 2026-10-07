"use client";

import { usePathname } from "next/navigation";

// Pages that bring their own minimal chrome — the /qr link hub is opened from
// a printed code on a phone, so the full navbar and footer just get in the way.
const BARE_ROUTES = ["/qr"];

// Wraps the navbar and footer in the root layout so they can be dropped per
// route without splitting the app into route groups.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.includes(pathname)) return null;
  return children;
}
