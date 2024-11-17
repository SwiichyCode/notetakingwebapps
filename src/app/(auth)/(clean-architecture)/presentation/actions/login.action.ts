'use server';

import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

import { AuthService } from '../../application/services/auth.service';
import { SessionService } from '../../application/services/session.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { AuthFormState, LoginFormSchema } from '../schemas/definitions';

// Initialisation des services
const authRepository = new PrismaAuthRepository();
const passwordService = new BcryptPasswordService();
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

const authService = new AuthService(authRepository, passwordService);

export async function loginAction(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  // 1. Validation des données
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Authentification
  const result = await authService.login(validatedFields.data);

  if (!result.success) {
    return {
      message: result.error,
      isEmailVerification: result.isEmailVerification,
      email: result.email,
    };
  }

  // 3. Création de la session
  if (result.user) {
    await sessionService.create(result.user.id);
    redirect('/');
  }

  return { message: 'Une erreur est survenue' };
}

export async function logoutAction() {
  await sessionService.delete();
}
