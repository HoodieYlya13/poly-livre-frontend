"use server";

import { getErrorMessage } from "@/api/api.errors";
import { userApi } from "@/api/user.api";
import { setServerCookie } from "@/utils/cookies/cookiesServer";
import { checkRateLimit } from "@/utils/rateLimit";

export async function updateUsernameAction(username: string) {
  try {
    await checkRateLimit("userUpdateUsername");

    const json = await userApi.updateUsername(username);

    return await setServerCookie("user_name", json.username, {
      maxAge: json.expiresIn,
      httpOnly: false,
    });
  } catch (error) {
    console.error("updateUsername error:");

    const message = getErrorMessage(error, "USERNAME_UPDATE_FAILED");

    throw new Error(message);
  }
}

export async function getUserAction() {
  try {
    await checkRateLimit("userGetUser");

    return await userApi.getMe();
  } catch (error) {
    console.error("getUser error:");
    throw error;
  }
}
