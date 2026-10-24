export type Affiliate = {
  id: string;
  name: string;
  phone: string;
  district: string | null;
  municipality: string | null;
  location: string | null;
  coordinates: { latitude: number; longitude: number } | null;
};

// LSTA member register supplied on 23 October 2026. Map pins use only areas confirmed by LSTA.
// The supplied phone numbers were approved for public display on 23 October 2026.
export const publishAffiliateContacts = true;

export const affiliates: Affiliate[] = [
  { id: "mokomene-scholar", name: "Mokomene Scholar", phone: "082 294 4420", district: "Capricorn", municipality: "Molemole", location: "Mokomene", coordinates: { latitude: -23.464, longitude: 29.82 } },
  { id: "dikgale-scholar", name: "DIKGALE SCHOLAR TRANSPORT", phone: "072 440 2705", district: "Capricorn", municipality: "Polokwane", location: "Dikgale", coordinates: { latitude: -23.74787, longitude: 29.78331 } },
  { id: "polokwane-ngatatee", name: "POLOKWANE NGATATEE", phone: "067 311 9252", district: "Capricorn", municipality: "Polokwane", location: "Polokwane", coordinates: { latitude: -23.9112, longitude: 29.4618 } },
  { id: "mphahlele", name: "MPHAHLELE TRANSPORT ORGANIZATION", phone: "079 679 8337", district: "Capricorn", municipality: "Lepelle-Nkumpi", location: "Mphahlele", coordinates: { latitude: -24.313, longitude: 29.6382 } },
  { id: "moletjie-r521", name: "MOLETJIE R521 SCHOLAR TRANSPORT", phone: "064 659 7971", district: "Capricorn", municipality: "Polokwane", location: "Moletjie Traditional Authority", coordinates: { latitude: -23.73168, longitude: 29.303266 } },
  { id: "hlogotlou-ngwaritsi", name: "HLOGOTLOU NGWARITSI SCHOLAR TRANSPORT ALLIANCE", phone: "064 604 2745", district: "Sekhukhune", municipality: "Makhuduthamaga", location: "Jane Furse", coordinates: { latitude: -24.76021, longitude: 29.86993 } },
  { id: "lephalale", name: "LEPHALALE SCHOLAR TRANSPORT ASSOCIATION", phone: "076 063 0066", district: "Waterberg", municipality: "Lephalale", location: "Lephalale", coordinates: { latitude: -23.6661, longitude: 27.7448 } },
  { id: "moletjie-cooperative", name: "MOLETJIE SCHOLAR TRANSPORT COOPERATIVE", phone: "073 710 5145", district: "Capricorn", municipality: "Polokwane", location: "Moletjie Traditional Authority", coordinates: { latitude: -23.73168, longitude: 29.303266 } },
  { id: "lebowakgomo", name: "LEBOWAKGOMO EDUCATIONAL TRANSPORT", phone: "071 151 5545", district: "Capricorn", municipality: "Lepelle-Nkumpi", location: "Lebowakgomo", coordinates: { latitude: -24.3146, longitude: 29.5008 } },
  { id: "kwenamoloto", name: "KWENAMOLOTO SCHOLAR TRANSPORT COOPERATIVE", phone: "082 953 1677", district: "Capricorn", municipality: "Polokwane", location: "Kwena Moloto 2", coordinates: { latitude: -23.82984, longitude: 29.33706 } },
  { id: "matlamole", name: "MATLAMOLE SCHOLAR TRANSPORT ASSOCIATION", phone: "072 565 2160", district: "Capricorn", municipality: "Polokwane", location: "Ga-Matlala", coordinates: { latitude: -23.74, longitude: 29.08361 } },
  { id: "mmotong", name: "MMOTONG SCHOLAR TRANSPORT", phone: "079 014 6612", district: "Capricorn", municipality: "Polokwane", location: "Mmotong wa Perekisi", coordinates: { latitude: -23.76329, longitude: 29.307752 } },
  { id: "mankweng", name: "MANKWENG SCHOLAR TRANSPORT ASSOCIATION", phone: "071 471 0608", district: "Capricorn", municipality: "Polokwane", location: "Mankweng", coordinates: { latitude: -23.8822, longitude: 29.7204 } },
  { id: "botlokwa", name: "BOTLOKWA SCHOLAR & GENERAL TRANSPORT", phone: "064 872 1893", district: "Capricorn", municipality: "Molemole", location: "Matoks", coordinates: { latitude: -23.46667, longitude: 29.7 } },
  { id: "moruleng", name: "MORULENG SCHOLAR TRANSPORT", phone: "068 818 1851", district: "Capricorn", municipality: "Polokwane", location: "Moletjie Traditional Authority", coordinates: { latitude: -23.73168, longitude: 29.303266 } },
  { id: "apel", name: "APEL SCHOLAR TRANSPORT", phone: "076 304 2223", district: "Sekhukhune", municipality: "Makhuduthamaga", location: "Apel", coordinates: { latitude: -24.5296, longitude: 29.6091 } },
  { id: "phokoane", name: "PHOKOANE SCHOLAR TRANSPORT ASSOCIATION", phone: "064 875 9895", district: "Sekhukhune", municipality: "Makhuduthamaga", location: "Phokoane", coordinates: { latitude: -24.8731, longitude: 29.7392 } },
  { id: "polokwane-scholar-transport", name: "POLOKWANE SCHOLAR TRANSPORT", phone: "064 950 3036", district: "Capricorn", municipality: "Polokwane", location: "Polokwane", coordinates: { latitude: -23.9112, longitude: 29.4618 } },
];
