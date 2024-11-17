'use server';

import { AuthService } from '../../application/services/auth.service';
import { EmailVerificationService } from '../../application/services/email-verification.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { NodeMailerEmailService } from '../../infrastructure/services/email.service';
import { AuthFormState, SignupFormSchema } from '../schemas/definitions';

// Initialisation des services
const authRepository = new PrismaAuthRepository();
const passwordService = new BcryptPasswordService();
const emailService = new NodeMailerEmailService();

const authService = new AuthService(authRepository, passwordService);
const emailVerificationService = new EmailVerificationService(authRepository, emailService);

export async function signupAction(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  // 1. Validation des données
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Inscription de l'utilisateur
  const result = await authService.signup(validatedFields.data);

  if (!result.success) {
    return { message: result.error };
  }

  // 3. Envoi de l'email de vérification
  if (result.user) {
    await emailVerificationService.resendVerification(result.user.email);
  }

  return { message: 'Please check your email to verify your account.' };
}
