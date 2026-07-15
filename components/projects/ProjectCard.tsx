import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        <span className="sr-only">{project.title}</span>
      </Link>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="text-xs text-ink-muted">{project.year}</span>
          <ArrowUpRight className="size-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
