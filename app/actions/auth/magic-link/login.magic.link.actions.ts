"use server";

import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";

export async function loginMagicLinkAction(email: string) {
  try {
    await checkRateLimit("authLoginMagicLink");

    return await authApi.loginMagicLink(email); // TODO: verify response when backend fixed
  } catch (error) {
    console.error("Send magic link error:");
    const message =
      error instanceof Error &&
      (error.message.startsWith("AUTH_00") ||
        error.message === "TOO_MANY_REQUESTS")
        ? error.message
        : "MAGIC_LINK_FAILED";

    throw new Error(message);
  }
}
