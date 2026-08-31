import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define authentication-related routes that unauthenticated users can access
  const isAuthRoute = pathname.startsWith('/login') || 
                      pathname.startsWith('/forgot-password') || 
                      pathname.startsWith('/reset-password') || 
                      pathname.startsWith('/verify-email');
                      
  // Define public routes that anyone can access
  const isPublicRoute = pathname.startsWith('/privacy-policy');

  const token = request.cookies.get('token')?.value;

  // If the user is authenticated and trying to access an auth route, redirect to the dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthRoute && !isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - any files with extensions (e.g. .svg, .png)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
