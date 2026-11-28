import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mx-auto flex w-[min(100%-2rem,44rem)] flex-wrap justify-between gap-4 border-t border-line py-8 font-mono text-[11px] text-ink-muted sm:w-[min(100%-3rem,44rem)]">
      <span>{siteConfig.name} / reality is a starting point.</span>
      <a href="#main" className="underline underline-offset-4 hover:text-accent-soft">back to top ↑</a>
    </footer>
  );
}
