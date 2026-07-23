"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-pink focus:bg-white/[0.04] focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  fields,
}: {
  fields: { name: string; email: string; message: string; submit: string };
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form now — React nulls event.currentTarget once this
    // handler's synchronous portion finishes, so it's gone after the await.
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-ink-muted">
          {fields.name}
        </label>
        <input id="contact-name" name="name" type="text" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm text-ink-muted">
          {fields.email}
        </label>
        <input id="contact-email" name="email" type="email" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-ink-muted">
          {fields.message}
        </label>
        <textarea id="contact-message" name="message" rows={5} required className={inputClasses} />
      </div>
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : fields.submit}
      </Button>
      {status === "sent" && (
        <p className="text-sm text-blue">Message sent — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-pink">
          Something went wrong. Try again, or email me directly.
        </p>
      )}
    </form>
  );
}
