'server-only';

import { v4 as uuidv4 } from 'uuid';

import { InitiatePasswordResetDTO, ResetPasswordDTO } from '@/core/application/dtos/authentication/reset-password.dtos';
import {
  ExpiredResetTokenError,
  InvalidResetTokenError,
  UserNotFoundError,
} from '@/core/application/errors/auth-errors';
import { AuthRepository } from '@/core/application/ports/authentication/auth.repository';
import { EmailRepository } from '@/core/application/ports/authentication/email.repository';
import { PasswordRepository } from '@/core/application/ports/authentication/password.repository';

interface IResetPasswordService {
  initiatePasswordReset(data: InitiatePasswordResetDTO): Promise<void>;
  resetPassword(data: ResetPasswordDTO): Promise<void>;
}

export class ResetPasswordService implements IResetPasswordService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async initiatePasswordReset(data: InitiatePasswordResetDTO): Promise<void> {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new UserNotFoundError(data.email);
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.authRepository.updateResetToken(user.id, token, expires);
    await this.emailRepository.sendPasswordResetEmail(data.email, token);
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    const user = await this.authRepository.findUserByResetToken(data.token);

    if (!user) {
      throw new InvalidResetTokenError();
    }

    if (user.resetPasswordTokenExpiresAt && user.resetPasswordTokenExpiresAt < new Date()) {
      throw new ExpiredResetTokenError();
    }

    const hashedPassword = await this.passwordRepository.hash(data.newPassword);
    await this.authRepository.updatePassword(user.id, hashedPassword);
    await this.emailRepository.sendPasswordResetSuccessEmail(user.email);
  }
}
