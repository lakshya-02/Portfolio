import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "border-line text-ink-muted",
  blue: "border-blue/40 text-blue",
} as const;

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
