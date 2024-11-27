import prisma from '@/config/libs/prisma';
import { NoteService } from '@/core/application/services/note.service';
import { UserService } from '@/core/application/services/user.service';

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
import { PrismaNoteRepository } from '../repositories/prisma-note.repository';
import { PrismaSessionRepository } from '../repositories/prisma-session.repository';
import { SESSION_CONFIG } from './session.config';

class Container {
  private static instance: Container;

  private readonly authRepository = new PrismaAuthRepository();
  private readonly noteRepository = new PrismaNoteRepository();
  private readonly cookieRepository: CookieRepository = new NextCookieAdapter(SESSION_CONFIG);
  private readonly emailRepository: EmailRepository = new ResendEmailAdapter();
  private readonly passwordRepository: PasswordRepository = new BcryptPasswordAdapter();

  private readonly authService = new AuthService(this.authRepository, this.passwordRepository);
  private readonly userService = new UserService(this.authRepository);
  private readonly noteService = new NoteService(this.noteRepository);

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

  public getUserService(): UserService {
    return this.userService;
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

  public getNoteService(): NoteService {
    return this.noteService;
  }
}

export const container = Container.getInstance();
