import type { CaseStudy } from "@/lib/case-studies"

// ConversaAI, an internal data-integration platform (ETL + Reverse ETL) with
// connectors to popular SaaS tools.
// NOTE: the slug stays "dgihub" (the project's former name) so the published
// URL /work/dgihub keeps working. Display name only was changed.
export const dgihub: CaseStudy = {
  slug: "dgihub",
  title: "ConversaAI: a data integration platform",
  teaser:
    "An internal ETL and Reverse-ETL platform that moves data between a business's SaaS tools, with connectors, pipelines, and production-grade failure recovery.",
  metric: {
    value: "7+",
    label: "SaaS integrations",
  },
  // No verified cover: use the architecture preview for this internal project.
  year: "2026",
  meta: {
    role: "Full-Stack Developer",
    duration: "January 2026 – Present",
    team: "5 people",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Python", "Airbyte", "AWS EC2"],
    links: [], // internal platform, no public URL
  },
  context:
    "ConversaAI is an internal data-integration platform. Businesses run their operations across many SaaS tools (storefronts, CRMs, accounting, email marketing), and their data ends up siloed in each one. ConversaAI's job is to move that data where it's needed: pull it in from those tools (ETL) and push modeled data back out to them (Reverse ETL), so every system is working from the same picture.",
  problem:
    "Every third-party service integrates differently: its own auth, rate limits, pagination and data shapes. Stitching them together by hand is brittle, and because the syncs run continuously in production, a single upstream hiccup can't be allowed to corrupt data or wedge the whole pipeline. The platform needed reliable, recoverable data movement in both directions, not a pile of one-off scripts.",
  constraints: [
    "Heterogeneous sources: Shopify, WooCommerce, Zoho, Brevo, Mailchimp, QuickBooks and Wix Commerce each behave differently, so the connector layer had to absorb that variation behind a consistent interface.",
    "Production, always-on syncs: partial failures are normal, so reliability, failure handling and recovery had to be designed in, not bolted on.",
    "Two-way movement: data has to flow in (ETL) and back out (Reverse ETL), which doubles the surface area that can break.",
  ],
  approach: [
    {
      heading: "Airbyte for extraction, custom connectors for the rest",
      body: "Leaned on Airbyte for the sources it already supports, and wrapped the remaining services in custom connectors behind a common interface, so the pipelines downstream don't care which tool the data came from.",
    },
    {
      heading: "Idempotent, recoverable pipelines",
      body: "Built the data pipelines (NestJS orchestration with Python transforms) to be resumable: a failed sync retries from where it left off and doesn't double-write, so an upstream outage is a delay rather than a data-integrity problem.",
    },
    {
      heading: "PostgreSQL as the canonical store",
      body: "Landed raw data in PostgreSQL, transformed it into modeled tables, and drove Reverse-ETL from there, keeping one source of truth between the inbound and outbound halves of the system.",
    },
    {
      heading: "A console to configure and watch syncs",
      body: "A Next.js console over the NestJS API lets operators set up integrations and see what's flowing, so managing connectors doesn't require a developer.",
    },
  ],
  architecture: {
    caption:
      "SaaS sources are extracted via Airbyte and custom connectors, landed raw in PostgreSQL, transformed by Python pipelines, and pushed back out to SaaS destinations via Reverse ETL. A Next.js console configures and monitors it all through the NestJS API.",
    nodes: [
      { id: "ui", label: "Next.js console", kind: "client" },
      { id: "api", label: "NestJS API", kind: "service" },
      { id: "airbyte", label: "Airbyte + connectors", kind: "service" },
      { id: "pipe", label: "Python pipelines", kind: "service" },
      { id: "pg", label: "PostgreSQL", kind: "datastore" },
      { id: "sources", label: "SaaS sources", kind: "external" },
      { id: "dests", label: "SaaS destinations", kind: "external" },
    ],
    edges: [
      { from: "ui", to: "api", label: "configure syncs" },
      { from: "api", to: "airbyte", label: "orchestrate" },
      { from: "sources", to: "airbyte", label: "extract" },
      { from: "airbyte", to: "pg", label: "load raw" },
      { from: "pg", to: "pipe", label: "transform" },
      { from: "pipe", to: "pg", label: "load modeled" },
      { from: "pg", to: "dests", label: "reverse ETL" },
    ],
  },
  outcome: [
    "Integrated 7+ SaaS services behind one platform: Shopify, WooCommerce, Zoho, Brevo, Mailchimp, QuickBooks and Wix Commerce.",
    "Built the pipelines for production reliability, with explicit failure handling and recovery so a sync that hits an upstream outage retries and recovers instead of dropping or duplicating data.",
    "Two-way data movement (ETL and Reverse ETL) keeps a business's tools working from the same, up-to-date data.",
  ],
  retro:
    "I'd push harder on observability: per-pipeline health, alerting, and a dashboard for sync latency and failure rates, so problems surface before someone notices missing data. I'd also add a schema-contract check at ingestion so an upstream API change fails loudly at the boundary instead of quietly propagating bad data downstream, plus a first-class backfill tool for re-syncing a source cleanly.",
  order: 3,
}
