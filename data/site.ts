import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Lakshya Singh",
  role: "XR & Game Developer",
    headline: "Reality is just the",
    headlineAccent: "Starting Point ",
    heroEyebrow: "XR Developer • Unity Engineer • Reality Optional",
    tagline:
      "I design immersive XR experiences and make some Game in Unity to feel real, even when it's not.",
  email: "lakshya.singh2706@gmail.com",
  footerNote: "Building immersive experiences through Unity and Extended Reality.",
  skipToContent: "Skip to content",
  navLinks: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/lakshya-02", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshya-singh-2833a2328", icon: "linkedin" },
    { label: "Email", href: "mailto:lakshya.singh2706@gmail.com", icon: "mail" },
  ],
  heroCtas: {
    primary: { label: "View projects", href: "/projects" },
    secondary: { label: "Get in touch", href: "/#contact" },
  },
  heroImage: {
    src: "/images/tarot-card.jpg",
    alt: "Illustrated portrait in a red robe against a pink-lit backdrop",
  },
  sections: {
    about: { eyebrow: "About", title: "About Me" },
    projects: { eyebrow: "Projects", title: "Selected work" },
    skills: { eyebrow: "Skills", title: "Tech Stack" },
    experience: { eyebrow: "Experience", title: "Experience" },
    contact: { eyebrow: "Contact", title: "Let's build something" },
  },
  about: {
    paragraphs: [
      "Hello, I'm **Lakshya**.",
      "My journey into game development began with a simple fascination: the ability to create worlds that didn't exist before. That curiosity quickly turned into a passion for building interactive experiences, pushing me deeper into creativity and innovation.",
      "As I explored further, I discovered **Augmented Reality**, which completely changed the way I looked at technology. Soon after, I stepped into the world of **Virtual Reality** and there has been no looking back ever since.",
      "By degree, I'm just another Computer Science student. But by grace, I'm an XR developer who believes reality is only the starting point. I love turning possibility into immersive experiences that people can feel.",
    ],
  },
  projectsCta: { label: "View all projects", href: "/projects" },
  projectsPage: { eyebrow: "Archive", title: "All projects" },
  projectDetail: {
    back: "All projects",
    live: "Visit live site",
    source: "View source",
  },
  contact: {
    body: "Open to internships, research, and XR software engineering opportunities. Let's build something great together.",
    formNote: "",
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
