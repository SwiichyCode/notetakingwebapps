import {
  EmailNotVerifiedError,
  FailedToCreateUserError,
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from '@/core/application/errors/auth-errors';

import { AuthService } from '../../../application/services/auth.service';
import { MockAuthRepository } from '../../mocks/mock-auth.repository';
import { MockPasswordRepository } from '../../mocks/mock-password.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let mockAuthRepository: MockAuthRepository;
  let mockPasswordRepository: MockPasswordRepository;

  beforeEach(() => {
    mockAuthRepository = new MockAuthRepository();
    mockPasswordRepository = new MockPasswordRepository();
    authService = new AuthService(mockAuthRepository, mockPasswordRepository);
  });

  describe('login', () => {
    it('should throw InvalidCredentialsError if user does not exist', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should throw EmailNotVerifiedError if email is not verified', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      };

      mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(EmailNotVerifiedError);
    });

    it('should throw InvalidCredentialsError when password is incorrect', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: new Date(),
        isEmailVerified: () => true,
      };

      mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
      mockPasswordRepository.verify.mockResolvedValue(false);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should return user object when credentials are valid and email is verified', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: new Date(),
        isEmailVerified: () => true,
      };

      mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
      mockPasswordRepository.verify.mockResolvedValue(true);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('signup', () => {
    it('should throw UserAlreadyExistsError if user already exists', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      });

      await expect(
        authService.signup({
          email: 'test@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UserAlreadyExistsError);
    });

    it('should throw FailedToCreateUserError if user creation fails', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);
      mockPasswordRepository.hash.mockResolvedValue('hashedPassword');
      mockAuthRepository.createUser.mockResolvedValue(null); // Simule un échec de création

      await expect(
        authService.signup({
          email: 'unique@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(FailedToCreateUserError);
    });

    it('should successfully create a new user when email is unique', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);
      mockPasswordRepository.hash.mockResolvedValue('hashedPassword');
      const mockUser = {
        id: '1',
        email: 'unique@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      };
      mockAuthRepository.createUser.mockResolvedValue(mockUser);

      const result = await authService.signup({
        email: 'unique@example.com',
        password: 'password123',
      });

      expect(result).toEqual({ user: mockUser });
    });
  });
});
