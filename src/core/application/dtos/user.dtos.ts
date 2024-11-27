import { User } from '@/core/domain/entities/user.entity';

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

export interface UserResponseDTO {
  id: string;
  email: string;
  emailVerified: Date | null;
}

export function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
  };
}
