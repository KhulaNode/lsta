"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = { kind: "success" | "error"; message: string } | null;

export function ContactForm({ initialTopic = "General enquiry" }: { initialTopic?: string }) {
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [topic, setTopic] = useState(initialTopic);
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);
    const form = event.currentTarget;
    const fields = new FormData(form);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fields.get("name"), email: fields.get("email"), phone: fields.get("phone"), topic: fields.get("topic"), message: fields.get("message"), website: fields.get("website"), startedAt }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setStatus({ kind: "success", message: "Thank you. Your message has been sent to LSTA." });
      form.reset();
      setTopic(initialTopic);
      setStartedAt(Date.now());
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Your message could not be sent." });
    } finally { setLoading(false); }
  }

  return <form className="contact-form" onSubmit={submit}><h2>Send a Message</h2><p>Submit an enquiry by email when the message service is configured. If delivery is unavailable, please use the direct contact options alongside this form.</p><div className="form-grid"><div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required /></div><div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div></div><div className="form-grid"><div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} /></div><div className="field"><label htmlFor="topic">What is this about? *</label><select id="topic" name="topic" value={topic} onChange={event => setTopic(event.target.value)} required><option>General enquiry</option><option>Membership enquiry</option><option>Safety question</option><option>Media enquiry</option></select></div></div><div className="field"><label htmlFor="message">Message *</label><textarea id="message" name="message" minLength={10} maxLength={3000} required placeholder="How can we help?" /></div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>{status && <p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p>}<button className="button" type="submit" disabled={loading}><Send size={17} /> {loading ? "Sending…" : "Send Message"}</button><p className="form-hint">Your details are used only to respond to this enquiry.</p></form>;
}
