"use server";

import { userApi } from "@/api/user.api";
import {
  getUserAccessToken,
  setServerCookie,
} from "@/utils/cookies/cookies.server";
import { baseServerAction } from "../base.server.actions";
import { decodeJwt } from "jose";
import { ERROR_CODES } from "@/utils/errors";

export async function updateUsernameAction(username: string) {
  return baseServerAction(
    "updateUsername",
    async () => {
      const json = await userApi.updateUsername(username);

      const token = await getUserAccessToken();
      if (!token) throw new Error(ERROR_CODES.AUTH[1]);

      let maxAge = 0;

      try {
        const payload = await decodeJwt(token);
        if (payload.exp) {
          const now = Math.floor(Date.now() / 1000);
          maxAge = payload.exp - now;
        }
      } catch {
        throw new Error(ERROR_CODES.SYST[1]);
      }

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

export async function getUserAction() {
  return baseServerAction(
    "getUser",
    async () => {
      return await userApi.getMe();
    },
    {}
  );
}
