import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes, publicRoutes, routes } from '@/config/routes';
import { getCurrentSession } from '@/core/presentation/middleware/auth.middleware';

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

  const session = await getCurrentSession();

  console.log(`[Middleware] Route ${path} - Session:`, session ? 'authenticated' : 'unauthenticated');

  if (isProtectedPath && !session?.userId) {
    console.log('[Middleware] Redirecting to login');

    return NextResponse.redirect(new URL(routes.login, request.nextUrl));
  }

  if (isPublicRoute && session?.userId && !request.nextUrl.pathname.startsWith(routes.dashboard)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
  }

  return NextResponse.next();
}
