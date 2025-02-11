export interface EmailRepository {
  sendSignupConfirmationEmail(email: string, token: string): Promise<void>;
  sendPasswordResetEmail(email: string, token: string): Promise<void>;
  sendPasswordResetSuccessEmail(email: string): Promise<void>;
  sendExistingAccountAlert(email: string): Promise<void>;
}
