import Image from "next/image";

export function PageHero({ title, subtitle, image = "/images/hero-transport.png" }: { title: string; subtitle: string; image?: string }) {
  return <section className="page-hero"><Image src={image} alt="" fill priority sizes="100vw" className="page-hero-image" /><div className="page-hero-shade" /><div className="container page-hero-content"><span className="eyebrow light">LIMPOPO SCHOLAR TRANSPORT ALLIANCE</span><h1>{title}</h1><p>{subtitle}</p></div></section>;
}
