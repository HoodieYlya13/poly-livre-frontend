"use server";

import { deleteUserSessionCookies } from "@/utils/cookies/cookies.server";
import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { tryCatch } from "@/utils/errors.utils";

export async function logoutAction() {
  return baseServerAction(
    "authLogout",
    async () => {
      const [error] = await tryCatch(authApi.logout());

      if (error) console.error("Logout error", error);

      await deleteUserSessionCookies();
    },
    {}
  );
}

export async function deleteUserSessionAction() {
  return baseServerAction(
    "deleteUserSession",
    async () => {
      const [error] = await tryCatch(deleteUserSessionCookies());

      if (error) console.error("Delete user session error", error);
    },
    {}
  );
}
