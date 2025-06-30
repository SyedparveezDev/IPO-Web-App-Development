"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, ArrowRight, TrendingUp } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Adani Power IPO Sees Overwhelming Response with 3.2x Subscription",
    excerpt: "The IPO received bids for over 46,000 crore shares against the offered 14,500 crore shares...",
    time: "2 hours ago",
    category: "IPO",
    trending: true,
  },
  {
    id: 2,
    title: "Sensex Surges 500 Points as Banking Stocks Lead Market Rally",
    excerpt: "Indian stock markets witnessed a strong rally today with the Sensex gaining over 500 points...",
    time: "4 hours ago",
    category: "Market",
    trending: false,
  },
  {
    id: 3,
    title: "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control",
    excerpt:
      "The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% for the sixth consecutive time...",
    time: "6 hours ago",
    category: "Economy",
    trending: true,
  },
]

export default function NewsSection() {
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

    const element = document.getElementById("news-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="news-section" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-sm font-medium text-red-700 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            Live Market News
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stay Updated with{" "}
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Latest News</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get real-time market news, IPO updates, and expert analysis to make informed investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsArticles.map((article, index) => (
            <article
              key={article.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.category === "IPO"
                        ? "bg-blue-100 text-blue-700"
                        : article.category === "Market"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {article.category}
                  </span>

                  {article.trending && (
                    <div className="flex items-center text-orange-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Trending</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.time}</span>
                  </div>

                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">Read More</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Link
            href="/live-news"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
