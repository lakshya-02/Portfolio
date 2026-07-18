"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-8">
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out max-w-5xl w-full ${
          scrolled
            ? "mt-3 rounded-full border border-white/10 bg-void/80 px-6 py-2.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
            : "mt-6 bg-transparent px-2 py-2"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-display text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:border-pink/40 hover:bg-pink/5"
        >
          {/* Custom Interlocking 3D SVG logo (Isometric layers stack) */}
          <svg
            className="size-5 transition-transform duration-500 group-hover:scale-110"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2e88" />
                <stop offset="100%" stopColor="#9b51e0" />
              </linearGradient>
            </defs>
            <path
              d="M16 6L6 11L16 16L26 11L16 6Z"
              fill="url(#logo-grad)"
              opacity="0.95"
            />
            <path
              d="M6 16L16 21L26 16"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 21L16 26L26 21"
              stroke="url(#logo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="transition-all duration-300 group-hover:text-pink">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1.5">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-all duration-300 hover:bg-white/[0.04] hover:text-white border border-transparent hover:border-white/[0.08]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-ink transition-colors hover:border-pink/40 hover:bg-pink/5 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          aria-label="Primary mobile"
          className="mx-auto mt-2 max-w-sm rounded-2xl border border-white/12 bg-void/90 p-4 shadow-xl backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-ink-muted transition-all duration-200 hover:border-white/5 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
