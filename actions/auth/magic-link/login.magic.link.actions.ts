"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { ERROR_CODES } from "@/utils/errors.utils";

export async function loginMagicLinkAction(email: string) {
  return baseServerAction(
    "authLoginMagicLink",
    async () => {
      return await authApi.loginMagicLink(email);
    },
    {
      fallback: ERROR_CODES.MAGIC_LINK.FAILED,
    }
  );
}
