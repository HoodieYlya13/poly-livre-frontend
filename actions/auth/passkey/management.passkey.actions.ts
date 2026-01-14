"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { ERROR_CODES } from "@/utils/errors.utils";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { revalidatePath } from "next/cache";

export async function getUserPasskeysAction() {
  return baseServerAction(
    "getUserPasskeysAction",
    async () => {
      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[1]);

      return await authApi.getUserPasskeys(userId);
    },
    {}
  );
}

export async function renamePasskeyAction(
  credentialId: string,
  newName: string
) {
  return baseServerAction(
    "renamePasskeyAction",
    async () => {
      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[1]);

      await authApi.renamePasskey(userId, credentialId, newName);

      revalidatePath("/profile");

      return true;
    },
    { fallback: ERROR_CODES.PASSKEY.RENAME_FAILED }
  );
}

export async function deletePasskeyAction(credentialId: string) {
  return baseServerAction(
    "deletePasskeyAction",
    async () => {
      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[1]);

      await authApi.deletePasskey(userId, credentialId);

      revalidatePath("/profile");

      return true;
    },
    { fallback: ERROR_CODES.PASSKEY.DELETE_FAILED }
  );
}
