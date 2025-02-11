import prisma from '@/config/libs/prisma';

import { CreateUserDTO } from '../../application/dtos/user.dtos';
import { AuthRepository } from '../../application/ports/authentication/auth.repository';
import { User } from '../../domain/entities/user.entity';

export class PrismaAuthRepository implements AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.emailVerified,
      user.verificationToken,
      user.lastVerificationEmailSentAt,
    );
  }

  async findUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.password, user.emailVerified, user.verificationToken);
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return new User(user.id, user.email, user.password, user.emailVerified, user.verificationToken);
  }

  async updateUserVerification(userId: string, token: string | null): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken: token,
        emailVerified: token ? null : new Date(),
      },
    });
  }

  async findUserByVerificationToken(token: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.emailVerified,
      user.verificationToken,
      user.lastVerificationEmailSentAt,
    );
  }

  async updateResetToken(userId: string, token: string | null, expires: Date | null): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: expires,
      },
    });
  }

  async findUserByResetToken(token: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.emailVerified,
      user.verificationToken,
      user.lastVerificationEmailSentAt,
      user.resetPasswordToken,
      user.resetPasswordExpiresAt,
    );
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });
  }
}
