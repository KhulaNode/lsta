import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { navigation, site } from "@/config/site";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Link href="/" className="brand brand-light" aria-label={`${site.name} home`}><span className="brand-mark"><Image src="/images/lsta-logo-mark.png" alt="" width={48} height={48} /></span><span className="brand-copy"><strong>LIMPOPO SCHOLAR</strong><span>TRANSPORT ALLIANCE</span></span></Link><p>Safe journeys. Brighter futures.</p></div>
    <div><h2>Quick Links</h2><ul>{navigation.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
    <div><h2>Contact</h2><ul className="footer-contact"><li><Phone size={15} /><a href={site.phoneHref}>{site.phoneDisplay}</a></li><li><Mail size={15} /><a href={`mailto:${site.email}`}>{site.email}</a></li><li><MapPin size={15} /><span>{site.location}</span></li></ul></div>
    <div><h2>Get in touch</h2><p>Questions about the alliance? We would like to hear from you.</p><Link className="footer-link" href="/contact">Contact us <span aria-hidden="true">→</span></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Limpopo Scholar Transport Alliance.</span><span>Website by KhulaNode</span></div></footer>;
}
