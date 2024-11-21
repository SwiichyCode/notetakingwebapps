'use server';

import { container } from '../../infrastructure/config/container';
import { AuthFormState, SignupFormSchema } from '../schemas/definitions';

// Appel des services
const authService = container.getAuthService();
const emailVerificationService = container.getEmailVerificationService();

export async function signupAction(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  // 1. Validation des données
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Inscription de l'utilisateur
  const result = await authService.signup(validatedFields.data);

  if (!result.success) {
    return { message: result.error };
  }

  // 3. Envoi de l'email de vérification
  if (result.user) {
    await emailVerificationService.resendVerification(result.user.email);
  }

  return { message: 'Please check your email to verify your account.' };
}
