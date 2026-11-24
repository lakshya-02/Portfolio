import type { ComponentType, CSSProperties } from "react";
import {
  SiUnity,
  SiSharp,
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiThreedotjs,
  SiGithub,
  SiBlender,
  SiOpencv,
  SiMongodb,
  SiAndroid,
  SiOculus,
  SiSidequest,
  SiGoogle,
  SiPostgresql,
} from "react-icons/si";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

// Only skills with a real (or close stand-in) brand logo get an icon.
// `color` is the official brand hex — omitted where the real logo is
// monochrome (renders white to match the dark theme).
const skillIcons: Record<string, { icon: IconComponent; color?: string }> = {
  "Meta Quest SDK": { icon: SiOculus }, // legacy Oculus mark, closest available
  "Google ARCore": { icon: SiGoogle, color: "#4285F4" }, // Google mark, not ARCore-specific
  "Unity 6": { icon: SiUnity },
  "C#": { icon: SiSharp, color: "#239120" },
  C: { icon: SiC, color: "#A8B9CC" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  SQL: { icon: SiPostgresql, color: "#4169E1" },
  "Three.js": { icon: SiThreedotjs },
  "Unity Editor": { icon: SiUnity },
  "Git & GitHub": { icon: SiGithub },
  Blender: { icon: SiBlender, color: "#E87D0D" },
  OpenCV: { icon: SiOpencv, color: "#5C3EE8" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  SideQuest: { icon: SiSidequest },
  ADB: { icon: SiAndroid, color: "#3DDC84" }, // Android mark, stands in for the debug bridge
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
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="size-2 bg-pink" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
                  {group.category}
                </h3>
              </div>
              <StaggerGroup className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {group.skills.map((skill) => {
                  const entry = skillIcons[skill];
                  return (
                    <StaggerItem key={skill}>
                      <div className="group flex h-full min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.02] p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-pink/50 hover:bg-white/[0.05] hover:shadow-[0_0_16px_-6px_rgba(255,46,136,0.45)]">
                        {entry && (
                          <entry.icon
                            className="size-5 text-white transition-transform duration-300 group-hover:scale-110"
                            style={entry.color ? { color: entry.color } : undefined}
                          />
                        )}
                        <span className="text-xs font-medium text-ink-muted transition-colors duration-300 group-hover:text-white">
                          {skill}
                        </span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
