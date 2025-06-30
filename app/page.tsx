"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import MarketOverview from "@/components/home/market-overview"
import FeaturesSection from "@/components/home/features-section"
import IPOShowcase from "@/components/home/ipo-showcase"
import BrokersSection from "@/components/home/brokers-section"
import CommunitySection from "@/components/home/community-section"
import NewsSection from "@/components/home/news-section"
import CTASection from "@/components/home/cta-section"
import StatsSection from "@/components/home/stats-section"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Market Overview */}
      <MarketOverview />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* IPO Showcase */}
      <IPOShowcase />

      {/* Brokers Section */}
      <BrokersSection />

      {/* Community Section */}
      <CommunitySection />

      {/* News Section */}
      <NewsSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  )
}
