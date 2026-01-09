"use server";

import { userApi } from "@/api/user.api";
import {
  getUserAccessToken,
  setServerCookie,
} from "@/utils/cookies/cookies.server";
import { baseServerAction } from "../base.server.actions";
import { decodeJwt } from "jose";
import { tryCatch } from "@/utils/tryCatch";
import { ERROR_CODES } from "@/utils/errors";

export async function updateUsernameAction(username: string) {
  return baseServerAction(
    "updateUsername",
    async () => {
      const json = await userApi.updateUsername(username);

      const token = await getUserAccessToken();
      if (!token) throw new Error(ERROR_CODES.AUTH[4]);

      const [payload, jwtError] = await tryCatch(async () => decodeJwt(token));

      if (jwtError || !payload || !payload.exp)
        throw new Error(ERROR_CODES.SYST[1]);

      const now = Math.floor(Date.now() / 1000);
      const maxAge = payload.exp - now;

      return await setServerCookie("user_name", json.username, {
        maxAge,
        httpOnly: false,
      });
    },
    {
      fallback: ERROR_CODES.USERNAME.UPDATE_FAILED,
    }
  );
}

export async function getCurrentUserAction() {
  return baseServerAction(
    "getCurrentUser",
    async () => {
      return await userApi.getMe();
    },
    {}
  );
}
