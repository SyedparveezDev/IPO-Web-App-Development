"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("cta-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cta-section"
      className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-8">
            <Sparkles className="h-5 w-5 mr-2" />
            <span>Start Your Investment Journey Today</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Financial Future?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful investors who trust Bluestock for their IPO investments and trading journey
          </p>

          {/* Stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Happy Investors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">₹500Cr+</div>
              <div className="text-white/80">Investments Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-white/80">User Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Link
              href="/signup"
              className="group inline-flex items-center px-10 py-5 bg-white text-indigo-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/ipo"
              className="group inline-flex items-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="mr-3 h-6 w-6" />
              Explore IPOs
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-white/70 text-sm mb-6">Trusted by leading financial institutions</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white font-semibold">SEBI Registered</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">ISO Certified</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">Bank Grade Security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
