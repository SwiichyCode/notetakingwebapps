import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  tags: z
    .string()
    .refine(string_ => /^[a-zA-Z]+(?:\s*,\s*[a-zA-Z]+)*$/.test(string_), {
      message: 'Tags must be words separated by commas (e.g. Work, Planning)',
    })
    .transform(string_ => {
      if (!string_) return [];
      return string_
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
    })
    .refine(tags => tags.length > 0, {
      message: 'At least one tag is required',
    })
    .refine(tags => Array.isArray(tags) && tags.every(tag => tag.length >= 2), {
      message: 'Each tag must be at least 2 characters long',
    }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export type FormState =
  | {
      errors?: {
        title?: string[];
        tags?: string[];
        content?: string[];
      };
      fieldValues?: {
        title?: string;
        tags?: string;
        content?: string;
      };
      message?: string;
    }
  | undefined;
