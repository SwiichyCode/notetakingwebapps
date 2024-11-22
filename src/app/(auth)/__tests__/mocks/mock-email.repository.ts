import { EmailRepository } from '../../(clean-architecture)/application/ports/email.repository';

export class MockEmailRepository implements EmailRepository {
  sendSignupConfirmationEmail = jest.fn();
  sendPasswordResetEmail = jest.fn();
  sendPasswordResetSuccessEmail = jest.fn();
}
