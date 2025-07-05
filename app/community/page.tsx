"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { MessageCircle, TrendingUp, Calendar, CheckCircle, ArrowRight } from "lucide-react"

// Mock community data
const communityStats = {
  activeMembers: "50,000+",
  dailyDiscussions: "1,200+",
  expertAdvice: "24/7",
  successStories: "10,000+",
}

const chatMessages = [
  {
    id: 1,
    user: "Om Jaiswal",
    avatar: "OJ",
    message: "What is long term investment ?",
    time: "2 mins ago",
    replies: "1200 likes",
    responses: "234 replies",
  },
  {
    id: 2,
    user: "Anish Walke",
    avatar: "AW",
    message: "What is options trading ?",
    time: "5 mins ago",
    replies: "856 likes",
    responses: "156 replies",
  },
  {
    id: 3,
    user: "Ganesh Karale",
    avatar: "GK",
    message:
      "Options trading is the trading of instruments that give you the right to buy or sell a specific security on a specific date at a specific price.",
    time: "8 mins ago",
    replies: "2.1k likes",
    responses: "445 replies",
    isExpert: true,
  },
]

const expertInteractions = [
  {
    id: 1,
    expert: "Priyank Deshpandh",
    avatar: "PD",
    question: "What is options trading ?",
    time: "2 mins ago",
    replies: "234 replies",
  },
  {
    id: 2,
    expert: "Ganesh Karale",
    avatar: "GK",
    question:
      "Options trading is the trading of instruments that give you the right to buy or sell a specific security on a specific date at a specific price.",
    time: "5 mins ago add on 5 mins ago",
    replies: "445 replies",
    isAnswer: true,
  },
]

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Rich environment for knowledge exchange reveate the changes in IPO",
    description: "Connect with experienced traders and investors",
  },
  {
    icon: TrendingUp,
    title: "Stay connected about the latest stock market",
    description: "Get real-time updates and market insights",
  },
  {
    icon: Calendar,
    title: "Access exclusive community events, webinars, and meet-ups",
    description: "Join expert-led sessions and networking events",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Community</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Most Active Community of Traders & Investors
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join now to interact with thousands of active traders and investors to learn and share your knowledge on
              our buzzing forum.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium text-lg">
              Join Our Community
            </button>
          </div>

          {/* Chat Interface Mockup */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-md mx-auto">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">{message.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{message.user}</span>
                          <span className="text-xs text-gray-500">{message.time}</span>
                          {message.isExpert && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Featured Reply
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{message.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{message.replies}</span>
                          <span>{message.responses}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating avatars */}
              <div className="absolute -bottom-4 -right-4 flex space-x-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">be a part of trading & investments club</h2>

              <div className="space-y-6">
                {communityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Dynamic Discussions</h3>
                <p className="text-sm text-gray-600">Engage in real-time conversations</p>
              </div>
              <div className="bg-indigo-100 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Expert Insights</h3>
                <p className="text-sm text-gray-600">Learn from market professionals</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Interaction</h3>
                <p className="text-sm text-gray-600">Connect instantly with peers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Bluestock Cares */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Team Bluestock Cares</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interact with our members to engage, clarify and contribute
          </p>
        </div>
      </section>

      {/* Interact With Our Experts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Interact With Our Experts</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">Get valid suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">Raise issues or concerns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">Ask your questions</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <div className="space-y-4">
                {expertInteractions.map((interaction) => (
                  <div key={interaction.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">{interaction.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{interaction.expert}</span>
                          <span className="text-xs text-gray-500">{interaction.time}</span>
                          {interaction.isAnswer && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Featured Reply
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{interaction.question}</p>
                        <div className="text-xs text-gray-500">
                          <span>{interaction.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{communityStats.activeMembers}</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{communityStats.dailyDiscussions}</div>
              <div className="text-gray-600">Daily Discussions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{communityStats.expertAdvice}</div>
              <div className="text-gray-600">Expert Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{communityStats.successStories}</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* How Can We Help You */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Can We Help You ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email Us */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email us</h3>
              <p className="text-gray-600 mb-6">One of our agents will respond at the earliest</p>

              <div className="bg-indigo-100 rounded-lg p-4 flex items-center justify-between">
                <span className="text-indigo-600 font-medium">hello@bluestock.in</span>
                <ArrowRight className="h-5 w-5 text-indigo-600" />
              </div>
            </div>

            {/* Chat Us */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat us</h3>
              <p className="text-gray-600 mb-6">Available from 8:00AM to 5:00PM</p>

              <div className="bg-indigo-100 rounded-lg p-4 flex items-center justify-between">
                <span className="text-indigo-600 font-medium">Open Chat</span>
                <ArrowRight className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">Interact With Us in Our Active Community</h2>
            <p className="text-xl mb-2">Ask questions or discuss anything related to investing or trading</p>
            <p className="text-lg opacity-90">in the most active trading & investing community</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Mobile App Download */}
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-gray-900 font-semibold mb-4">Download Bluestock Mobile App</h3>

              {/* QR Code Placeholder */}
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">▶</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs">🍎</span>
                </div>
              </div>
            </div>

            {/* Join Now Button */}
            <div>
              <button className="bg-black text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-800 transition-colors">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
