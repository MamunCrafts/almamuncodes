import { z } from "zod"
import { bominbo } from "@/content/work/bominbo"
import { casaDeco } from "@/content/work/casa-deco"
import { dgihub } from "@/content/work/dgihub"
import { fanfare } from "@/content/work/fanfare"
import { quranAnalyzer } from "@/content/work/quran-analyzer"

// Typed, validated case-study content. This replaces an MDX pipeline: the
// case-study structure here is highly regular (fixed named sections + sidebar
// metadata), so typed data + Zod gives the same "content separated from
// presentation, validated" guarantee the brief asks for, with no MDX tooling.

export const architectureNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: z.enum(["client", "service", "datastore", "external"]),
})

export const architectureEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
})

export const caseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  // one-sentence problem framing, used on cards
  teaser: z.string(),
  // one hard metric for the card; omit entirely if there is no real number
  metric: z.object({ value: z.string(), label: z.string() }).optional(),
  // Only verified project images belong here; omit to use an architecture preview.
  cover: z.string().optional(),
  // omit when the year is not known; the header renders without it
  year: z.string().optional(),
  // sticky sidebar metadata
  meta: z.object({
    role: z.string(),
    duration: z.string().optional(),
    team: z.string(),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
  // the seven-part senior case-study structure
  context: z.string(),
  problem: z.string(),
  constraints: z.array(z.string()),
  approach: z.array(z.object({ heading: z.string(), body: z.string() })),
  architecture: z.object({
    caption: z.string(),
    nodes: z.array(architectureNodeSchema),
    edges: z.array(architectureEdgeSchema),
  }),
  outcome: z.array(z.string()),
  retro: z.string(), // "what I would change": the senior differentiator
  order: z.number(),
})

export type CaseStudy = z.infer<typeof caseStudySchema>

const registry = z.array(caseStudySchema).parse([bominbo, casaDeco, dgihub, fanfare, quranAnalyzer])

export function getAllCaseStudies(): CaseStudy[] {
  return [...registry].sort((a, b) => a.order - b.order)
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return registry.find((c) => c.slug === slug)
}

export function getCaseStudySlugs(): string[] {
  return registry.map((c) => c.slug)
}
