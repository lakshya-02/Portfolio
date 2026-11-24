import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    skills: [
      "C",
      "C++",
      "C#",
      "Python",
      "JavaScript",
      "SQL",
    ],
  },
  {
    category: "Unity & games",
    icon: "monitor",
    skills: [
      "Unity 6",
      "New Input System",
      "ProBuilder",
      "ShaderLab",
      "Object Pooling",
    ],
  },
  {
    category: "AR / VR / MR",
    icon: "monitor",
    skills: [
      "Meta Quest SDK",
      "OpenXR",
      "AR Foundation",
      "Google ARCore",
      "Vuforia SDK",
      "IWSDK",
    ],
  },
  {
    category: "Web & graphics",
    icon: "code",
    skills: [
      "WebXR",
      "Three.js",
      "MindAR",
      "GLSL",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Tools & workflow",
    icon: "wrench",
    skills: [
      "Git & GitHub",
      "Blender",
      "OpenCV",
      "MongoDB",
      "RenderDoc",
      "SideQuest",
      "ADB",
    ],
  },
];
