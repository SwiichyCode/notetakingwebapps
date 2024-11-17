import { User } from '../../domain/entities/user.entity';
import { CreateUserDTO } from '../dtos/user.dtos';

export interface AuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
  createUser(data: CreateUserDTO): Promise<User>;
  findUserByVerificationToken(token: string): Promise<User | null>;
  updateUserVerification(userId: string, token: string | null): Promise<void>;
  updateResetToken(userId: string, token: string | null, expires: Date | null): Promise<void>;
  findUserByResetToken(token: string): Promise<User | null>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
}
