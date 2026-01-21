"use server";

import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { RegistrationResponseJSON } from "@simplewebauthn/browser";
import { ERROR_CODES } from "@/utils/errors.utils";
import { revalidatePath } from "next/cache";
import { PasskeyNameSchema } from "@/schemas/stringSchemas";

export async function getPasskeyRegistrationOptionsAction(passkeyName: string) {
  return baseServerAction(
    "authRegisterPasskeyStart",
    async () => {
      const validationResult = PasskeyNameSchema.safeParse({ passkeyName });

      if (!validationResult.success) throw new Error();

      const userEmail = await getServerCookie("user_email");
      if (!userEmail) throw new Error(ERROR_CODES.AUTH[4]);

      return authApi.registerPasskeyStart(userEmail, validationResult.data.passkeyName);
    },
    {}
  );
}

export async function verifyPasskeyRegistrationAction(
  credential: RegistrationResponseJSON,
  passkeyName: string
) {
  return baseServerAction(
    "authRegisterPasskeyFinish",
    async () => {
      const userEmail = await getServerCookie("user_email");
      if (!userEmail) throw new Error(ERROR_CODES.AUTH[4]);

      await authApi.registerPasskeyFinish(credential, userEmail, passkeyName);

      revalidatePath("/profile");

      return true;
    },
    {}
  );
}
