type CoverageBase = {
  title: string;
  outlet: string;
  url: string;
  date?: string;
  summary: string;
};

export type MediaCoverage =
  | (CoverageBase & { kind: "Video"; youtubeId: string; poster: string; startAt?: number })
  | (CoverageBase & { kind: "Social post" | "Article" });

// Link to the original publisher. Do not reproduce third-party articles or imagery.
export const mediaCoverage: MediaCoverage[] = [
  {
    title: "Scholar Transport Shutdown: What Limpopo Operators Are Demanding",
    outlet: "Taxi Talk SA",
    kind: "Video",
    youtubeId: "Tqc3ydAWW24",
    poster: "/images/taxi-talk-scholar-transport.jpg",
    url: "https://www.youtube.com/watch?v=Tqc3ydAWW24",
    summary: "A Taxi Talk SA video on the concerns raised by Limpopo scholar transport operators.",
  },
  {
    title: "Rankapole family struggles to come to terms with daughter’s death in Limpopo crash",
    outlet: "SABC News",
    kind: "Video",
    youtubeId: "7XcNZ1dR_3o",
    poster: "/images/sabc-rankapole-report.jpg",
    startAt: 16,
    url: "https://www.youtube.com/watch?v=7XcNZ1dR_3o&t=16s",
    summary: "SABC News coverage of the family affected by a scholar transport crash in Limpopo.",
  },
  {
    title: "CapricornFM News: LSTA reflects on scholar transport engagement",
    outlet: "CapricornFM News",
    kind: "Social post",
    url: "https://x.com/CapricornFMNews/status/2088138240586887364",
    date: "2026-08-14",
    summary: "A CapricornFM News post on LSTA’s response to a two-day stakeholder engagement.",
  },
  {
    title: "WATCH: Limpopo scholar transport operators march over permits",
    outlet: "Review Online",
    kind: "Article",
    url: "https://www.citizen.co.za/review-online/news-headlines/local-news/2026/03/02/watch-limpopo-scholar-transport-operators-march-over-permits/",
    date: "2026-03-02",
    summary: "Coverage of operators’ march over permit deadlines, impoundments and vehicle rules.",
  },
  {
    title: "Limpopo scholar transport fees up nearly 50%",
    outlet: "Review Online",
    kind: "Article",
    url: "https://www.citizen.co.za/review-online/news-headlines/local-news/2026/06/13/limpopo-scholar-transport-fees-up-nearly-50/",
    date: "2026-06-13",
    summary: "Reporting on transport fee increases and the costs cited by LSTA.",
  },
  {
    title: "Lim Scholar Transport Alliance calls for new vehicles",
    outlet: "Review Online",
    kind: "Article",
    url: "https://www.citizen.co.za/review-online/news-headlines/local-news/2026/08/21/lim-scholar-transport-alliance-calls-for-new-vehicles/",
    date: "2026-08-21",
    summary: "Coverage of LSTA’s call for support to renew ageing scholar transport vehicles.",
  },
];
