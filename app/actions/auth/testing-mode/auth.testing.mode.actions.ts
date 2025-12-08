"use server";

import { authApi } from "@/api/auth.api";
import { setServerCookie } from "@/utils/cookies/server/cookiesServer";
import { checkRateLimit } from "@/utils/rateLimit";

export async function loginTestingModeAction(password: string) {
  try {
    await checkRateLimit("authTestingMode");

    const response = await authApi.loginTestingMode(password);

    if (!response) throw new Error("PASSWORD_INCORRECT");

    return await setServerCookie("isAuthorized", "true", {
      maxAge: 60 * 60 * 24 * 31,
    });
  } catch (error) {
    console.error("loginTestingMode error:");
    let message = "GENERIC";

    if (error instanceof Error) {
      if (error.message === "PASSWORD_INCORRECT") {
        message = "PASSWORD_INCORRECT";
      } else if (error.message === "TOO_MANY_REQUESTS")
        message = "TOO_MANY_REQUESTS";
    }

    throw new Error(message);
  }
}
