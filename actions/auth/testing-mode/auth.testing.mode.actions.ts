"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { setServerCookie } from "@/utils/cookies/cookies.server";
import { ERROR_CODES } from "@/utils/errors.utils";

export async function loginTestingModeAction(password: string) {
  return baseServerAction(
    "authTestingMode",
    async () => {
      const response = await authApi.loginTestingMode(password);

      if (!response) throw new Error(ERROR_CODES.PASSWORD.INCORRECT);

      return await setServerCookie("isAuthorized", "true", {
        maxAge: 60 * 60 * 24 * 31,
      });
    },
    {}
  );
}
