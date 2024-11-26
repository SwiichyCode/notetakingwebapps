// Mock des dépendances

import { AuthService } from '../../application/services/auth.service';
import { SessionService } from '../../application/services/session.service';
import { container } from '../../infrastructure/config/container';
import { SESSION_CONFIG } from '../../infrastructure/config/session.config';
import { loginAction } from '../../presentation/actions/login.action';
import { MockAuthRepository } from '../mocks/mock-auth.repository';
import { MockCookieRepository } from '../mocks/mock-cookie.repository';
import { MockPasswordRepository } from '../mocks/mock-password.repository';
import { MockSessionRepository } from '../mocks/mock-session.repository';

jest.mock('../../(clean-architecture)/infrastructure/config/container', () => ({
  container: {
    getAuthService: jest.fn(),
    getSessionService: jest.fn(),
  },
}));

describe('loginAction Integration', () => {
  let mockAuthRepository: MockAuthRepository;
  let mockPasswordRepository: MockPasswordRepository;
  let mockSessionRepository: MockSessionRepository;
  let mockCookieRepository: MockCookieRepository;
  let mockAuthService: AuthService;
  let mockSessionService: SessionService;

  beforeEach(() => {
    // Initialisation des repositories
    mockAuthRepository = new MockAuthRepository();
    mockPasswordRepository = new MockPasswordRepository();
    mockSessionRepository = new MockSessionRepository();
    mockCookieRepository = new MockCookieRepository();
    // Création des services avec les repositories mockés
    mockAuthService = new AuthService(mockAuthRepository, mockPasswordRepository) as jest.Mocked<AuthService>;
    mockSessionService = new SessionService(mockCookieRepository, mockSessionRepository, SESSION_CONFIG);

    // Configuration des mocks pour le container
    (container.getAuthService as jest.Mock).mockReturnValue(mockAuthService);
    (container.getSessionService as jest.Mock).mockReturnValue(mockSessionService);
  });

  it('should return an error if fields are invalid', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');
    formData.append('password', '123');

    const result = await loginAction({}, formData);

    expect(result?.errors).toBeDefined();
    expect(mockAuthRepository.findUserByEmail).not.toHaveBeenCalled();
  });

  it('should return an error if user is not found', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password');

    mockAuthRepository.findUserByEmail.mockResolvedValue(null);

    const result = await loginAction({}, formData);

    expect(result?.message).toBe('Invalid credentials');
    expect(mockAuthRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should create a session and redirect if credentials are valid', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      emailVerified: new Date(),
      isEmailVerified: () => true,
    };

    mockAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
    mockPasswordRepository.verify.mockResolvedValue(true);

    try {
      await loginAction({}, formData);
    } catch (error) {
      expect(error).toBeDefined();
      expect(mockSessionRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: '1',
          expiresAt: expect.any(Date),
          handle: expect.any(String),
        }),
      );
    }
  });
});
