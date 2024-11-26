import { CreateNoteDTO } from '../dtos/note.dtos';

export interface NoteRepository {
  createNote(note: CreateNoteDTO): Promise<void>;
}
