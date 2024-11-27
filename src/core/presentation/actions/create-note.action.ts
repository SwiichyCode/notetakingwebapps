'use server';

import { authActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

import { CreateNoteSchema } from '../schemas/note-form.schema';

const noteService = container.getNoteService();

export const createNoteAction = authActionClient.schema(CreateNoteSchema).action(async ({ parsedInput, ctx }) => {
  await noteService.createNote({ ...parsedInput, userId: ctx.userId });
});
