'use server';

import { redirect } from 'next/navigation';

import { routes } from '@/routes';

import { container } from '../../infrastructure/config/container';
import { ResetPasswordFormSchema, ResetPasswordFormState } from '../schemas/definitions';

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
