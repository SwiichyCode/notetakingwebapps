'use server';

import { actionClient } from '@/config/libs/next-safe-action';
import { UserWithThisEmailAlreadyExistsError } from '@/core/application/errors/auth-errors';
import { container } from '@/core/infrastructure/config/container';
import { SignupFormSchema } from '@/core/presentation/schemas/auth-form.schema';

export const signupAction = actionClient.schema(SignupFormSchema).action(async ({ parsedInput }) => {
  const authService = container.getAuthService();
  const emailVerificationService = container.getEmailVerificationService();

  try {
    await authService.signup(parsedInput);
    await emailVerificationService.resendVerification(parsedInput.email);
  } catch (error) {
    if (error instanceof UserWithThisEmailAlreadyExistsError) {
      await emailVerificationService.sendExistingAccountAlert(parsedInput.email);
    }

    throw error;
  }
});
