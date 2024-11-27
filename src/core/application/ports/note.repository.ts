import { Note } from '@/core/domain/entities/note.entity';

import { CreateNoteDTO } from '../dtos/note.dtos';

export interface NoteRepository {
  createNote(note: CreateNoteDTO): Promise<Note>;
}
