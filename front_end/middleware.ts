import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const PUBLIC_PATHS = ['/', '/login', '/register', '/about', '/contact', '/services', '/doctors', '/verify_email', '/forgot-password'];

// Role-specific path prefixes
const PATIENT_PATHS = ['/patient'];
const DOCTOR_PATHS = ['/doctor'];
const ADMIN_PATHS = ['/admin'];

// Shared paths that multiple roles can access
const SHARED_PATHS = ['/meeting', '/chat'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public routes without authentication
  if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }
  
  // Get auth token and user type from cookies
  const authToken = request.cookies.get('auth_token')?.value;
  const userType = request.cookies.get('user_type')?.value;
  
  // If no auth token, redirect to login
  if (!authToken) {
    console.log('No auth token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check for shared paths that allow multiple roles
  if (SHARED_PATHS.some(path => pathname.startsWith(path))) {
    // For shared paths, just check if authenticated
    return NextResponse.next();
  }
  
  // Check role-specific access
  if (PATIENT_PATHS.some(path => pathname.startsWith(path))) {
    if (userType !== 'patient') {
      console.log('Unauthorized access to patient path');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else if (DOCTOR_PATHS.some(path => pathname.startsWith(path))) {
    if (userType !== 'doctor') {
      console.log('Unauthorized access to doctor path');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else if (ADMIN_PATHS.some(path => pathname.startsWith(path))) {
    if (userType !== 'admin') {
      console.log('Unauthorized access to admin path');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // If all checks pass, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};