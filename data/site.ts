import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Your Name",
  role: "Software Engineer",
  headline: "Building bold digital products with",
  headlineAccent: "intent",
  tagline:
    "Placeholder tagline — a short statement about the work you do, who you do it for, and the standard you hold it to.",
  availability: "Available for new projects",
  email: "hello@example.com",
  footerNote: "© 2026 Your Name — a portfolio template awaiting real content.",
  skipToContent: "Skip to content",
  navLinks: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "#", icon: "github" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
  ],
  heroCtas: {
    primary: { label: "View projects", href: "/projects" },
    secondary: { label: "Get in touch", href: "/#contact" },
  },
  sections: {
    about: { eyebrow: "About", title: "A short introduction." },
    projects: { eyebrow: "Projects", title: "Selected work." },
    skills: { eyebrow: "Skills", title: "Tools of the trade." },
    experience: { eyebrow: "Experience", title: "Where I've been." },
    contact: { eyebrow: "Contact", title: "Let's build something." },
  },
  about: {
    intro:
      "Placeholder pull-quote: one confident sentence about the kind of problems you love to solve and why.",
    body: [
      "Placeholder paragraph one. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describe your background, your craft, and what drives the work — two or three sentences at most.",
      "Placeholder paragraph two. Sed do eiusmod tempor incididunt ut labore. A second short paragraph for values, approach, or what you're exploring right now.",
    ],
  },
  projectsCta: { label: "View all projects", href: "/projects" },
  projectsPage: { eyebrow: "Archive", title: "All projects." },
  projectDetail: {
    back: "All projects",
    live: "Visit live site",
    source: "View source",
  },
  contact: {
    body: "Placeholder invitation — say how you like to be contacted and what kinds of projects or roles you're open to.",
    formNote:
      "This form is a placeholder. Submission wiring is added when the template gets real content.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved. Head back to the start.",
    cta: "Back home",
  },
};
