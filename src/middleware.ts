import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes, publicRoutes, routes } from '@/routes';

import { getCurrentSession } from './app/(auth)/(clean-architecture)/presentation/middleware/auth.middleware';

export const config = {
  matcher: [
    // Uniquement les routes de pages
    '/',
    '/(dashboard|login|register)/:path*',
    // Ajoutez d'autres routes spécifiques selon vos besoins
  ],
};

// 1. Specify protected and public routes
const protectedRoutesSet = new Set(protectedRoutes);
const publicRoutesSet = new Set(publicRoutes);

export default async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;

  // Log pour debug
  console.log('[Middleware] Processing path:', path);

  const isProtectedPath = [...protectedRoutesSet].some(route => path.startsWith(route) || path === route);
  const isPublicRoute = publicRoutesSet.has(path);

  // 3. Get the current session
  const session = await getCurrentSession();

  console.log(`[Middleware] Route ${path} - Session:`, session ? 'authenticated' : 'unauthenticated');

  // 4. Redirect
  if (isProtectedPath && !session?.userId) {
    console.log('[Middleware] Redirecting to login');

    return NextResponse.redirect(new URL(routes.login, request.nextUrl));
  }

  if (isPublicRoute && session?.userId && !request.nextUrl.pathname.startsWith(routes.dashboard)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
  }

  return NextResponse.next();
}
