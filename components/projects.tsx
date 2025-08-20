"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: "DgiSoft",
      url: "www.dgisoft.com",
      description:
        "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and order processing.",
      image: "/project-dgisoft.png",
      technologies: ["React.js","Next.js", "TypeScript", "CloudFlare","Posthog", "Tailwind CSS"],
      country:"Singapore",
      
      liveUrl: "https://dgisoft.com",
      githubUrl: "",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "TalentPro Global",
      url: "www.talentpro.global",
      description:

        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      country:"Bangladesh",
      image: "/project-talentpro-global.png",
      technologies: ["React.js","Next.js", "TypeScript", "CloudFlare","Posthog", "Tailwind CSS"],
      liveUrl: "https://talentpro.global",
      gradient: "from-green-500 to-teal-600",
      githubUrl: "",

    },
    {
      title: "Fanfare Bangladesh",
      url: "https://play.google.com/store/apps/details?id=com.fanfare.android",
      country:"Bangladesh",
      description:
        "Fanfare is a social media platform that connects people through shared interests and activities. It features user profiles, posts, comments, and real-time notifications.",
      image: "/fanfare-case-study-bg-talentpro.webp",
      technologies: ["NodeJs","Nestjs", "Graphql", "Redis","MongoDB", "Firebase","PostgreSql"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.fanfare.android",
      gradient: "from-orange-500 to-red-600",
      githubUrl: "",

    },
    {
      title: "NextGen Studioz",
      url: "www.nextgenstudioz.com",
      country:"Bangladesh",
      description:
        "A responsive weather dashboard that displays current conditions and forecasts with beautiful data visualizations and location-based services.",
      image: "/project-nextgen-studioz.png",
      technologies: ["React.js","Next.js", "TypeScript", "CloudFlare","Posthog", "Tailwind CSS"],
      liveUrl: "www.nextgenstudioz.com",
      gradient: "from-orange-500 to-red-600",
      githubUrl: "",

    },
    {
      title: "Admin Dashboard-Fanfare",
      url: "",
      country:"Bangladesh",
      description:
        "Admin dashboard for Fanfare, featuring user management, analytics, and content moderation tools. ",
      image: "/admin-dashboard.png",
      technologies: ["Reactjs","Next.js", "TypeScript", "CloudFlare","Posthog", "Tailwind CSS"],
      liveUrl: "",
      gradient: "from-orange-500 to-red-600",
      githubUrl: "",

    },
 
  ]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image with gradient overlay */}
              <div className="relative aspect-video overflow-hidden">
              <div
                  className={`w-full h-full bg-gradient-to-br ${project.gradient} transition-all duration-500 ${hoveredProject === index ? "scale-110" : "scale-100"}`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 transform group-hover:scale-105"/>
                </div>

                {/* Overlay with project number */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-white text-6xl font-bold opacity-50">{String(index + 1).padStart(2, "0")}</div>
                </div>

                {/* Floating tech badges */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-white/90 text-gray-800">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-blue-500">{project.url}</CardDescription>

                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                <CardDescription className="text-sm  mt-2">
                  <span className="font-bold">Country:</span>  <Badge
                      
                      variant="outline"
                      className={`text-xs transition-all duration-300 hover:scale-110 ${hoveredProject === index ? "animate-pulse" : ""}`}
                      style={{ animationDelay: `${1 * 100}ms` }}
                    >
                      {project.country}
                    </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Technology badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      className={`text-xs transition-all duration-300 hover:scale-110 ${hoveredProject === index ? "animate-pulse" : ""}`}
                      style={{ animationDelay: `${techIndex * 100}ms` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href={project.liveUrl}>
                      <ExternalLink className="mr-2 h-3 w-3 group-hover/btn:rotate-45 transition-transform duration-300" />
                      Live
                    </Link>
                  </Button>
               {project?.githubUrl && <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href={project.githubUrl}>
                      <Github className="mr-2 h-3 w-3" />
                      Code
                    </Link>
                  </Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    </section>
  )
}
