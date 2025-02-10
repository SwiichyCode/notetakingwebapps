'server-only';

import {
  EmailVerificationDTO,
  ResendEmailVerificationDTO,
  SendExistingAccountAlertDTO,
} from '@/core/application/dtos/email-verification.dtos';
import { BadRequestError, ConflictError, NotFoundError } from '@/core/application/errors/custom-error';
import { AuthRepository } from '@/core/application/ports/auth.repository';
import { EmailRepository } from '@/core/application/ports/email.repository';
import { isKnownError } from '@/core/application/utils/error-handler';

interface IEmailVerificationService {
  sendEmailVerification(data: EmailVerificationDTO): Promise<void>;
  resendEmailVerification(data: ResendEmailVerificationDTO): Promise<void>;
  sendExistingAccountAlert(data: SendExistingAccountAlertDTO): Promise<void>;
}

export class EmailVerificationService implements IEmailVerificationService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository,
  ) {}

  async sendEmailVerification(data: EmailVerificationDTO): Promise<void> {
    try {
      const validatedData = EmailVerificationDTO.parse(data);

      const user = await this.authRepository.findUserByVerificationToken(validatedData.token);

      if (!user) throw new NotFoundError('User');

      if (user.isEmailVerified()) throw new ConflictError('Email address is already verified');

      await this.authRepository.updateUserVerification(user.id, null);
    } catch (error) {
      if (isKnownError(error, [NotFoundError, ConflictError])) throw error;
      throw new BadRequestError('Unexpected error occurred');
    }
  }

  async resendEmailVerification(data: ResendEmailVerificationDTO): Promise<void> {
    try {
      const validatedData = ResendEmailVerificationDTO.parse(data);

      const user = await this.authRepository.findUserByEmail(validatedData.email);

      if (!user) throw new NotFoundError('User');

      if (user.isEmailVerified()) throw new ConflictError('Email address is already verified');

      if (!user.canResendVerificationEmail())
        throw new BadRequestError('Please wait before requesting another verification email.');

      const newToken = this.generateVerificationToken();

      await this.authRepository.updateUserVerification(user.id, newToken);

      await this.emailRepository.sendSignupConfirmationEmail(user.email, newToken);
    } catch (error) {
      if (isKnownError(error, [NotFoundError, ConflictError, BadRequestError])) throw error;
      throw new BadRequestError('Unexpected error occurred');
    }
  }

  async sendExistingAccountAlert(data: SendExistingAccountAlertDTO): Promise<void> {
    try {
      const validatedData = SendExistingAccountAlertDTO.parse(data);

      const user = await this.authRepository.findUserByEmail(validatedData.email);

      if (!user) throw new NotFoundError('User');

      await this.emailRepository.sendExistingAccountAlert(validatedData.email);
    } catch (error) {
      if (isKnownError(error, [NotFoundError, BadRequestError])) throw error;
      throw new BadRequestError('Unexpected error occurred');
    }
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).slice(2, 15);
  }
}
