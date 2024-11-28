'use server';

import { actionClient } from '@/config/libs/next-safe-action';
import { ConflictError } from '@/core/application/errors/custom-error';
import { isKnownError } from '@/core/application/utils/error-handler';
import { container } from '@/core/infrastructure/config/container';
import { SignupFormSchema } from '@/core/presentation/schemas/auth-form.schema';

export const signupAction = actionClient.schema(SignupFormSchema).action(async ({ parsedInput }) => {
  const authService = container.getAuthService();
  const emailVerificationService = container.getEmailVerificationService();

  try {
    await authService.signup(parsedInput);
    await emailVerificationService.resendEmailVerification({ email: parsedInput.email });
  } catch (error) {
    if (isKnownError(error, [ConflictError])) {
      await emailVerificationService.sendExistingAccountAlert({ email: parsedInput.email });
    }

    throw error;
  }
});
