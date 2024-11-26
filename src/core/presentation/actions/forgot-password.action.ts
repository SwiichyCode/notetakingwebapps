'use server';

import { container } from '@/core/infrastructure/config/container';
import { ForgotPasswordSchema } from '@/core/presentation/schemas/auth-form.schema';
import { ForgotPasswordFormState } from '@/core/presentation/schemas/auth-form.state';

const resetPasswordService = container.getResetPasswordService();

export async function forgotPasswordAction(
  state: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const result = await resetPasswordService.initiateReset({
    email: validatedFields.data.email,
  });

  if (!result.success) {
    return {
      message: result.error,
      success: false,
    };
  }

  return {
    message: 'If an account exists with this email, you will receive a password reset link.',
    success: true,
  };
}
