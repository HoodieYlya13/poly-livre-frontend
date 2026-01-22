"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { LoginTestingModeSchema } from "@/schemas/authTestingModeSchema";
import { setServerCookie } from "@/utils/cookies/cookies.server";
import { ERROR_CODES } from "@/utils/errors.utils";

export async function loginTestingModeAction(password: string) {
  return baseServerAction(
    "authTestingMode",
    async () => {
      const validationResult = LoginTestingModeSchema.safeParse({ password });

      if (!validationResult.success) throw new Error();

      const response = await authApi.loginTestingMode(validationResult.data.password);

      if (!response) throw new Error(ERROR_CODES.PASSWORD.INCORRECT);

      return await setServerCookie("isAuthorized", "true", {
        maxAge: 60 * 60 * 24 * 31,
      });
    },
    {}
  );
}
