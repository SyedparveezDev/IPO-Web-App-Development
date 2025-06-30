import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle broker page redirects and routing
  const { pathname } = request.nextUrl

  // Redirect old broker URLs to new structure
  if (pathname === "/broker" || pathname === "/broker/") {
    return NextResponse.redirect(new URL("/brokers", request.url))
  }

  // Handle broker comparison redirects
  if (pathname === "/broker-comparison" || pathname === "/comparison") {
    return NextResponse.redirect(new URL("/compare-brokers", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/broker/:path*", "/broker-comparison/:path*", "/comparison/:path*"],
}
