'use server';

import { redirect } from 'next/navigation';

import { actionClient } from '@/config/libs/next-safe-action';
import { routes } from '@/config/routes';
import { container } from '@/core/infrastructure/config/container';
import { ResetPasswordFormSchema } from '@/core/presentation/schemas/auth-form.schema';

export const resetPasswordActionClient = actionClient
  .schema(ResetPasswordFormSchema)
  .action(async ({ parsedInput }) => {
    try {
      const resetPasswordService = container.getResetPasswordService();
      await resetPasswordService.resetPassword({
        token: parsedInput.token,
        newPassword: parsedInput.password,
      });
    } catch (error) {
      throw error;
    }

    redirect(`${routes.login}?message=password-reset-success`);
  });
