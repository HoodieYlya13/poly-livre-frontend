"use server";

import { userApi } from "@/api/user.api";
import { setServerCookie } from "@/utils/cookies/server/cookiesServer";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { checkRateLimit } from "@/utils/rateLimit";

export async function updateUsernameAction(username: string) {
  try {
    await checkRateLimit("userUpdateUsername");

    const token = await getUserAccessToken();
    if (!token) throw new Error("AUTH_004");

    const json = await userApi.updateUsername(username, token);

    return await setServerCookie("user_name", json.username, {
      maxAge: json.expiresIn,
      httpOnly: false,
    });
  } catch (error) {
    console.error("updateUsername error:");
    const message =
      error instanceof Error &&
      (error.message.startsWith("AUTH_00") || // TODO: handle reconect
        error.message === "TOO_MANY_REQUESTS")
        ? error.message
        : "USERNAME_UPDATE_FAILED"; // TODO: verify if not generic instead

    throw new Error(message);
  }
}

export async function getUserAction(token: string) {
  try {
    await checkRateLimit("userGetUser");

    return await userApi.getMe(token);
  } catch (error) {
    console.error("getUser error:");
    throw error;
  }
}
