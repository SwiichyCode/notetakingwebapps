'use server';

import { redirect } from 'next/navigation';

import { authActionClient } from '@/config/libs/next-safe-action';
import { routes } from '@/config/routes';
import { container } from '@/core/infrastructure/config/container';

import { CreateNoteSchema } from '../schemas/note-form.schema';

export const createNoteAction = authActionClient.schema(CreateNoteSchema).action(async ({ parsedInput, ctx }) => {
  const noteService = container.getNoteService();

  try {
    const note = await noteService.createNote({ ...parsedInput, userId: ctx.userId });
    redirect(`${routes.dashboard}/${note.slug}`);
  } catch (error) {
    throw error;
  }
});
