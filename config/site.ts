// Single source of truth for site-wide content. Presentation lives in
// components; everything a hiring manager reads about *who* this is lives here.
// Kept in sync with the current CV. Every claim should survive an interview.

export interface NavItem {
  href: string
  label: string
}

/**
 * A measured before/after. `ratio` is width relative to the group's shared
 * maximum, so the bars render to scale, so these must stay honest, and every
 * figure below traces to a bullet on the CV.
 */
export interface Trace {
  label: string
  before: { ratio: number; value: string }
  after: { ratio: number; value: string }
}

export interface Capability {
  title: string // framed as an outcome, not a tool list
  body: string
  tools: string[]
}

export const site = {
  name: "Md. AL Mamun Mim",
  shortName: "Md. AL Mamun Mim",
  title: "Senior Full-Stack Developer",
  // Concrete, specific positioning, not "passionate developer".
  positioning:
    "I build remote-first web products end to end: typed React front ends, Node and NestJS APIs, and the fast, secure data layers behind them.",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  // Honest overlap statement for the target markets.
  timezoneOverlap:
    "Full overlap with UK & EU mornings, solid overlap with US East mornings and Australia afternoons.",
  yearsExperience: 4,
  availability: "Available for remote contract or full-time work",
  email: "md.almamun.mim.dev@gmail.com",
  phone: "+880 1770 540432",
  // Self-hosted, ATS-friendly PDFs in /public. `resumeUrl` is the conventional
  // reverse-chronological CV (what recruiters and ATS expect); `resumeContractUrl`
  // is the problem-first version for client and agency conversations.
  resumeUrl: "/resume.pdf",
  resumeContractUrl: "/resume-contract.pdf",
  // TODO: add a Cal.com / Calendly link so recruiters can self-schedule across timezones.
  bookingUrl: "",
  url: "https://almamun.codes",
  socials: {
    github: "https://github.com/mamuncrafts",
    linkedin: "https://www.linkedin.com/in/mamuncrafts/",
    twitter: "https://twitter.com/soft_eng_mamun",
  },
} as const

export const nav: NavItem[] = [
  { href: "/work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export const coreStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
]

// Real, verifiable numbers only (from the CV). No invented figures.
// Every figure here was measured on the same system, which the hero states.

// The one number that leads. Throughput is a higher-is-better measure, so it
// sits outside the chart rather than inverting the chart's axis.
export const headlineMetric = {
  value: "2×",
  label: "API throughput",
  detail: "GraphQL resolvers, after DataLoader batching and Redis caching",
} as const

// Both rows share one axis: the bar is cost, and shorter is better. Keeping the
// grammar consistent is what lets the bars be read without a legend per row.
export const traces: Trace[] = [
  {
    label: "Response payload",
    before: { ratio: 1, value: "100%" },
    after: { ratio: 0.4, value: "~40%" },
  },
  {
    label: "Resolver compute",
    before: { ratio: 1, value: "100%" },
    after: { ratio: 0.5, value: "~50%" },
  },
]

export const capabilities: Capability[] = [
  {
    title: "Features shipped end to end",
    body: "From typed React UIs to the API and schema behind them. I own a feature from first commit to production rather than throwing it over a wall.",
    tools: ["React", "Next.js", "TypeScript", "Redux", "MUI"],
  },
  {
    title: "APIs and data models that hold up",
    body: "GraphQL and REST services with clear boundaries, sensible schemas, and caching where it actually matters. Built to be extended, not rewritten next year.",
    tools: ["Node.js", "NestJS", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Performance and reliability",
    body: "Backend and bundle optimisation with measurable results: doubled throughput, lower latency, faster loads, and high test coverage that keeps bugs out of production.",
    tools: ["Docker", "CI/CD", "AWS", "Jest"],
  },
  {
    title: "Hard problems, decomposed",
    body: "A competitive-programming background means I'm comfortable with the gnarly ones: reducing a vague requirement to a small, testable core and building out from there.",
    tools: ["Algorithms", "Data structures", "Systems thinking"],
  },
]

// Grouped, scannable stack for recruiters + ATS, mirroring the CV. Plain lists
// only: no bars, no percentages, no logo wall (per the brief).
export interface SkillGroup {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Redux", "MUI", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "NestJS", "GraphQL", "REST APIs", "Microservices"] },
  { title: "Databases", skills: ["MongoDB", "PostgreSQL", "MySQL", "Firestore", "Redis"] },
  { title: "Cloud & DevOps", skills: ["AWS (EC2, S3, Serverless)", "Docker", "CI/CD", "Git / GitHub"] },
  { title: "Testing", skills: ["Jest", "Unit & integration tests"] },
  { title: "Remote & process", skills: ["Agile / Scrum", "Jira", "Slack", "PostHog", "Google Analytics"] },
]

export const highlights = [
  { name: "IEEE Xtreme 14.0", detail: "Bangladesh Rank 5 · Team CrazyCodersRu", year: "2020" },
  { name: "Codeforces", detail: "600+ problems solved", year: "2018–2022" },
]

// Highlighted credentials, shown on both Home and About via <CredentialCard>.
export const credentials = {
  recognition: {
    title: "Tech Genius Award",
    org: "Talent Pro · Simura Group",
    note: "Awarded for collaboration and innovation.",
  },
  certification: {
    title: "MongoDB Certified Associate Developer",
    org: "MongoDB, Inc.",
    url: "https://www.credly.com/badges/8165f49c-1750-4c38-841a-0a819f2a371a",
  },
} as const

export const education = [
  {
    name: "B.Sc. in Information & Communication Engineering",
    org: "University of Rajshahi",
    year: "2017–2022",
  },
]
