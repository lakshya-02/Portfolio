import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 font-display font-bold">
            <span aria-hidden className="size-2 bg-pink" />
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.footerNote}</p>
        </div>
        <SocialLinks />
      </Container>
    </footer>
  );
}
