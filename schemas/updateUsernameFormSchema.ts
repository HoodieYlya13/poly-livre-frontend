import { z } from "zod";

const noWhitespace = (val: string) =>
  !/\s/.test(val);

export const UpdateUsernameSchema = z.object({
  username: z.string().max(30, "USERNAME_TOO_LONG").refine(noWhitespace, {
    message: "USERNAME_HAS_WHITESPACE",
  }),
});

export type UpdateUsernameValues = z.infer<typeof UpdateUsernameSchema>;