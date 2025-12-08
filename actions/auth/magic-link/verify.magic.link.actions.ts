"use server";

import { setServerCookie } from "@/utils/cookies/cookiesServer";
import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";
import { getErrorMessage } from "@/api/api.errors";

export async function verifyMagicLinkAction(token: string) {
  try {
    await checkRateLimit("authVerifyMagicLink");

    const result = await authApi.verifyMagicLink(token);
    await setServerCookie("user_access_token", result.token, {
      maxAge: result.expiresIn,
    });

    await setServerCookie("user_id", result.userId, {
      maxAge: result.expiresIn,
    });

    await setServerCookie("user_email", result.email, {
      maxAge: result.expiresIn,
    });

    if (result.username) {
      await setServerCookie("user_name", result.username, {
        maxAge: result.expiresIn,
      });
    }

    return result.username;
  } catch (error) {
    console.error("Magic link verification error:");

    const message = getErrorMessage(error);

    throw new Error(message);
  }
}
