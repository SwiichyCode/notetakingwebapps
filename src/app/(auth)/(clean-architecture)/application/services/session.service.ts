'server-only';

import { randomUUID } from 'node:crypto';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SessionConfig } from '@/types/session.type';

export class SessionService {
  private readonly key: Uint8Array;

  constructor(
    private readonly config: SessionConfig,
    private readonly prisma: any,
  ) {
    this.key = new TextEncoder().encode(config.secret);
  }

  async create(userId: string) {
    const expiresAt = new Date(this.config.expiresIn);
    const handle = randomUUID();

    const session = await this.prisma.session.create({
      data: {
        userId,
        expiresAt,
        handle,
      },
    });

    const token = await this.encrypt({
      userId: session.userId,
      expiresAt: session.expiresAt,
      handle: session.handle,
    });

    const cookieStore = await cookies();
    cookieStore.set(this.config.cookie.name, token, {
      ...this.config.cookie.options,
      expires: expiresAt,
    });

    return session;
  }

  async delete() {
    const cookieStore = await cookies();
    cookieStore.delete(this.config.cookie.name);
  }

  private async encrypt(payload: any) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.config.jwt.algorithm })
      .setExpirationTime(this.config.jwt.expiresIn)
      .sign(this.key);
  }

  public async decrypt(token: string | undefined) {
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, this.key, {
        algorithms: [this.config.jwt.algorithm],
      });
      return payload;
    } catch {
      return null;
    }
  }

  public getConfig() {
    return this.config;
  }
}
