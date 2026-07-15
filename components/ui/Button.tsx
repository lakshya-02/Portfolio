import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-pink text-white hover:bg-pink/90 hover:shadow-[0_0_28px_-4px_rgba(209,25,95,0.6)]",
  outline:
    "border border-white/15 bg-white/[0.02] text-ink backdrop-blur-sm hover:border-blue/60 hover:text-blue hover:shadow-[0_0_22px_-6px_rgba(47,143,230,0.45)]",
  ghost: "text-ink-muted hover:text-ink",
} as const;

interface ButtonProps {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink",
    variants[variant],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
