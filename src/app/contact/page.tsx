import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Contact Limpopo Scholar Transport Alliance by phone, email, WhatsApp or enquiry form.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const params = await searchParams;
  const { SMTP_HOST, SMTP_PORT, SMTP_FROM, CONTACT_TO_EMAIL, SMTP_USER, SMTP_PASSWORD } = process.env;
  const formReady = Boolean(SMTP_HOST && SMTP_PORT && SMTP_FROM && CONTACT_TO_EMAIL && ((!SMTP_USER && !SMTP_PASSWORD) || (SMTP_USER && SMTP_PASSWORD)));

  return <>
    <PageHero title="Contact Us" subtitle="We are here to help." />
    <section className="section section-cream"><div className="container contact-grid">
      <div>
        <span className="eyebrow">Get in touch</span>
        <h2>LET’S TALK ABOUT THE JOURNEY AHEAD.</h2>
        <p>Whether you are an operator interested in the alliance or have a general question, please get in touch.</p>
        <div className="contact-detail"><span><Phone /></span><div><h3>Phone</h3><a href={site.phoneHref}>{site.phoneDisplay}</a></div></div>
        <div className="contact-detail"><span><Mail /></span><div><h3>Email</h3><a href={`mailto:${site.email}`}>{site.email}</a></div></div>
        <div className="contact-detail"><span><MapPin /></span><div><h3>Location</h3><p>{site.location}</p></div></div>
        <a className="button" href={site.whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Enquire on WhatsApp</a>
      </div>
      {formReady ? <ContactForm initialTopic={params.topic === "membership" ? "Membership enquiry" : "General enquiry"} /> : <div className="contact-form contact-unavailable"><Mail size={36} color="#bc7f50" aria-hidden="true" /><h2>Email enquiries</h2><p>The website form will be available once email delivery is connected. In the meantime, please email LSTA directly or use the phone and WhatsApp options.</p><a className="button" href={`mailto:${site.email}?subject=LSTA%20enquiry`}>Email the Alliance →</a></div>}
    </div></section>
  </>;
}
