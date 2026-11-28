import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getProjectArchive } from "@/lib/project-archive";

export const revalidate = 300;

export const metadata: Metadata = {
  title: siteConfig.projectsPage.title,
  description: "XR apps, games and developer tools by Lakshya Singh.",
};

export default async function ProjectsPage() {
  return <ProjectsIndex archive={await getProjectArchive()} />;
}
