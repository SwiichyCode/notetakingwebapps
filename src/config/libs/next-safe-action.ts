import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { CustomError, RefactoredCustomError } from '@/core/application/errors/custom-error';
import { container } from '@/core/infrastructure/config/container';

export class ServerActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error('Action error:', error.message);

    if (error instanceof ServerActionError) {
      return error.message;
    }

    if (error instanceof CustomError) {
      return error.message;
    }

    if (error instanceof RefactoredCustomError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const sessionService = container.getSessionService();
  const session = await sessionService.getCurrentSession();

  if (!session) {
    throw new Error('Session not found!');
  }

  return next({ ctx: { userId: session.userId } });
});
