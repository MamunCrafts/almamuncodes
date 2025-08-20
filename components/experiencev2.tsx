"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, ExternalLink, TrendingUp, Award, Link } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeExperience, setActiveExperience] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % experiences.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const experiences = [
    {
        title: "Software Developer",
        company: "Talent Pro",
        location: "Banani, Dhaka",
        period: "2022 - Present",
        description:
          "Leading development of enterprise-scale web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.",
        achievements: [
          "Increased application performance by 40%",
          "Led a team of 5 developers",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
        technologies: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
      color: "from-blue-500 via-cyan-500 to-teal-500",
      bgPattern: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
      metrics: { team: "2", performance: "40%", requests: "10M+" },
    },
    {
        title: "Full Stack Developer",
        company: "Fanfare Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "2023 - 2024",
        description:
          "Developed and maintained multiple client projects, focusing on modern web technologies and responsive design principles.",
        achievements: [
          "Delivered 15+ successful projects",
          "Improved code quality with 90% test coverage",
          "Reduced bug reports by 50%",
        ],
        technologies: ["Node.js", "Express.js","Nestjs","Next.js","React.js", "MongoDB", "Docker","CI/CD"],
      color: "from-green-500 via-emerald-500 to-teal-500",
      bgPattern: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
      metrics: { projects: "4+", satisfaction: "98%", coverage: "95%" },
    },
   
  ]
const router = useRouter()
  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Colorful Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>

        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-cyan-600/15 via-blue-600/15 to-indigo-600/15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-pink-600/10 to-rose-600/10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-36 h-36 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Animated mesh pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
        </div>

        {/* Sparkle effects */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-70"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Gradient orbs with rotation */}
        <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-spin-slow"></div>
        <div
          className="absolute bottom-16 left-16 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-xl animate-spin-slow"
          style={{ animationDelay: "2s", animationDirection: "reverse" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <h2
          className={`text-4xl sm:text-5xl font-bold text-center mb-4 text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Professional{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
            Experience
          </span>
        </h2>

        <p
          className={`text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          A journey through innovative companies, cutting-edge technologies, and impactful solutions that have shaped my
          career.
        </p>

        <div className="relative">
          {/* Enhanced Timeline line with gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-rose-500 rounded-full shadow-lg"></div>
          <div className="absolute left-7 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-500/20 via-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-full blur-sm"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-start mb-16 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              } ${activeExperience === index ? "scale-105" : ""}`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {/* Enhanced Timeline dot */}
              <div className="flex-shrink-0 relative">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-2xl z-10 transform hover:scale-110 transition-all duration-300 ${
                    activeExperience === index ? "animate-pulse ring-4 ring-white/30" : ""
                  }`}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color}`}></div>
                  </div>
                </div>
                {/* Glowing effect */}
                <div
                  className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} blur-xl opacity-40 animate-pulse`}
                ></div>
              </div>

              {/* Enhanced Content */}
              <div className="ml-8 flex-1">
                <div
                  className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden`}
                >
                  {/* Background pattern for each card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.bgPattern} opacity-50`}></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-xl font-semibold text-blue-300 mb-3">{exp.company}</p>
                      </div>
                      <div className="flex flex-col lg:items-end text-sm text-gray-300">
                        <div className="flex items-center mb-2 bg-white/10 rounded-full px-3 py-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 mb-6 leading-relaxed text-lg">{exp.description}</p>

                    {/* Metrics */}
                    <div className="md:grid grid-cols-3 gap-4 mb-6 hidden ">
                      {Object.entries(exp.metrics).map(([key, value], metricIndex) => (
                        <div key={metricIndex} className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="text-xl md:text-2xl font-bold text-white mb-1">{value}</div>
                          <div className="text-xs text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-400" />
                        Key Achievements:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div
                            key={achIndex}
                            className="flex items-start text-sm text-gray-200 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-4 py-2 bg-gradient-to-r ${exp.color} text-white rounded-full text-sm font-medium hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl`}
                            style={{ animationDelay: `${techIndex * 100}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced bottom section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Ready for the Next Challenge</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto text-lg">
                With a proven track record of delivering exceptional results across diverse technologies and industries,
                I'm excited to bring this experience to your next project.
              </p>
             
             
              <button  onClick={()=>router.push("/#contact")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <ExternalLink className="w-5 h-5 mr-2 inline" />
                Let's Work Together
              </button>
        
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-20px) rotate(2deg); 
          }
          66% { 
            transform: translateY(10px) rotate(-1deg); 
          }
        }
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
