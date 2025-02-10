import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes, publicRoutes, routes } from '@/config/routes';

import { verifyToken } from './config/libs/jwt';

export const config = {
  matcher: ['/', '/(dashboard|login|register)/:path*'],
};

const protectedRoutesSet = new Set(protectedRoutes);
const publicRoutesSet = new Set(publicRoutes);

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log('[Middleware] Processing path:', path);

  const isProtectedPath = [...protectedRoutesSet].some(route => path.startsWith(route) || path === route);
  const isPublicRoute = publicRoutesSet.has(path);

  const sessionToken = request.cookies.get('session-token');
  let isAuthenticated = !!sessionToken;

  if (sessionToken) {
    const payload = await verifyToken(sessionToken.value);
    isAuthenticated = !!payload;
  }

  console.log('[Middleware] Authentication status:', isAuthenticated);

  if (isProtectedPath && !isAuthenticated) {
    console.log('[Middleware] Redirecting to login');
    return NextResponse.redirect(new URL(routes.login, request.nextUrl));
  }

  if (isPublicRoute && isAuthenticated && !request.nextUrl.pathname.startsWith(routes.dashboard)) {
    console.log('[Middleware] Redirecting to dashboard');
    return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
  }

  return NextResponse.next();
}
