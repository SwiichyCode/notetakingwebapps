import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { CookieService } from './app/(auth)/(clean-architecture)/application/services/cookie.service';
import { SESSION_CONFIG } from './app/(auth)/(clean-architecture)/infrastructure/config/session.config';
import { protectedRoutes, publicRoutes, routes } from './routes';

// Initialisation du service de cookie
const cookieService = new CookieService(SESSION_CONFIG);

// 1. Specify protected and public routes
const protectedRoutesSet = new Set(protectedRoutes);
const publicRoutesSet = new Set(publicRoutes);

export default async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutesSet.has(path);
  const isPublicRoute = publicRoutesSet.has(path);

  // 3. Decrypt the session from the cookie
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get('session')?.value;
  const session = await cookieService.decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL(routes.login, request.nextUrl));
  }

  if (isPublicRoute && session?.userId && !request.nextUrl.pathname.startsWith(routes.dashboard)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
  }

  return NextResponse.next();
}
