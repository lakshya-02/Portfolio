import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "scanspace",
    title: "ScanSpace",
    summary:
      "Capture real world objects into optimized 3D Objects for Mixed Reality.",
    description: [
      "ScanSpace turns a Meta Quest 3 into a handheld 3D scanner. Point at any real-world object, capture it from a few angles, and the app reconstructs an optimized, game-ready 3D model without ever leaving the headset or touching the cloud.",
      "The reconstruction pipeline runs through Stable Fast 3D for mesh generation and GLTFast for fast, standards-compliant loading, with custom ShaderLab shaders keeping materials lightweight enough to render live in mixed reality. Every scan stays on-device, so it works fully offline and keeps captured objects private by default.",
      "Once a scan finishes, the model drops straight into your space as a spatially anchored object you can walk around, resize, and place — turning a physical object into reusable 3D content in minutes instead of hours in a desktop pipeline.",
    ],
    tags: [
      "Unity",
      "Meta Quest SDK",
      "Stable Fast 3D",
      "GLTFast",
      "ShaderLab",
    ],
    year: "2026",
    featured: true,
    links: {
      live: "https://www.youtube.com/watch?v=fjbvRinMEPQ",
      source: "https://github.com/lakshya-02/ScanSpace",
    },
  },
  {
    slug: "vr-car-driving-simulator",
    title: "VR Car Driving Simulator",
    summary:
      "VR driving simulator with realistic steering and standalone Meta Quest support.",
    description: [
      "A standalone VR driving simulator built for Meta Quest, focused on making the steering wheel feel real. Controller rotation maps one-to-one to the in-car wheel, so turning your wrists actually turns the car — no snap-turning, no disconnect between input and motion.",
      "Under the hood it's a Unity physics-driven vehicle controller tuned for standalone headsets: careful draw-call and shader budgets keep frame time stable so the cockpit stays comfortable to sit in for long sessions, which matters more in VR than almost anything else.",
    ],
    tags: [
      "Unity",
      "OpenXR",
      "Meta Quest SDK",
      "ProBuilder",
      "ShaderLab",
      "New Input System",
    ],
    year: "2024",
    featured: true,
    links: {
      live: "https://lakshya-2706.itch.io/vr-driving-simulator",
      source: "https://github.com/lakshya-02/The_Car_Simulator_-VR-",
    },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
