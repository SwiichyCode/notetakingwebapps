'use server';

import { redirect } from 'next/navigation';

import { actionClient } from '@/config/libs/next-safe-action';
import { routes } from '@/config/routes';
import { container } from '@/core/infrastructure/config/container';
import { LoginFormSchema } from '@/core/presentation/schemas/auth-form.schema';

export const loginAction = actionClient.schema(LoginFormSchema).action(async ({ parsedInput }) => {
  const authService = container.getAuthService();
  const sessionService = container.getSessionService();

  try {
    const result = await authService.login(parsedInput);
    await sessionService.create(result.id);
  } catch (error) {
    throw error;
  }

  redirect(routes.dashboard);
});
