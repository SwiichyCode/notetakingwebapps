export type Session = {
  userId: string;
  expiresAt: string;
  handle: string;
  exp: number;
};

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
  handle: string;
}

export type SessionConfig = {
  secret: string;
  expiresIn: number;
  jwt: {
    algorithm: 'HS256';
    expiresIn: string;
  };
  cookie: {
    name: string;
    options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: 'lax' | 'strict' | 'none';
      path: string;
    };
  };
};
