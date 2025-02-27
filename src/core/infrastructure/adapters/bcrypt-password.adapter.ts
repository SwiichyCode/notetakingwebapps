import bcrypt from 'bcryptjs';

import { PasswordRepository } from '@/core/application/ports/authentication/password.repository';

export class BcryptPasswordAdapter implements PasswordRepository {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
