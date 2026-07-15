import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: siteConfig.projectsPage.title.replace(/\.$/, ""),
  description: siteConfig.tagline,
};

export default function ProjectsPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={siteConfig.projectsPage.eyebrow}
          title={siteConfig.projectsPage.title}
        />
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
