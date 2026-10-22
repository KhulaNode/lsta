export const site = {
  name: "Limpopo Scholar Transport Alliance",
  shortName: "LSTA",
  description: "Supporting safer scholar transport and the operators who serve Limpopo communities.",
  phoneDisplay: "072 239 4875",
  phoneHref: "tel:+27722394875",
  whatsappHref: "https://wa.me/27722394875?text=Hello%20LSTA%2C%20I%20would%20like%20to%20enquire%20about%20the%20alliance.",
  email: "info@lsta.org.za",
  location: "Limpopo, South Africa",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/membership", label: "Membership" },
  { href: "/safety-compliance", label: "Safety & Compliance" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589336548603" },
  { label: "TikTok", href: "https://www.tiktok.com/@limpoposcholartransport" },
];
