import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  return (
    <section
      id="projects"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.projects.eyebrow}
          title={siteConfig.sections.projects.title}
        />
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-12">
          <Button href={siteConfig.projectsCta.href}>
            {siteConfig.projectsCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
