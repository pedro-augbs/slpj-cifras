import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { env } from "@/utils/env"

const secret = env.JWT_PASS

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })

  if (!token) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/music/:path*", "/add-music"],
}
