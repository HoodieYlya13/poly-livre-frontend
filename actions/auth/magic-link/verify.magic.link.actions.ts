"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { setUserSessionCookies } from "@/utils/cookies/cookies.server";

export async function verifyMagicLinkAction(token: string) {
  return baseServerAction(
    "authVerifyMagicLink",
    async () => {
      const user = await authApi.verifyMagicLink(token);
      await setUserSessionCookies(user);

      return user.username;
    },
    {}
  );
}
