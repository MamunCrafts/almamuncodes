"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Nestjs", "MySql", "MongoDB", "Redis", "GraphQL"],
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Vercel",  "Jest",  "Postman", "CI/CD"],
      icon: "🛠️",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsUnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iIzlDOTJBQyIgZmlsbE9wYWNpdHk9IjAuMDUiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              {/* Category header with animated icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills with staggered animations */}
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className={`text-sm bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-110 transform transition-all duration-300 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    style={{
                      transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                      animationDelay: `${skillIndex * 100}ms`,
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating skill icons */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  )
}
