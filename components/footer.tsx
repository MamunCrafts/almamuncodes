"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Coffee, Star } from "lucide-react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { href: "https://github.com/MamunsCrafts", icon: Github, label: "GitHub", color: "hover:text-gray-300" },
    { href: "https://www.linkedin.com/in/almamunmim1611177146/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
    { href: "mailto:mamun.ru.ice@gmail.com", icon: Mail, label: "Email", color: "hover:text-green-400" },
  ]

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const services = [
    { label: "Web Development" },
    { label: "Backend Solution" },
    { label: "Frontend Solution" },
    {label:"Bug Fixing"},
    { label: "Performance Optimization" },
    { label: "Consulting" },
  ]

  return (
    <footer className="relative  overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDAgMTUgbCAxNSAwIGwgMCAxNSBsIC0xNSAwIHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10  left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-teal-500/10 to-green-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Scroll to top button */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse z-20">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div
            className={`md:col-span-2 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Link
              href="/"
              className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 mb-4"
            >
              Md. Al Mamun Mim
            </Link>
            <p className="text-gray-300 text-lg mb-4 max-w-md leading-relaxed">
              Full Stack Developer & UI/UX Enthusiast crafting exceptional digital experiences that make a lasting
              impact.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Available for projects
              </div>
              <div className="flex items-center">
                <Coffee className="w-4 h-4 mr-1" />
                Dhaka , Bangladesh
              </div>
            </div>

            {/* Social links with enhanced styling */}
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, label, color }, index) => (
                <Link
                  key={index}
                  href={href}
                  className={`group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 ${color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                  aria-label={label}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-5 w-5" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Code className="w-5 h-5 mr-2 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-purple-400" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-2 inline-block">
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-white/10">
              <p className="text-white font-medium mb-2">Ready to work together?</p>
              <Link
                href="#contact"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
              >
                Get in touch
                <ArrowUp className="w-4 h-4 ml-1 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider with animation */}
        <div
          className={`my-8 transition-all duration-1000 delay-600 ${mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Bottom section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-800 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-gray-400 flex items-center gap-2">
              &copy; {new Date().getFullYear()} Md. AL Mamun Mim. Made with
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              and lots of ☕
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors duration-300">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-gray-300 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Built with Next.js & Tailwind CSS</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute bottom-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-8 right-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-15px) rotate(1deg); 
          }
          66% { 
            transform: translateY(10px) rotate(-1deg); 
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}
