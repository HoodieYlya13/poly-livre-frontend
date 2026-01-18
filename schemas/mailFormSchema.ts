import { z } from "zod";

export const MailSchema = z.object({
  email: z.email(),
});

export type MailValues = z.infer<typeof MailSchema>;
