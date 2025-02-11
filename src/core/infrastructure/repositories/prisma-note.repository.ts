import prisma from '@/config/libs/prisma';
import { CreateNoteRepositoryDTO, NoteResponseDTO } from '@/core/application/dtos/note.dtos';
import { NoteRepository } from '@/core/application/ports/note.repository';
import { Note } from '@/core/domain/entities/note.entity';

export class PrismaNoteRepository implements NoteRepository {
  async findNotesByUserId(userId: string): Promise<Note[]> {
    return await prisma.note.findMany({
      where: { userId },
    });
  }

  async findNoteBySlug(slug: string): Promise<NoteResponseDTO> {
    return await prisma.note.findFirstOrThrow({
      where: { slug },
    });
  }

  async createNote(data: CreateNoteRepositoryDTO): Promise<Note> {
    const note = await prisma.note.create({
      data,
    });

    return new Note(
      note.id,
      data.title,
      data.slug,
      data.content,
      data.tags,
      data.userId,
      note.createdAt,
      note.updatedAt,
    );
  }
}
