import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { socialIcons } from "@/components/layout/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

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
            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-pink/50 hover:text-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
                  >
                    <Icon className="size-5" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <ContactForm fields={fields} />
              {siteConfig.contact.formNote && (
                <p className="mt-4 text-xs text-ink-muted">
                  {siteConfig.contact.formNote}
                </p>
              )}
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
