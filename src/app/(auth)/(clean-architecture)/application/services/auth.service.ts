'server-only';

import { AuthResult, CreateUserDTO, LoginDTO } from '../dtos/user.dtos';
import { AuthRepository } from '../ports/auth.repository';
import { PasswordRepository } from '../ports/password.repository';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async login({ email, password }: LoginDTO): Promise<AuthResult> {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        error: 'Invalid credentials',
      };
    }

    if (!user.isEmailVerified()) {
      return {
        success: false,
        error: 'Please verify your email before logging in',
        isEmailVerification: true,
        email: user.email,
      };
    }

    const isValid = await this.passwordRepository.verify(password, user.password);

    if (!isValid) {
      return {
        success: false,
        error: 'Invalid credentials',
      };
    }

    return {
      success: true,
      user,
    };
  }

  async signup(data: CreateUserDTO): Promise<AuthResult> {
    const existingUser = await this.authRepository.findUserByEmail(data.email);

    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }

    const hashedPassword = await this.passwordRepository.hash(data.password);
    const verificationToken = this.generateVerificationToken();

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
      verificationToken,
    });

    return {
      success: true,
      user,
    };
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).slice(2, 15);
  }
}
