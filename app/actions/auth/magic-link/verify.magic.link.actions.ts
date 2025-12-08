"use server";

import { setServerCookie } from "@/utils/cookies/server/cookiesServer";
import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";

export async function verifyMagicLinkAction(token: string) {
  try {
    await checkRateLimit("authVerifyMagicLink");

    const result = await authApi.verifyMagicLink(token);
    await setServerCookie("user_access_token", result.token, {
      maxAge: result.expiresIn,
    });

    await setServerCookie("user_id", result.userId, {
      maxAge: result.expiresIn
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
    const message =
      error instanceof Error &&
      (error.message.startsWith("AUTH_00") ||
        error.message === "TOO_MANY_REQUESTS")
        ? error.message
        : "GENERIC";

    throw new Error(message);
  }
}