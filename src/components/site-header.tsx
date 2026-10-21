"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navigation, site } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <>
    <div className="topbar"><div className="container topbar-inner">
      <div className="topbar-contacts"><a href={site.phoneHref}><Phone size={12} aria-hidden="true" /> {site.phoneDisplay}</a><a href={`mailto:${site.email}`}><Mail size={12} aria-hidden="true" /> {site.email}</a></div>
      <span className="topbar-note">Safe journeys. Brighter futures.</span>
    </div></div>
    <header className="site-header"><div className="container nav-inner">
      <Link href="/" className="brand" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
        <span className="brand-mark" aria-hidden="true"><Image src="/images/lsta-logo-mark.png" alt="" width={48} height={48} /></span>
        <span className="brand-copy"><strong>LIMPOPO SCHOLAR</strong><span>TRANSPORT ALLIANCE</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
      <Link className="button button-small nav-cta" href="/membership">Join / Enquire <span aria-hidden="true">→</span></Link>
      <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link className="button" href="/membership" onClick={() => setOpen(false)}>Join / Enquire →</Link></nav>}
    </header>
  </>;
}
