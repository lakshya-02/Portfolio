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
        "group relative rounded-lg border border-line bg-panel p-6 transition-colors duration-300 hover:border-pink/60 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
