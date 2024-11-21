'server-only';

import { AuthRepository } from '../ports/auth.repository';
import { EmailRepository } from '../ports/email.repository';

export class EmailVerificationService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository,
  ) {}

  async verify(token: string): Promise<{ success: boolean; error?: string }> {
    const user = await this.authRepository.findUserByVerificationToken(token);

    if (!user) {
      return { success: false, error: 'Invalid or expired verification token.' };
    }

    if (user.isEmailVerified()) {
      return { success: false, error: 'Email already verified.' };
    }

    await this.authRepository.updateUserVerification(user.id, null);
    return { success: true };
  }

  async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    if (user.isEmailVerified()) {
      return { success: false, error: 'Email already verified.' };
    }

    if (!user.canResendVerificationEmail()) {
      return { success: false, error: 'Please wait before requesting another verification email.' };
    }

    const newToken = this.generateVerificationToken();
    await this.authRepository.updateUserVerification(user.id, newToken);
    await this.emailRepository.sendSignupConfirmationEmail(email, newToken);

    return { success: true };
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).slice(2, 15);
  }
}
