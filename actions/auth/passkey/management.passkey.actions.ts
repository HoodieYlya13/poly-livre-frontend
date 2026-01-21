"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { ERROR_CODES } from "@/utils/errors.utils";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { revalidatePath } from "next/cache";
import { RenamePasskeySchema, CredentialIdSchema } from "@/schemas/stringSchemas";

export async function renamePasskeyAction(
  credentialId: string,
  newName: string
) {
  return baseServerAction(
    "renamePasskeyAction",
    async () => {
      const validationResult = RenamePasskeySchema.safeParse({ credentialId, newName });

      if (!validationResult.success) throw new Error();

      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[4]);

      await authApi.renamePasskey(userId, validationResult.data.credentialId, validationResult.data.newName);

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
      const validationResult = CredentialIdSchema.safeParse({ credentialId });

      if (!validationResult.success) throw new Error();

      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[4]);

      await authApi.deletePasskey(userId, validationResult.data.credentialId);

      revalidatePath("/profile");

      return true;
    },
    { fallback: ERROR_CODES.PASSKEY.DELETE_FAILED }
  );
}
