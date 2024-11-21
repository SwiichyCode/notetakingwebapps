'use server';

import { container } from '../../infrastructure/config/container';
import { ForgotPasswordFormState, ForgotPasswordSchema } from '../schemas/definitions';

// Appel des services
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
