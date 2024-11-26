'use server';

import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { container } from '@/core/infrastructure/config/container';
import { LoginFormSchema } from '@/core/presentation/schemas/auth-form.schema';
import { AuthFormState } from '@/core/presentation/schemas/auth-form.state';

export async function loginAction(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  // Appel des services
  const authService = container.getAuthService();
  const sessionService = container.getSessionService();

  // 1. Validation des données
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Authentification
  const result = await authService.login(validatedFields.data);

  if (!result.success) {
    return {
      message: result.error,
      isEmailVerification: result.isEmailVerification,
      email: result.email,
    };
  }

  // 3. Création de la session
  if (result.user) {
    await sessionService.create(result.user.id);
    redirect(routes.dashboard);
  }

  return { message: 'Une erreur est survenue' };
}
