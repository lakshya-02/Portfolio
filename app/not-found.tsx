import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container>
        <p aria-hidden className="font-display text-8xl font-bold sm:text-9xl">
          <span className="text-stroke">404</span>
          <span className="text-pink">.</span>
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold">
          {siteConfig.notFound.title}
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
          {siteConfig.notFound.body}
        </p>
        <div className="mt-8">
          <Button href="/">{siteConfig.notFound.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
