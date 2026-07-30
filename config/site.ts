// Single source of truth for site-wide content. Presentation lives in
// components; everything a hiring manager reads about *who* this is lives here.
// Kept in sync with the current CV. Every claim should survive an interview.

export interface NavItem {
  href: string
  label: string
}

export interface ProofPoint {
  value: string
  label: string
}

export interface Capability {
  title: string // framed as an outcome, not a tool list
  body: string
  tools: string[]
}

export const site = {
  name: "Md. Al Mamun Mim",
  shortName: "Mamun",
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
  // TODO: replace with a hosted, ATS-friendly PDF at /resume.pdf in /public.
  resumeUrl:
    "https://drive.google.com/file/d/1TvJHUHzDcKWtNC1ZGU1UIlLtzJ-hL9D3/view?usp=sharing",
  // TODO: add a Cal.com / Calendly link so recruiters can self-schedule across timezones.
  bookingUrl: "",
  url: "https://almamun.codes",
  socials: {
    github: "https://github.com/mamuncrafts",
    linkedin: "https://www.linkedin.com/in/almamunmim1611177146/",
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
export const proof: ProofPoint[] = [
  { value: "4+ yrs", label: "Shipping production web apps" },
  { value: "2×", label: "API throughput at Fanfare" },
  { value: "~60%", label: "Smaller API payloads at Fanfare" },
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
  { name: "IEEE Xtreme 14.0", detail: "Bangladesh Rank 5 · Global Rank 272", year: "2020" },
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
