import { User } from '../../domain/entities/user.entity';

interface CreateUserParams {
  email: string;
  password: string;
  verificationToken?: string;
}

export interface AuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
  createUser(data: CreateUserParams): Promise<User | null>;
  findUserByVerificationToken(token: string): Promise<User | null>;
  updateUserVerification(userId: string, token: string | null): Promise<void>;
  updateResetToken(userId: string, token: string | null, expires: Date | null): Promise<void>;
  findUserByResetToken(token: string): Promise<User | null>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
}
