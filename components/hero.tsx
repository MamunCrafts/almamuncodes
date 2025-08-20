"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ChevronDown, Code, Palette, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)
  const [typedText, setTypedText] = useState("")

  const roles = ["Full Stack Developer", "Tech Enthusiastic" ,"Problem Solver", "Tech Innovator"]
  const fullText = "Crafting Digital Experiences That Matter"

  useEffect(() => {
    setMounted(true)

    // Role rotation
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    // Typing effect
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => {
      clearInterval(roleInterval)
      clearInterval(typingInterval)
    }
  }, [])

  const highlights = [
    { icon: Code, text: "3+ Years Experience", color: "text-blue-400" },
    { icon: Palette, text: "20+ Projects Delivered", color: "text-purple-400" },
    { icon: Zap, text: "99% Client Satisfaction", color: "text-green-400" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] aspect-square bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-[600px] aspect-square bg-gradient-to-tr from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] aspect-square bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Enhanced avatar with more effects */}
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full  flex items-center justify-center text-white text-5xl font-bold shadow-2xl animate-float relative overflow-hidden">

            <Image src="/mamun.jpg" alt="Background" layout="fill" objectFit="cover" className="object-cover  relative z-50 " />

              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-shimmer"></div> */}

            </div>
            {/* <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-40 animate-pulse"></div> */}

            {/* Floating icons around avatar */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <Code className="w-6 h-6 text-blue-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
            </div>
            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-4">
              <Palette className="w-5 h-5 text-purple-400 animate-bounce" style={{ animationDelay: "1s" }} />
            </div>
            <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-4">
              <Zap className="w-5 h-5 text-green-400 animate-bounce" style={{ animationDelay: "1.5s" }} />
            </div>
          </div>

          {/* Enhanced greeting with better typography */}
          <div className="mb-6 overflow-hidden">
            <h1
              className={`text-5xl sm:text-7xl font-bold transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                Md. Al Mamun Mim
              </span>
            </h1>
          </div>

          {/* Enhanced rotating roles with better styling */}
          <div className="h-20 mb-6 flex items-center justify-center">
            <p
              className={`text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
            >
              <span className=" transition-all duration-500 transform hover:scale-105">
                {roles[currentRole]}
              </span>
            </p>
          </div>

          {/* Typing effect tagline */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p
              className={`text-xl sm:text-2xl text-muted-foreground transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Enhanced description */}
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            I'm a passionate full-stack developer who transforms ideas into exceptional digital experiences. With
            expertise in modern web technologies and a keen eye for design, I create solutions that not only look
            stunning but also deliver outstanding performance and user satisfaction.
          </p>

          {/* Highlight cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-900 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            {highlights.map(({ icon: Icon, text, color }, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                <p className="text-sm font-medium text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced buttons with better animations */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-1100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
            asChild
          >
            <Link href="#contact">
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Let's Work Together
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </Button>
          <Button
           onClick={() => window.open("https://drive.google.com/file/d/1TvJHUHzDcKWtNC1ZGU1UIlLtzJ-hL9D3/view?usp=sharing", "_blank")}
            variant="outline"
            size="lg"
            className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transform hover:scale-105 transition-all duration-300 border-2 hover:border-blue-300 px-8 py-4 text-lg"
          >
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Download Resume
          </Button>
        </div>

        {/* Enhanced social links */}
        <div
          className={`flex justify-center space-x-8 mb-16 transition-all duration-1000 delay-1300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {[
            { href: "https://github.com/MamunsCrafts", icon: Github, label: "GitHub", delay: "0ms" },
            { href: "https://www.linkedin.com/in/almamunmim1611177146/", icon: Linkedin, label: "LinkedIn", delay: "100ms" },
            { href: "mailto:mamun.ru.ice@gmail.com", icon: Mail, label: "Email", delay: "200ms" },
          ].map(({ href, icon: Icon, label, delay }, index) => (
            <Link
              key={index}
              href={href}
              className="group relative p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-2"
              style={{ animationDelay: delay }}
              aria-label={label}
            >
              <Icon className="h-6 w-6" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
