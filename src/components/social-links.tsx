import { ExternalLink } from "lucide-react";
import { socialLinks } from "@/config/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  return <div className={`social-links ${className}`.trim()}>
    {socialLinks.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={14} aria-hidden="true" /></a>)}
  </div>;
}
