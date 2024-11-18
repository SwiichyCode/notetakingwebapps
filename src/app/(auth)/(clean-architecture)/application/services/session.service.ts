'server-only';

import { randomUUID } from 'node:crypto';

import { SessionConfig } from '@/types/session.type';

import { CookieService } from './cookie.service';

export class SessionService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly config: SessionConfig,
    private readonly prisma: any,
  ) {}

  async create(userId: string) {
    const expiresAt = new Date(this.config.expiresIn);
    const handle = randomUUID();

    const session = await this.prisma.session.create({
      data: { userId, expiresAt, handle },
    });

    const token = await this.cookieService.encrypt({
      userId: session.userId,
      expiresAt: session.expiresAt,
      handle: session.handle,
    });

    await this.cookieService.setCookie(token);

    return session;
  }

  async delete() {
    await this.cookieService.removeCookie();
  }

  public getConfig() {
    return this.config;
  }
}
