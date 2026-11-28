import Link from "next/link";
import type { Project } from "@/lib/types";
import styles from "@/app/home.module.css";

export function ProjectList({ projects, showCategory = false }: { projects: Project[]; showCategory?: boolean }) {
  return (
    <div>
      {projects.map((project) => (
        <Link className={styles.project} href={`/projects/${project.slug}`} key={project.slug}>
          <div>
            <h3>{project.title}<span aria-hidden="true"> ↗</span></h3>
            <p>{project.summary}</p>
            <span className={styles.tags}>
              {showCategory && <span className={styles.category}>{project.category.toLowerCase()} · </span>}
              {project.tags.slice(0, 3).join(" / ")}
            </span>
          </div>
          <span className={styles.year}>{project.year}</span>
        </Link>
      ))}
    </div>
  );
}
