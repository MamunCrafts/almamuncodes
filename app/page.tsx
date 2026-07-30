import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Hero } from "@/components/home/hero"
import { ProofStrip } from "@/components/home/proof-strip"
import { SelectedWork } from "@/components/home/selected-work"
import { Capabilities } from "@/components/home/capabilities"
import { Skills } from "@/components/home/skills"
import { Credentials } from "@/components/home/credentials"
import { Contact } from "@/components/home/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProofStrip />
        <SelectedWork />
        <Capabilities />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
