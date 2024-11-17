import { randomBytes } from 'node:crypto';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateVerificationToken() {
  return randomBytes(32).toString('hex');
}
