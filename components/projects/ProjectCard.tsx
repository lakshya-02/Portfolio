import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">

      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        <span className="sr-only">{project.title}</span>
      </Link>
      <div className="flex h-full flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold tracking-wider text-ink-muted/80">{project.year}</span>
          <div className="flex size-8 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-all duration-300 group-hover:border-pink/30 group-hover:bg-pink/10">
            <ArrowUpRight className="size-4 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink" />
          </div>
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-pink">
          {project.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              className="transition-all duration-300 group-hover:border-pink/30 group-hover:bg-pink/5 group-hover:text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
