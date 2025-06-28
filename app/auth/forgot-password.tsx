// app/auth/forgot-password.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Bluestock Logo" width={200} height={50} />
        </div>
        <h2 className="text-xl font-semibold text-center">Forgot Password?</h2>
        <p className="text-center text-gray-500 mb-4">Enter your email address to get the password reset link.</p>
        <div className="space-y-4">
          <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Email Address" />
          <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Password Reset</button>
        </div>
        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-indigo-500 hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
