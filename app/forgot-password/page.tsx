"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log("Password reset request for:", email)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image src="/images/logo.png" alt="Bluestock" width={200} height={50} className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your email address to get the password reset link.</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@bluestock.in"
                className="input-field"
              />
            </div>

            <div>
              <button type="submit" className="w-full btn-primary py-3">
                Password Reset
              </button>
            </div>

            <div className="text-center">
              <Link href="/login" className="text-sm text-gray-600 hover:text-[#6366f1]">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
