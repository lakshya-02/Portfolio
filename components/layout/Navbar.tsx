import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Navbar() {
  return (
    <header className="mx-auto flex w-[calc(100%-3rem)] max-w-3xl items-center justify-between gap-6 py-6 font-mono text-xs text-ink-muted">
      <Link href="/" className="py-2 hover:text-white focus-visible:outline focus-visible:outline-offset-4">
        {siteConfig.name}
      </Link>
      <nav aria-label="Primary" className="flex gap-6">
        {siteConfig.navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="py-2 hover:text-white focus-visible:outline focus-visible:outline-offset-4">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
