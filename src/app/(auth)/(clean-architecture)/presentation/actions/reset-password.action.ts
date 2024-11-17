'use server';

import { redirect } from 'next/navigation';

import { ResetPasswordService } from '../../application/services/reset-password.service';
import { PrismaAuthRepository } from '../../infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { NodeMailerEmailService } from '../../infrastructure/services/email.service';
import { ResetPasswordFormSchema, ResetPasswordFormState } from '../schemas/definitions';

const authRepository = new PrismaAuthRepository();
const emailService = new NodeMailerEmailService();
const passwordService = new BcryptPasswordService();

const resetPasswordService = new ResetPasswordService(authRepository, emailService, passwordService);

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

  redirect('/login?message=password-reset-success');
}
