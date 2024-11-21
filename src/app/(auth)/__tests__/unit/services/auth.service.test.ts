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
  });
});
