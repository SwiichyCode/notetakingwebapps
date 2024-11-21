import { AuthRepository } from '../../(clean-architecture)/application/ports/auth.repository';

export class MockAuthRepository implements AuthRepository {
  findUserByEmail = jest.fn();
  findUserById = jest.fn();
  createUser = jest.fn();
  findUserByVerificationToken = jest.fn();
  updateUserVerification = jest.fn();
  updateResetToken = jest.fn();
  findUserByResetToken = jest.fn();
  updatePassword = jest.fn();
}
