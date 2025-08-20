import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Services from "@/components/services"
import Projects from "@/components/projects"
// import Testimonials from "@/components/testimonials"
import Stats from "@/components/stats"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import Experience from "@/components/experiencev2"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* <Services /> */}
       
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
