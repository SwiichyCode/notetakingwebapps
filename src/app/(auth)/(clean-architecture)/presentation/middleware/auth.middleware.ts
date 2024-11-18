'use server';

import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

import { CookieService } from '../../application/services/cookie.service';
import { SessionService } from '../../application/services/session.service';
import { UserSessionService } from '../../application/services/user-session.service';
import { SESSION_CONFIG } from '../../infrastructure/config/session.config';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';

const authRepository = new PrismaAuthRepository();
const cookieService = new CookieService(SESSION_CONFIG);
const sessionService = new SessionService(cookieService, SESSION_CONFIG, prisma);
const userSessionService = new UserSessionService(authRepository, sessionService, cookieService);

export async function requireAuth() {
  try {
    return await userSessionService.requireAuth();
  } catch {
    redirect('/login');
  }
}

export async function getSession() {
  return userSessionService.getCurrentSession();
}

export async function getUser() {
  return userSessionService.getCurrentUser();
}

export async function logout() {
  await userSessionService.logout();
  redirect('/login');
}
