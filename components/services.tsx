"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
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

  const services = [
    {
      icon: Code,
      title: "Full Stack Development",
      description:
        "End-to-end web application development using modern technologies like React, Node.js, and cloud platforms.",
      features: ["Custom Web Applications", "API Development", "Database Design", "Cloud Deployment"],
      color: "from-blue-500 to-cyan-500",
      price: "Starting at $500",
    },
  
  
    {
      icon: Database,
      title: "Backend Solutions",
      description: "Robust and scalable backend systems that power your applications with reliability and performance.",
      features: ["API Architecture", "Database Optimization", "Security Implementation", "Microservices"],
      color: "from-indigo-500 to-purple-500",
      price: "Starting at $500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Enhance your existing applications with improved speed, efficiency, and user experience.",
      features: ["Code Optimization", "Database Tuning", "Caching Strategies", "Monitoring Setup"],
      color: "from-yellow-500 to-orange-500",
      price: "Starting at $400",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
        <h2
  className={`text-3xl sm:text-4xl font-bold mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
>
  <span className="relative mx-2 inline-block">
    {/* Text in front */}
    <span className="relative z-10 text-[#FF6600]">Services</span>

    {/* Reduced-size hand-drawn SVG */}
    <svg
      className="pointer-events-none absolute inset-0 -top-2 -left-2 z-0 h-[130%] w-[110%]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
    >
      <path
        d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
           c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
        stroke="#FF6600"
        strokeWidth="3"
        fill="none"
        style={{
          strokeDasharray: 1500,
          strokeDashoffset: 1000,
          animation: "draw 1.5s ease-out forwards"
        }}
      />
    </svg>
  </span>
  I Offer
</h2>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Comprehensive digital solutions tailored to your business needs, from concept to deployment and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Service icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Service content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

              {/* Features list */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-center text-sm text-gray-600 transition-all duration-300 ${
                      hoveredService === index ? "translate-x-1" : ""
                    }`}
                    style={{ transitionDelay: `${featureIndex * 50}ms` }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3 flex-shrink-0`}
                    ></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">{service.price}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}
                >
                  <span className="text-white text-sm">→</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-lg text-muted-foreground mb-6">Ready to bring your project to life?</p>
        <Link 
          href="/#contact"
          >
        
          <button  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get a Free Consultation
          </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
    
  )
  
}
