import { z } from 'zod';

export const InitiatePasswordResetDTO = z.object({
  email: z.string().email(),
});

export const ResetPasswordDTO = z.object({
  token: z.string(),
  newPassword: z.string(),
});

export const ResetPasswordResult = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

export type InitiatePasswordResetDTO = z.infer<typeof InitiatePasswordResetDTO>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordDTO>;
export type ResetPasswordResult = z.infer<typeof ResetPasswordResult>;
