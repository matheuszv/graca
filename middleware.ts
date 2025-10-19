import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (req.nextUrl.pathname.startsWith('/pontos')) {
    if (!token) return new NextResponse('Unauthorized', { status: 401 })
    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      return NextResponse.next()
    } catch {
      return new NextResponse('Unauthorized', { status: 401 })

    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/pontos', '/pontos/:path*']
}
