"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin } from "lucide-react"

export default function Experience() {
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
      color: "from-blue-500 to-cyan-500",
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
      technologies: ["Vue.js", "Express", "MongoDB", "Docker"],
      color: "from-green-500 to-emerald-500",
    },
    // {
    //   title: "Frontend Developer",
    //   company: "StartupXYZ",
    //   location: "New York, NY",
    //   period: "2019 - 2020",
    //   description:
    //     "Built responsive user interfaces and collaborated with design teams to create exceptional user experiences.",
    //   achievements: [
    //     "Redesigned main product increasing user engagement by 35%",
    //     "Implemented design system used across 10+ products",
    //     "Optimized loading times by 45%",
    //   ],
    //   technologies: ["React", "Sass", "Webpack", "Jest"],
    //   color: "from-purple-500 to-pink-500",
    // },
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Professional Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-start mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg z-10 transform hover:scale-110 transition-all duration-300`}
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color}`}></div>
                </div>
              </div>

              {/* Content */}
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.title}</h3>
                      <p className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
