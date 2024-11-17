import { jwtVerify } from 'jose';

import { SessionConfig } from '@/types/session.type';

export class CookieService {
  private readonly key: Uint8Array;

  constructor(private readonly config: SessionConfig) {
    this.key = new TextEncoder().encode(config.secret);
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
}
