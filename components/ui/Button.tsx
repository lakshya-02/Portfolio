import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-pink text-white hover:bg-pink/90 hover:shadow-[0_0_28px_-4px_rgba(255,46,136,0.6)]",
  outline:
    "border border-white/15 bg-white/[0.04] text-ink backdrop-blur-sm backdrop-saturate-150 hover:border-blue/60 hover:text-blue hover:shadow-[0_0_22px_-6px_rgba(63,169,255,0.45)]",
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
    "inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-base font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink",
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
