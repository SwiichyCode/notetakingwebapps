import { slugify } from '@/config/libs/utils';
import { CreateNoteInputDTO, NoteResponseDTO } from '@/core/application/dtos/note.dtos';
import { FailedToCreateNoteError } from '@/core/application/errors/note-errors';
import { NoteRepository } from '@/core/application/ports/note.repository';
import { Note } from '@/core/domain/entities/note.entity';

import { BadRequestError } from '../errors/custom-error';

interface INoteService {
  findNotesByUserId(userId: string): Promise<Note[]>;
  findNoteBySlug(slug: string): Promise<NoteResponseDTO>;
  createNote(data: CreateNoteInputDTO): Promise<Note>;
}

export class NoteService implements INoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findNotesByUserId(userId: string) {
    return this.noteRepository.findNotesByUserId(userId);
  }

  async findNoteBySlug(slug: string) {
    return this.noteRepository.findNoteBySlug(slug);
  }

  async createNote(data: CreateNoteInputDTO): Promise<Note> {
    try {
      const validatedData = CreateNoteInputDTO.parse(data);
      const slug = slugify(validatedData.title);

      const note = await this.noteRepository.createNote({
        ...validatedData,
        slug,
      });

      if (!note) {
        throw new BadRequestError('Échec de la création de la note');
      }

      return note;
    } catch {
      throw new BadRequestError('Erreur lors de la création de la note');
    }
  }
}
