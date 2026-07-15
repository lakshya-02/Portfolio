import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-pink text-black hover:bg-pink/90 hover:shadow-[0_0_24px_rgba(255,46,136,0.35)]",
  outline: "border border-line text-ink hover:border-pink hover:text-pink",
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
