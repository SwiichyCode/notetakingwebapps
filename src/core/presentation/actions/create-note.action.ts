'use server';

import { authActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

import { CreateNoteSchema } from '../schemas/note-form.schema';

export const createNoteAction = authActionClient.schema(CreateNoteSchema).action(async ({ parsedInput, ctx }) => {
  const noteService = container.getNoteService();
  try {
    await noteService.createNote({ ...parsedInput, userId: ctx.userId });
  } catch (error) {
    throw error;
  }
});
