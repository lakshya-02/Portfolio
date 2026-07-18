import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

function getSkillIcon(category: string) {
  switch (category) {
    case "XR & Spatial":
      return (
        <svg className="size-5 transition-transform duration-500 group-hover/card:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M6 8l3 3-3 3" opacity="0.6" />
          <line x1="11" y1="14" x2="15" y2="14" opacity="0.6" />
        </svg>
      );
    case "Unity":
      return (
        <svg className="size-5 transition-transform duration-500 group-hover/card:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
          <path d="M17 6h1" opacity="0.6" />
          <path d="M17 18h1" opacity="0.6" />
        </svg>
      );
    case "Programming":
      return (
        <svg className="size-5 transition-transform duration-500 group-hover/card:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" opacity="0.6" />
        </svg>
      );
    case "Tools":
      return (
        <svg className="size-5 transition-transform duration-500 group-hover/card:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "Graphics":
      return (
        <svg className="size-5 transition-transform duration-500 group-hover/card:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" strokeWidth="2.5" />
        </svg>
      );
    default:
      return null;
  }
}

const groupThemes: Record<
  string,
  {
    text: string;
    border: string;
    bg: string;
    glow: string;
  }
> = {
  "XR & Spatial": {
    text: "text-pink",
    border: "border-pink/20 group-hover/card:border-pink/50",
    bg: "bg-pink/5",
    glow: "shadow-[0_0_20px_rgba(255,46,136,0.15)]",
  },
  Unity: {
    text: "text-white",
    border: "border-white/10 group-hover/card:border-white/30",
    bg: "bg-white/5",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  },
  Programming: {
    text: "text-white",
    border: "border-white/10 group-hover/card:border-white/30",
    bg: "bg-white/5",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  },
  Tools: {
    text: "text-white",
    border: "border-white/10 group-hover/card:border-white/30",
    bg: "bg-white/5",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  },
  Graphics: {
    text: "text-pink",
    border: "border-pink/20 group-hover/card:border-pink/50",
    bg: "bg-pink/5",
    glow: "shadow-[0_0_20px_rgba(255,46,136,0.15)]",
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.skills.eyebrow}
          title={siteConfig.sections.skills.title}
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const theme = groupThemes[group.category] || groupThemes["XR & Spatial"];
            return (
              <StaggerItem key={group.category}>
                <Card className="h-full relative overflow-hidden group/card transition-all duration-300">
                  {/* Faint, minimal background glow on card hover (no heavy colors) */}
                  <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-48 rounded-full bg-white/[0.03] blur-[72px] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                  
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`flex size-10 items-center justify-center rounded-xl border transition-all duration-300 ${theme.bg} ${theme.border} ${theme.text} ${theme.glow}`}
                    >
                      {getSkillIcon(group.category)}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted group-hover/card:text-white transition-colors duration-300">
                      {group.category}
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="transition-all duration-300 group-hover/card:border-white/10 group-hover/card:bg-white/[0.05] hover:!border-pink/40 hover:!text-pink"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
