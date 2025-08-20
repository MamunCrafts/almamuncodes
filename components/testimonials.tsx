"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      company: "TechStart Inc",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "John delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made our project a huge success. The performance improvements were remarkable!",
      project: "E-commerce Platform",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Digital Solutions Co",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Working with John was a game-changer for our startup. He not only built our MVP but also provided valuable insights that shaped our product strategy. Highly recommended!",
      project: "SaaS Dashboard",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The website John created for us has significantly improved our conversion rates. His design sense and technical skills are top-notch. Our clients love the new interface!",
      project: "Corporate Website",
    },
    {
      name: "David Thompson",
      role: "Founder",
      company: "InnovateLab",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "John's full-stack development skills are impressive. He delivered our complex project on time and within budget. The code quality and documentation were excellent.",
      project: "Custom CRM System",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsUnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iIzlDOTJBQyIgZmlsbE9wYWNpdHk9IjAuMDMiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            What Clients Say
          </h2>
          <p
            className={`text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        {/* Main testimonial */}
        <div
          className={`relative transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-20">
              <Quote className="w-16 h-16 text-white" />
            </div>

            {/* Testimonial content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-lg text-white leading-relaxed mb-8">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Client info */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonials[currentTestimonial].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-300">{testimonials[currentTestimonial].role}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial].company} • {testimonials[currentTestimonial].project}
                  </p>
                </div>
              </div>
            </div>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
          </div>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* All testimonials grid */}
        <div
          className={`grid md:grid-cols-2 gap-6 mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h5 className="text-white font-medium text-sm">{testimonial.name}</h5>
                  <p className="text-gray-400 text-xs">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
