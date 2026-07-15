import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: siteConfig.notFound.title };
  }
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return (
    <article className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          {siteConfig.projectDetail.back}
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm text-ink-muted">{project.year}</span>
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {project.title}
          <span className="text-pink">.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          {project.summary}
        </p>
        <hr className="my-12 border-line" />
        <div className="space-y-6 leading-relaxed text-ink-muted">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href={project.links.live}>
            {siteConfig.projectDetail.live}
          </Button>
          <Button href={project.links.source} variant="outline">
            {siteConfig.projectDetail.source}
          </Button>
        </div>
      </Container>
    </article>
  );
}
