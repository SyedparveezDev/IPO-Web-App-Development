"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Users, TrendingUp, ArrowRight, Star } from "lucide-react"

export default function CommunitySection() {
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

    const element = document.getElementById("community-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="community-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-sm font-medium text-green-700 mb-6">
              <Users className="h-4 w-4 mr-2" />
              50,000+ Active Members
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join India's Most{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Active Community
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with experienced traders and investors. Share insights, learn strategies, and grow your wealth
              together in our vibrant community.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Real-time discussions and market insights</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Expert analysis and trading strategies</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Exclusive webinars and educational content</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1.2K+</div>
                <div className="text-sm text-gray-600">Daily Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Active Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>

            <Link
              href="/community"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Join Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              {/* Mobile Frame */}
              <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/images/mobile-mockup.png"
                    alt="Bluestock Mobile App"
                    width={320}
                    height={580}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Live Chat</div>
                    <div className="text-xs text-gray-500">2.3K online</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-8 bg-white rounded-2xl shadow-xl p-4 animate-float-delay-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Market Alert</div>
                    <div className="text-xs text-green-600">NIFTY +2.1%</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-4 animate-float-delay-1">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm font-semibold">Expert</div>
                  <div className="text-xs opacity-90">Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
