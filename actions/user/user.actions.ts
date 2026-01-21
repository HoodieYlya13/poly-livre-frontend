"use server";

import { userApi } from "@/api/user.api";
import {
  getUserAccessToken,
  setServerCookie,
} from "@/utils/cookies/cookies.server";
import { baseServerAction } from "../base.server.actions";
import { decodeJwt } from "jose";
import { ERROR_CODES, tryCatch } from "@/utils/errors.utils";
import { MailSchema } from "@/schemas/mailFormSchema";
import { UpdateUsernameSchema } from "@/schemas/updateUsernameFormSchema";

export async function updateUsernameAction(username: string) {
  return baseServerAction(
    "updateUsername",
    async () => {
      const validatedFields = UpdateUsernameSchema.safeParse({ username });

      if (!validatedFields.success) throw new Error();

      const json = await userApi.updateUsername(validatedFields.data.username);

      const token = await getUserAccessToken();
      if (!token) throw new Error(ERROR_CODES.AUTH[4]);

      const [jwtError, payload] = await tryCatch(async () => decodeJwt(token));

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
    },
  );
}

export async function subscribeToNewsletterAction(
  _: boolean | null,
  formData: FormData,
) {
  const honeypot = formData.get("confirm_email");

  if (honeypot) {
    console.warn("Honeypot triggered by bot.");
    return true;
  }

  const email = formData.get("email");

  const validatedFields = MailSchema.safeParse({ email });

  if (!validatedFields.success) return false;

  return baseServerAction(
    "subscribeToNewsletter",
    async () => {
      const [error] = await tryCatch(
        userApi.subscribeToNewsletter(validatedFields.data.email),
      );

      if (error) return false;

      return true;
    },
    {},
  );
}
