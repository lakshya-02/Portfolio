import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors duration-300 hover:border-pink/50 hover:bg-white/[0.05] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
