import { container } from '@/core/infrastructure/config/container';

import { AuthService } from '../../application/services/auth.service';
import { EmailVerificationService } from '../../application/services/email-verification.service';
import { signupAction } from '../../presentation/actions/signup.action';
import { MockAuthRepository } from '../mocks/mock-auth.repository';
import { MockEmailRepository } from '../mocks/mock-email.repository';
import { MockPasswordRepository } from '../mocks/mock-password.repository';

jest.mock('../../infrastructure/config/container', () => ({
  container: {
    getAuthService: jest.fn(),
    getEmailVerificationService: jest.fn(),
  },
}));

describe('signupAction Integration', () => {
  let mockAuthRepository: MockAuthRepository;
  let mockPasswordRepository: MockPasswordRepository;
  let mockEmailRepository: MockEmailRepository;
  let mockAuthService: AuthService;
  let mockEmailVerificationService: EmailVerificationService;

  beforeEach(() => {
    // Initialisation des repositories
    mockAuthRepository = new MockAuthRepository();
    mockPasswordRepository = new MockPasswordRepository();
    mockEmailRepository = new MockEmailRepository();

    // Création des services avec les repositories mockés
    mockAuthService = new AuthService(mockAuthRepository, mockPasswordRepository) as jest.Mocked<AuthService>;
    mockEmailVerificationService = new EmailVerificationService(
      mockAuthRepository,
      mockEmailRepository,
    ) as jest.Mocked<EmailVerificationService>;

    mockEmailVerificationService.resendVerification = jest.fn();

    // Configuration des mocks pour le container
    (container.getAuthService as jest.Mock).mockReturnValue(mockAuthService);
    (container.getEmailVerificationService as jest.Mock).mockReturnValue(mockEmailVerificationService);
  });

  it('should return an error if fields are invalid', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');
    formData.append('password', '123');

    const result = await signupAction({}, formData);

    expect(result?.errors).toBeDefined();
    expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
  });

  it('should return an error if user already exists', async () => {
    const formData = new FormData();
    formData.append('email', 'existing@example.com');
    formData.append('password', 'password123!');

    mockAuthRepository.findUserByEmail.mockResolvedValue({
      id: '1',
      email: 'existing@example.com',
      password: 'hashedPassword',
      emailVerified: null,
      isEmailVerified: () => false,
    });

    const result = await signupAction({}, formData);

    expect(result?.message).toBe('User with this email already exists');
    expect(mockAuthRepository.findUserByEmail).toHaveBeenCalledWith('existing@example.com');
  });

  it('should create user and send verification email if input is valid', async () => {
    const formData = new FormData();
    formData.append('email', 'new@example.com');
    formData.append('password', 'password123!');

    mockAuthRepository.findUserByEmail.mockResolvedValue(null);
    mockAuthRepository.createUser.mockResolvedValue({
      id: '1',
      email: 'new@example.com',
      password: 'hashedPassword',
      emailVerified: null,
      isEmailVerified: () => false,
    });

    const result = await signupAction({}, formData);

    expect(result?.message).toBe('Please check your email to verify your account.');
    expect(mockAuthRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'new@example.com',
        password: undefined,
        verificationToken: expect.any(String),
      }),
    );
    expect(mockEmailVerificationService.resendVerification).toHaveBeenCalled();
  });
});
