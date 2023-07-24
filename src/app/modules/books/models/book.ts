import { z } from 'zod';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: Date;
  editor: string;
}

export const bookSchema = z.object({
  id: z.number().positive(),
  title: z.string().nonempty('Title is required'),
  author: z.string().nonempty('Author is required'),
  publishedDate: z
    .date()
    .refine((date) => !isNaN(date.getTime()), 'Invalid date'),
  editor: z.string().nonempty('Editor is required'),
});
