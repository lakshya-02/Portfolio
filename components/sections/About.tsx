import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.about.eyebrow}
          title={siteConfig.sections.about.title}
        />
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              {siteConfig.about.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 leading-relaxed text-ink-muted">
              {siteConfig.about.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
