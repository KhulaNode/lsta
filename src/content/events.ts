export type LstaEvent = {
  slug: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  location: string;
  summary: string;
  details?: string[];
  sections?: { heading: string; paragraphs?: string[]; items?: string[]; note?: string }[];
  image?: { src: string; alt: string };
  action?: { label: string; href: string };
  approved: boolean;
};

// Add only LSTA-approved events. Use ISO 8601 dates with a South African offset.
// Images and registration links are optional and can be added when supplied.
export const events: LstaEvent[] = [
  {
    slug: "wellness-day-2027",
    title: "LSTA Wellness Day 2027",
    startsAt: "2027-04-03T09:00:00+02:00",
    location: "Seshego Stadium, Limpopo",
    summary: "Join LSTA for a day of wellness, sport and connection with scholar transport associations, government departments and community partners.",
    details: [
      "The Limpopo Scholar Transport Alliance (LSTA) will host its inaugural Wellness Day on Saturday, 3 April 2027, at Seshego Stadium, starting at 09h00. The event aims to promote physical wellness, healthy living, teamwork, social cohesion and collaboration among scholar transport operators, government departments, rehabilitation centres and other community stakeholders.",
      "Masters sports teams representing government departments and other stakeholders, rehabilitation centres and local scholar transport associations from across Limpopo will take part. Activities will include aerobics, masters soccer and netball. The day will also provide an opportunity to network, share experiences and strengthen partnerships.",
      "Attendance of more than 1,000 people is anticipated.",
    ],
    sections: [
      {
        heading: "Sponsorship and partnership opportunities",
        paragraphs: ["LSTA invites government departments, corporate organisations, businesses, community organisations and individuals to support the event through financial sponsorships, donations, or goods and services. Sponsors may support one or more of the following needs:"],
        items: [
          "Drinking water for participants, sports teams, officials, volunteers and attendees.",
          "Mobile trailer billboard advertising to promote the event.",
          "Advertising on mobile cars to reach nearby communities.",
          "Soccer and netball gear and equipment for LSTA teams.",
          "Branded T-shirts, banners, stationery and other promotional materials.",
        ],
        note: "Financial contributions and in-kind donations will be discussed with interested partners.",
      },
      {
        heading: "Benefits of partnering with LSTA",
        paragraphs: ["Partners can support community wellness, social inclusion and responsible transportation while connecting with an anticipated audience of more than 1,000 people."],
        items: [
          "Brand visibility through agreed event materials, banners, clothing and advertising platforms.",
          "Direct engagement with scholar transport operators, government representatives, rehabilitation centres, local businesses and the wider community.",
          "Opportunities to demonstrate a commitment to community development, employee wellness, road safety, social inclusion and corporate social responsibility.",
          "Networking with community organisations, scholar transport associations and potential partners.",
          "Positive association with an initiative promoting healthy lifestyles, teamwork, unity and community empowerment.",
          "Opportunities to introduce products or services to attendees, subject to the agreed sponsorship arrangement.",
          "Possible recognition during the event and on selected promotional platforms, subject to the agreed package.",
          "A starting point for future community programmes, wellness initiatives, road safety campaigns and scholar transport development projects.",
        ],
        note: "Specific benefits, branding placements, acknowledgements and promotional deliverables will be agreed with each partner. Sponsorship does not automatically guarantee every benefit listed above.",
      },
      {
        heading: "Stalls for local businesses",
        paragraphs: ["Food vendors and small businesses are invited to trade at the Wellness Day. Stalls cost R400.00 each. Interested vendors are encouraged to secure a space in advance, as availability may be limited."],
        items: ["Prepared food and meals.", "Refreshments and beverages.", "Snacks and confectionery.", "Other approved products relevant to attendees."],
        note: "Vendor participation is subject to event trading guidelines and applicable health, safety and municipal requirements.",
      },
    ],
    action: { label: "Ask about sponsorship or a stall", href: "mailto:info@lsta.org.za?subject=LSTA%20Wellness%20Day%202027%20enquiry" },
    approved: true,
  },
];
