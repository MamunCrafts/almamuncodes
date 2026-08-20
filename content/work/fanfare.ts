import type { CaseStudy } from "@/lib/case-studies"

// Fanfare, a consumer social app on Android (Play Store), with a NestJS/GraphQL
// backend and admin console.
export const fanfare: CaseStudy = {
  slug: "fanfare",
  title: "Fanfare: a social platform's backend",
  teaser:
    "Built and maintained the GraphQL backend behind a consumer social app: feeds, profiles, comments and real-time notifications.",
  metric: {
    value: "2×",
    label: "API throughput",
  },
  cover: "/fanfare-case-study-bg-talentpro.webp",
  year: "2025",
  meta: {
    role: "Full-Stack Developer (backend-leaning)",
    duration: "2022–2025",
    team: "Small team",
    stack: ["NestJS", "GraphQL", "Node.js", "Redis", "PostgreSQL", "MongoDB", "Firebase"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.fanfare.android" },
    ],
  },
  context:
    "Fanfare is a consumer social product for Android. Users create profiles, post to a shared feed, comment, and get notified when others interact with them. I worked on the platform's backend and its internal admin console, owning the GraphQL API and the data layer that fed both the mobile app and the operations team.",
  problem:
    "A social feed is deceptively hard: reads massively outnumber writes, every screen stitches together data from several places (the user, their graph, the content, the interaction counts), and notifications have to feel instant. The early API made a round-trip per piece of that, so busy screens fanned out into many slow queries and the feed felt sluggish as content grew.",
  constraints: [
    "Mobile-first: the client is on flaky mobile networks, so the API had to return exactly what a screen needs in one request, with no chatty round-trips.",
    "Mixed data shapes: relational data (users, the social graph) and document/feed data don't fit one store cleanly.",
    "Small team, live product, so changes had to ship incrementally without a big-bang rewrite or downtime.",
  ],
  approach: [
    {
      heading: "GraphQL as the single mobile contract",
      body: "Modelled the API in NestJS with GraphQL so each screen fetches its whole tree in one request. Resolvers are split by domain (profile, feed, social, notifications) with DataLoader batching so a feed of N posts doesn't become N+1 queries against the database.",
    },
    {
      heading: "Right store for each shape",
      body: "Kept strongly-relational data (accounts, the follow graph) in PostgreSQL where joins and constraints belong, and content/feed documents in MongoDB where the shape is flexible and read-optimised. Each store does what it's good at instead of forcing one to do both.",
    },
    {
      heading: "Redis where reads hurt",
      body: "Put hot, read-heavy data behind Redis (session/auth state and expensive aggregate counts like likes, comments and unread badges), with invalidation on the write path. That took repeated pressure off Postgres/Mongo for the values every screen reads.",
    },
    {
      heading: "Real-time notifications via Firebase",
      body: "Wired interaction events (comment, reaction, follow) into Firebase Cloud Messaging so pushes land immediately, keeping the notification path off the request/response cycle.",
    },
    {
      heading: "Made the hot paths fast, and kept them safe",
      body: "Profiled the heaviest resolvers and refactored them, which roughly halved their compute time and cut memory use by about a third. I also kept high unit-test coverage on the API layer, which held post-deployment bugs down as the surface grew.",
    },
  ],
  architecture: {
    caption:
      "Android client talks to a single NestJS GraphQL API; the API batches through DataLoader, reads hot values from Redis, and persists to Postgres (relational) and Mongo (content). Interaction events fan out to FCM for push.",
    nodes: [
      { id: "app", label: "Android app", kind: "client" },
      { id: "gql", label: "NestJS GraphQL API", kind: "service" },
      { id: "redis", label: "Redis cache", kind: "datastore" },
      { id: "pg", label: "PostgreSQL", kind: "datastore" },
      { id: "mongo", label: "MongoDB", kind: "datastore" },
      { id: "fcm", label: "Firebase FCM", kind: "external" },
    ],
    edges: [
      { from: "app", to: "gql", label: "1 query per screen" },
      { from: "gql", to: "redis", label: "hot reads / counts" },
      { from: "gql", to: "pg", label: "users · graph" },
      { from: "gql", to: "mongo", label: "feed · content" },
      { from: "gql", to: "fcm", label: "push events" },
    ],
  },
  outcome: [
    "Doubled API throughput and cut latency by ~45% after reworking the GraphQL schema and resolver logic.",
    "Cut the data sent per request by ~60% by tightening GraphQL selections and REST payloads.",
    "Added role-based access control and an e-commerce checkout flow, and gave the ops team a matching admin console for user management, moderation and usage.",
  ],
  retro:
    "I'd invest earlier in load and query observability. A lot of the tuning was reactive; we found the slow screens by using the app. With per-resolver timing and slow-query logging from day one, we'd have caught the N+1 and cache-miss hotspots before users felt them. I'd also formalise cache invalidation as an event the write path emits, rather than something each mutation remembers to do.",
  order: 4,
}
