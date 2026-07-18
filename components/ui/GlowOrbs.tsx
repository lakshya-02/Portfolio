import { cn } from "@/lib/utils";

export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -left-40 -top-40 size-[26rem] rounded-full bg-pink/30 blur-[110px]" />
      <div className="absolute -right-32 top-1/3 size-[22rem] rounded-full bg-blue/25 blur-[110px]" />
      <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-yellow/10 blur-[130px]" />
    </div>
  );
}
