import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"

// Visual previews are shared by the homepage and work gallery.
export function CaseStudyCard({ study, index, dimensional = false, headingLevel = "h3" }: { study: CaseStudy; index: number; dimensional?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  const metric = study.metric
  if (dimensional) {
    return (
      <Link href={`/work/${study.slug}`} className="studio-project group">
        {/* Use supplied covers, or real architecture labels for private projects. */}
        <div className="studio-project-preview" aria-hidden="true">
          <div className="studio-project-surface">
            {study.cover ? (
              <Image src={study.cover} alt="" fill sizes="(min-width: 1024px) 440px, (min-width: 640px) 40vw, 90vw" className="object-cover" />
            ) : (
              <div className="studio-project-diagram">
                {study.architecture.nodes.slice(0, 3).map((node) => (
                  <div key={node.id} className="studio-project-node">{node.label}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Case-study facts remain the primary content of the link. */}
        <div className="studio-project-body">
          <p className="mb-3 text-sm text-muted">{study.meta.role}</p>
          <Heading className="text-display-sm transition-colors group-hover:text-accent-text">{study.title}</Heading>
          <p className="mt-4 max-w-xl text-muted">{study.teaser}</p>
          <p className="mt-5 text-sm text-muted">{study.meta.stack.slice(0, 5).join(" / ")}</p>
          {metric && <p className="mt-5 text-sm"><span className="mr-2 text-2xl">{metric.value}</span>{metric.label}</p>}
          <span className="studio-project-action mt-6 inline-flex items-center gap-2 text-sm">Read case study<ArrowUpRight className="h-4 w-4" /></span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid gap-6 border-t border-line py-8 transition-colors first:border-t-0 sm:grid-cols-12 sm:gap-8"
    >
      <div className="sm:col-span-1">
        <span className="label">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="sm:col-span-7">
        <h3 className="text-display-sm transition-colors group-hover:text-accent-text">
          {study.title}
        </h3>
        <p className="mt-3 max-w-xl text-muted">{study.teaser}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.meta.stack.slice(0, 5).map((t) => (
            <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-sm text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between sm:col-span-4 sm:flex-col sm:items-end sm:justify-between">
        {metric ? (
          <div className="sm:text-right">
            <p className="font-display text-3xl text-ink">{metric.value}</p>
            <p className="label mt-1">{metric.label}</p>
          </div>
        ) : (
          <span />
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-ink sm:mt-0">
          Read case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
