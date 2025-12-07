"use server";

import { authApi } from "@/api/auth.api";
import { setServerCookie } from "../../cookies/server/cookiesServer";

export async function verifyMagicLink(token: string) {
  try {
    const data = await authApi.verifyMagicLink(token);

    await setServerCookie("user_access_token", data.token, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_id", data.userId, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_email", data.email, {
      maxAge: data.expiresIn,
    });

    if (data.username) {
      await setServerCookie("user_name", data.username, {
        maxAge: data.expiresIn,
        httpOnly: false,
      });

      return { success: true, username: data.username };
    }

    return { success: true };
  } catch (error) {
    console.error("Magic link verification error:", error);
    const message =
      error instanceof Error && error.message.startsWith("AUTH_00")
        ? error.message
        : "GENERIC";
    return { success: false, error: message };
  }
}
