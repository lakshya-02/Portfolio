"use client";

const line1 = [
  "Unity",
  "C#",
  "OpenXR",
  "Meta SDK",
  "C++",
  "Spatial Computing",
  "Real-Time 3D",
  "Human Computer Interaction",
  "Python",
  "IWSDK",
  "C",
  "Computer Vision",
  "JavaScript",
  "MongoDB",
];
const line2 = [
  "Google ARCore",
  "Apple ARKit",
  "Gameplay Systems",
  "HTML/CSS",
  "Graphics Optimization",
  "MRUK",
  "Passthrough",
  "Vuforia SDK",
  "2D/3D Game Development",
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-void/80 px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <span
            className={`${gradients[idx % gradients.length]} bg-clip-text font-display text-xl font-extrabold uppercase tracking-widest text-transparent sm:text-2xl`}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TextMarquee() {
  return (
    <div className="relative my-12 flex w-full select-none flex-col gap-4 overflow-hidden border-y border-white/6 py-5">
      <MarqueeLine items={line1} />
      <MarqueeLine items={line2} reverse />
    </div>
  );
}
