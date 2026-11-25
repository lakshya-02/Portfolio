import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Lakshya Singh",
  role: "XR & Game Developer",
  tagline:
    "I design immersive XR experiences and make some Game to feel real, even when it's not.",
  skipToContent: "Skip to content",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#work" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/lakshya-02" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshya-singh-2833a2328" },
    { label: "Email", href: "mailto:lakshya.singh2706@gmail.com" },
  ],
  projectsPage: { eyebrow: "Archive", title: "All projects" },
  projectDetail: {
    back: "All projects",
    live: "Visit live site",
    source: "View source",
  },
  contact: {
    body: "Open to internships, research, and XR software engineering opportunities. Let's build something great together.",
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
