"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function NavigationTest() {
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({})

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "IPO", path: "/ipo" },
    { name: "Community", path: "/community" },
    { name: "Brokers", path: "/brokers" },
    { name: "Compare Brokers", path: "/compare-brokers" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ]

  const testNavigation = async () => {
    const results: { [key: string]: boolean } = {}

    for (const link of navigationLinks) {
      try {
        const response = await fetch(link.path, { method: "HEAD" })
        results[link.path] = response.ok
      } catch (error) {
        results[link.path] = false
      }
    }

    setTestResults(results)
  }

  useEffect(() => {
    testNavigation()
  }, [])

  if (process.env.NODE_ENV === "production") {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-semibold mb-2">Navigation Test</h3>
      <div className="space-y-1 text-sm">
        {navigationLinks.map((link) => (
          <div key={link.path} className="flex items-center justify-between">
            <Link href={link.path} className="text-blue-600 hover:underline">
              {link.name}
            </Link>
            <span className={`ml-2 ${testResults[link.path] ? "text-green-600" : "text-red-600"}`}>
              {testResults[link.path] ? "✓" : "✗"}
            </span>
          </div>
        ))}
      </div>
      <button onClick={testNavigation} className="mt-2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
        Retest
      </button>
    </div>
  )
}
