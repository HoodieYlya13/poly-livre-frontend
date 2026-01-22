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
import { UserSchema, UserValues } from "@/schemas/userSchema";

export async function createProfileAction(data: UserValues) {
  return baseServerAction(
    "createProfile",
    async () => {
      const validatedFields = UserSchema.safeParse(data);

      if (!validatedFields.success) throw new Error();

      await userApi.createProfile(validatedFields.data);

      const token = await getUserAccessToken();
      if (!token) throw new Error(ERROR_CODES.AUTH[4]);

      const [jwtError, payload] = await tryCatch(async () => decodeJwt(token));

      if (jwtError || !payload || !payload.exp)
        throw new Error(ERROR_CODES.SYST[1]);

      const now = Math.floor(Date.now() / 1000);
      const maxAge = payload.exp - now;

      return await setServerCookie("user_name", validatedFields.data.username, {
        maxAge,
        httpOnly: false,
      });
    },
    {
      fallback: ERROR_CODES.USERNAME.UPDATE_FAILED,
    },
  );
}

export async function updateUsernameAction(username: string) {
  return baseServerAction(
    "updateUsername",
    async () => {
      const validatedFields = UpdateUsernameSchema.safeParse({ username });

      if (!validatedFields.success) throw new Error();

      await userApi.updateUsername(validatedFields.data.username);

      const token = await getUserAccessToken();
      if (!token) throw new Error(ERROR_CODES.AUTH[4]);

      const [jwtError, payload] = await tryCatch(async () => decodeJwt(token));

      if (jwtError || !payload || !payload.exp)
        throw new Error(ERROR_CODES.SYST[1]);

      const now = Math.floor(Date.now() / 1000);
      const maxAge = payload.exp - now;

      return await setServerCookie("user_name", validatedFields.data.username, {
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
