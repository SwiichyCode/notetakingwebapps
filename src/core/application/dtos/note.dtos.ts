import { Note } from '@/core/domain/entities/note.entity';

export interface CreateNoteDTO {
  title: string;
  content: string;
  tags: string[];
  userId: string;
}

export interface NoteResult {
  success: boolean;
  error: string;
  note?: Note;
}
