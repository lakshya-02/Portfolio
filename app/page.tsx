import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";
import { GitHubHeatmap } from "@/components/sections/GitHubHeatmap";
import { TechLogos } from "@/components/sections/TechLogos";
import { ProjectList } from "@/components/projects/ProjectList";
import { experienceItems } from "@/data/experience";
import { getFeaturedProjects, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { getGitHubActivity, getGitHubPortfolio } from "@/lib/github";
import styles from "./home.module.css";

export const revalidate = 300;

export default async function HomePage() {
  const [github, portfolio] = await Promise.all([getGitHubActivity(), getGitHubPortfolio()]);
  const education = experienceItems.filter((item) => item.kind === "education");
  const roles = experienceItems.filter((item) => item.kind !== "education");
  const featured = getFeaturedProjects();

  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        <section className={styles.hero} aria-labelledby="home-title">
          <h1 id="home-title">{siteConfig.name}<span aria-hidden="true">_</span></h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <p className={styles.role}>{siteConfig.role} · SRM University-AP</p>
          <nav className={styles.quickLinks} aria-label="Homepage sections">
            <a href="#about">[ about ]</a>
            <a href="#experience">[ experience ]</a>
            <a href="#education">[ education ]</a>
            <a href="#work">[ work ]</a>
            <a href="#skills">[ tech stack ]</a>
            <a href="#activity">[ github ]</a>
            <a href="#contact">[ contact ]</a>
          </nav>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <h2 id="about-title" className="sr-only">About</h2>
          <p>I&apos;m <strong>Lakshya</strong>. I build mixed reality apps and games in <strong>Unity</strong>, mostly for Meta Quest, where the room you&apos;re standing in becomes part of the interface.</p>
          <p>I study Computer Science at <strong>SRM University-AP</strong> and lead the Pausch Division at <a href="https://www.nexttechlabap.in/">Next Tech Lab</a>, a QS-awarded student-run lab. I also serve on its board, the Syndicate.</p>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-title">
          <h2 id="experience-title">[ experience ]</h2>
          <div className={styles.experience}>
            {roles.map((item, index) => (
              <details key={`${item.org}-${item.role}`} open={index === 0}>
                <summary>
                  <span>
                    <strong>{item.role}</strong>
                    <span className={styles.organization}>
                      {item.org}{item.kind === "volunteer" && <span className={styles.kind}> · volunteer</span>}
                    </span>
                  </span>
                  <span className={styles.period}>{item.period}</span>
                </summary>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </details>
            ))}
          </div>
        </section>

        <section id="education" className={styles.section} aria-labelledby="education-title">
          <h2 id="education-title">[ education ]</h2>
          <div className={styles.education}>
            {education.map((item) => (
              <div key={item.role}>
                <h3>{item.role}</h3>
                <p>{item.org} · {item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className={styles.section} aria-labelledby="work-title">
          <h2 id="work-title" className={styles.big}>Selected work<span className={styles.count}>{featured.length} of {projects.length}</span></h2>
          <p className={styles.sectionNote}>Mixed reality, games and the tools I wrote along the way.</p>
          <ProjectList projects={featured} showCategory />
          <Link className={styles.more} href="/projects">[ all projects → ]</Link>
        </section>

        <section id="skills" className={styles.section} aria-labelledby="skills-title">
          <h2 id="skills-title">[ tech stack ]</h2>
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

        <section id="activity" className={styles.section} aria-labelledby="activity-title">
          <div className={styles.sectionHeader}>
            <h2 id="activity-title">[ github ]</h2>
            <a href="https://github.com/lakshya-02">@lakshya-02 ↗</a>
          </div>
          {github ? (
            <>
              <GitHubHeatmap days={github.days} total={github.totalContributions} />
              <div className={styles.stats}>
                <p><strong>{github.totalContributions.toLocaleString("en")}</strong><span>contributions, past year</span></p>
                <p><strong>{github.privateCommitCount ?? "n/a"}</strong><span>{github.privateCommitCount === null ? "private commits unavailable" : "private commits, past year"}</span></p>
                <p><strong>{github.publicRepositoryCount}</strong><span>public repositories</span></p>
                <p><strong>{github.publicStarCount}</strong><span>public stars</span></p>
              </div>
            </>
          ) : <p className={styles.sectionNote}>GitHub activity can&apos;t load right now. <a href="https://github.com/lakshya-02">See my profile ↗</a></p>}
          {portfolio && portfolio.languages.length > 0 && (
            <>
              <h3 className={styles.subhead}>Most used languages</h3>
              <TechLogos languages={portfolio.languages} />
            </>
          )}
          {github && (
            <p className={styles.freshness}>
              Updated {github.fetchedAt.slice(0, 10)}. Commit counts cover repositories I own. Language shares reflect public code, excluding forks.
            </p>
          )}
        </section>

        <section id="contact" className={styles.section} aria-labelledby="contact-title">
          <h2 id="contact-title">[ say hello ]</h2>
          <p className={styles.contactIntro}>Have a project in mind?</p>
          <p className={styles.sectionNote}>{siteConfig.contact.body}</p>
          <nav className={styles.socialLinks} aria-label="Contact links">
            {siteConfig.socialLinks.map((link) => <a href={link.href} key={link.href}>[ {link.label.toLowerCase()} ↗ ]</a>)}
          </nav>
          {process.env.EMAILJS_FORM_ENABLED === "true" && (
            <details className={styles.message}>
              <summary>or leave a message here</summary>
              <ContactForm fields={siteConfig.contact.fields} />
            </details>
          )}
        </section>
      </div>
    </div>
  );
}
