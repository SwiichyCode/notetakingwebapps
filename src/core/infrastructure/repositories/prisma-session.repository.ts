import { PrismaClient } from '@prisma/client';

import { SessionRepository } from '../../application/ports/authentication/session.repository';

export class PrismaSessionRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: { userId: string; expiresAt: Date; handle: string }) {
    const session = await this.prisma.session.create({
      data,
    });

    return session;
  }

  async delete(handle: string) {
    await this.prisma.session.delete({
      where: { handle },
    });
  }

  async findByHandle(handle: string) {
    return this.prisma.session.findUnique({
      where: { handle },
    });
  }
}
