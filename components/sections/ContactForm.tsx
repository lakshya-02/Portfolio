"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const inputClasses =
  "w-full border border-slate-500 bg-white/[0.02] px-4 py-3 text-base text-ink transition-colors";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  fields,
}: {
  fields: { name: string; email: string; message: string; submit: string };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    // Capture the form now — React nulls event.currentTarget once this
    // handler's synchronous portion finishes, so it's gone after the await.
    const form = event.currentTarget;
    setStatus("sending");
    try {
      if (!serviceId || !templateId || !publicKey) throw new Error("Contact form is not configured");
      await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        { publicKey },
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" method="post" onSubmit={handleSubmit} aria-busy={status === "sending"}>
      <p className="text-sm text-ink-muted">All fields are required.</p>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-ink-muted">
          {fields.name}
        </label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={120} required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm text-ink-muted">
          {fields.email}
        </label>
        <input id="contact-email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-ink-muted">
          {fields.message}
        </label>
        <textarea id="contact-message" name="message" rows={5} maxLength={5000} required className={inputClasses} />
      </div>
      <button type="submit" className="min-h-12 w-full px-4 py-3 disabled:cursor-wait disabled:opacity-60" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : fields.submit}
      </button>
      <p role="status" className="text-sm text-ink">
        {status === "sent" && "Message sent. Thanks for getting in touch."}
        {status === "error" && "The message didn't send. Try again, or use the email link above."}
      </p>
      <noscript>This form needs JavaScript. Please use the email link above to get in touch.</noscript>
    </form>
  );
}
