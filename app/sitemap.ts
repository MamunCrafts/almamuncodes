import type { MetadataRoute } from "next"
import { site } from "@/config/site"
import { getCaseStudySlugs } from "@/lib/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const caseStudies = getCaseStudySlugs().map((slug) => ({
    url: `${site.url}/work/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...routes, ...caseStudies]
}
