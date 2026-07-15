import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.skills.eyebrow}
          title={siteConfig.sections.skills.title}
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <StaggerItem key={group.category}>
              <Card className="h-full">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                  {group.category}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
