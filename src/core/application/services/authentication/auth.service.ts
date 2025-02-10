'server-only';

import { CreateUserDTO, LoginDTO, UserResponseDTO } from '@/core/application/dtos/user.dtos';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/application/errors/custom-error';
import { AuthRepository } from '@/core/application/ports/auth.repository';
import { PasswordRepository } from '@/core/application/ports/password.repository';
import { isKnownError } from '@/core/application/utils/error-handler';

interface IAuthService {
  login(data: LoginDTO): Promise<UserResponseDTO>;
  signup(data: CreateUserDTO): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async login(data: LoginDTO): Promise<UserResponseDTO> {
    try {
      const validatedData = LoginDTO.parse(data);

      const user = await this.authRepository.findUserByEmail(validatedData.email);

      if (!user) throw new NotFoundError('User');

      if (!user.isEmailVerified()) throw new UnauthorizedError('Please verify your email before logging in');

      const isValid = await this.passwordRepository.verify(validatedData.password, user.password);

      if (!isValid) throw new UnauthorizedError('Invalid credentials');

      return UserResponseDTO.parse(user);
    } catch (error) {
      if (isKnownError(error, [NotFoundError, UnauthorizedError])) throw error;

      throw new BadRequestError('Failed to login');
    }
  }

  async signup(data: CreateUserDTO): Promise<void> {
    try {
      const validatedData = CreateUserDTO.parse(data);

      const existingUser = await this.authRepository.findUserByEmail(validatedData.email);

      if (existingUser)
        throw new ConflictError(
          'A user with this email already exists, please check your inbox for a verification email.',
        );

      const hashedPassword = await this.passwordRepository.hash(validatedData.password);

      const verificationToken = this.generateVerificationToken();

      await this.authRepository.createUser({
        ...validatedData,
        password: hashedPassword,
        verificationToken,
      });
    } catch (error) {
      if (isKnownError(error, [ConflictError])) throw error;

      throw new BadRequestError('Failed to signup');
    }
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).slice(2, 15);
  }
}
