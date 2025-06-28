// app/auth/signup.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Bluestock Logo" width={200} height={50} />
        </div>
        <h2 className="text-xl font-semibold text-center">Create an account</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="accent-indigo-500" />
            <span className="text-sm">I agree to the terms of service</span>
          </div>
          <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Sign up</button>
          <div className="text-center text-gray-500">or sign up with</div>
          <button className="w-full px-4 py-2 border rounded-lg flex justify-center items-center">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-500 hover:underline">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
