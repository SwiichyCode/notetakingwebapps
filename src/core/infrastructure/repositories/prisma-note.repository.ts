import prisma from '@/config/libs/prisma';

import { NoteRepository } from '../../application/ports/note.repository';
import { Note } from '../../domain/entities/note.entity';

export class PrismaNoteRepository implements NoteRepository {
  async createNote(note: Note): Promise<void> {
    await prisma.note.create({ data: note });
  }
}
