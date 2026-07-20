import {
  Glasses,
  Boxes,
  Globe,
  MousePointer2,
  Camera,
  Radar,
  ScanLine,
  Scan,
  Braces,
  Eye,
  Hand,
  Hash,
  Gamepad2,
  Atom,
  Keyboard,
  PenTool,
  LayoutGrid,
  Layers3,
  Sparkles,
  Paintbrush,
  Zap,
  SlidersHorizontal,
  Layers,
  EyeOff,
  Terminal,
  TerminalSquare,
  Code2,
  FileCode,
  Palette,
  Database,
  Box,
  Cpu,
  GitBranch,
  Component,
  ScanEye,
  Bug,
  Smartphone,
  MonitorSmartphone,
  Usb,
  Code,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const skillIcons: Record<string, LucideIcon> = {
  "Meta Quest SDK": Glasses,
  OpenXR: Boxes,
  WebXR: Globe,
  "XR Interaction Toolkit": MousePointer2,
  "AR Foundation": Camera,
  "Google ARCore": Radar,
  "Vuforia SDK": ScanLine,
  MindAR: Scan,
  IWSDK: Braces,
  "Passthrough Dev": Eye,
  "Hand Tracking": Hand,
  "Unity 6": Boxes,
  "C#": Hash,
  "Gameplay Systems": Gamepad2,
  Physics: Atom,
  "New Input System": Keyboard,
  ProBuilder: PenTool,
  "UI Systems": LayoutGrid,
  URP: Layers3,
  ShaderLab: Sparkles,
  GLSL: Braces,
  "Shader Programming": Paintbrush,
  "Real-Time Rendering": Zap,
  "Dynamic LOD": SlidersHorizontal,
  "Draw Call Batching": Layers,
  "Occlusion Culling": EyeOff,
  C: Terminal,
  "C++": TerminalSquare,
  Python: Code2,
  JavaScript: Braces,
  HTML: FileCode,
  CSS: Palette,
  SQL: Database,
  "Three.js": Box,
  "Unity Editor": Cpu,
  "Git & GitHub": GitBranch,
  Blender: Component,
  OpenCV: ScanEye,
  MongoDB: Database,
  RenderDoc: Bug,
  SideQuest: Smartphone,
  "Quest Dev Hub": MonitorSmartphone,
  ADB: Usb,
  "VS Code": Code,
};

const defaultSkillIcon: LucideIcon = Sparkles;

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.skills.eyebrow}
          title={siteConfig.sections.skills.title}
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <StaggerItem key={group.category}>
              <Card className="h-full">
                <div className="flex items-center gap-2.5">
                  <span aria-hidden className="size-2 bg-pink" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
                    {group.category}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const Icon = skillIcons[skill] ?? defaultSkillIcon;
                    return (
                      <Badge
                        key={skill}
                        className="gap-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:!border-pink/50 hover:!text-pink hover:shadow-[0_0_16px_-4px_rgba(255,46,136,0.5)]"
                      >
                        <Icon className="size-3.5" />
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
