import { CreateNoteDTO } from '../dtos/note.dtos';
import { CustomError } from '../errors/custom-error';
import { NoteRepository } from '../ports/note.repository';

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(note: CreateNoteDTO): Promise<void> {
    try {
      await this.noteRepository.createNote(note);
    } catch {
      throw new CustomError('Failed to create note', 'NOTE_CREATION_FAILED');
    }
  }
}
