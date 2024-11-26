import { CreateNoteDTO } from '../dtos/note.dtos';
import { NoteRepository } from '../ports/note.repository';

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(note: CreateNoteDTO): Promise<void> {
    await this.noteRepository.createNote(note);
  }
}
