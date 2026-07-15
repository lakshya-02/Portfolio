export interface SectionMeta {
  eyebrow: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type SocialIconId = "github" | "linkedin" | "mail" | "twitter";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconId;
}

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  headlineAccent: string;
  tagline: string;
  availability: string;
  email: string;
  footerNote: string;
  skipToContent: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  heroCtas: { primary: NavLink; secondary: NavLink };
  sections: {
    about: SectionMeta;
    projects: SectionMeta;
    skills: SectionMeta;
    experience: SectionMeta;
    contact: SectionMeta;
  };
  about: { intro: string; body: string[] };
  projectsCta: NavLink;
  projectsPage: SectionMeta;
  projectDetail: { back: string; live: string; source: string };
  contact: {
    body: string;
    formNote: string;
    fields: { name: string; email: string; message: string; submit: string };
  };
  notFound: { title: string; body: string; cta: string };
}

export interface Project {
  slug: string;
  title: string;
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
  kind: "work" | "education";
  bullets: string[];
}
