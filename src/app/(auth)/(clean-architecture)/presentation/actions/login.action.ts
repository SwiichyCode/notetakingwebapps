'use server';

import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import { routes } from '@/routes';

import { AuthService } from '../../application/services/auth.service';
import { CookieService } from '../../application/services/cookie.service';
import { SessionService } from '../../application/services/session.service';
import { SESSION_CONFIG } from '../../infrastructure/config/session.config';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { AuthFormState, LoginFormSchema } from '../schemas/definitions';

// Initialisation des services
const authRepository = new PrismaAuthRepository();
const passwordService = new BcryptPasswordService();
const cookieService = new CookieService(SESSION_CONFIG);
const sessionService = new SessionService(cookieService, SESSION_CONFIG, prisma);

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
    redirect(routes.dashboard);
  }

  return { message: 'Une erreur est survenue' };
}

export async function logoutAction() {
  await sessionService.delete();
}
