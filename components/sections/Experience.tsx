import { experienceItems } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
        
        {/* Full-width container to allow centered timeline S-shape layout on desktop */}
        <div className="relative w-full">
          {/* Vertical gradient timeline line (centered on desktop, left-aligned on mobile) */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-6 sm:top-8 bottom-3 w-[2px] bg-gradient-to-b from-pink via-blue to-transparent" />
          
          <ol className="md:grid md:grid-cols-2 md:gap-x-20">
            {experienceItems.map((item, index) => {
              const isRight = index % 2 === 1;
              return (
                <li
                  key={`${item.role}-${item.org}`}
                  className={`relative mb-12 pl-10 last:mb-0 md:mb-16 md:pl-0 ${
                    isRight ? "md:mt-28" : ""
                  }`}
                >
                  <div className="w-full">
                    <Reveal>
                      <Card className="p-5 sm:p-6 relative overflow-hidden group hover:border-pink/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 text-left">
                        {/* Hover gradient backdrop spotlight */}
                        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-48 rounded-full bg-gradient-to-br from-pink/5 to-blue/5 blur-[56px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-semibold tracking-wider text-ink-muted/80">
                            {item.period}
                          </span>
                          {item.kind === "education" && (
                            <Badge variant="blue">Education</Badge>
                          )}
                        </div>
                        
                        <h3 className="mt-3 font-display text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-pink">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-base font-semibold text-ink-muted">{item.org}</p>
                        
                        <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 items-start">
                              <svg
                                className="mt-1.5 size-4 shrink-0 text-pink/80"
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
                  </div>

                  {/* Pulsing node: on the left rail on mobile, on the center spine on desktop */}
                  <span
                    className={`absolute left-0 top-[22px] flex size-3 sm:top-[26px] md:top-8 ${
                      isRight
                        ? "md:-left-[46px]"
                        : "md:left-auto md:-right-[46px]"
                    }`}
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink/40 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-gradient-to-r from-pink to-blue"></span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
