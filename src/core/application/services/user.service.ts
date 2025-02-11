'server-only';

import { User } from '../../domain/entities/user.entity';
import { AuthRepository } from '../ports/authentication/auth.repository';

interface IUserService {
  getUserById(userId: string): Promise<User | null>;
}

export class UserService implements IUserService {
  constructor(private readonly authRepository: AuthRepository) {}

  async getUserById(userId: string) {
    return this.authRepository.findUserById(userId);
  }
}
