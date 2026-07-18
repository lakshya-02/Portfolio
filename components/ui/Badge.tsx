import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "border-line text-ink-muted",
  blue: "border-blue/40 text-blue",
} as const;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-white/[0.03] px-3 py-1 text-xs font-medium backdrop-blur-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
