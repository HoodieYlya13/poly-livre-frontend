"use server";

import { getErrorMessage } from "@/api/api.errors";
import { authApi } from "@/api/auth.api";
import { setServerCookie } from "@/utils/cookies/cookiesServer";
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
    
    const message = getErrorMessage(error);

    throw new Error(message);
  }
}
