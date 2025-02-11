import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove spaces at the beginning and end
    .normalize('NFD') // Decompose accented characters
    .replaceAll(/[\u0300-\u036F]/g, '') // Remove diacritics
    .replaceAll(/[^a-z0-9\s-]/g, '') // Keep only letters, numbers, spaces and hyphens
    .replaceAll(/[\s]+/g, '-') // Replace spaces with hyphens
    .replaceAll(/-+/g, '-'); // Avoid multiple consecutive hyphens
};
