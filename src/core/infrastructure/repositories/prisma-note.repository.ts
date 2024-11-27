import prisma from '@/config/libs/prisma';
import { CreateNoteDTO } from '@/core/application/dtos/note.dtos';

import { NoteRepository } from '../../application/ports/note.repository';
import { Note } from '../../domain/entities/note.entity';

export class PrismaNoteRepository implements NoteRepository {
  async createNote(note: CreateNoteDTO): Promise<Note> {
    return await prisma.note.create({ data: note });
  }
}
