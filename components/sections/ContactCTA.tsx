import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";

const inputClasses =
  "w-full rounded-md border border-line bg-void px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-pink focus:outline-none";

export function ContactCTA() {
  const { fields } = siteConfig.contact;
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.contact.eyebrow}
          title={siteConfig.sections.contact.title}
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">
              {siteConfig.contact.body}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-block font-display text-2xl font-bold transition-colors hover:text-pink sm:text-3xl"
            >
              {siteConfig.email}
            </a>
            <SocialLinks className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={inputClasses}
                  />
                </div>
                <Button className="w-full">{fields.submit}</Button>
                <p className="text-xs text-ink-muted">
                  {siteConfig.contact.formNote}
                </p>
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
