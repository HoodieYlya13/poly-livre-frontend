import { z } from "zod";

export const UpdateUsernameSchema = z.object({
  username: z.string(),
});

export type UpdateUsernameValues = z.infer<typeof UpdateUsernameSchema>;