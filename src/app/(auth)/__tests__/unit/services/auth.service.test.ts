import { AuthService } from '../../../(clean-architecture)/application/services/auth.service';
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
    it('should return false and error message if user does not exist', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });

    it('should return false and error message if email is not verified', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.isEmailVerification).toBe(true);
    });

    it('should return success when credentials are valid and email is verified', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: new Date(),
        isEmailVerified: () => true,
      });
      mockPasswordRepository.verify.mockResolvedValue(true);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return false when password is incorrect', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: new Date(),
        isEmailVerified: () => true,
      });
      mockPasswordRepository.verify.mockResolvedValue(false);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('signup', () => {
    it('should return false and error message if user already exists', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      });

      const result = await authService.signup({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('User with this email already exists');
    });

    it('should successfully create a new user when email is unique', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);
      mockPasswordRepository.hash.mockResolvedValue('hashedPassword');
      mockAuthRepository.createUser.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      });

      const result = await authService.signup({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockPasswordRepository.hash).toHaveBeenCalledWith('password123');
      expect(mockAuthRepository.createUser).toHaveBeenCalled();
    });

    it('should successfully create a new user when email is unique', async () => {
      mockAuthRepository.findUserByEmail.mockResolvedValue(null);
      mockPasswordRepository.hash.mockResolvedValue('hashedPassword');
      mockAuthRepository.createUser.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        emailVerified: null,
        isEmailVerified: () => false,
      });

      const result = await authService.signup({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockPasswordRepository.hash).toHaveBeenCalledWith('password123');
      expect(mockAuthRepository.createUser).toHaveBeenCalled();
    });

    // it('should handle errors during user creation', async () => {
    //   mockAuthRepository.findUserByEmail.mockResolvedValue(null);
    //   mockAuthRepository.createUser.mockImplementation(() => Promise.reject(new Error('Database error')));

    //   const result = await authService.signup({
    //     email: 'test@example.com',
    //     password: 'password123',
    //   });

    //   expect(result.success).toBe(false);
    //   expect(result.error).toBe('An error occurred during signup');
    // });
  });
});
