import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-pink">
        <span aria-hidden className="inline-block size-2 bg-pink" />
        {eyebrow}
      </p>
      <Heading className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </Heading>
    </div>
  );
}
