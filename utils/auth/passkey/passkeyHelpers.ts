"use server";

import { authApi } from "@/api/auth.api";
import {
  getServerCookies,
  setServerCookie,
} from "@/utils/cookies/server/cookiesServer";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";

// FIXME: useSuspenseQuery, suspense, activity, https://youtu.be/Ubbb1RK7iFs?si=QrN0yxMwxjfJF49X

export async function getPasskeyLoginOptions() {
  try {
    const response = await authApi.loginStartPasskey();

    if (!response.ok) throw new Error("AUTH_002");

    let [name, value] = "";
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

export async function verifyPasskeyLogin(credential: unknown) {
  try {
    const cookieHeader = await getServerCookies();

    const data = await authApi.loginPasskeyFinish(credential, cookieHeader);

    await setServerCookie("user_access_token", data.token, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_id", data.userId, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_name", data.username, {
      maxAge: data.expiresIn,
      httpOnly: false,
    });

    await setServerCookie("user_email", data.email, {
      maxAge: data.expiresIn,
    });

    return { success: true, username: data.username };
  } catch (error) {
    console.error("verifyPasskeyLogin error:", error);
    return { success: false, error };
  }
}

export async function getPasskeyRegistrationOptions(
  email: string,
  passkeyName: string
) {
  try {
    const token = await getUserAccessToken();
    if (!token) throw new Error("AUTH_004");

    const response = await authApi.registerPasskeyStart(email, passkeyName, token);
    if (response.ok) return await response.json();
  } catch (error) {
    console.error("getPasskeyRegistrationOptions error:");
    throw error;
  }
}

export async function verifyPasskeyRegistration(
  email: string,
  credential: unknown,
  passkeyName: string
) {
  try {
    const token = await getUserAccessToken();
    if (!token) throw new Error("AUTH_004");

    const response = await authApi.registerPasskeyFinish(
      credential,
      email,
      passkeyName
    );

    if (response.ok) return { success: true };
    return { success: false };
  } catch (error) {
    console.error("verifyPasskeyRegistration error:", error);
    return { success: false };
  }
}
