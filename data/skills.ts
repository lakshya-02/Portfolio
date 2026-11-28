import type { SkillGroup } from "@/lib/types";

// Text only. Language logos appear in the GitHub section (components/sections/TechLogos.tsx).
export const skillGroups: SkillGroup[] = [
  {
    category: "Game development",
    skills: ["Unity 6", "Gameplay programming", "Unity Input System", "ProBuilder", "ShaderLab", "Object pooling"],
  },
  {
    category: "XR & spatial computing",
    skills: ["Meta XR SDK", "Meta Quest 3", "OpenXR", "Spatial interaction", "AR Foundation", "Google ARCore", "Vuforia Engine"],
  },
  {
    category: "AI & agents",
    skills: ["AI agents", "LLM integration", "Model Context Protocol (MCP)", "Tool calling", "Unity Sentis"],
  },
  {
    category: "Web & graphics",
    skills: ["WebXR", "Three.js", "Immersive Web SDK (IWSDK)", "MindAR", "GLSL"],
  },
  {
    category: "Tools",
    skills: ["Git & GitHub", "Blender", "RenderDoc", "SideQuest", "Android Debug Bridge (ADB)"],
  },
  {
    category: "Data & vision",
    skills: ["SQL", "MongoDB", "Computer vision", "OpenCV"],
  },
];
