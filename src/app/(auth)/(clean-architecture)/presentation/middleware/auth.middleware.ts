'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

import { SessionService } from '../../application/services/session.service';
import { UserSessionService } from '../../application/services/user-session.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';

const authRepository = new PrismaAuthRepository();
const sessionService = new SessionService(
  {
    secret: process.env.SESSION_SECRET!,
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30,
    jwt: {
      algorithm: 'HS256',
      expiresIn: '1hr',
    },
    cookie: {
      name: 'session',
      options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      },
    },
  },
  prisma,
);
const userSessionService = new UserSessionService(authRepository, sessionService);

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
  revalidatePath('/');
}
