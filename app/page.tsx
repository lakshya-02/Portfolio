import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";
import { GitHubHeatmap } from "@/components/sections/GitHubHeatmap";
import { experienceItems } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { prepareAsciiArt } from "@/lib/ascii";
import { getGitHubActivity } from "@/lib/github";
import styles from "./home.module.css";

export const revalidate = 21600;

export default async function HomePage() {
  const source = await readFile(path.join(process.cwd(), "public", "ascii-art.txt"), "utf8");
  const art = prepareAsciiArt(source);
  const github = await getGitHubActivity();
  const education = experienceItems.find((item) => item.kind === "education");

  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        <section className={styles.hero} aria-labelledby="home-title">
          <figure className={styles.portrait}>
            <pre aria-hidden="true">{art.lines.join("\n")}</pre>
            <figcaption className="sr-only">Portrait of Lakshya wearing a VR headset, rendered in ASCII characters.</figcaption>
          </figure>
          <p className={styles.eyebrow}>reality is a starting point.</p>
          <h1 id="home-title">LAKSHYA SINGH<span aria-hidden="true">_</span></h1>
          <p className={styles.role}>Extended Reality · Unity · curious about what comes next</p>
          <nav className={styles.quickLinks} aria-label="Homepage links">
            <a href="#about">[ about ]</a>
            <a href="#work">[ work ]</a>
            <a href="#skills">[ tech stack ]</a>
            <a href="#activity">[ code ]</a>
            <a href="#contact">[ hello ]</a>
          </nav>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <h2 id="about-title" className="sr-only">About Lakshya</h2>
          <p>Hey, I&apos;m <strong>Lakshya</strong>. I have built games and spatial experiences that turn the room around you into part of the interface. My home base is <strong>Unity</strong>; my playground are XR applications.</p>
          <p>I&apos;m studying Computer Science at <strong>SRM University-AP</strong> and leading <a href="https://www.nexttechlabap.in/">Next Tech Lab&apos;s</a> Pausch Division.Next Tech Lab is QS Awarded, Student lead tech Lab. </p>
        </section>

        <section id="work" className={styles.section} aria-labelledby="work-title">
          <h2 id="work-title">[ selected work ]</h2>
          <p className={styles.sectionNote}>A few things I&apos;ve taken from an idea to something you can interact with.</p>
          <div className={styles.projects}>
            {getFeaturedProjects().map((project, index) => (
              <Link className={styles.project} href={`/projects/${project.slug}`} key={project.slug}>
                <span className={styles.projectIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.title}<span aria-hidden="true"> ↗</span></h3>
                  <p>{project.summary}</p>
                  <span className={styles.tags}>{project.tags.slice(0, 3).join(" / ")}</span>
                </div>
                <span className={styles.year}>{project.year}</span>
              </Link>
            ))}
          </div>
          <Link className={styles.more} href="/projects">[ all projects → ]</Link>
        </section>

        <section id="skills" className={styles.section} aria-labelledby="skills-title">
          <h2 id="skills-title">[ Tech Stack ]</h2>
          <p className={styles.sectionNote}>The languages, engines, and tools behind my projects.</p>
          <dl className={styles.toolkit}>
            {skillGroups.map((group) => (
              <div key={group.category}>
                <dt>{group.category}</dt>
                <dd>
                  <ul>
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-title">
          <h2 id="experience-title">[ along the way ]</h2>
          <div className={styles.experience}>
            {experienceItems.filter((item) => item.kind === "work").map((item) => (
              <details key={`${item.org}-${item.role}`}>
                <summary>
                  <span><strong>{item.role}</strong><span className={styles.organization}>{item.org}</span></span>
                  <span className={styles.period}>{item.period}</span>
                </summary>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </details>
            ))}
          </div>
          {education && (
            <div className={styles.education}>
              <h3>{education.role}</h3>
              <p>{education.org} · {education.period}</p>
              <p>{education.bullets.join(" ")}</p>
            </div>
          )}
        </section>

        <section id="activity" className={styles.section} aria-labelledby="activity-title">
          <div className={styles.sectionHeader}>
            <h2 id="activity-title">[ a little code, every day ]</h2>
            <a href="https://github.com/lakshya-02">@lakshya-02 ↗</a>
          </div>
          {github ? (
            <>
              <GitHubHeatmap days={github.days} total={github.totalContributions} />
              <div className={styles.stats}>
                <p><strong>{github.privateCommitCount ?? "—"}</strong><span>{github.privateCommitCount === null ? "private commits unavailable" : "private commits / past year"}</span></p>
                <p><strong>{github.publicRepositoryCount}</strong><span>public repositories</span></p>
                <p><strong>{github.publicStarCount}</strong><span>public stars</span></p>
              </div>
              <details className={styles.activityDetails}>
                <summary>Public repositories &amp; recent commits</summary>
                <div className={styles.activityColumns}>
                  <div>
                    <h3>Public repositories</h3>
                    {github.repositories.map((repo) => (
                      <a className={styles.activityRow} href={repo.url} key={repo.url}>
                        <span>{repo.name}</span><small>{repo.stars} stars ↗</small>
                      </a>
                    ))}
                  </div>
                  <div>
                    <h3>Recent public commits</h3>
                    {github.commits.length ? github.commits.map((commit) => (
                      <a className={styles.activityRow} href={commit.url} key={commit.url}>
                        <span>{commit.message}</span><small>{commit.repository} · {commit.date.slice(0, 10)}</small>
                      </a>
                    )) : <p>No recent public commits were returned by GitHub.</p>}
                  </div>
                </div>
              </details>
              <p className={styles.freshness}>Updated {github.fetchedAt.slice(0, 10)}. Private activity stays anonymous; commit totals cover accessible owned repositories.</p>
            </>
          ) : <p className={styles.sectionNote}>GitHub activity is temporarily unavailable. <a href="https://github.com/lakshya-02">Visit my profile ↗</a></p>}
        </section>

        <section id="contact" className={styles.section} aria-labelledby="contact-title">
          <h2 id="contact-title">[ say hello ]</h2>
          <p className={styles.contactIntro}>Have an idea that belongs outside a flat screen?</p>
          <p className={styles.sectionNote}>{siteConfig.contact.body}</p>
          <nav className={styles.socialLinks} aria-label="Contact links">
            {siteConfig.socialLinks.map((link) => <a href={link.href} key={link.href}>[ {link.label.toLowerCase()} ↗ ]</a>)}
          </nav>
          <details className={styles.message}>
            <summary>or leave a message here</summary>
            <ContactForm fields={siteConfig.contact.fields} />
          </details>
        </section>
      </div>
    </div>
  );
}
