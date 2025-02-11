import { z } from 'zod';

// DTO pour la création d'une note (entrée de l'API)
export const CreateNoteInputDTO = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  content: z.string(),
  tags: z.array(z.string()),
  userId: z.string().uuid(),
});

// DTO pour la création en base de données
export const CreateNoteRepositoryDTO = CreateNoteInputDTO.extend({
  slug: z.string(),
});

// DTO pour la réponse API
export const NoteResponseDTO = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

// Types générés
export type CreateNoteInputDTO = z.infer<typeof CreateNoteInputDTO>;
export type CreateNoteRepositoryDTO = z.infer<typeof CreateNoteRepositoryDTO>;
export type NoteResponseDTO = z.infer<typeof NoteResponseDTO>;
