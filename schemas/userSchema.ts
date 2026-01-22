import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  status: z.string(),
});

export type UserValues = z.infer<typeof UserSchema>;
