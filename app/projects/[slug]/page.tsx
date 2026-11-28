import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, categorySlugs, getCategoryBySlug, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import styles from "@/app/home.module.css";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...projects.map((project) => project.slug), ...categorySlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (category) return { title: `${category} projects`, description: `${category} projects by Lakshya Singh.` };
  const project = getProjectBySlug(slug);
  if (!project) return { title: siteConfig.notFound.title };
  return { title: project.title, description: project.summary };
}

function liveLabel(url: string): string {
  if (url.includes("itch.io")) return "play on itch.io";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "watch the demo";
  return siteConfig.projectDetail.live;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  // /projects/xr, /projects/games and /projects/general share this route with project slugs.
  const category = getCategoryBySlug(slug);
  if (category) return <ProjectsIndex category={category} archive={{ more: [], privateNames: [] }} />;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className={styles.home}>
      <article className={`${styles.inner} ${styles.page}`}>
        <Link className={styles.more} href="/projects">[ ← {siteConfig.projectDetail.back} ]</Link>
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>[ {project.category.toLowerCase()} / {project.year} ]</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>

        <div className={styles.detailBody}>
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <p className={styles.stackLine}>built with <span>{project.tags.join(" / ")}</span></p>

        <nav className={styles.detailLinks} aria-label="Project links">
          {project.links.source && <a href={project.links.source}>[ {siteConfig.projectDetail.source} ↗ ]</a>}
          {project.links.live && <a href={project.links.live}>[ {liveLabel(project.links.live)} ↗ ]</a>}
        </nav>

        <nav className={styles.pager} aria-label="More projects">
          {previous && <Link href={`/projects/${previous.slug}`}>← {previous.title}</Link>}
          {next && <Link href={`/projects/${next.slug}`}>{next.title} →</Link>}
        </nav>
      </article>
    </div>
  );
}
