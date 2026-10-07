import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Libertinus_Serif,
} from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import SiteChrome from "./components/SiteChrome";
import ArtistSchema from "./components/seo/ArtistSchema";
import { SITE_NAME, SITE_URL } from "./lib/site";
import { Toaster } from "sonner";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const libertinusSerif = Libertinus_Serif({
  variable: "--font-libertinus",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Cécile Gardens is a country singer-songwriter from the Netherlands, based in Melbourne. Original country songs and covers, live at venues and festivals across Australia and the Netherlands. Available for bookings.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cécile Gardens — Country Singer-Songwriter | Melbourne & Netherlands",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "music",
  keywords: [
    "Cécile Gardens",
    "Cecile Gardens",
    "country singer",
    "country singer-songwriter",
    "country music Melbourne",
    "country artist Australia",
    "live country music Melbourne",
    "countryzangeres",
    "country zangeres Nederland",
    "Dutch country singer",
    "country music Netherlands",
    "acoustic singer Melbourne",
    "wedding and event singer Melbourne",
    "book a country singer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Cécile Gardens — Country Singer-Songwriter | Melbourne & Netherlands",
    description,
    locale: "en_AU",
    alternateLocale: ["nl_NL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cécile Gardens — Country Singer-Songwriter",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${libertinusSerif.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ArtistSchema />
        <SmoothScroll />
        <Toaster position="bottom-center" richColors closeButton />
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        {children}
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
