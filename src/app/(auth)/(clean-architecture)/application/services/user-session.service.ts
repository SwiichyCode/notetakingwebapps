'server-only';

import { cookies } from 'next/headers';

import { Session } from '@/types/session.type';

import { AuthRepository } from '../ports/auth.repository';
import { CookieService } from './cookie.service';
import { SessionService } from './session.service';

export class UserSessionService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sessionService: SessionService,
    private readonly cookieService: CookieService,
  ) {}

  private isSession(payload: unknown): payload is Session {
    return (
      !!payload && typeof payload === 'object' && 'userId' in payload && 'expiresAt' in payload && 'handle' in payload
    );
  }

  async getCurrentSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(this.sessionService.getConfig().cookie.name);

    if (!sessionCookie?.value) {
      return null;
    }

    const payload = await this.cookieService.decrypt(sessionCookie.value);
    if (!this.isSession(payload)) {
      return null;
    }

    return payload;
  }

  async getCurrentUser() {
    const session = await this.getCurrentSession();

    if (!session) {
      return null;
    }

    return this.authRepository.findUserById(session.userId);
  }

  async requireAuth() {
    const user = await this.getCurrentSession();
    if (!user) {
      throw new Error('Authentication required');
    }
    return user;
  }

  async logout() {
    await this.sessionService.delete();
  }
}
