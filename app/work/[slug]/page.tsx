import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CaseStudyView } from "@/components/work/case-study-view"

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.teaser,
    openGraph: {
      title: study.title,
      description: study.teaser,
      images: [{ url: study.cover }],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        <CaseStudyView study={study} />
      </main>
      <SiteFooter />
    </>
  )
}
