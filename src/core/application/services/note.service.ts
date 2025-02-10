import { CreateNoteDTO } from '@/core/application/dtos/note.dtos';
import { FailedToCreateNoteError } from '@/core/application/errors/note-errors';
import { NoteRepository } from '@/core/application/ports/note.repository';

interface INoteService {
  createNote(data: CreateNoteDTO): Promise<any>;
}

export class NoteService implements INoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(data: CreateNoteDTO) {
    const note = await this.noteRepository.createNote(data);

    if (!note) {
      throw new FailedToCreateNoteError();
    }

    return note;
  }
}
