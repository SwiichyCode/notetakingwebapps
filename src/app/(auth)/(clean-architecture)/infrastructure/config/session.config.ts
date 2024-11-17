export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET!,
  expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 jours
  jwt: {
    algorithm: 'HS256' as const,
    expiresIn: '1hr',
  },
  cookie: {
    name: 'session',
    options: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax' as const,
      path: '/',
    },
  },
} as const;

export type SessionConfig = typeof SESSION_CONFIG;
