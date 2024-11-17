export interface EmailRepository {
  sendVerificationEmail(email: string, token: string): Promise<void>;
  sendPasswordResetEmail(email: string, token: string): Promise<void>;
  sendPasswordResetSuccessEmail(email: string): Promise<void>;
}
