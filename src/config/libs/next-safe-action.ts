import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { container } from '@/core/infrastructure/config/container';

class ActionError extends Error {}

const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error('Action error:', error.message);

    if (error instanceof ActionError) {
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