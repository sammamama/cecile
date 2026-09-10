import Hero from "./components/Hero";
import LogoCarousel from "./components/LogoCarousel";
import PresaveStrip from "./components/PresaveStrip";
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
      <PresaveStrip />
      <Hero nextShow={nextShow} />
      <LogoCarousel />
      <SongsCarousel />
      <Testimonials />
      <ContactForm />
    </>
  );
}
