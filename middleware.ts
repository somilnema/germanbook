import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for non-admin routes, static files, and RSC requests
  if (!pathname.startsWith('/admin') || 
      pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/) ||
      request.headers.get('rsc') === '1' ||
      request.headers.get('next-router-state-tree') ||
      request.headers.get('next-url')) {
    return NextResponse.next()
  }

  // Get token from cookie or header
  const token = request.cookies.get('adminToken')?.value || 
                request.headers.get('adminToken')

  const isAuthenticated = token && verifyAdminToken(token)
  const isLoginPage = pathname === '/admin/login'

  // Handle API routes
  if (pathname.startsWith('/api/admin')) {
    // Allow login API without auth
    if (pathname === '/api/admin/login') {
      return NextResponse.next()
    }

    // Check auth for other admin APIs
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Add token to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('adminToken', token)
    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // Handle page routes
  if (isLoginPage) {
    return NextResponse.next()
  }

  // If not authenticated on protected page, redirect to login
  if (!isAuthenticated) {
    const url = new URL('/admin/login', request.url)
    if (!request.nextUrl.searchParams.has('from')) {
      url.searchParams.set('from', pathname)
    }
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
} 