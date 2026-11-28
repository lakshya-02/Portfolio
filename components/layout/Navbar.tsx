import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Navbar() {
  return (
    <header className="mx-auto flex w-[min(100%-2rem,44rem)] items-center justify-between gap-6 py-6 font-mono text-xs text-ink-muted sm:w-[min(100%-3rem,44rem)]">
      <Link href="/" className="py-2 text-accent hover:text-accent-soft focus-visible:outline focus-visible:outline-offset-4">
        ~/lakshya
      </Link>
      <nav aria-label="Primary" className="flex gap-5">
        {siteConfig.navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="py-2 hover:text-accent-soft focus-visible:outline focus-visible:outline-offset-4">
            [ {link.label} ]
          </Link>
        ))}
      </nav>
    </header>
  );
}
