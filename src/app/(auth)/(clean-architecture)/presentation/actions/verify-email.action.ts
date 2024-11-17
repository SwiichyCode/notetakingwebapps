'use server';

import { EmailVerificationService } from '../../application/services/email-verification.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { NodeMailerEmailService } from '../../infrastructure/services/email.service';

// Initialisation des services
const authRepository = new PrismaAuthRepository();
const emailService = new NodeMailerEmailService();
const emailVerificationService = new EmailVerificationService(authRepository, emailService);

export async function verifyEmailAction(token: string) {
  return emailVerificationService.verify(token);
}

export async function resendVerificationEmailAction(email: string | undefined) {
  if (!email) {
    return {
      success: false,
      error: 'Email is required',
    };
  }

  return emailVerificationService.resendVerification(email);
}
