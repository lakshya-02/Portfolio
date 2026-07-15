import { cn } from "@/lib/utils";

export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -left-40 -top-40 size-[26rem] rounded-full bg-pink/20 blur-[110px]" />
      <div className="absolute -right-32 top-1/3 size-[22rem] rounded-full bg-blue/15 blur-[110px]" />
    </div>
  );
}
