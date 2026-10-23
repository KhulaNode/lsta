export type ExecutiveMember = {
  id: string;
  name: string;
  role: string;
};

export type ExecutiveGroup = {
  id: string;
  title: string;
  members: ExecutiveMember[];
};

// Names and roles transcribed from the LSTA chart supplied on 23 October 2026.
// Use the names and initials exactly as supplied in the corrected LSTA roster.
export const executiveGroups: ExecutiveGroup[] = [
  {
    id: "office-bearers",
    title: "Office bearers",
    members: [
      { id: "moleleki-tj", name: "Mr Moleleki T. J", role: "Chairperson" },
      { id: "molaba-t", name: "Mr Molaba T", role: "Deputy Chairperson" },
      { id: "moseamedi-ka", name: "Ms Moseamedi K. A", role: "Secretary" },
      { id: "moswathupa-dj", name: "Ps Moswathupa D. J", role: "Deputy Secretary" },
    ],
  },
  {
    id: "finance-team",
    title: "Finance team",
    members: [
      { id: "bopape-tm", name: "Ms Bopape T. M", role: "Treasury" },
      { id: "mokabane-kn", name: "Mr Mokabane K. N", role: "Assistant" },
      { id: "maphoto-ms", name: "Mr Maphoto M.S", role: "Assistant" },
    ],
  },
  {
    id: "communications",
    title: "Communications",
    members: [
      { id: "kgole-tm", name: "Mr Kgole T. M", role: "Public Relations Officer" },
      { id: "moraswi-jk", name: "Ms Moraswi JK", role: "Social Media Manager" },
    ],
  },
  {
    id: "safety-officers",
    title: "Safety officers",
    members: [
      { id: "somo-kr", name: "Mr Somo K. R", role: "Safety Officer" },
      { id: "chokwe-mm", name: "Mr Chokwe M. M", role: "Safety Officer" },
      { id: "modiba-em", name: "Mr Modiba E M", role: "Safety Officer" },
    ],
  },
  {
    id: "additional-members",
    title: "Additional members",
    members: [
      { id: "mabitsela-me", name: "Mr Mabitsela M. E", role: "Additional Member" },
      { id: "munyai-tk", name: "Mr Munyai T. K", role: "Additional Member" },
      { id: "selomo-mm", name: "Mrs Selomo M. M", role: "Additional Member" },
    ],
  },
];
