import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SessionConfig } from '@/config/types/session.type';
import { CookieRepository } from '@/core/application/ports/cookie.repository';

export class NextCookieAdapter implements CookieRepository {
  private readonly key: Uint8Array;

  constructor(private readonly config: SessionConfig) {
    this.key = new TextEncoder().encode(config.secret);
  }

  async encrypt(payload: any): Promise<string> {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: this.config.jwt.algorithm })
      .setExpirationTime(this.config.jwt.expiresIn)
      .sign(this.key);

    return token;
  }

  async decrypt<T>(token: string | null): Promise<T | null> {
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, this.key, {
        algorithms: [this.config.jwt.algorithm],
      });
      return payload as T;
    } catch {
      return null;
    }
  }

  async setCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(this.config.cookie.name, token, {
      ...this.config.cookie.options,
      expires: new Date(this.config.expiresIn),
    });
  }

  async removeCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(this.config.cookie.name);
  }

  async getCookie() {
    const cookieStore = await cookies();
    return cookieStore.get(this.config.cookie.name)?.value;
  }
}
