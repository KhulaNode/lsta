export type GalleryItem = {
  id: string;
  kind: "image" | "video";
  title: string;
  description: string;
  src: string;
  alt?: string;
  relatedUrl?: string;
};

const galleryFile = (name: string) => `/images/Gallery/${encodeURIComponent(name)}`;
const moletsiFile = (name: string) => `/images/articles/${encodeURIComponent("lsta meets with Moletji scholar transport associations")}/${encodeURIComponent(name)}`;
const permitMarchCoverage = "https://www.citizen.co.za/review-online/news-headlines/local-news/2026/03/02/watch-limpopo-scholar-transport-operators-march-over-permits/";

export const galleryItems: GalleryItem[] = [
  {
    id: "moletsi-engagement-group-wide",
    kind: "image",
    title: "Moletsi scholar transport association representatives",
    description: "Representatives gathered during LSTA's engagement with five local scholar transport associations on 31 October 2026.",
    src: moletsiFile("WhatsApp Image 2026-11-01 at 13.03.00.jpeg"),
    alt: "Group of scholar transport association representatives standing together outside a building in Moletsi",
  },
  {
    id: "moletsi-engagement-meal",
    kind: "image",
    title: "Representatives at the Moletsi gathering",
    description: "Scholar transport association representatives share a meal outdoors during the Moletsi gathering.",
    src: moletsiFile("WhatsApp Image 2026-11-01 at 13.03.00 (1).jpeg"),
    alt: "Scholar transport association representatives seated together around an outdoor table",
  },
  {
    id: "moletsi-engagement-group-close",
    kind: "image",
    title: "Moletsi association representatives together",
    description: "A group photograph from LSTA's 31 October 2026 engagement in Greater Moletsi.",
    src: moletsiFile("WhatsApp Image 2026-11-01 at 13.03.01.jpeg"),
    alt: "Scholar transport association representatives standing together for a group photograph",
  },
  {
    id: "moletsi-engagement-group-portrait",
    kind: "image",
    title: "LSTA engagement in Greater Moletsi",
    description: "Representatives pose together following the meeting with local scholar transport associations.",
    src: moletsiFile("WhatsApp Image 2026-11-01 at 13.03.01 (1).jpeg"),
    alt: "Group of scholar transport association representatives posing outside a building",
  },
  {
    id: "lsta-group-portrait",
    kind: "image",
    title: "LSTA executive members together",
    description: "LSTA executive members gathered after their meeting on 30 September 2026.",
    src: galleryFile("WhatsApp Image 2026-10-27 at 16.48.09 (1).jpeg"),
    alt: "LSTA executive members posing together outdoors after their 30 September 2026 meeting",
  },
  {
    id: "lsta-members-banner",
    kind: "image",
    title: "LSTA executive meeting",
    description: "Members of the LSTA executive with the alliance banner at their 30 September 2026 meeting.",
    src: galleryFile("WhatsApp Image 2026-10-27 at 16.48.09.jpeg"),
    alt: "LSTA executive members standing together outdoors with the alliance banner",
  },
  {
    id: "public-enquiry-audience",
    kind: "image",
    title: "LSTA members at a public inquiry on scholar transport",
    description: "LSTA members listen during a public inquiry on scholar transport matters.",
    src: galleryFile("WhatsApp Image 2026-10-27 at 16.48.10.jpeg"),
    alt: "LSTA members seated and listening at a public inquiry on scholar transport",
  },
  {
    id: "public-enquiry-podium",
    kind: "image",
    title: "LSTA addresses the Limpopo Legislature",
    description: "LSTA public relations officer Mr Thapedi Kgole addresses the Limpopo Legislature public inquiry on scholar transport and community safety.",
    src: galleryFile("WhatsApp Image 2026-10-27 at 16.49.18 (1).jpeg"),
    alt: "LSTA public relations officer Mr Thapedi Kgole speaking at the Limpopo Legislature public inquiry",
  },
  {
    id: "public-enquiry-speaker",
    kind: "image",
    title: "LSTA addresses a public inquiry",
    description: "At a separate scholar transport public inquiry, LSTA public relations officer Mr Thapedi Kgole addresses attendees.",
    src: galleryFile("WhatsApp Image 2026-10-27 at 16.49.18.jpeg"),
    alt: "LSTA public relations officer Mr Thapedi Kgole speaking into a microphone at a public inquiry",
  },
  {
    id: "march-alliance-banner",
    kind: "video",
    title: "Scholar transport permit march: alliance banner",
    description: "Parents, operators and other scholar transport stakeholders march over permit deadlines, vehicle impoundments and seven seater rules.",
    src: galleryFile("WhatsApp Video 2026-10-27 at 16.48.23.mp4"),
    relatedUrl: permitMarchCoverage,
  },
  {
    id: "march-crowd",
    kind: "video",
    title: "Scholar transport permit march: stakeholders",
    description: "Scholar transport stakeholders, including parents and operators, march to raise concerns about permits and vehicle rules.",
    src: galleryFile("WhatsApp Video 2026-10-27 at 16.48.54.mp4"),
    relatedUrl: permitMarchCoverage,
  },
];
