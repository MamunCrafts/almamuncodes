"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, Users, Coffee, Star } from "lucide-react"

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    coffee: 0,
    rating: 0,
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Animate counters
          const animateCounter = (target: number, key: keyof typeof counters, duration = 2000) => {
            let current = 0
            const increment = target / (duration / 50)
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }))
            }, 50)
          }

          setTimeout(() => animateCounter(20, "projects"), 200)
          setTimeout(() => animateCounter(10, "clients"), 400)
          setTimeout(() => animateCounter(100, "coffee"), 600)
          setTimeout(() => animateCounter(98, "rating"), 800)
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: Trophy,
      value: counters.projects,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful deliveries",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Users,
      value: counters.clients,
      suffix: "+",
      label: "Happy Clients",
      description: "Worldwide partnerships",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Coffee,
      value: counters.coffee,
      suffix: "+",
      label: "Cups of Coffee",
      description: "Fuel for creativity",
      color: "from-amber-400 to-yellow-500",
    },
    {
      icon: Star,
      value: counters.rating,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Quality guaranteed",
      color: "from-green-400 to-emerald-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center group transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Counter */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-800 tabular-nums">{stat.value}</span>
                  <span className="text-2xl font-bold text-gray-600">{stat.suffix}</span>
                </div>

                {/* Label and description */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
