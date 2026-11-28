import Link from "next/link";
import { projects, projectCategories } from "@/data/projects";
import { siteConfig } from "@/data/site";
import type { ProjectCategory } from "@/lib/types";
import type { ProjectArchive } from "@/lib/project-archive";
import { ProjectList } from "@/components/projects/ProjectList";
import { RepoList } from "@/components/projects/RepoList";
import styles from "@/app/home.module.css";

const notes: Record<ProjectCategory, string> = {
  XR: "Mixed reality on Meta Quest, plus AR that runs in a phone browser.",
  Games: "Small Unity games, each built around one mechanic.",
  General: "Tools I wrote to make Unity work faster.",
};

interface Props {
  category?: ProjectCategory;
  archive: ProjectArchive;
}

export function ProjectsIndex({ category, archive }: Props) {
  const items = category ? projects.filter((project) => project.category === category) : projects;
  const filters = [{ label: "all", href: "/projects", active: !category }].concat(
    projectCategories.map((name) => ({ label: name.toLowerCase(), href: `/projects/${name.toLowerCase()}`, active: name === category })),
  );

  return (
    <div className={styles.home}>
      <div className={`${styles.inner} ${styles.page}`}>
        <Link className={styles.more} href="/">[ ← home ]</Link>
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>[ {siteConfig.projectsPage.eyebrow}{category ? ` / ${category.toLowerCase()}` : ""} ]</p>
          <h1>{category ? `${category} projects` : "Things I've built"}<span aria-hidden="true">_</span></h1>
          <p>{category ? notes[category] : "Selected XR experiences, games and tools, followed by the rest of my public repositories."}</p>
        </header>
        <nav className={`${styles.quickLinks} ${styles.filters}`} aria-label="Project categories">
          {filters.map((filter) => (
            <Link key={filter.label} href={filter.href} aria-current={filter.active ? "page" : undefined}>
              [ {filter.active ? "● " : ""}{filter.label} ]
            </Link>
          ))}
        </nav>

        <section className={styles.section} aria-labelledby="curated-title">
          <h2 id="curated-title">[ {category ? category.toLowerCase() : "selected"} ]<span className={styles.count}>{items.length}</span></h2>
          <ProjectList projects={items} showCategory={!category} />
        </section>

        {!category && archive.more.length > 0 && (
          <section className={styles.section} aria-labelledby="more-title">
            <h2 id="more-title">[ more on github ]<span className={styles.count}>{archive.more.length}</span></h2>
            <p className={styles.sectionNote}>More experiments and open-source work, with summaries from their READMEs.</p>
            <RepoList repos={archive.more} />
          </section>
        )}

        {!category && archive.privateNames.length > 0 && (
          <section className={styles.section} aria-labelledby="private-title">
            <h2 id="private-title">[ private repositories ]<span className={styles.count}>{archive.privateNames.length}</span></h2>
            <p className={styles.sectionNote}>Not public, so only the names are listed.</p>
            <ul className={styles.tags}>
              {archive.privateNames.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
