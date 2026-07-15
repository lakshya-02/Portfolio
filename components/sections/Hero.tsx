import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-sm text-ink-muted">
            <span aria-hidden className="size-2 rounded-full bg-blue" />
            {siteConfig.availability}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {siteConfig.headline}{" "}
            <span className="text-stroke">{siteConfig.headlineAccent}</span>
            <span className="text-pink">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            {siteConfig.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={siteConfig.heroCtas.primary.href}>
              {siteConfig.heroCtas.primary.label}
            </Button>
            <Button href={siteConfig.heroCtas.secondary.href} variant="outline">
              {siteConfig.heroCtas.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
