import prisma from '@/lib/prisma';

import { CookieRepository } from '../../application/ports/cookie.repository';
import { EmailRepository } from '../../application/ports/email.repository';
import { PasswordRepository } from '../../application/ports/password.repository';
import { AuthService } from '../../application/services/auth.service';
import { EmailVerificationService } from '../../application/services/email-verification.service';
import { ResetPasswordService } from '../../application/services/reset-password.service';
import { SessionService } from '../../application/services/session.service';
import { BcryptPasswordAdapter } from '../adapters/bcrypt-password.adapter';
import { NextCookieAdapter } from '../adapters/next-cookie.adapter';
import { ResendEmailAdapter } from '../adapters/resend-email.adapter';
import { PrismaAuthRepository } from '../repositories/prisma-auth.repository';
import { PrismaSessionRepository } from '../repositories/prisma-session.repository';
import { SESSION_CONFIG } from './session.config';

class Container {
  private static instance: Container;

  // Repositories
  private readonly authRepository = new PrismaAuthRepository();
  private readonly cookieRepository: CookieRepository = new NextCookieAdapter(SESSION_CONFIG);
  private readonly emailRepository: EmailRepository = new ResendEmailAdapter();
  private readonly passwordRepository: PasswordRepository = new BcryptPasswordAdapter();

  // Services
  private readonly authService = new AuthService(this.authRepository, this.passwordRepository);

  private readonly sessionService = new SessionService(
    this.cookieRepository,
    new PrismaSessionRepository(prisma),
    SESSION_CONFIG,
  );

  private readonly emailVerificationService = new EmailVerificationService(this.authRepository, this.emailRepository);

  private readonly resetPasswordService = new ResetPasswordService(
    this.authRepository,
    this.emailRepository,
    this.passwordRepository,
  );

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Getters publics
  public getAuthService(): AuthService {
    return this.authService;
  }

  public getSessionService(): SessionService {
    return this.sessionService;
  }

  public getEmailVerificationService(): EmailVerificationService {
    return this.emailVerificationService;
  }

  public getResetPasswordService(): ResetPasswordService {
    return this.resetPasswordService;
  }
}

export const container = Container.getInstance();
