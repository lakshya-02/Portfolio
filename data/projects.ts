import type { Project, ProjectCategory } from "@/lib/types";

export const projectCategories: ProjectCategory[] = ["XR", "Games", "General"];

// Array order is the ranking: most impressive first. /projects and the pager follow it.
export const projects: Project[] = [
  {
    slug: "scanspace",
    title: "ScanSpace",
    category: "XR",
    summary: "Scan a real object with a Meta Quest 3 and put the 3D model back in your room.",
    description: [
      "ScanSpace is a Meta Quest 3 mixed reality prototype. You capture an object through passthrough, crop it from the headset view, and send the image to a GPU server that generates a 3D model. The server returns a .glb file, Unity loads it at runtime, and you can place, move, rotate, scale, save or remove the model in your room.",
      "The public repository is a small Unity template with the pipeline documented and the demo video linked. The full Unity project, the generation backend and the model weights are private.",
    ],
    tags: ["Unity", "Meta Quest 3", "Passthrough camera", "Image-to-3D", "GLB"],
    year: "2026",
    featured: true,
    links: {
      live: "https://www.youtube.com/watch?v=fjbvRinMEPQ",
      source: "https://github.com/lakshya-02/ScanSpace",
    },
  },
  {
    slug: "quest-vision-assistant",
    title: "Quest Vision Assistant",
    category: "XR",
    summary: "A Quest 3 assistant that names what the headset sees and answers spoken questions about it.",
    description: [
      "A Unity 6 mixed reality app for Meta Quest 3. The passthrough camera feeds a bundled YOLO12n model running in Unity Sentis, and each frame's detections become class counts, screen positions and cautious colour estimates.",
      "Press left X to ask a question out loud or left Y to hear an inventory of what is in view. Direct visual questions are answered on the headset. Other requests go to a small Python gateway on a PC, which uses Google AI Studio for the answer and ElevenLabs for speech recognition and the spoken reply.",
      "The project has 36 Unity Edit Mode tests and six gateway tests, and the repository includes the IEEE paper written about it. Detector accuracy, frame rate, memory and power were not measured in a controlled trial.",
    ],
    tags: ["Unity 6", "Meta XR SDK", "Unity Sentis", "YOLO", "Python"],
    year: "2026",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/Object-Detection",
    },
  },
  {
    slug: "dvr",
    title: "DVR",
    category: "XR",
    summary: "A mixed reality cinema for Meta Quest 3 where you load a disc into a player and watch on a screen in your room.",
    description: [
      "Pick up a disc and put it in the player, or point a controller at a disc in the floating library. Films and live TV play on a screen in your room, and you can pause, skip ten seconds or change the volume from controller buttons or a floating panel.",
      "The Personal source browses a Google Drive through a companion service, or opens Netflix and Prime Video in their official web players. You can move the deck and the screen to suit your room.",
    ],
    tags: ["Unity", "Meta Quest 3", "Mixed reality", "Google Drive"],
    year: "2026",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/DVR",
    },
  },
  {
    slug: "roomspell",
    title: "RoomSpell",
    category: "Games",
    summary: "A Quest mixed reality word game: pick three objects from your room and spell a word they suggest.",
    description: [
      "Scan your surroundings, tap three detected objects, then arrange letter tiles into a word inspired by them. A cup, a pen and a notebook can give STUDY, and solving a round unlocks another answer from the same objects.",
      "Objects are recognised on the headset by a YOLO12n model in Unity's Inference Engine, using the Quest passthrough camera. An object counts only after two consecutive detection passes agree. Word challenges come from a curated offline word bank, not a language model. The COCO model has no pen or notebook class, so the board offers labelled manual additions for them.",
    ],
    tags: ["Unity 6", "Meta Quest 3", "Passthrough camera", "YOLO", "C#"],
    year: "2026",
    featured: false,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/RoomSpell",
    },
  },
  {
    slug: "vr-car-driving-simulator",
    title: "VR Car Driving Simulator",
    category: "XR",
    summary: "A Unity driving simulator for Meta Quest 2 with head tracking and NITTO Drive 1 Pro wheel support.",
    description: [
      "You sit in a first-person driver seat with head tracking, and drive with a NITTO Drive 1 Pro wheel in Xbox mode or any ordinary controller. A headset is optional.",
      "The car uses wheel colliders and Vehicle Physics Pro, with driver, hood and free-look cameras. The project runs on OpenXR with single pass rendering and is played through Air Link.",
    ],
    tags: ["Unity", "OpenXR", "Meta Quest 2", "Vehicle Physics Pro", "C#"],
    year: "2025",
    featured: false,
    links: {
      live: "https://lakshya-2706.itch.io/vr-driving-simulator",
      source: "https://github.com/lakshya-02/The_Car_Simulator_-VR-",
    },
  },
  {
    slug: "unity-ui-bridge",
    title: "Unity UI Bridge",
    category: "General",
    summary: "An open-source tool that rebuilds Unity uGUI layouts from a screenshot or concept image.",
    description: [
      "Unity UI Bridge turns a reference UI image into a JSON layout spec, and a Unity Editor importer builds modular uGUI from that spec. A schema and a Python validator check each spec before it reaches Unity.",
      "Everything runs locally. The image-to-spec step uses local OCR and computer vision, so it needs no API keys or paid services, and the model adapters can be swapped. It targets uGUI first, with XR and world-space layouts in mind. The image-to-spec tooling is still early.",
    ],
    tags: ["Unity Editor", "C#", "Python", "OCR"],
    year: "2026",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/Unity-UI-Bridge",
    },
  },
  {
    slug: "endless-puzzle",
    title: "Endless Puzzle",
    category: "Games",
    summary: "A portrait mobile game where you tap the falling shape that matches, while the labels lie to you.",
    description: [
      "Each prompt asks for a colour and a shape, and you tap the falling 3D object that matches. The labels on the objects and the colour of the prompt text are often wrong on purpose, so you have to trust the object itself.",
      "Colours, shapes, question templates, difficulty and spawn settings all live in JSON, and difficulty climbs with your score. Falling objects are pooled, and the Unity UI covers the menu, HUD, restart and game over screens.",
    ],
    tags: ["Unity", "C#", "Mobile", "Object Pooling"],
    year: "2026",
    featured: true,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/Endless-Puzzle",
    },
  },
  {
    slug: "illegal-move",
    title: "ILLegal Move",
    category: "Games",
    summary: "A 2D puzzle platformer built in six days for the StarCade Game Jam. The theme was rules are meant to be broken.",
    description: [
      "Every level adds a twist, and you finish a stage by working out what the twist is. A death counter tracks your attempts.",
      "Move with the arrow keys or A and D, and jump with space. It is built in Unity with C#, using assets from the Unity Asset Store, itch and Pixabay.",
    ],
    tags: ["Unity", "C#", "Game jam"],
    year: "2025",
    featured: false,
    links: {
      live: "",
      source: "https://github.com/lakshya-02/StarCade-Gamejam",
    },
  },
];

export const categorySlugs = projectCategories.map((category) => category.toLowerCase());

export function getCategoryBySlug(slug: string): ProjectCategory | undefined {
  return projectCategories.find((category) => category.toLowerCase() === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
