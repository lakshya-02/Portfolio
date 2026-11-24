import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mx-auto flex w-[calc(100%-3rem)] max-w-3xl flex-wrap justify-between gap-4 border-t border-white/10 py-8 text-[11px] text-ink-muted">
      <span>{siteConfig.name} / reality is a starting point.</span>
      <a href="#main" className="underline underline-offset-4">back to top ↑</a>
    </footer>
  );
}
