import { ChevronRight } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"

type Arch = CaseStudy["architecture"]

const laneOrder: Arch["nodes"][number]["kind"][] = ["client", "service", "datastore", "external"]
const laneTitle: Record<Arch["nodes"][number]["kind"], string> = {
  client: "Client",
  service: "Service",
  datastore: "Data",
  external: "External",
}

export function ArchitectureDiagram({ architecture }: { architecture: Arch }) {
  const lanes = laneOrder
    .map((kind) => ({ kind, nodes: architecture.nodes.filter((n) => n.kind === kind) }))
    .filter((lane) => lane.nodes.length > 0)

  const nodeLabel = (id: string) => architecture.nodes.find((n) => n.id === id)?.label ?? id

  return (
    <figure className="not-prose rounded-[--radius] border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        {lanes.map((lane, li) => (
          <div key={lane.kind} className="flex flex-1 items-stretch gap-4">
            <div className="flex-1">
              <p className="label mb-3">{laneTitle[lane.kind]}</p>
              <div className="flex flex-col gap-2">
                {lane.nodes.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-[--radius] border px-3 py-2.5 font-mono text-sm ${
                      n.kind === "service"
                        ? "border-muted bg-raised text-ink"
                        : "border-line bg-bg text-muted"
                    }`}
                  >
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
            {li < lanes.length - 1 && (
              <div className="hidden items-center text-faint sm:flex" aria-hidden>
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* edges as a labeled legend: the "flow" the diagram encodes */}
      <ul className="mt-6 grid gap-2 border-t border-line pt-5 font-mono text-xs text-muted sm:grid-cols-2">
        {architecture.edges.map((e, i) => (
          <li key={i} className="flex items-baseline gap-2">
            <span className="text-ink">{nodeLabel(e.from)}</span>
            <ChevronRight className="h-3 w-3 shrink-0 translate-y-0.5 text-accent-text" />
            <span className="text-ink">{nodeLabel(e.to)}</span>
            {e.label && <span className="text-muted">· {e.label}</span>}
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
        {architecture.caption}
      </figcaption>
    </figure>
  )
}
