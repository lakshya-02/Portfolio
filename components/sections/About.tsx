import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

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
        <div className="max-w-2xl space-y-6 text-left text-lg leading-relaxed text-ink-muted">
          {siteConfig.about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <p className={index === 0 ? "font-display text-3xl font-medium text-ink sm:text-4xl" : undefined}>
                {renderBold(paragraph)}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
