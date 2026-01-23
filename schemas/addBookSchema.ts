import { z } from "zod";

export const AddBookSchema = z.object({
  title: z.string(),
  pages: z.coerce.number(),
  author: z.string(),
  year: z.coerce.number(),
  style: z.string(),
  language: z.enum(["FR", "EN"]),
  description: z.string(),
  price: z.coerce.number(),
  loanDuration: z.coerce.number(),
});

export type AddBookValues = z.infer<typeof AddBookSchema>;
