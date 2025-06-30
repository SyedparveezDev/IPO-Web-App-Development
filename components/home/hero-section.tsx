"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, TrendingUp, Users, Zap } from "lucide-react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroSlides = [
    {
      title: "Your Gateway to",
      highlight: "IPO Investments",
      subtitle:
        "Track upcoming IPOs, analyze market trends, and make informed investment decisions with India's most trusted platform",
      cta: "Explore IPOs",
      ctaLink: "/ipo",
    },
    {
      title: "Join India's Largest",
      highlight: "Trading Community",
      subtitle:
        "Connect with 50,000+ active traders and investors. Share insights, learn strategies, and grow together",
      cta: "Join Community",
      ctaLink: "/community",
    },
    {
      title: "Compare & Choose",
      highlight: "Best Brokers",
      subtitle:
        "Find the perfect trading partner from India's leading brokers with transparent comparisons and expert reviews",
      cta: "Compare Brokers",
      ctaLink: "/brokers",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
              <Zap className="h-4 w-4 mr-2" />
              <span>India's #1 IPO Platform</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">{currentHero.title}</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  {currentHero.highlight}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">{currentHero.subtitle}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-gray-600">IPOs Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">₹500Cr+</div>
                <div className="text-sm text-gray-600">Investments</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={currentHero.ctaLink}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {currentHero.cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-indigo-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              {/* Main Illustration */}
              <div className="relative z-10">
                <Image
                  src="/images/hero-illustration.png"
                  alt="Investment Analytics Dashboard"
                  width={600}
                  height={600}
                  className="w-full h-auto animate-float"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 -left-10 bg-white rounded-2xl shadow-xl p-4 animate-float-delay-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Live Market</div>
                    <div className="text-xs text-gray-500">NIFTY +1.2%</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-10 bg-white rounded-2xl shadow-xl p-4 animate-float-delay-2">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Portfolio</div>
                    <div className="text-xs text-green-600">+15.3% Today</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-4 animate-float-delay-3">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm font-semibold">50K+</div>
                  <div className="text-xs opacity-90">Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
