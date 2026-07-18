import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Lakshya Singh",
  role: "XR & Game Developer",
  headline: "Building immersive worlds with Unity &",
  headlineAccent: "Extended Reality",
  tagline:
    "I create cross-platform XR, VR, AR, and game experiences focused on performance, interaction design, and polished user experience.",
  email: "lakshya.singh2706@gmail.com",
  footerNote: "© 2026 Lakshya Singh — Building immersive systems that make complex ideas feel intuitive.",
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
    about: { eyebrow: "About", title: "A short introduction." },
    projects: { eyebrow: "Projects", title: "Selected work." },
    skills: { eyebrow: "Skills", title: "Tools of the trade." },
    experience: { eyebrow: "Experience", title: "Where I've been." },
    contact: { eyebrow: "Contact", title: "Let's build something." },
  },
  about: {
    intro:
      "I'm Lakshya, a Computer Science undergraduate at SRM University-AP passionate about building immersive experiences with Extended Reality.",
    body: [
      "My work spans educational simulations, immersive games, mobile AR, browser-based AR, and Meta Quest experiences. I enjoy pairing intuitive interaction design with performant real-time 3D systems.",
      "Beyond development, I mentor 15+ developers at Next Tech Lab, co-organized a nationwide game jam across 5+ universities, and volunteer with Intercollegiate XR's global network of 50+ university clubs. Along the way: XR Track Winner at HackSRM 7.0, 1st at ImmersiveX Ideathon, 3rd at 9Hacks with ScanSpace, and MongoDB Associate Developer certified.",
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
    body: "I'm currently looking for XR Software Engineering opportunities where I can build impactful spatial computing products. If you have an interesting project or role, let's connect!",
    formNote:
      "This form is currently a template. You can reach out directly via email.",
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
