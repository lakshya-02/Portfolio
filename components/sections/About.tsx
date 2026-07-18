import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.about.eyebrow}
          title={siteConfig.sections.about.title}
        />
        <Reveal>
          <p className="max-w-4xl font-display text-2xl font-medium leading-snug sm:text-3xl">
            {siteConfig.about.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-8 leading-relaxed text-ink-muted md:grid-cols-2">
            {siteConfig.about.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
