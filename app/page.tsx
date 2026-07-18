import { Hero } from "@/components/sections/Hero";
import { TextMarquee } from "@/components/ui/TextMarquee";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TextMarquee />
      <About />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <ContactCTA />
    </>
  );
}
