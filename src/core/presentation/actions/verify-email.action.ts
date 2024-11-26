'use server';

import { container } from '@/core/infrastructure/config/container';

// Appel des services
const emailVerificationService = container.getEmailVerificationService();

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
