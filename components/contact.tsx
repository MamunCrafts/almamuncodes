"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Send, MessageCircle, Calendar, Globe, ArrowRight } from "lucide-react"

function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeMethod, setActiveMethod] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMethod((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send message")
        else console.log("Message sent successfully")

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Me",
      subtitle: "Drop me a line",
      value:"mamun.ru.ice@gmail.com",
      description: "I'll respond within 24 hours",
      color: "from-blue-500 to-cyan-500",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Call Me",
      subtitle: "Let's talk directly",
      value: "+880177-540432",
      description: "Available 24/7",
      color: "from-green-500 to-emerald-500",
      action: "Schedule Call",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      subtitle: "Quick questions?",
      value: "Available Now",
      description: "Get instant answers",
      color: "from-purple-500 to-pink-500",
      action: "Start Chat",
    },
  ]

  const quickActions = [
    { icon: Calendar, text: "Schedule a Meeting", color: "from-orange-500 to-red-500" },
    { icon: Globe, text: "View My Work", color: "from-indigo-500 to-purple-500" },
    { icon: Mail, text: "Get a Quote", color: "from-teal-500 to-cyan-500" },
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20  px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-cyan-600/20 via-blue-600/20 to-indigo-600/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-teal-400/10 to-green-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-1">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Let's Create Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              Amazing
            </span>
          </h2>
          <p
            className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Ready to bring your vision to life? I'm here to help you build exceptional digital experiences that make a
            lasting impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <h3
              className={`text-2xl font-bold text-white mb-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              Get In Touch
            </h3>

            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`group bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                } ${activeMethod === index ? "ring-2 ring-blue-400/50" : ""}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <method.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-1">{method.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{method.subtitle}</p>
                      <p className="text-blue-300 font-medium mb-2">{method.value}</p>
                      <p className="text-gray-500 text-xs mb-3">{method.description}</p>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${method.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-xs`}
                      >
                        {method.action}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Actions */}
            <div
              className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 transform hover:translate-x-2 group`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}
                    >
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {action.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card
              className={`bg-white/10 backdrop-blur-md border-white/20 shadow-2xl transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Send Me a Message</h3>
                  <p className="text-gray-300">
                    Tell me about your project and let's discuss how we can work together to bring your ideas to life.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <Input
                        name="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 h-12"
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 h-12"
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <Input
                      name="subject"
                      placeholder="Project Discussion"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 h-12"
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, timeline, and budget..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden h-12 text-lg font-semibold"
                    >
                      <div className="flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            Send Message
                          </>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20 hover:text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300 h-12 px-8"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Call
                    </Button>
                  </div>
                </form>

                {/* Additional info */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm text-center">
                    🚀 Average response time: <span className="text-blue-300 font-medium">1-2 hours</span> • 📍 Based in
              Dhaka,Bangladesh• 🌍 Available for remote projects worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your ideas and create something extraordinary together. I'm excited to hear about your
              vision!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start a Conversation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-black hover:text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300 px-8"
              >
                <Globe className="mr-2 h-5 w-5" />
                View My Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}

export default Contact
