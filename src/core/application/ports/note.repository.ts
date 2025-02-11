import { Note } from '@/core/domain/entities/note.entity';

import { CreateNoteRepositoryDTO, NoteResponseDTO } from '../dtos/note.dtos';

export interface NoteRepository {
  findNotesByUserId(userId: string): Promise<Note[]>;
  findNoteBySlug(slug: string): Promise<NoteResponseDTO>;
  createNote(note: CreateNoteRepositoryDTO): Promise<Note>;
}
