"use server";

import {
  getServerCookies,
  setServerCookie,
} from "@/utils/cookies/cookiesServer";
import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";

export async function getPasskeyLoginOptionsAction() {
  try {
    await checkRateLimit("authLoginStartPasskey");

    const response = await authApi.loginStartPasskey();

    if (!response.ok) throw new Error("AUTH_002");

    let [name, value] = ["", ""];
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader)
      setCookieHeader.split(/,(?=\s*[^;]+=[^;]+)/g).forEach((cookieStr) => {
        [name, value] = cookieStr.split(";")[0].split("=");
      });

    if (name && value)
      await setServerCookie(name, value, {
        maxAge: 60,
      });

    return await response.json();
  } catch (error) {
    console.error("getPasskeyLoginOptions error:");
    throw error;
  }
}

export async function verifyPasskeyLoginAction(credential: unknown) {
  try {
    await checkRateLimit("authLoginPasskeyFinish");

    const cookieHeader = await getServerCookies();

    const response = await authApi.loginPasskeyFinish(credential, cookieHeader);

    await setServerCookie("user_access_token", response.token, {
      maxAge: response.expiresIn,
    });

    await setServerCookie("user_id", response.userId, {
      maxAge: response.expiresIn,
    });

    await setServerCookie("user_email", response.email, {
      maxAge: response.expiresIn,
    });

    await setServerCookie("user_name", response.username, {
      maxAge: response.expiresIn,
    });

    return response.username;
  } catch (error) {
    console.error("verifyPasskeyLogin error:");
    throw error;
  }
}
