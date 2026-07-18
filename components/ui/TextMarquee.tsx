"use client";

const line1 = [
  "Unity 6",
  "C#",
  "OpenXR",
  "Meta Quest SDK",
  "ShaderLab",
  "Spatial Computing",
  "Real-Time 3D",
  "URP",
];
const line2 = [
  "AR Foundation",
  "Gameplay Systems",
  "Graphics Optimization",
  "Hand Tracking",
  "Passthrough",
  "GLSL Shaders",
  "Vuforia SDK",
  "3D Math",
];

const gradients = [
  "bg-gradient-to-r from-pink to-blue",
  "bg-gradient-to-r from-green to-yellow",
  "bg-gradient-to-r from-orange to-red",
  "bg-gradient-to-r from-blue to-green",
  "bg-gradient-to-r from-yellow to-orange",
  "bg-gradient-to-r from-red to-pink",
];

function MarqueeLine({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`flex w-max gap-12 whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {doubled.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center gap-12 font-display text-4xl font-extrabold uppercase tracking-widest sm:text-5xl"
        >
          <span
            className={`${gradients[idx % gradients.length]} bg-clip-text text-transparent`}
          >
            {item}
          </span>
          <span aria-hidden className="size-2.5 rounded-full bg-pink/40" />
        </span>
      ))}
    </div>
  );
}

export function TextMarquee() {
  return (
    <div className="relative my-12 flex w-full select-none flex-col gap-6 overflow-hidden border-y border-white/[0.06] py-8">
      <MarqueeLine items={line1} />
      <MarqueeLine items={line2} reverse />
    </div>
  );
}
