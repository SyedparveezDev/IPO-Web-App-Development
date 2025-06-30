"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Bluestock" width={180} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/ipo" className="text-gray-700 hover:text-[#6366f1] font-medium">
              IPO
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-[#6366f1] font-medium">
              COMMUNITY
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#6366f1] font-medium">
                PRODUCTS
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <Link href="/brokers" className="flex items-center text-gray-700 hover:text-[#6366f1] font-medium">
                BROKERS
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {/* Optional: Add dropdown menu for broker categories */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/brokers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    All Brokers
                  </Link>
                  <Link
                    href="/brokers?filter=discount"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Discount Brokers
                  </Link>
                  <Link
                    href="/brokers?filter=full-service"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Full Service
                  </Link>
                  <Link href="/compare-brokers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Compare Brokers
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/live-news" className="text-gray-700 hover:text-[#6366f1] font-medium">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1">LIVE</span>
              NEWS
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-[#6366f1] font-medium">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-[#6366f1]">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/ipo" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                IPO
              </Link>
              <Link href="/community" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                COMMUNITY
              </Link>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                PRODUCTS
              </Link>
              <Link href="/brokers" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                BROKERS
              </Link>
              <Link href="/live-news" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                LIVE NEWS
              </Link>
              <div className="border-t pt-4">
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-[#6366f1]">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-3 py-2 btn-primary mt-2">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
