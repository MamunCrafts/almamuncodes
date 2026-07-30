import type { CaseStudy } from "@/lib/case-studies"

// Written from the real project (Quran Analyzer, a full-stack NLP/text-analysis
// tool, live on Vercel). Verify the TODO items before publishing.
export const quranAnalyzer: CaseStudy = {
  slug: "quran-analyzer",
  title: "Quran Analyzer: text analysis at scale",
  teaser:
    "A full-stack tool for linguistic analysis of a large, fixed corpus: word frequency, thematic grouping and fast search over the whole text.",
  metric: {
    // TODO: a real number, e.g. corpus size (verses/tokens) or search latency.
    value: "6,236",
    label: "verses indexed", // TODO: confirm the corpus size you actually index
  },
  cover: "/project-quran-analyzer.png",
  year: "2023",
  meta: {
    role: "Full-Stack Developer (solo)",
    duration: "TODO (e.g. side project, ~6 weeks)",
    team: "Solo",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
    links: [{ label: "Live", href: "https://quran-analyzer.vercel.app/" }],
  },
  context:
    "A personal project to make a large religious text explorable, not just readable. The corpus is fixed and well-structured, which is exactly the setup where precomputation pays off. Built solo, end to end.",
  problem:
    "Answering questions like 'how often does this root appear, and where?' or 'group these passages by theme' means scanning and aggregating across the entire text. Doing that per request, live, is wasteful and slow: the data never changes, but a naive implementation recomputes the same analysis on every visit.",
  constraints: [
    "A fixed corpus that never changes at runtime, so anything computed live is computed needlessly.",
    "Text search and frequency analysis have to feel instant in the browser.",
    "Solo build on a hobby budget: it had to run cheaply and deploy with zero ops.",
  ],
  approach: [
    {
      heading: "Precompute, don't recompute",
      body: "Because the corpus is static, I built the frequency tables, root/word indexes and thematic groupings once as a processing step and stored the derived data in MongoDB, rather than analysing text on every request.",
    },
    {
      heading: "Typed Next.js front end over a thin API",
      body: "A Next.js/TypeScript UI queries a small Node API for slices of the precomputed data. The client stays fast because it fetches results, not raw text to crunch.",
    },
    {
      heading: "Search shaped around the questions asked",
      body: "Indexed the data around the actual queries (by word, by root, by theme) so lookups hit an index instead of scanning documents.",
    },
  ],
  architecture: {
    caption:
      "A one-time processing step turns the raw corpus into indexed, aggregated documents in MongoDB. The Next.js UI reads those precomputed slices through a thin Node API, with no live text-crunching on the request path.",
    nodes: [
      { id: "corpus", label: "Raw corpus", kind: "external" },
      { id: "proc", label: "Processing step", kind: "service" },
      { id: "mongo", label: "MongoDB (indexed)", kind: "datastore" },
      { id: "api", label: "Node API", kind: "service" },
      { id: "ui", label: "Next.js UI", kind: "client" },
    ],
    edges: [
      { from: "corpus", to: "proc", label: "once" },
      { from: "proc", to: "mongo", label: "aggregates + indexes" },
      { from: "ui", to: "api", label: "query slices" },
      { from: "api", to: "mongo", label: "indexed reads" },
    ],
  },
  outcome: [
    "Analysis that would be slow to compute live returns instantly, because it's read from precomputed indexes. TODO: add a real search-latency number.",
    "Runs cheaply with zero ops on Vercel: the static-corpus design means no heavy compute on the hot path.",
    "Shipped and publicly usable end to end, from data processing to UI.",
  ],
  retro:
    "The processing step was a script I ran by hand. That's fine for a corpus that never changes, but I'd make it a reproducible, version-pinned pipeline so a change to the analysis is one command and the derived data is auditable. I'd also add a small evaluation set for the thematic grouping so I could measure whether a change actually improved it, instead of eyeballing.",
  order: 3,
}
