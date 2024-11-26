'use server';

import prisma from '@/config/libs/prisma';
import { UserService } from '@/core/application/services/user.service';
import { PrismaAuthRepository } from '@/core/infrastructure/repositories/prisma-auth.repository';

import { ZCreateNoteSchema } from '../schemas/note-form.schema';
import { NoteFormState } from '../schemas/note-form.state';

const authRepository = new PrismaAuthRepository();
const userService = new UserService(authRepository);

export async function createNoteAction(state: NoteFormState, formData: FormData, userId: string) {
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