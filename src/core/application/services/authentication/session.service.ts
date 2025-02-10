'server-only';

import { v4 as uuidv4 } from 'uuid';

import { SessionConfig, SessionPayload } from '@/config/types/session.type';

import { CookieRepository } from '../../ports/cookie.repository';
import { SessionRepository } from '../../ports/session.repository';

interface ISessionService {
  create(userId: string): Promise<void>;
  getCurrentSession(): Promise<SessionPayload | null>;
  delete(): Promise<void>;
}

export class SessionService implements ISessionService {
  constructor(
    private readonly cookieRepository: CookieRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly config: SessionConfig,
  ) {}

  async create(userId: string) {
    const expiresAt = new Date(this.config.expiresIn);
    const handle = uuidv4();

    const session = await this.sessionRepository.create({
      userId,
      expiresAt,
      handle,
    });

    const token = await this.cookieRepository.encrypt({
      userId: session.userId,
      expiresAt: session.expiresAt,
      handle: session.handle,
    });

    await this.cookieRepository.setCookie(token);
  }

  async getCurrentSession(): Promise<SessionPayload | null> {
    const token = await this.cookieRepository.getCookie();
    if (!token) return null;

    const session = await this.cookieRepository.decrypt<SessionPayload>(token);

    return session;
  }

  async delete() {
    await this.cookieRepository.removeCookie();
  }

  public getConfig() {
    return this.config;
  }
}
