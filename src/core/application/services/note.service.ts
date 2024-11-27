import { CreateNoteDTO } from '../dtos/note.dtos';
import { FailedToCreateNoteError } from '../errors/note-errors';
import { NoteRepository } from '../ports/note.repository';

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(data: CreateNoteDTO) {
    const note = await this.noteRepository.createNote(data);

    if (!note) {
      throw new FailedToCreateNoteError();
    }

    return note;
  }
}
