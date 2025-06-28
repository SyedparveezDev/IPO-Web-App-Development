"use client"

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Sign up</Link>
      <Link href="/auth/forgot-password">Forgot Password</Link>
      <Link href="/auth/verify-email">Verify Email</Link>
      <Link href="/auth/resend-verification">Resend Verification</Link>
      <Link href="/auth/change-password">Change Password</Link>
      <Link href="/auth/update-profile">Update Profile</Link>
      <Link href="/auth/delete-account">Delete Account</Link>
      <Link href="/auth/logout">Logout</Link>
      <Link href="/auth/terms-of-service">Terms of Service</Link>
    </main>
  );
}
