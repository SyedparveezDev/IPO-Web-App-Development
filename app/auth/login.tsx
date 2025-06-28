// app/auth/login.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Bluestock Logo" width={200} height={50} />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <label className="font-medium">Password</label>
              <Link href="/auth/forgot-password" className="text-indigo-500 hover:underline">Forgot Password?</Link>
            </div>
            <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="accent-indigo-500" />
            <span className="text-sm">Keep me signed in</span>
          </div>
          <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Login</button>
          <div className="text-center text-gray-500">or sign in with</div>
          <button className="w-full px-4 py-2 border rounded-lg flex justify-center items-center">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="text-center text-sm">
          <Link href="/auth/signup" className="text-indigo-500 hover:underline">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
