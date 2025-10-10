import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (req.nextUrl.pathname.startsWith('/pontos')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))
    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/pontos', '/pontos/:path*']
}
