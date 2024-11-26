import { User } from '../../domain/entities/user.entity';

export interface CreateUserDTO {
  email: string;
  password: string;
  verificationToken?: string;
  emailVerified?: Date | null;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  isEmailVerification?: boolean;
  email?: string;
  user?: User;
}
