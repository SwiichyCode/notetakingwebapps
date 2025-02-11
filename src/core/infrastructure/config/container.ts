import prisma from '@/config/libs/prisma';
import { CookieRepository } from '@/core/application/ports/authentication/cookie.repository';
import { EmailRepository } from '@/core/application/ports/authentication/email.repository';
import { PasswordRepository } from '@/core/application/ports/authentication/password.repository';
import { AuthService } from '@/core/application/services/authentication/auth.service';
import { EmailVerificationService } from '@/core/application/services/authentication/email-verification.service';
import { ResetPasswordService } from '@/core/application/services/authentication/reset-password.service';
import { SessionService } from '@/core/application/services/authentication/session.service';
import { NoteService } from '@/core/application/services/note.service';
import { UserService } from '@/core/application/services/user.service';
import { BcryptPasswordAdapter } from '@/core/infrastructure/adapters/bcrypt-password.adapter';
import { NextCookieAdapter } from '@/core/infrastructure/adapters/next-cookie.adapter';
import { ResendEmailAdapter } from '@/core/infrastructure/adapters/resend-email.adapter';
import { SESSION_CONFIG } from '@/core/infrastructure/config/session.config';
import { PrismaAuthRepository } from '@/core/infrastructure/repositories/prisma-auth.repository';
import { PrismaNoteRepository } from '@/core/infrastructure/repositories/prisma-note.repository';
import { PrismaSessionRepository } from '@/core/infrastructure/repositories/prisma-session.repository';

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
