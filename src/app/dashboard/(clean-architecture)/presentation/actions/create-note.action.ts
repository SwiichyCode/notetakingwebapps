'use server';

import prisma from '@/lib/prisma';

import { CreateNoteSchema, FormState } from '../schemas/definitions';

export async function createNoteAction(state: FormState, formData: FormData, userId: string) {
  const rawFormData = {
    title: String(formData.get('title') ?? ''),
    tags: String(formData.get('tags') ?? ''),
    content: String(formData.get('content') ?? ''),
  };

  const validatedFields = CreateNoteSchema.safeParse({
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

  await prisma.note.create({
    data: {
      title: validatedFields.data.title,
      tags: validatedFields.data.tags,
      content: validatedFields.data.content,
      userId,
    },
  });

  return {
    success: true,
    message: 'Note created successfully',
  };
}
