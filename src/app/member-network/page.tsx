import Image from "next/image";
import Link from "next/link";
import { Check, MessagesSquare, ShieldCheck, UsersRound } from "lucide-react";
import { AffiliateDirectory } from "@/components/affiliate-directory";
import { PageHero } from "@/components/page-hero";
import { affiliates, publishAffiliateContacts } from "@/content/affiliates";
import { pageMetadata } from "@/lib/metadata";
import "leaflet/dist/leaflet.css";
import "./member-network.css";

export const metadata = pageMetadata(
  "Member Network",
  "Browse LSTA member scholar transport organizations by area on a Limpopo map and learn how to enquire about joining the alliance.",
  "/member-network",
);

export default function MemberNetworkPage() {
  const directoryEntries = affiliates.map(({ phone, ...affiliate }) => ({
    ...affiliate,
    ...(publishAffiliateContacts ? { phone } : {}),
  }));

  return (
    <>
      <PageHero title="Member Network" subtitle="Connect with the alliance and explore its member organizations across Limpopo." />

      <section className="section" id="join">
        <div className="container split-grid">
          <div className="split-image">
            <Image src="/images/hero-transport.png" alt="White scholar transport minibus in Limpopo" fill sizes="(max-width: 700px) 100vw, 50vw" />
          </div>
          <div className="split-content">
            <span className="eyebrow">Join the alliance</span>
            <h2>Be part of a stronger transport community.</h2>
            <p>LSTA brings scholar transport operators together around shared interests, practical information and a commitment to learners. If you operate scholar transport in Limpopo, we would welcome a conversation about the alliance.</p>
            <ul className="bullet-list">
              <li><Check /> Connect with fellow operators</li>
              <li><Check /> Share knowledge and practical experiences</li>
              <li><Check /> Stay engaged with alliance updates</li>
              <li><Check /> Support a collective voice for the sector</li>
            </ul>
            <p>Membership criteria and any fees will be confirmed directly by LSTA. This website does not collect registration or payment details.</p>
            <div className="member-network-actions">
              <Link className="button" href="/contact?topic=membership">Enquire About Membership →</Link>
              <Link className="button button-outline" href="#directory">Explore Member Organizations ↓</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <span className="eyebrow">Why connect</span>
          <h2>BUILDING THE ALLIANCE</h2>
          <div className="value-grid">
            <div className="value-card"><UsersRound /><h3>Representation</h3><p>Make it easier for operators to share their perspectives and work together.</p></div>
            <div className="value-card"><ShieldCheck /><h3>Safety focus</h3><p>Keep learner wellbeing and responsible practices central to the conversation.</p></div>
            <div className="value-card"><MessagesSquare /><h3>Useful communication</h3><p>Create a clear channel for relevant updates and practical information.</p></div>
          </div>
        </div>
      </section>

      <section className="section affiliate-section" id="directory" aria-labelledby="directory-heading">
        <div className="container">
          <div className="affiliate-intro">
            <div>
              <span className="eyebrow">The alliance network</span>
              <h2 id="directory-heading">FIND A MEMBER ORGANIZATION</h2>
              <p>Search the member register by organization name or area, then select “Show on map” to see its confirmed area.</p>
            </div>
            <Link className="button button-outline" href="/contact">Contact LSTA →</Link>
          </div>
          <AffiliateDirectory affiliates={directoryEntries} />
        </div>
      </section>
    </>
  );
}
