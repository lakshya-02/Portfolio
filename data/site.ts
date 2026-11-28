import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Lakshya Singh",
  role: "XR & Game Developer",
  tagline: "I build mixed reality apps and games in Unity, mostly for Meta Quest.",
  skipToContent: "Skip to content",
  navLinks: [
    { label: "home", href: "/" },
    { label: "projects", href: "/projects" },
  ],
  socialLinks: [
    { label: "Email", href: "mailto:lakshya.singh2706@gmail.com" },
    { label: "GitHub", href: "https://github.com/lakshya-02" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshya-singh-2833a2328" },
  ],
  projectsPage: { eyebrow: "portfolio / projects", title: "Projects" },
  projectDetail: {
    back: "all projects",
    live: "open it",
    source: "source",
  },
  contact: {
    body: "I'm looking for internships, research positions and XR engineering roles.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
    },
  },
  notFound: {
    title: "Page not found",
    body: "Nothing lives at this address. It may have moved.",
    cta: "back home",
  },
};
