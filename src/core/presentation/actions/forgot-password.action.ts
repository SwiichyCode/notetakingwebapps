'use server';

import { actionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';
import { ForgotPasswordSchema } from '@/core/presentation/schemas/auth-form.schema';

export const forgotPasswordAction = actionClient.schema(ForgotPasswordSchema).action(async ({ parsedInput }) => {
  try {
    const resetPasswordService = container.getResetPasswordService();
    await resetPasswordService.initiatePasswordReset({
      email: parsedInput.email,
    });
  } catch (error) {
    throw error;
  }
});
