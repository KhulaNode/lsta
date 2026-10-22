import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";
import "./about.css";

export const metadata = pageMetadata(
  "About LSTA",
  "Learn about the Limpopo Scholar Transport Alliance, its vision, mission, values and commitment to scholar transport in Limpopo.",
  "/about",
);

const visionPoints = [
  "Every learner travels safely to and from school.",
  "Scholar transport operators work towards full compliance with applicable laws and regulations.",
  "Local scholar transport associations are united, recognised, and represented.",
  "Government departments and other stakeholders work collaboratively with the scholar transport sector.",
  "Scholar transport operators have opportunities for growth, development, and economic sustainability.",
];

const values = [
  "Learner Safety",
  "Unity",
  "Integrity",
  "Accountability",
  "Compliance",
  "Professionalism",
  "Representation",
  "Collaboration",
  "Empowerment",
  "Sustainability",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About LSTA"
        subtitle="Uniting and strengthening scholar transport associations across Limpopo."
      />

      <section className="section about-section" aria-labelledby="about-heading">
        <div className="container about-prose">
          <span className="eyebrow">Who we are</span>
          <h2 id="about-heading">ABOUT LSTA</h2>
          <p>The Limpopo Scholar Transport Alliance (LSTA) is a registered Non-Profit Company (NPC) established to unite, represent, support, and strengthen local scholar transport associations across Limpopo Province, South Africa.</p>
          <p>The Alliance serves as a collective voice for local scholar transport associations and their operators, promoting cooperation between transport associations, government departments, schools, parents, and other relevant stakeholders.</p>
          <p>LSTA is committed to promoting safe, reliable, lawful, and professional scholar transportation while advocating for the interests of operators and supporting their efforts to comply with applicable transport legislation and operating requirements.</p>
          <p>Through collaboration, advocacy, stakeholder engagement, and capacity-building initiatives, the Alliance seeks to improve the scholar transport sector, protect the interests of learners, and contribute to safer and more accessible transportation for children travelling to and from educational institutions.</p>
          <p>Our commitment is to build a united, accountable, and sustainable scholar transport industry that prioritises learner safety, operational compliance, and the development of local transport operators.</p>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="vision-heading">
        <div className="container about-two-column">
          <div>
            <span className="eyebrow">Where we are going</span>
            <h2 id="vision-heading">OUR VISION</h2>
            <p>To be a leading and trusted provincial alliance that unites and empowers scholar transport associations across Limpopo, championing a safe, professional, compliant, and sustainable scholar transport industry in which every learner has access to reliable transportation to and from school.</p>
          </div>
          <div className="about-panel">
            <h3>What our vision means</h3>
            <p>Our vision is to see a future where:</p>
            <ul className="bullet-list">
              {visionPoints.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-heading">
        <div className="container about-prose">
          <span className="eyebrow">How we work</span>
          <h2 id="mission-heading">OUR MISSION</h2>
          <p>To unite, represent, advocate for, and empower local scholar transport associations throughout Limpopo Province by promoting learner safety, operational compliance, professional standards, and sustainable business practices.</p>
          <p>We are committed to strengthening relationships with government departments, educational institutions, parents, and other stakeholders; facilitating access to relevant information and support; advocating for fair and practical solutions to operational challenges; and building the capacity of scholar transport operators to deliver safe, reliable, and responsible services to learners.</p>
          <p>Through collective leadership, accountability, and collaboration, we strive to create a stronger and more sustainable scholar transport industry that serves the best interests of learners, operators, and communities.</p>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="values-heading">
        <div className="container">
          <span className="eyebrow">What guides us</span>
          <h2 id="values-heading">OUR VALUES</h2>
          <ul className="about-values">
            {values.map((value) => <li key={value}>{value}</li>)}
          </ul>
        </div>
      </section>

      <section className="section about-commitment" aria-labelledby="commitment-heading">
        <div className="container about-prose">
          <span className="eyebrow light">Our promise</span>
          <h2 id="commitment-heading">OUR COMMITMENT</h2>
          <p>The Limpopo Scholar Transport Alliance is committed to ensuring that the voices of local scholar transport associations are heard, their challenges are addressed through constructive engagement, and their contribution to education and community development is recognised.</p>
          <p>We believe that learner safety and the professional development of scholar transport operators must go hand in hand. By uniting associations, strengthening partnerships, and engaging government and other stakeholders, we aim to contribute to a scholar transport industry that is safer, more compliant, better organised, and more sustainable.</p>
          <p>Together, we can build a stronger scholar transport sector for our operators, our communities, and, most importantly, our learners.</p>
          <Link className="button" href="/contact">Get in Touch →</Link>
        </div>
      </section>
    </>
  );
}
