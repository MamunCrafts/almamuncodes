import type { CaseStudy } from "@/lib/case-studies"

// Bominbo: an internal accounting, client and sales platform.
//
// `links` is empty pending the URL. No `metric`: no measured figures were given
// for this one, and the schema makes metric optional so a card can stand
// without an invented number.
//
// NEEDS CONFIRMATION (flagged to Mamun, do not treat as verified):
//   * meta.role: his title on this project
//   * meta.duration / year: dates
//   * whether the ledger is genuinely double-entry (the approach section below
//     assumes posted corrections rather than edits, see "A ledger that only
//     grows")
//   * retro: a first-person reflection, currently drafted
export const bominbo: CaseStudy = {
  slug: "bominbo",
  title: "Bominbo: an accounting core with live operations on top",
  teaser:
    "An internal platform where the accounting ledger, client invoicing and an automated delivery workflow share one system, with live updates pushed over SSE.",
  meta: {
    role: "Senior Software Engineer",
    team: "4–5 engineers",
    stack: ["Next.js", "Laravel", "MySQL", "Redis", "TypeScript", "PHP"],
    links: [],
  },
  context:
    "Bominbo is an internal business platform covering two halves of the same operation. On the accounting side: a ledger, transactions, vouchers and reports. On the commercial side: client management, invoicing, and a delivery system built to run automatically rather than be tracked by hand. Access is governed by role-based permissions, and operational screens update live over server-sent events. It was built by a team of four to five engineers, with a Next.js front end against a Laravel API on MySQL, and Redis behind the caching and background work.",
  problem:
    "The two halves of this system want opposite things. Accounting is unforgiving: a ledger is financial history, so entries have to stay auditable and balanced, which rules out treating them as ordinary editable records. The commercial side wants the opposite: immediate feedback as invoices move and deliveries progress, without anyone refreshing a page. And reports sit on top of both, aggregating across the whole transaction history while the same database is serving daily entry. Correctness pulls toward append-only and transactional, responsiveness pulls toward pushed updates, and reporting pulls toward wide reads. Getting all three from one system was the work.",
  constraints: [
    "Accounting records are financial history, not editable rows: a mistake has to be corrected by posting against it, so the write model could not be plain updates.",
    "Reports aggregate across the full transaction history while the same MySQL instance serves day-to-day entry, so heavy reads could not be allowed to slow the write path.",
    "Operations staff watch state change as it happens (invoices, deliveries), so screens had to update without polling or manual refresh.",
    "Accounts, sales and delivery work on overlapping records with different rights, so permissions had to resolve per module and per record.",
    "A split stack: a Next.js front end and a Laravel API are two runtimes with one contract between them, and that boundary had to stay explicit.",
  ],
  approach: [
    {
      heading: "A ledger that only grows",
      body: "Accounting entries are treated as history rather than mutable state: vouchers post transactions into the ledger, and a correction is a further posting rather than an edit to what came before. That keeps the trail auditable, since every balance can be explained by the entries that produced it, and it removes a whole class of bug where a retroactive edit silently changes a period that has already been reported on.",
    },
    {
      heading: "Automation off the request path",
      body: "The delivery system runs as background work rather than inside the request that triggers it. Queued jobs handle the automated steps, so a user action returns immediately and the sequence continues behind it, with retries where a step can fail transiently. This also keeps long-running automation from holding a web worker open.",
    },
    {
      heading: "SSE rather than polling or sockets",
      body: "The realtime requirement here is one-directional: the server has news for the client, and the client has nothing to say back over the same channel. Server-sent events fit that exactly: plain HTTP, automatic reconnection, no separate socket infrastructure to run alongside the API. Operational screens subscribe to the changes that concern them and update as work progresses, instead of polling on a timer.",
    },
    {
      heading: "Permissions resolved in one place",
      body: "Role-based access control is applied at the API boundary rather than re-checked per screen, resolving both which module an action belongs to and which records the actor may act on within it. Accounts, sales and delivery therefore share one record set while each seeing only their slice, and a new module inherits the rules instead of inventing its own.",
    },
    {
      heading: "Keeping reports away from daily entry",
      body: "Report aggregates are cached in Redis rather than recomputed against MySQL on every view, so the expensive reads that accounting reports require stop competing with the transactional work happening at the same time.",
    },
  ],
  architecture: {
    caption:
      "A Next.js client calls a Laravel API over one explicit contract; permissions resolve at that boundary before anything reaches MySQL. Ledger writes are transactional and append-only, delivery automation runs as queued jobs off the request path, and Redis carries both the queue and the cached report aggregates. Change events flow back to the client as server-sent events.",
    nodes: [
      { id: "web", label: "Next.js app", kind: "client" },
      { id: "api", label: "Laravel API + RBAC", kind: "service" },
      { id: "jobs", label: "Queued automation", kind: "service" },
      { id: "sse", label: "SSE stream", kind: "service" },
      { id: "redis", label: "Redis", kind: "datastore" },
      { id: "mysql", label: "MySQL", kind: "datastore" },
    ],
    edges: [
      { from: "web", to: "api", label: "requests · role-checked" },
      { from: "api", to: "mysql", label: "ledger · invoices" },
      { from: "api", to: "redis", label: "queue · report cache" },
      { from: "redis", to: "jobs", label: "delivery steps" },
      { from: "jobs", to: "mysql", label: "posted results" },
      { from: "redis", to: "sse", label: "change events" },
      { from: "sse", to: "web", label: "live updates" },
    ],
  },
  outcome: [
    "Accounting (ledger, transactions, vouchers and reports) and the commercial side (clients, invoices and delivery) run in one internal system rather than separate tools.",
    "The delivery workflow runs automatically as queued background steps instead of being advanced by hand.",
    "Operational screens update live over server-sent events, so staff see invoice and delivery progress without refreshing.",
    "Role-based access control lets accounts, sales and delivery share the same records while each sees only what its role permits.",
  ],
  retro:
    "I would separate the reporting reads from the transactional schema sooner. Caching aggregates in Redis solved the symptom, but the reports were still shaped by tables designed for entry, which limits how far that goes: a read model built for the questions reports actually ask would have scaled better than caching answers to the wrong shape. I would also define the SSE event contract as deliberately as the REST one: it grew per feature, and by the end the client knew more about server internals than it needed to.",
  order: 1,
}
