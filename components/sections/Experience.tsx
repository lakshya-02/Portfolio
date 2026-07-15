import { experienceItems } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.experience.eyebrow}
          title={siteConfig.sections.experience.title}
        />
        <ol className="relative ml-1 max-w-3xl border-l border-line">
          {experienceItems.map((item) => (
            <li
              key={`${item.role}-${item.org}`}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[4.5px] top-1.5 size-2 bg-pink"
              />
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-ink-muted">{item.period}</span>
                  {item.kind === "education" && (
                    <Badge variant="blue">Education</Badge>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{item.org}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 bg-line"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
