'use server';

import { authActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

import { ZCreateNoteSchema } from '../schemas/note-form.schema';
import { NoteFormState } from '../schemas/note-form.state';

export async function createNoteAction(state: NoteFormState, formData: FormData, userId: string) {
  const userService = container.getUserService();
  const noteService = container.getNoteService();
  const user = await userService.getUserById(userId);

  if (!user) {
    return {
      error: 'User not found',
    };
  }

  const rawFormData = {
    title: String(formData.get('title') ?? ''),
    tags: String(formData.get('tags') ?? ''),
    content: String(formData.get('content') ?? ''),
  };

  const validatedFields = ZCreateNoteSchema.safeParse({
    title: formData.get('title'),
    tags: formData.get('tags'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: rawFormData,
    };
  }

  await noteService.createNote({ ...validatedFields.data, userId });

  return {
    success: true,
    message: 'Note created successfully',
  };
}

export const createNoteActionWithAuth = authActionClient
  .schema(ZCreateNoteSchema)
  .action(async ({ parsedInput, ctx }) => {
    const userService = container.getUserService();
    const noteService = container.getNoteService();
    const user = await userService.getUserById(ctx.userId);

    if (!user) {
      return { error: 'User not found' };
    }

    await noteService.createNote({ ...parsedInput, userId: ctx.userId });

    return { success: true, message: 'Note created successfully' };
  });
