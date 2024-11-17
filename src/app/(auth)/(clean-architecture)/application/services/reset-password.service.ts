import { generateVerificationToken } from '@/lib/utils';

import { PasswordService } from '../../infrastructure/services/bcrypt-password.service';
import { InitiateResetDTO, ResetPasswordDTO, ResetPasswordResult } from '../dtos/reset-password.dtos';
import { AuthRepository } from '../ports/auth.repository';
import { EmailRepository } from '../ports/email.repository';

export class ResetPasswordService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async initiateReset(data: InitiateResetDTO): Promise<ResetPasswordResult> {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      return { success: true }; // Pour des raisons de sécurité, on renvoie toujours success
    }

    const token = generateVerificationToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await this.authRepository.updateResetToken(user.id, token, expires);
    await this.emailRepository.sendPasswordResetEmail(data.email, token);

    return { success: true };
  }

  async resetPassword(data: ResetPasswordDTO): Promise<ResetPasswordResult> {
    const user = await this.authRepository.findUserByResetToken(data.token);

    if (!user) {
      return { success: false, error: 'Invalid or expired reset token.' };
    }

    if (user.resetPasswordTokenExpiresAt && user.resetPasswordTokenExpiresAt < new Date()) {
      return { success: false, error: 'Reset token has expired.' };
    }

    const hashedPassword = await this.passwordService.hash(data.newPassword);
    await this.authRepository.updatePassword(user.id, hashedPassword);
    await this.emailRepository.sendPasswordResetSuccessEmail(user.email);

    return { success: true };
  }
}
