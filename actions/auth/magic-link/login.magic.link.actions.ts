"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { ERROR_CODES } from "@/utils/errors.utils";
import { MailSchema } from "@/schemas/mailFormSchema";

export async function loginMagicLinkAction(email: string) {
  return baseServerAction(
    "authLoginMagicLink",
    async () => {
      const validationResult = MailSchema.safeParse({ email });

      if (!validationResult.success) throw new Error();
      return await authApi.loginMagicLink(validationResult.data.email);
    },
    {
      fallback: ERROR_CODES.MAGIC_LINK.FAILED,
    },
  );
}
