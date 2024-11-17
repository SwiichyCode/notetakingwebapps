import { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendSignupConfirmationEmail } from '@/lib/email';

import { EmailRepository } from '../../application/ports/email.repository';

export class NodeMailerEmailService implements EmailRepository {
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    await sendSignupConfirmationEmail(email, token);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    await sendPasswordResetEmail(email, token);
  }

  async sendPasswordResetSuccessEmail(email: string): Promise<void> {
    await sendPasswordResetSuccessEmail(email);
  }
}
