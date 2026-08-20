import type { CaseStudy } from "@/lib/case-studies"

// Casa Deco: an ERP-style platform for an interior-décor business. The client's
// own product URL is confidential, so there are no links and the company is
// described by industry rather than named beyond the platform itself.
//
// No `metric`: there are no measured before/after figures for this one, and the
// schema makes metric optional precisely so a card can stand without inventing
// a number. Every claim below traces to something stated about the work.
export const casaDeco: CaseStudy = {
  slug: "casa-deco",
  title: "Casa Deco: nine departments, one system",
  teaser:
    "Led a four-person team building an ERP-style platform where accounting, HR, inventory, projects and sales share one data model instead of nine separate trackers.",
  year: "2026",
  meta: {
    role: "Project Lead / Senior Software Engineer",
    duration: "April 2026 – August 2026",
    team: "4 engineers",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Node.js"],
    links: [],
  },
  context:
    "Casa Deco is a business management platform for an interior-décor company, covering accounting, HR, project management, inventory, architecture management, sales, and the task layer on top of all of it: a Kanban board, action plans and Gantt charts. I joined as Project Lead and senior engineer on a four-person team, owning technical planning and system architecture alongside feature work, module integration, code review and day-to-day coordination. The build ran over four months from April to August 2026, in parallel with my other delivery work rather than as a single full-time push.",
  problem:
    "An ERP is not nine applications sharing a login. The difficulty is that the modules describe the same business from different angles: a project consumes people from HR, stock from inventory, cost from accounting, and produces revenue in sales. Model those separately and every cross-module view becomes a reconciliation problem; model them as one tangle and no module can change without breaking the others. With four engineers against nine operational areas, the shared core had to be right early, because there was no budget to rebuild it per module later.",
  constraints: [
    "Four engineers, nine operational areas: anything bespoke per module was time we did not have, so the shared core had to carry as much of the behaviour as possible.",
    "One system, several audiences. Accounting, HR, sales and delivery teams see overlapping records with different rights, so permissions had to be enforced per module and per record rather than per page.",
    "Reporting and day-to-day transactional work share one database, and accounting and inventory aggregates grow steadily, so read-heavy dashboards could not be allowed to slow down the write path.",
    "The Kanban board, action plans and Gantt charts describe the same underlying tasks, and several people edit them at once, so the three views had to stay consistent with each other.",
  ],
  approach: [
    {
      heading: "One shared core, nine modules on top",
      body: "Rather than nine vertical slices, the domain entities every area needs (organisation, people, projects, products, documents) live in a shared core, and each module owns only what is genuinely its own. Modules depend on the core and not on each other, so a project can read across HR, inventory, accounting and sales without any module reaching into another's tables. This was the decision the rest of the architecture rested on, and the one I spent the most planning time getting right.",
    },
    {
      heading: "Permissions as a cross-cutting concern",
      body: "Access control is defined once and applied at the boundary of every module rather than re-implemented per screen. Rights resolve on two axes: which module an action belongs to, and which records the actor may see within it. Overlapping audiences can therefore share a record set while seeing different slices of it. Centralising this kept nine modules from each growing their own subtly different notion of who may do what.",
    },
    {
      heading: "Keeping reports off the transactional path",
      body: "Accounting and inventory dashboards aggregate across a growing history, which is exactly the work that competes with everyday writes. Those read paths were shaped and indexed deliberately, and treated as a separate concern from the transactional endpoints, so a heavy report could not degrade the screens people use continuously.",
    },
    {
      heading: "Three views, one task model",
      body: "The Kanban board, action plans and Gantt charts are presentations of a single task model rather than three features with their own state. Ordering, dependency and progress live with the task, so moving a card, editing an action plan and dragging a Gantt bar are the same underlying change, and several people working at once converge on the same picture instead of drifting apart.",
    },
    {
      heading: "Leading the build, not just writing it",
      body: "As Project Lead I set the technical plan and the module boundaries, reviewed the team's code against them, and took on the integration work where two modules met, usually where the hard problems surfaced. Much of the value was in keeping four people's work composable: agreeing the shared contracts up front so features written in parallel fit together on merge.",
    },
  ],
  architecture: {
    caption:
      "A Next.js client talks to a modular NestJS API. Every module request resolves through one permission layer before it reaches PostgreSQL, so module and record rights are enforced in a single place. The task views share one model, with board changes propagating so simultaneous editors stay in agreement.",
    nodes: [
      { id: "web", label: "Next.js app", kind: "client" },
      { id: "api", label: "NestJS modular API", kind: "service" },
      { id: "authz", label: "Permission layer", kind: "service" },
      { id: "tasks", label: "Shared task model", kind: "service" },
      { id: "pg", label: "PostgreSQL", kind: "datastore" },
    ],
    edges: [
      { from: "web", to: "api", label: "module requests" },
      { from: "api", to: "authz", label: "module + record rights" },
      { from: "authz", to: "pg", label: "scoped queries" },
      { from: "api", to: "tasks", label: "kanban · plans · gantt" },
      { from: "tasks", to: "pg", label: "one task, three views" },
      { from: "api", to: "pg", label: "transactional writes" },
    ],
  },
  outcome: [
    "Nine operational areas (accounting, HR, projects, inventory, architecture management, sales, Kanban, action plans and Gantt) run as modules over one shared core and one permission model.",
    "Teams manage operations, projects, resources, sales activity and task progress from a single application rather than from separate per-department trackers.",
    "Kanban, action plans and Gantt read from one task model, so the three views agree rather than each holding its own version of progress.",
    "Delivered as Project Lead of a four-person team: technical planning, system architecture, module integration, code review and coordination.",
  ],
  retro:
    "I would put the permission model into a single declarative policy definition from the first module rather than growing it alongside them. It ended up centralised, but it got there by consolidation, and every module added before that point had to be revisited. On an ERP the access rules are effectively part of the domain model, and treating them as infrastructure to be added later underestimates how much of the system's shape they determine.",
  order: 2,
}
