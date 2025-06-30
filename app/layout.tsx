import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationTest from "@/components/navigation-test"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bluestock - IPO Information Platform",
  description:
    "Get the latest IPO information, track upcoming IPOs, and manage your investments with Bluestock Fintech.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {process.env.NODE_ENV === "development" && <NavigationTest />}
      </body>
    </html>
  )
}
