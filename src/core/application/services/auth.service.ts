'server-only';

import { CreateUserDTO, LoginDTO, toUserResponseDTO, UserResponseDTO } from '../dtos/user.dtos';
import {
  EmailNotVerifiedError,
  FailedToCreateUserError,
  InvalidCredentialsError,
  UserWithThisEmailAlreadyExistsError,
} from '../errors/auth-errors';
import { AuthRepository } from '../ports/auth.repository';
import { PasswordRepository } from '../ports/password.repository';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async login({ email, password }: LoginDTO): Promise<{ user: UserResponseDTO }> {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.isEmailVerified()) {
      throw new EmailNotVerifiedError(user.email);
    }

    const isValid = await this.passwordRepository.verify(password, user.password);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    return { user: toUserResponseDTO(user) };
  }

  async signup(data: CreateUserDTO): Promise<{ user: UserResponseDTO }> {
    const existingUser = await this.authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new UserWithThisEmailAlreadyExistsError(existingUser.email);
    }

    const hashedPassword = await this.passwordRepository.hash(data.password);
    const verificationToken = this.generateVerificationToken();

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
      verificationToken,
    });

    if (!user) {
      throw new FailedToCreateUserError();
    }

    return { user: toUserResponseDTO(user) };
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).slice(2, 15);
  }
}
