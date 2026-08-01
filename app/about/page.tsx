import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const description =
  "Cécile Gardens is a country singer-songwriter from Bedum in the Netherlands, now based in Melbourne, Australia. Her story, from Hogeland's Got Talent to the Tamworth Country Music Festival. Read it in English or Dutch.";

export const metadata: Metadata = {
  title: "About — Dutch Country Singer-Songwriter in Australia",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Cécile Gardens — country singer-songwriter",
    description,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
