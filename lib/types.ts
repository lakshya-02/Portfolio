export interface SectionMeta {
  eyebrow: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  skipToContent: string;
  navLinks: NavLink[];
  socialLinks: NavLink[];
  projectsPage: SectionMeta;
  projectDetail: { back: string; live: string; source: string };
  contact: {
    body: string;
    fields: { name: string; email: string; message: string; submit: string };
  };
  notFound: { title: string; body: string; cta: string };
}

export type ProjectCategory = "XR" | "Games" | "General";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string[];
  tags: string[];
  year: string;
  featured: boolean;
  links: { live: string; source: string };
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  kind: "work" | "education" | "volunteer";
  bullets: string[];
  link?: string;
}
