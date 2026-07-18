import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "scanspace",
    title: "ScanSpace",
    summary:
      "Mixed Reality object-scanning platform that reconstructs real-world objects into interaction-ready 3D meshes using stable-fast-3D.",
    description: [
      "ScanSpace is a Meta Quest 3 Mixed Reality application that captures real-world objects and reconstructs them as textured, interaction-ready 3D meshes with a local Stable Fast 3D pipeline.",
      "It features an under-30-second capture-to-mesh round trip, fully offline RTX 4080 inference to guarantee privacy and speed, and live glTF loading/spatial preview directly inside the MR scene.",
    ],
    tags: [
      "Unity",
      "OpenXR",
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
      "A full-scale driving simulator with one-to-one steering-wheel input, realistic vehicle control, and a rendering pipeline optimized for standalone VR.",
    description: [
      "A full-scale driving simulator built in Unity featuring one-to-one physical steering-wheel input mapping and realistic vehicle dynamics.",
      "Optimized for performance to maintain a sustained 90 FPS on standalone Meta Quest 2 using dynamic LOD, batching, occlusion culling, and custom URP render settings.",
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
      "A mobile world-scale AR game where players scan physical environments, discover virtual chests, and collect items by moving through space.",
    description: [
      "A mobile AR game where players scan real-world environments to reveal virtual chest placements and interact with virtual objects in real-world spaces.",
      "Features physical navigation integrated directly into the gameplay loop, built with AR Foundation, Google ARCore, and Unity.",
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
      "A browser-native image-tracking experience with custom GLSL shaders, designed for fast loading and stable real-time marker tracking.",
    description: [
      "An installation-free WebAR experience using MindAR, Three.js, and custom GLSL shaders.",
      "Optimized to deliver sub-two-second asset load times and stable real-time tracking on mobile browsers with zero setup required.",
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
      "A tabletop AR maze that turns mobile device movement into physics-based ball control over a board anchored to a Vuforia target.",
    description: [
      "A physics-driven tabletop AR game that transforms device gyroscope tilt into physical force acting on a virtual ball inside a tracked maze.",
      "Anchored to Vuforia image targets to ensure high-fidelity tracking, keeping a stable 60 FPS under standard lighting.",
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
      "A rule-breaking 2D puzzle platformer where each level changes the rules, built in six days for the StarCade Game Jam.",
    description: [
      "A creative 2D puzzle platformer that challenges players to experiment, break established game conventions, and adapt as each level introduces unique rules.",
      "Developed in under a week for the StarCade Game Jam, released for both HTML5 web play and Windows desktop download.",
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
      "A portrait mobile puzzle game with runtime-generated prompts challenging players to match falling 3D objects by real color and shape.",
    description: [
      "Designed a portrait puzzle game with runtime-generated prompts that challenge players to match falling 3D objects by real color and shape.",
      "Built JSON-driven content, challenge scaling, object pooling, touch raycast input, scoring, timer rewards/penalties, menu, HUD, restart, and game-over screens.",
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
      "An open-source pipeline that reconstructs modular Unity uGUI layouts from reference images using local OCR and JSON schemas.",
    description: [
      "An open-source utility that reconstructs modular Unity uGUI layouts directly from design references using a local OCR/CV model and JSON serialization.",
      "Created with local-first tooling and zero paid APIs, optimized to aid XR developers building complex world-space user interfaces in Unity.",
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
