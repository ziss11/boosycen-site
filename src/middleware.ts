import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path starts with /admin
  if (path.startsWith('/admin')) {
    // Exclude the login page itself to avoid infinite loops
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the admin_token cookie
    const adminToken = request.cookies.get('admin_token')?.value;

    if (adminToken !== 'authenticated') {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
