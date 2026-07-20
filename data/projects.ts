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
  {
    slug: "treasure-hunt-ar",
    title: "Treasure Hunt AR",
    summary:
      "Mobile AR treasure hunt using world-scale tracking.",
    description: [
      "A mobile AR treasure hunt that turns whatever room or yard you're standing in into an explorable map. Built with AR Foundation and Google ARCore, it tracks real-world scale so clues and hidden objects stay locked in place as players walk around and look through their phone.",
    ],
    tags: ["Unity", "C#", "AR Foundation", "Google ARCore", "Android"],
    year: "2026",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/TreasureHunt-AR",
    },
  },
  {
    slug: "webar-image-tracking",
    title: "WebAR Image Tracking",
    summary:
      "Browser-based image tracking with fast marker detection and custom shaders.",
    description: [
      "A browser-only WebAR experience — no app install required. MindAR handles fast image-marker detection straight from the camera feed, Three.js renders the 3D overlay, and custom GLSL shaders keep the tracked content sharp and responsive even on mid-range phones.",
    ],
    tags: ["WebXR", "MindAR", "Three.js", "GLSL", "HTML"],
    year: "2025",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/WebAR",
    },
  },
  {
    slug: "ar-maze",
    title: "AR Maze",
    summary:
      "Tabletop AR maze controlled through mobile device tilt.",
    description: [
      "A tabletop AR maze that sits on a printed marker and is steered entirely by tilting the phone. Vuforia keeps the maze locked to the marker with stable image tracking, while the ball's motion runs on real device-gyroscope physics instead of touch input.",
    ],
    tags: ["Unity", "Vuforia SDK", "AR Foundation", "ShaderLab"],
    year: "2025",
    featured: false,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/AR-Maze",
    },
  },
  {
    slug: "illegal-move",
    title: "ILLegal Move",
    summary:
      "Rule-breaking 2D platformer built in six days for StarCade Game Jam.",
    description: [
      "Built in six days for the StarCade Game Jam, ILLegal Move is a 2D puzzle platformer where the rules themselves are the puzzle — each level quietly breaks or inverts a mechanic you'd just learned, so progress comes from testing what's actually allowed rather than executing a known pattern.",
    ],
    tags: ["Unity", "C#", "WebGL"],
    year: "2026",
    featured: false,
    links: {
      live: "https://lakshya-2706.itch.io/illegal-move",
      source: "https://github.com/lakshya-02/StarCade-Gamejam",
    },
  },
  {
    slug: "endless-puzzle",
    title: "Endless Puzzle",
    summary:
      "Portrait mobile puzzle game with runtime-generated color and shape challenges.",
    description: [
      "A portrait-mode mobile puzzle game where color and shape challenges are generated at runtime rather than hand-authored, so no two sessions play out the same. Levels are driven by JSON-defined content, with object pooling keeping touch input and HUD scoring smooth even as challenges spawn continuously.",
    ],
    tags: ["Unity", "C#", "JSON", "Object Pooling", "Android"],
    year: "2026",
    featured: false,
    links: {
      live: "",
      source: "https://github.com/lakshya-02",
    },
  },
  {
    slug: "unity-ui-bridge",
    title: "Unity UI Bridge",
    summary:
      "Local-first tool for rebuilding Unity uGUI layouts from reference images.",
    description: [
      "An open-source, local-first tool that skips manual UI layout work entirely: feed it a reference image or mockup, and an OCR/computer-vision pipeline detects text and UI regions, then generates a modular Unity uGUI hierarchy that matches it — no cloud services, no design handoff friction.",
    ],
    tags: ["Unity", "C#", "Python", "JSON Schema", "OCR/CV"],
    year: "2026",
    featured: false,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/Unity-UI-Bridge",
    },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
