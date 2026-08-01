import Hero from "./components/Hero";
import LogoCarousel from "./components/LogoCarousel";
import SongsCarousel from "./components/music/SongsCarousel";
import Testimonials from "./components/testimonials/Testimonials";
import ContactForm from "./components/contact/ContactForm";
import { getNextShow } from "./shows/shows";

// Matches the /shows cadence so the hero strip and the shows page never
// disagree about what the next gig is.
export const revalidate = 1800;

export default async function Home() {
  const nextShow = await getNextShow();

  return (
    <>
      <Hero nextShow={nextShow} />
      <LogoCarousel />
      <SongsCarousel />
      <Testimonials />
      <ContactForm />
      <footer className="pb-8 text-center text-xs font-light text-neutral-500">
        designed by{" "}
        <a
          href="https://www.instagram.com/sam.can.code/"
          target="_blank"
          rel="noopener noreferrer"
          className="italic underline underline-offset-2 transition-colors duration-150 hover:text-neutral-300"
        >
          Samridh Sharma
        </a>
      </footer>
    </>
  );
}
