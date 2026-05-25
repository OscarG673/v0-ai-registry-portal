import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PUBLIC_ADMIN_ROUTES = ['/admin/login']
const COOKIE_NAME = 'admin_session'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip auth check for login page
  if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if the route is under /admin (which requires authentication)
  if (pathname.startsWith('/admin')) {
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
