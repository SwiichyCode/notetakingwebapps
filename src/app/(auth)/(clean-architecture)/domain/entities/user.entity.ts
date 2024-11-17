export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly emailVerified: Date | null,
    public readonly verificationToken: string | null,
    public readonly lastVerificationEmailSentAt?: Date | null,
    public readonly resetPasswordToken?: string | null,
    public readonly resetPasswordTokenExpiresAt?: Date | null,
  ) {}

  isEmailVerified(): boolean {
    return !!this.emailVerified;
  }

  canResendVerificationEmail(): boolean {
    if (!this.lastVerificationEmailSentAt) return true;

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    return this.lastVerificationEmailSentAt < fifteenMinutesAgo;
  }
}
