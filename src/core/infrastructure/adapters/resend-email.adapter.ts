import { resend } from '@/config/libs/email';
import { EmailRepository } from '@/core/application/ports/authentication/email.repository';

export class ResendEmailAdapter implements EmailRepository {
  async sendSignupConfirmationEmail(email: string, token: string): Promise<void> {
    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify your email address',
      html: `
      <h1>Welcome!</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyLink}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset your password',
      html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 24 hours.</p>
    `,
    });
  }

  async sendPasswordResetSuccessEmail(email: string) {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password reset successful',
      html: `
          <h1>Password reset successful</h1>
          <p>Your password has been reset successfully.</p>
        `,
    });
  }

  async sendExistingAccountAlert(email: string): Promise<void> {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Duplicate account notification',
      html: `
      <h1>Account Creation Attempt Detected</h1>
      <p>Hello,</p>
      <p>We noticed that an attempt was made to create an account using your email address. If this was you, please log in to your existing account. If not, you can safely ignore this email.</p>
      <p>If you need assistance, feel free to contact us.</p>
      <p>Best regards,</p>
      <p>The Support Team</p>
    `,
    });
  }
}
