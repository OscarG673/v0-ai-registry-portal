import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_ROUTES = ['/admin']
const COOKIE_NAME = 'admin_session'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the route requires authentication
  const requiresAuth = ADMIN_ROUTES.some(route => pathname.startsWith(route))

  if (requiresAuth) {
    const cookieStore = await cookies()
    const session = cookieStore.get(COOKIE_NAME)?.value

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      JSON.parse(session)
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
