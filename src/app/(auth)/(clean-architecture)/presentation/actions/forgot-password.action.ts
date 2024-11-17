'use server';

import { ResetPasswordService } from '../../application/services/reset-password.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { NodeMailerEmailService } from '../../infrastructure/services/email.service';
import { ForgotPasswordFormState, ForgotPasswordSchema } from '../schemas/definitions';

// Initialisation des services
const authRepository = new PrismaAuthRepository();
const emailService = new NodeMailerEmailService();
const passwordService = new BcryptPasswordService();

const resetPasswordService = new ResetPasswordService(authRepository, emailService, passwordService);

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
