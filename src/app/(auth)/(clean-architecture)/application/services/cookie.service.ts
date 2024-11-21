'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SessionConfig } from '@/types/session.type';

export class CookieService {
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

  async decrypt(token: string | undefined) {
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
}