'use server';

import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { container } from '@/core/infrastructure/config/container';
import { ResetPasswordFormSchema } from '@/core/presentation/schemas/auth-form.schema';
import { ResetPasswordFormState } from '@/core/presentation/schemas/auth-form.state';

// Appel des services
const resetPasswordService = container.getResetPasswordService();

export async function resetPasswordAction(
  state: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const validatedFields = ResetPasswordFormSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const result = await resetPasswordService.resetPassword({
    token: validatedFields.data.token,
    newPassword: validatedFields.data.password,
  });

  if (!result.success) {
    return {
      message: result.error,
      success: false,
    };
  }

  redirect(`${routes.login}?message=password-reset-success`);
}
