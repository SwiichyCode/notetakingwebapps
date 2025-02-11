import { z } from 'zod';

export const EmailVerificationDTO = z.object({
  token: z.string(),
});

export const ResendEmailVerificationDTO = z.object({
  email: z.string().email(),
});

export const SendExistingAccountAlertDTO = z.object({
  email: z.string().email(),
});

export type EmailVerificationDTO = z.infer<typeof EmailVerificationDTO>;
export type ResendEmailVerificationDTO = z.infer<typeof ResendEmailVerificationDTO>;
export type SendExistingAccountAlertDTO = z.infer<typeof SendExistingAccountAlertDTO>;
