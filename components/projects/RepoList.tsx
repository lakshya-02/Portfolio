import type { MoreProject } from "@/lib/project-archive";
import styles from "@/app/home.module.css";

export function RepoList({ repos }: { repos: MoreProject[] }) {
  return (
    <div>
      {repos.map((repo) => (
        <a className={styles.project} href={repo.url} key={repo.url}>
          <div>
            <h3>{repo.name}<span aria-hidden="true"> ↗</span></h3>
            <p>{repo.text}</p>
            <span className={styles.tags}>{[repo.language, repo.fork ? "fork" : "", repo.stars > 0 ? `${repo.stars} stars` : ""].filter(Boolean).join(" / ") || "github"}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
