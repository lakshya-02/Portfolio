import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "Placeholder summary — a flagship product case study described in a single confident sentence.",
    description: [
      "Placeholder paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describe the problem this project solved, who it served, and the constraints that shaped it.",
      "Placeholder paragraph. Ut enim ad minim veniam, quis nostrud exercitation. Describe the approach, the architecture, and one decision you would defend in a review.",
      "Placeholder paragraph. Duis aute irure dolor in reprehenderit. Close with the outcome — what shipped, what improved, and what you would do differently.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2026",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "Placeholder summary — a developer tool that made a slow workflow fast.",
    description: [
      "Placeholder paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Frame the workflow pain and the people who felt it.",
      "Placeholder paragraph. Excepteur sint occaecat cupidatat non proident. Outline the implementation and the trade-offs taken.",
    ],
    tags: ["Rust", "CLI", "Developer Tools"],
    year: "2026",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "Placeholder summary — a design system that unified a fragmented product surface.",
    description: [
      "Placeholder paragraph. Sed ut perspiciatis unde omnis iste natus error. Describe the fragmentation and its cost.",
      "Placeholder paragraph. Nemo enim ipsam voluptatem quia voluptas. Describe the token system, components, and adoption path.",
    ],
    tags: ["React", "Design Systems", "Storybook"],
    year: "2025",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-four",
    title: "Project Four",
    summary:
      "Placeholder summary — a realtime dashboard for a data-heavy operations team.",
    description: [
      "Placeholder paragraph. At vero eos et accusamus et iusto odio. Describe the data volume and latency requirements.",
      "Placeholder paragraph. Et harum quidem rerum facilis est. Describe the streaming pipeline and rendering strategy.",
    ],
    tags: ["React", "WebSockets", "D3"],
    year: "2025",
    featured: false,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-five",
    title: "Project Five",
    summary:
      "Placeholder summary — a mobile-first commerce experiment with sharp conversion goals.",
    description: [
      "Placeholder paragraph. Temporibus autem quibusdam et aut officiis. Describe the hypothesis and the metric that mattered.",
      "Placeholder paragraph. Itaque earum rerum hic tenetur a sapiente. Describe what the experiment proved or disproved.",
    ],
    tags: ["Next.js", "Stripe", "A/B Testing"],
    year: "2024",
    featured: false,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-six",
    title: "Project Six",
    summary:
      "Placeholder summary — an open-source library with a small API and strong opinions.",
    description: [
      "Placeholder paragraph. Nam libero tempore, cum soluta nobis est. Describe the gap in the ecosystem it filled.",
      "Placeholder paragraph. Omnis voluptas assumenda est, omnis dolor repellendus. Describe the API design and community response.",
    ],
    tags: ["TypeScript", "Open Source", "npm"],
    year: "2024",
    featured: false,
    links: { live: "#", source: "#" },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
