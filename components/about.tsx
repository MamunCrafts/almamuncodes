"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, GraduationCap, Award, Code, Users, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ experience: 0, projects: 0, contests: 0, clients: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate counters
          const animateCounter = (target: number, key: keyof typeof counters) => {
            let current = 0
            const increment = target / 20
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }))
            }, 30)
          }

          animateCounter(3, "experience")
          animateCounter(20, "projects")
          animateCounter(82, "contests")
          animateCounter(10, "clients")
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const achievements = [
    {
      icon: Trophy,
      title: "Programming Contests",
      items: [
        { name: "IEE Xtreme 14.0", position: "Rank: 5,Bangladesh Rank : 184, Global", year: "2020" },
      
        { name: "Codeforces", position: "Pupil (1325+ Rating)" ,year: "2019-2021" },
        { name: "LeetCode", position: "Hundred Plus Problem Solved",year: "2019-2024" },
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: GraduationCap,
      title: "Education",
      items: [
        
        { name: "Bsc Engineering", position: "University Of Rajshahi", year: "2017-2020" },
        { name: "HSc", position: "Holy Land College", year: "2015" },
        // { name: "Google Cloud Professional", position: "Cloud Developer", year: "2023" },
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Professional Awards",
      items: [
        { name: "Tech Genius Award", position: "For Brilliant Contributions", year: "2024" },
       
      ],
      color: "from-purple-500 to-pink-500",
    },
  ]

  const router = useRouter()
  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          About Me
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Personal Story Section */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative">
              {/* Profile Image with Tech Stack Visualization */}
              <div className="relative group mb-8">
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  {/* Code Animation Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white/90 font-mono text-sm leading-relaxed p-6">
                      <div className="animate-pulse">
                        <div className="text-green-300">{"// Passionate Developer"}</div>
                        <div className="text-blue-300">{"const developer = {"}</div>
                        <div className="ml-4 text-yellow-300">{'name: "Md. AL Mamun Mim",'}</div>
                        <div className="ml-4 text-yellow-300">{'passion: "Creating Amazing Apps",'}</div>
                        <div className="ml-4 text-yellow-300">{'experience: "3+ Years",'}</div>
                        <div className="ml-4 text-yellow-300">{'contests: "82+ Contest Participation",'}</div>
                        <div className="ml-4 text-yellow-300">{'solution: "800+ problem solutions"'}</div>
                        <div className="ml-4 text-yellow-300">{'education: "Bsc Engineering"'}</div>
                        <div className="text-blue-300">{"};"}</div>
                      </div>
                    </div>
                  </div>
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Floating tech icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div
                  className="absolute top-1/2 -right-6 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Target className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">My Journey</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with over{" "}
                <span className="font-bold text-primary">{counters.experience}+ years</span> of experience creating
                digital solutions that make a difference. My journey began at UC Berkeley, where I discovered my love
                for competitive programming and software engineering.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After completing my Master's in Computer Science at Stanford University, I've been dedicated to pushing
                the boundaries of web development. I've won{" "}
                <span className="font-bold text-purple-600">{counters.contests}+ programming contests</span> and
                delivered <span className="font-bold text-blue-600">{counters.projects}+ successful projects</span> for
                clients worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me participating in hackathons, contributing to open-source projects,
                or mentoring aspiring developers. I believe in continuous learning and staying at the forefront of
                technology trends.
              </p>
            </div>

            {/* Stats grid with animations */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                {
                  label: "Experience",
                  value: `${counters.experience}+`,
                  unit: "Years",
                  icon: Code,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Projects",
                  value: `${counters.projects}+`,
                  unit: "Completed",
                  icon: Target,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  label: "Contests Won",
                  value: `${counters.contests}+`,
                  unit: "Awards",
                  icon: Trophy,
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  label: "Happy Clients",
                  value: `${counters.clients}+`,
                  unit: "Worldwide",
                  icon: Users,
                  color: "from-purple-500 to-pink-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, achievementIndex) => (
            <div
              key={achievementIndex}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${1000 + achievementIndex * 200}ms` }}
            >
              {/* Header */}
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg mr-4`}
                >
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
              </div>

              {/* Achievement List */}
              <div className="space-y-4">
                {achievement.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 border-l-4 border-transparent hover:border-blue-400"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.year}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Work Together?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's combine my technical expertise, contest-winning problem-solving skills, and educational background
              to create something extraordinary for your next project.
            </p>
            <button onClick={()=>router.push("/#contact")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Let's Collaborate
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
