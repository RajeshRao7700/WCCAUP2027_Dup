/**
 * MOCK DATA ONLY — used when VITE_USE_MOCK_DATA is not "false".
 * This is NOT the backend. It exists purely so the UI can be developed and
 * reviewed before the public Spring Boot endpoints are available.
 */
import type {
  AboutConference,
  AttendeeFrom,
  Conference,
  ConferenceFile,
  ConferenceUpdate,
  CoreCommitteeMember,
  HighlightItem,
  Hotel,
  ImportantDate,
  MediaPartner,
  ProgramDay,
  RegistrationCategory,
  Speaker,
  Sponsor,
  Track,
  VenueInfo,
  WorkshopBanner,
} from "@/types/conference";

export const mockConference: Conference = {
  id: 1,
  shortName: "WCCAUP2027",
  email: "contact@WCCAUP2027.org",
  conferenceDate: "2027-03-15T09:00:00",
  conferenceEndDate: "2027-03-17T18:00:00",
  conferenceUrl: "https://WCCAUP2027.org",
  status: true,
  fullTitle: "International Conference on Generative AI & Agentic AI",
  venueName: "Marina Bay Convention Centre",
  city: "Singapore",
  country: "Singapore",
  phone: "+65 6000 2027",
};

export const mockAbout: AboutConference = {
  id: 1,
  heading: "About WCCAUP2027",
  summary:
    "WCCAUP2027 brings together researchers, engineers, and industry leaders shaping generative and agentic intelligence.",
  paragraphs: [
    "Over three days, WCCAUP2027 convenes the global community advancing foundation models, autonomous agents and applied generative systems. The programme balances rigorous research with deployment experience from enterprise, healthcare, science and the public sector.",
    "Sessions span model architectures, agent orchestration, evaluation, safety and governance — with dedicated time for workshops, poster sessions and structured networking across academia and industry.",
  ],
  highlights: [
    {
      title: "Generative AI & Foundation Models",
      description:
        "Advances in training, adaptation, reasoning and efficient inference for large-scale generative systems.",
    },
    {
      title: "Agentic AI & Autonomy",
      description:
        "Planning, tool use, memory and multi-agent coordination in real production environments.",
    },
    {
      title: "Human-AI Collaboration",
      description:
        "Interfaces, oversight models and workflows where people and autonomous systems work together.",
    },
    {
      title: "Responsible AI",
      description: "Safety, evaluation, governance and trust as first-class engineering concerns.",
    },
  ],
  status: true,
};

export const mockHighlights: HighlightItem[] = [
  {
    id: 1,
    title: "AI Research",
    description: "Peer-reviewed work across generative and agentic systems.",
  },
  {
    id: 2,
    title: "Industry Innovation",
    description: "Deployment lessons from enterprise-scale AI programmes.",
  },
  {
    id: 3,
    title: "Expert Speakers",
    description: "Keynote, plenary and invited voices from six continents.",
  },
  {
    id: 4,
    title: "Technical Workshops",
    description: "Hands-on sessions on agents, evaluation and tooling.",
  },
];

export const mockTracks: Track[] = [
  [
    "Generative AI & Foundation Models",
    "Architectures, pre-training, adaptation and efficient inference at scale.",
  ],
  [
    "Agentic AI & Autonomous Systems",
    "Goal-directed agents, planning, tool use, memory and long-horizon autonomy.",
  ],
  ["Large Language Models", "Reasoning, alignment, evaluation and domain specialisation of LLMs."],
  ["Multimodal AI", "Vision, speech, video and cross-modal generative understanding."],
  [
    "AI Agents & Multi-Agent Systems",
    "Coordination, negotiation, orchestration and emergent behaviour.",
  ],
  [
    "AI Safety, Ethics & Governance",
    "Risk assessment, policy, auditability and regulatory alignment.",
  ],
  [
    "Generative AI for Enterprise",
    "Productionisation, cost, reliability and organisational adoption.",
  ],
  [
    "AI for Science & Healthcare",
    "Scientific discovery, clinical decision support and biomedical modelling.",
  ],
  ["Human-AI Collaboration", "Interaction design, oversight, trust calibration and augmentation."],
  [
    "Responsible & Trustworthy AI",
    "Fairness, robustness, transparency and evaluation methodology.",
  ],
].map(([name, description], index) => ({
  id: index + 1,
  name: name as string,
  description: description as string,
  displayOrder: index + 1,
  status: true,
}));

export const mockImportantDates: ImportantDate[] = [
  {
    id: 1,
    title: "Abstract Submission Opens",
    date: "2026-06-01",
    description: "Submission portal opens for all tracks.",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    title: "Abstract Submission Deadline",
    date: "2026-10-30",
    description: "Final date for abstract submissions.",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    title: "Acceptance Notification",
    date: "2026-12-15",
    description: "Authors are notified of review outcomes.",
    displayOrder: 3,
    status: true,
  },
  {
    id: 4,
    title: "Early Bird Registration",
    date: "2027-01-15",
    description: "Discounted registration closes.",
    displayOrder: 4,
    status: true,
  },
  {
    id: 5,
    title: "Regular Registration",
    date: "2027-02-28",
    description: "Standard registration deadline.",
    displayOrder: 5,
    status: true,
  },
  {
    id: 6,
    title: "Conference Dates",
    date: "2027-03-15",
    description: "Three days of keynotes, sessions and workshops.",
    displayOrder: 6,
    status: true,
  },
];

export const mockSpeakers: Speaker[] = [
  {
    id: 1,
    firstName: "Ananya",
    lastName: "Mehta",
    designation: "Director of AI Research",
    organization: "Global Intelligence Labs",
    country: "India",
    category: "KEYNOTE",
    biography:
      "Dr. Mehta leads research on long-horizon autonomous agents, with a focus on planning under uncertainty and evaluation methodology for tool-using systems.",
    status: true,
  },
  {
    id: 2,
    firstName: "Lukas",
    lastName: "Berger",
    designation: "Professor of Machine Learning",
    organization: "Zurich Institute of Technology",
    country: "Switzerland",
    category: "PLENARY",
    biography:
      "Professor Berger works on the theory of foundation models, studying scaling behaviour, representation geometry and sample-efficient adaptation.",
    status: true,
  },
  {
    id: 3,
    firstName: "Sofia",
    lastName: "Almeida",
    designation: "Head of Applied AI",
    organization: "Northwind Systems",
    country: "Portugal",
    category: "KEYNOTE",
    biography:
      "Sofia builds enterprise agent platforms, and writes on reliability engineering for probabilistic systems in regulated industries.",
    status: true,
  },
  {
    id: 4,
    firstName: "Kenji",
    lastName: "Watanabe",
    designation: "Principal Scientist",
    organization: "Aurora Research Institute",
    country: "Japan",
    category: "PLENARY",
    biography:
      "Kenji researches multimodal generative models for scientific discovery, particularly in materials and structural biology.",
    status: true,
  },
  {
    id: 5,
    firstName: "Amara",
    lastName: "Okafor",
    designation: "Chief AI Officer",
    organization: "Continental Health Network",
    country: "Nigeria",
    category: "INVITED",
    biography:
      "Amara leads clinical AI deployment across a multi-country hospital network, with an emphasis on safety review and clinician oversight.",
    status: true,
  },
  {
    id: 6,
    firstName: "Elena",
    lastName: "Vasquez",
    designation: "Research Lead, AI Governance",
    organization: "Institute for Responsible Computing",
    country: "Spain",
    category: "INVITED",
    biography:
      "Elena's work connects technical evaluation to policy, producing audit frameworks used by public-sector AI programmes.",
    status: true,
  },
  {
    id: 7,
    firstName: "Daniel",
    lastName: "Osei",
    designation: "Senior Staff Engineer",
    organization: "Meridian Cloud",
    country: "Ghana",
    category: "FEATURED",
    biography:
      "Daniel builds large-scale inference infrastructure and writes on cost-aware serving strategies for agentic workloads.",
    status: true,
  },
  {
    id: 8,
    firstName: "Mei",
    lastName: "Lin",
    designation: "Doctoral Researcher",
    organization: "Pacific University",
    country: "Singapore",
    category: "YRF",
    biography:
      "Mei studies memory architectures for persistent agents and is a Young Researcher Forum presenter at WCCAUP2027.",
    status: true,
  },
  {
    id: 9,
    firstName: "Tomas",
    lastName: "Novak",
    designation: "Postdoctoral Fellow",
    organization: "Central European AI Lab",
    country: "Czechia",
    category: "POSTER",
    biography:
      "Tomas presents work on evaluation harnesses for multi-agent negotiation benchmarks.",
    status: true,
  },
  {
    id: 10,
    firstName: "Priya",
    lastName: "Raman",
    designation: "VP, Data & AI",
    organization: "Helix Manufacturing Group",
    country: "Singapore",
    category: "DELEGATE",
    biography: "Priya oversees industrial AI adoption across a global manufacturing footprint.",
    status: true,
  },
  {
    id: 11,
    firstName: "Marcus",
    lastName: "Hale",
    designation: "Research Engineer",
    organization: "Atlas Foundation Models",
    country: "United Kingdom",
    category: "FEATURED",
    biography:
      "Marcus focuses on retrieval-grounded generation and structured reasoning for enterprise assistants.",
    status: true,
  },
  {
    id: 12,
    firstName: "Ingrid",
    lastName: "Sorensen",
    designation: "Professor of Human-Computer Interaction",
    organization: "Nordic Design University",
    country: "Denmark",
    category: "UNABLE_TO_ATTEND",
    biography: "Withdrawn from the 2027 programme.",
    status: true,
  },
];

export const mockCommittee: CoreCommitteeMember[] = [
  {
    id: 1,
    firstName: "Rajiv",
    lastName: "Chandran",
    designation: "Conference Chair",
    organization: "Institute of Advanced Computing",
    country: "Singapore",
    bio: "Chairs the WCCAUP2027 organising committee and leads the scientific programme.",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    firstName: "Helena",
    lastName: "Krause",
    designation: "Programme Chair",
    organization: "Rhineland Technical University",
    country: "Germany",
    bio: "Coordinates track chairs and the peer-review process.",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    firstName: "Yusuf",
    lastName: "Demir",
    designation: "Publications Chair",
    organization: "Bosphorus AI Centre",
    country: "Türkiye",
    bio: "Oversees proceedings, abstracts and archival publication.",
    displayOrder: 3,
    status: true,
  },
  {
    id: 4,
    firstName: "Claire",
    lastName: "Dubois",
    designation: "Workshops Chair",
    organization: "Lumière Research Group",
    country: "France",
    bio: "Curates the tutorial and workshop programme.",
    displayOrder: 4,
    status: true,
  },
  {
    id: 5,
    firstName: "Arjun",
    lastName: "Kapoor",
    designation: "Industry Liaison",
    organization: "Northbridge Ventures",
    country: "India",
    bio: "Connects the conference with enterprise and startup participants.",
    displayOrder: 5,
    status: true,
  },
  {
    id: 6,
    firstName: "Nadia",
    lastName: "Haddad",
    designation: "Ethics & Governance Chair",
    organization: "Levant Policy Institute",
    country: "Lebanon",
    bio: "Leads the responsible AI review of accepted contributions.",
    displayOrder: 6,
    status: true,
  },
];

export const mockWorkshops: WorkshopBanner[] = [
  {
    id: 1,
    title: "Building Production Agent Systems",
    description: "A full-day, hands-on workshop on orchestration, tool APIs and failure recovery.",
    targetUrl: "/call-for-papers",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    title: "Evaluating Generative Models",
    description: "Practical evaluation design: benchmarks, human review and regression tracking.",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    title: "Responsible AI in Practice",
    description:
      "Risk assessment workflows, documentation and audit readiness for deployed systems.",
    targetUrl: "/program",
    displayOrder: 3,
    status: true,
  },
];

export const mockSponsors: Sponsor[] = [
  {
    id: 1,
    name: "Northwind Systems",
    sponsorshipLevel: "PLATINUM",
    websiteUrl: "https://example.com",
    description: "Enterprise agent platforms",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    name: "Meridian Cloud",
    sponsorshipLevel: "PLATINUM",
    websiteUrl: "https://example.com",
    description: "AI infrastructure",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    name: "Atlas Foundation Models",
    sponsorshipLevel: "GOLD",
    description: "Model research",
    displayOrder: 3,
    status: true,
  },
  {
    id: 4,
    name: "Helix Manufacturing Group",
    sponsorshipLevel: "GOLD",
    description: "Industrial AI",
    displayOrder: 4,
    status: true,
  },
  {
    id: 5,
    name: "Aurora Research Institute",
    sponsorshipLevel: "SILVER",
    description: "Scientific computing",
    displayOrder: 5,
    status: true,
  },
  {
    id: 6,
    name: "Pacific University",
    sponsorshipLevel: "SILVER",
    description: "Academic partner",
    displayOrder: 6,
    status: true,
  },
  {
    id: 7,
    name: "Lumière Research Group",
    sponsorshipLevel: "BRONZE",
    displayOrder: 7,
    status: true,
  },
  {
    id: 8,
    name: "Institute for Responsible Computing",
    sponsorshipLevel: "PARTNER",
    displayOrder: 8,
    status: true,
  },
];

export const mockMediaPartners: MediaPartner[] = [
  {
    id: 1,
    name: "Intelligence Review",
    description: "Independent AI research journalism",
    websiteUrl: "https://example.com",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    name: "Agentic Weekly",
    description: "Newsletter on autonomous systems",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    name: "Frontier Compute Journal",
    description: "Peer-reviewed computing publication",
    displayOrder: 3,
    status: true,
  },
  {
    id: 4,
    name: "Signal & Model",
    description: "Applied ML podcast",
    displayOrder: 4,
    status: true,
  },
];

export const mockAttendeesFrom: AttendeeFrom[] = [
  "Singapore",
  "India",
  "Japan",
  "Germany",
  "United Kingdom",
  "United States",
  "France",
  "Brazil",
  "Nigeria",
  "Australia",
  "Canada",
  "Netherlands",
  "South Korea",
  "Spain",
  "United Arab Emirates",
  "Switzerland",
  "Sweden",
  "South Africa",
].map((name, index) => ({ id: index + 1, name, displayOrder: index + 1, status: true }));

export const mockFiles: ConferenceFile[] = [
  {
    id: 1,
    title: "Conference Brochure",
    description: "Overview of WCCAUP2027, tracks and participation options.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "2.4 MB",
    displayOrder: 1,
    status: true,
  },
  {
    id: 2,
    title: "Call for Papers",
    description: "Scope, topics and submission requirements.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "640 KB",
    displayOrder: 2,
    status: true,
  },
  {
    id: 3,
    title: "Program PDF",
    description: "Provisional three-day programme.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "1.1 MB",
    displayOrder: 3,
    status: true,
  },
  {
    id: 4,
    title: "Registration Guidelines",
    description: "Categories, payment process and cancellation policy.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "480 KB",
    displayOrder: 4,
    status: true,
  },
  {
    id: 5,
    title: "Accommodation Guide",
    description: "Recommended hotels and booking guidance.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "820 KB",
    displayOrder: 5,
    status: true,
  },
];

export const mockUpdates: ConferenceUpdate[] = [
  {
    id: 1,
    title: "Registration is now open",
    body: "Early bird registration for WCCAUP2027 is open across all delegate categories until 15 January 2027.",
    publishedAt: "2026-09-01",
    tag: "Registration",
    status: true,
  },
  {
    id: 2,
    title: "Abstract deadline extended",
    body: "Following a high volume of submissions, the abstract deadline has been extended to 30 October 2026.",
    publishedAt: "2026-10-05",
    tag: "Submissions",
    status: true,
  },
  {
    id: 3,
    title: "New keynote speaker announced",
    body: "Dr. Sofia Almeida, Head of Applied AI at Northwind Systems, joins the keynote programme.",
    publishedAt: "2026-11-12",
    tag: "Speakers",
    status: true,
  },
  {
    id: 4,
    title: "Provisional programme released",
    body: "The three-day provisional programme, including workshops and poster sessions, is now available.",
    publishedAt: "2026-12-20",
    tag: "Program",
    status: true,
  },
];

export const mockProgram: ProgramDay[] = [
  {
    id: 1,
    label: "Day 1",
    date: "15 March 2027",
    sessions: [
      { id: 1, time: "08:30", title: "Registration & Welcome Coffee", type: "BREAK" },
      {
        id: 2,
        time: "09:30",
        title: "Opening Keynote: The Agentic Decade",
        type: "KEYNOTE",
        speaker: "Dr. Ananya Mehta",
        room: "Main Auditorium",
      },
      {
        id: 3,
        time: "11:00",
        title: "Foundation Models: Scaling and Beyond",
        type: "PLENARY",
        speaker: "Prof. Lukas Berger",
        room: "Main Auditorium",
      },
      {
        id: 4,
        time: "13:30",
        title: "Parallel Sessions: Generative Architectures",
        type: "SESSION",
        room: "Halls A–C",
      },
      { id: 5, time: "16:00", title: "Poster Session I", type: "POSTER", room: "Exhibition Hall" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    date: "16 March 2027",
    sessions: [
      {
        id: 6,
        time: "09:00",
        title: "Keynote: Reliability in Enterprise Agents",
        type: "KEYNOTE",
        speaker: "Sofia Almeida",
        room: "Main Auditorium",
      },
      {
        id: 7,
        time: "10:30",
        title: "Workshop: Building Production Agent Systems",
        type: "WORKSHOP",
        room: "Workshop Studio 1",
      },
      {
        id: 8,
        time: "13:30",
        title: "Parallel Sessions: Multi-Agent Systems",
        type: "SESSION",
        room: "Halls A–C",
      },
      {
        id: 9,
        time: "15:30",
        title: "Panel: Governance and Global Regulation",
        type: "PLENARY",
        room: "Main Auditorium",
      },
      { id: 10, time: "18:00", title: "Conference Dinner", type: "BREAK" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    date: "17 March 2027",
    sessions: [
      {
        id: 11,
        time: "09:00",
        title: "Plenary: AI for Science and Healthcare",
        type: "PLENARY",
        speaker: "Kenji Watanabe",
        room: "Main Auditorium",
      },
      { id: 12, time: "10:30", title: "Young Researcher Forum", type: "SESSION", room: "Hall B" },
      {
        id: 13,
        time: "13:00",
        title: "Workshop: Evaluating Generative Models",
        type: "WORKSHOP",
        room: "Workshop Studio 2",
      },
      {
        id: 14,
        time: "15:30",
        title: "Closing Keynote & Awards",
        type: "KEYNOTE",
        room: "Main Auditorium",
      },
    ],
  },
];

export const mockVenue: VenueInfo = {
  name: "Marina Bay Convention Centre",
  address: "10 Bayfront Avenue, Level 3",
  city: "Singapore",
  country: "Singapore",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=103.85%2C1.27%2C103.88%2C1.30&layer=mapnik",
  nearestAirport: "Singapore Changi Airport (SIN) — approximately 25 minutes by road",
  transportation: [
    "Direct metro access from the city centre, exit at Bayfront station",
    "Airport taxi and ride-hailing services available 24 hours",
    "Shuttle service between partner hotels and the venue during conference days",
    "On-site parking available for registered delegates",
  ],
  travelNotes:
    "Delegates requiring a visa invitation letter should contact the secretariat after completing registration. Placeholder details — final venue information will be published by the conference secretariat.",
};

export const mockHotels: Hotel[] = [
  {
    id: 1,
    name: "Bayfront Grand Hotel",
    category: "5-star",
    distanceFromVenue: "Connected to venue",
    priceRange: "Premium",
    notes: "Conference rate available with booking code.",
  },
  {
    id: 2,
    name: "Harbour View Residences",
    category: "4-star",
    distanceFromVenue: "400 m — 5 min walk",
    priceRange: "Mid-range",
    notes: "Breakfast included for delegates.",
  },
  {
    id: 3,
    name: "Central Station Suites",
    category: "4-star",
    distanceFromVenue: "1.2 km — 6 min by metro",
    priceRange: "Mid-range",
  },
  {
    id: 4,
    name: "Riverside Inn",
    category: "3-star",
    distanceFromVenue: "2.0 km — 10 min by metro",
    priceRange: "Economy",
    notes: "Recommended for student delegates.",
  },
];

export const registrationCategories: RegistrationCategory[] = [
  { code: "DELEGATE", label: "Delegate", description: "General attendance across all sessions." },
  { code: "STUDENT", label: "Student", description: "Requires valid proof of enrolment." },
  {
    code: "RESEARCHER",
    label: "Researcher",
    description: "Academic and institutional researchers.",
  },
  { code: "AUTHOR", label: "Author", description: "Accepted abstract presenters." },
  { code: "SPEAKER", label: "Speaker", description: "Invited, keynote and plenary speakers." },
  { code: "EXHIBITOR", label: "Exhibitor", description: "Exhibition booth participants." },
  { code: "OTHER", label: "Other", description: "Please describe in the notes field." },
];
