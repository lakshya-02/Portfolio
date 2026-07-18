import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section>
      <Container className="grid min-h-[calc(100svh-4rem)] max-w-none content-center items-start gap-12 py-24 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-20 xl:px-28">
        <div className="lg:pt-36">
          <Reveal>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
              {siteConfig.headline}{" "}
              <span className="bg-gradient-to-r from-pink to-blue bg-clip-text text-transparent sm:whitespace-nowrap">
                {siteConfig.headlineAccent}
              </span>
              <span className="text-pink">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
              {siteConfig.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={siteConfig.heroCtas.primary.href}>
                {siteConfig.heroCtas.primary.label}
              </Button>
              <Button
                href={siteConfig.heroCtas.secondary.href}
                variant="outline"
              >
                {siteConfig.heroCtas.secondary.label}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal
          delay={0.3}
          className="mx-auto w-full max-w-lg lg:max-w-none"
        >
          <Image
            src={siteConfig.heroImage.src}
            alt={siteConfig.heroImage.alt}
            width={1024}
            height={911}
            priority
            className="w-full [mask-image:radial-gradient(ellipse_72%_72%_at_center,black_55%,transparent_98%)]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
