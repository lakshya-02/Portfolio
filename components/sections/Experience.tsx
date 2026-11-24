import { Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { experienceItems } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.experience.eyebrow}
          title={siteConfig.sections.experience.title}
        />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-pink via-blue to-transparent sm:left-5" />

          <ol className="space-y-5">
            {experienceItems.map((item) => {
              const Icon = item.kind === "education" ? GraduationCap : Briefcase;
              return (
                <li key={`${item.role}-${item.org}`} className="relative pl-12 sm:pl-16">
                  <span className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border border-white/10 bg-panel text-pink sm:size-8">
                    <Icon className="size-3.5 sm:size-4" />
                  </span>
                  <Reveal>
                    <Card className="group relative overflow-hidden p-4 text-left transition-all duration-300 hover:border-pink/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] sm:p-5">
                      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-48 rounded-full bg-gradient-to-br from-pink/5 to-blue/5 blur-[56px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <span className="text-xs font-semibold tracking-wider text-ink-muted/80">
                        {item.period}
                      </span>

                      <h3 className="mt-2 font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-pink md:text-xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
                        {item.org}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-xs font-medium text-pink transition-colors hover:text-white"
                          >
                            <ArrowUpRight className="size-3" />
                          </a>
                        )}
                      </p>

                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5">
                            <svg
                              className="mt-1 size-3.5 shrink-0 text-pink/80"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
