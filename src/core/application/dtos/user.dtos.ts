import { z } from 'zod';

import { User } from '@/core/domain/entities/user.entity';

export function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified ?? undefined,
  };
}

export const CreateUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  verificationToken: z.string().optional(),
  emailVerified: z.date().optional(),
});

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserResponseDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.date().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
export type UserResponseDTO = z.infer<typeof UserResponseDTO>;
export type LoginDTO = z.infer<typeof LoginDTO>;
